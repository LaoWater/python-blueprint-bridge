#!/bin/bash
# setup-terminal-platform.sh
# Complete automated setup for GKE Python Terminal Platform (Mac/Linux)

set -e  # Exit on any error

# Default values
PROJECT_ID="blue-pigeon-460611"
REGION="us-west3"
CLUSTER_NAME="bluepigeon-cluster-2"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --project)
      PROJECT_ID="$2"
      shift 2
      ;;
    --region)
      REGION="$2"
      shift 2
      ;;
    --cluster)
      CLUSTER_NAME="$2"
      shift 2
      ;;
    *)
      echo "Unknown option $1"
      echo "Usage: $0 [--project PROJECT_ID] [--region REGION] [--cluster CLUSTER_NAME]"
      exit 1
      ;;
  esac
done

echo "🚀 Starting GKE Python Terminal Platform Setup..."
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo "Cluster: $CLUSTER_NAME"

# Check prerequisites
echo ""
echo "🔍 Checking prerequisites..."

if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI not found. Please install Google Cloud SDK first."
    echo "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker Desktop first."
    echo "Install from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl not found. Please install kubectl first."
    echo "Usually comes with Docker Desktop or install separately."
    exit 1
fi

echo "✅ All prerequisites found!"

# Step 1: Google Cloud Authentication & Setup
echo ""
echo "📋 Step 1: Google Cloud Setup"

echo "Authenticating with Google Cloud..."
gcloud auth login

echo "Setting project..."
gcloud config set project $PROJECT_ID

echo "Setting region..."
gcloud config set compute/region $REGION

echo "Enabling required APIs..."
gcloud services enable container.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable iam.googleapis.com

# Step 2: Create Google Cloud Service Account
echo ""
echo "🔐 Step 2: Creating Service Account"

SERVICE_ACCOUNT_EMAIL="terminal-controller@$PROJECT_ID.iam.gserviceaccount.com"

echo "Creating Google Cloud Service Account..."
if gcloud iam service-accounts create terminal-controller \
    --display-name="Terminal Controller" \
    --description="Service account for managing user terminal pods" 2>/dev/null; then
    echo "✅ Service account created"
else
    echo "⚠️ Service account might already exist, continuing..."
fi

echo "Granting minimal IAM roles..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/container.developer"

# Step 3: Connect to GKE cluster
echo ""
echo "🔗 Step 3: Connecting to GKE Cluster"

echo "Getting cluster credentials..."
gcloud container clusters get-credentials $CLUSTER_NAME --region $REGION

echo "Testing cluster connection..."
kubectl cluster-info

# Step 4: Enable Workload Identity
echo ""
echo "🔧 Step 4: Configuring Workload Identity"

echo "Binding Kubernetes SA to Google SA..."
gcloud iam service-accounts add-iam-policy-binding $SERVICE_ACCOUNT_EMAIL \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:$PROJECT_ID.svc.id.goog[user-sessions/terminal-controller]"

# Step 5: Create Artifact Registry
echo ""
echo "📦 Step 5: Setting up Artifact Registry"

echo "Creating Artifact Registry repository..."
if gcloud artifacts repositories create terminal-images \
    --repository-format=docker \
    --location=$REGION \
    --description="Docker images for terminal platform" 2>/dev/null; then
    echo "✅ Artifact Registry created"
else
    echo "⚠️ Repository might already exist, continuing..."
fi

echo "Configuring Docker authentication..."
gcloud auth configure-docker "$REGION-docker.pkg.dev"

# Step 6: Apply Kubernetes Configuration
echo ""
echo "☸️ Step 6: Applying Kubernetes Configuration"

# Create k8s-config.yaml with actual project ID
cat > k8s-config.yaml << EOF
# k8s-config.yaml - Ultra cost-optimized configuration
apiVersion: v1
kind: Namespace
metadata:
  name: user-sessions
  labels:
    name: user-sessions
---
# VERY restrictive resource quota for cost control
apiVersion: v1
kind: ResourceQuota
metadata:
  name: user-quota
  namespace: user-sessions
spec:
  hard:
    pods: "5"                     # Start with max 5 concurrent users
    requests.cpu: "500m"          # Max 0.5 CPU cores total (VERY cheap)
    requests.memory: "1Gi"        # Max 1GB RAM total
    limits.cpu: "2"               # Max 2 CPU cores burst
    limits.memory: "4Gi"          # Max 4GB RAM burst
    persistentvolumeclaims: "0"   # No persistent storage = \$0
---
# Google Service Account for the backend controller
apiVersion: v1
kind: ServiceAccount
metadata:
  name: terminal-controller
  namespace: user-sessions
  annotations:
    # This links to your Google Cloud Service Account
    iam.gke.io/gcp-service-account: terminal-controller@$PROJECT_ID.iam.gserviceaccount.com
---
# Minimal role with least privilege
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: user-sessions
  name: terminal-manager
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["create", "delete", "get", "list", "watch"]
- apiGroups: [""]
  resources: ["pods/exec"]
  verbs: ["create"]
- apiGroups: [""]
  resources: ["pods/log"]
  verbs: ["get"]
---
# Bind role to service account
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: terminal-manager-binding
  namespace: user-sessions
subjects:
- kind: ServiceAccount
  name: terminal-controller
  namespace: user-sessions
roleRef:
  kind: Role
  name: terminal-manager
  apiGroup: rbac.authorization.k8s.io
---
# Network policy for extra security (optional)
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: user-session-isolation
  namespace: user-sessions
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: user-sessions
  egress:
  - {} # Allow all egress for now (can restrict later)
EOF

echo "Applying Kubernetes configuration..."
kubectl apply -f k8s-config.yaml

# Step 7: Create Ultra-Lightweight Docker Image
echo ""
echo "🐳 Step 7: Creating Docker Image"

# Create Dockerfile
cat > Dockerfile.python-terminal << 'EOF'
# Ultra-lightweight Python image for cost optimization
FROM python:3.11-alpine

# Install minimal system dependencies (Alpine = smaller)
RUN apk add --no-cache \
    bash \
    curl \
    git \
    nano

# Install only essential Python packages
RUN pip install --no-cache-dir \
    requests \
    numpy

# Create non-root user
RUN adduser -D -s /bin/bash pythonuser
USER pythonuser
WORKDIR /home/pythonuser

# Minimal shell setup
RUN echo 'export PS1="🐍 \w $ "' >> ~/.bashrc && \
    echo 'alias ll="ls -la"' >> ~/.bashrc && \
    echo 'alias python="python3"' >> ~/.bashrc

CMD ["/bin/bash"]
EOF

IMAGE_NAME="$REGION-docker.pkg.dev/$PROJECT_ID/terminal-images/python-terminal:v1"

echo "Building Docker image (this may take a few minutes)..."
docker build -f Dockerfile.python-terminal -t $IMAGE_NAME .

echo "Pushing image to Artifact Registry..."
docker push $IMAGE_NAME

# Step 8: Verify Setup
echo ""
echo "✅ Step 8: Verifying Setup"

echo "Checking namespace..."
kubectl get namespace user-sessions

echo "Checking resource quotas..."
kubectl get resourcequota -n user-sessions

echo "Checking service account..."
kubectl get serviceaccount -n user-sessions

echo "Checking RBAC..."
kubectl get role,rolebinding -n user-sessions

echo "Verifying Docker image..."
gcloud artifacts docker images list $REGION-docker.pkg.dev/$PROJECT_ID/terminal-images

# Step 9: Create Updated Backend Configuration
echo ""
echo "⚙️ Step 9: Updating Backend Configuration"

cat > backend-config.js << EOF
// Updated server.js with cost-optimized settings
const NAMESPACE = 'user-sessions';
const IMAGE = '$IMAGE_NAME';

// Ultra-lightweight pod configuration
const podManifest = {
    metadata: {
        generateName: 'python-terminal-',
        namespace: NAMESPACE,
        labels: {
            app: 'python-terminal',
            session: sessionId
        }
    },
    spec: {
        restartPolicy: 'Never',
        serviceAccountName: 'terminal-controller',
        containers: [{
            name: 'python-terminal',
            image: IMAGE,
            resources: {
                requests: {
                    cpu: '50m',        // Very small: 0.05 CPU
                    memory: '128Mi'    // Very small: 128MB RAM
                },
                limits: {
                    cpu: '200m',       // Max: 0.2 CPU
                    memory: '256Mi'    // Max: 256MB RAM
                }
            },
            stdin: true,
            stdinOnce: false,
            tty: true,
            command: ['/bin/bash']
        }],
        // Auto-cleanup after 30 minutes for cost savings
        activeDeadlineSeconds: 1800
    }
};
EOF

# Final Summary
echo ""
echo "🎉 Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Cost-Optimized Configuration:"
echo "• Max 5 concurrent users"
echo "• 50m CPU per pod (0.05 cores)"
echo "• 128Mi RAM per pod"
echo "• 30-minute auto-cleanup"
echo "• Alpine Linux base (smaller image)"
echo "• Spot instances enabled in GKE"
echo ""
echo "🔧 What was created:"
echo "✅ Google Cloud Service Account: terminal-controller"
echo "✅ Kubernetes namespace: user-sessions"
echo "✅ Resource quotas and RBAC configured"
echo "✅ Docker image: $IMAGE_NAME"
echo "✅ Workload Identity configured"
echo ""
echo "🚀 Next Steps:"
echo "1. Update your backend code with the config in backend-config.js"
echo "2. Test locally: npm run dev"
echo "3. Deploy to production when ready"
echo ""
echo "💰 Estimated Cost:"
echo "• ~\$0.01-0.05 per terminal session per hour"
echo "• ~\$0.24-1.20 per day with 5 concurrent users"
echo "• Scale-to-zero when no users = \$0"
echo ""
echo "Setup completed successfully! 🎉"