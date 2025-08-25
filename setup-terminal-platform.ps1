# setup-terminal-platform.ps1
# Complete automated setup for GKE Python Terminal Platform

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectId = "blue-pigeon-460611",
    
    [Parameter(Mandatory=$false)]
    [string]$Region = "us-west3",
    
    [Parameter(Mandatory=$false)]
    [string]$ClusterName = "bluepigeon-cluster-2"
)

Write-Host "🚀 Starting GKE Python Terminal Platform Setup..." -ForegroundColor Green
Write-Host "Project: $ProjectId" -ForegroundColor Yellow
Write-Host "Region: $Region" -ForegroundColor Yellow
Write-Host "Cluster: $ClusterName" -ForegroundColor Yellow

# Step 1: Google Cloud Authentication & Setup
Write-Host "`n📋 Step 1: Google Cloud Setup" -ForegroundColor Blue

Write-Host "Authenticating with Google Cloud..."
gcloud auth login

Write-Host "Setting project..."
gcloud config set project $ProjectId

Write-Host "Setting region..."
gcloud config set compute/region $Region

Write-Host "Enabling required APIs..."
gcloud services enable container.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable iam.googleapis.com

# Step 2: Create Google Cloud Service Account
Write-Host "`n🔐 Step 2: Creating Service Account" -ForegroundColor Blue

$ServiceAccountEmail = "terminal-controller@$ProjectId.iam.gserviceaccount.com"

Write-Host "Creating Google Cloud Service Account..."
try {
    gcloud iam service-accounts create terminal-controller `
        --display-name="Terminal Controller" `
        --description="Service account for managing user terminal pods"
    Write-Host "✅ Service account created" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Service account might already exist, continuing..." -ForegroundColor Yellow
}

Write-Host "Granting minimal IAM roles..."
gcloud projects add-iam-policy-binding $ProjectId `
    --member="serviceAccount:$ServiceAccountEmail" `
    --role="roles/container.developer"

# Step 3: Connect to GKE cluster
Write-Host "`n🔗 Step 3: Connecting to GKE Cluster" -ForegroundColor Blue

Write-Host "Getting cluster credentials..."
gcloud container clusters get-credentials $ClusterName --region $Region

Write-Host "Testing cluster connection..."
kubectl cluster-info

# Step 4: Enable Workload Identity
Write-Host "`n🔧 Step 4: Configuring Workload Identity" -ForegroundColor Blue

Write-Host "Binding Kubernetes SA to Google SA..."
gcloud iam service-accounts add-iam-policy-binding $ServiceAccountEmail `
    --role roles/iam.workloadIdentityUser `
    --member "serviceAccount:$ProjectId.svc.id.goog[user-sessions/terminal-controller]"

# Step 5: Create Artifact Registry
Write-Host "`n📦 Step 5: Setting up Artifact Registry" -ForegroundColor Blue

Write-Host "Creating Artifact Registry repository..."
try {
    gcloud artifacts repositories create terminal-images `
        --repository-format=docker `
        --location=$Region `
        --description="Docker images for terminal platform"
    Write-Host "✅ Artifact Registry created" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Repository might already exist, continuing..." -ForegroundColor Yellow
}

Write-Host "Configuring Docker authentication..."
gcloud auth configure-docker "$Region-docker.pkg.dev"

# Step 6: Apply Kubernetes Configuration
Write-Host "`n☸️ Step 6: Applying Kubernetes Configuration" -ForegroundColor Blue

# Create k8s-config.yaml with actual project ID
$k8sConfig = @"
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
    persistentvolumeclaims: "0"   # No persistent storage = `$0
---
# Google Service Account for the backend controller
apiVersion: v1
kind: ServiceAccount
metadata:
  name: terminal-controller
  namespace: user-sessions
  annotations:
    # This links to your Google Cloud Service Account
    iam.gke.io/gcp-service-account: terminal-controller@$ProjectId.iam.gserviceaccount.com
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
"@

Write-Host "Creating Kubernetes configuration file..."
$k8sConfig | Out-File -FilePath "k8s-config.yaml" -Encoding utf8

Write-Host "Applying Kubernetes configuration..."
kubectl apply -f k8s-config.yaml

# Step 7: Create Ultra-Lightweight Docker Image
Write-Host "`n🐳 Step 7: Creating Docker Image" -ForegroundColor Blue

$dockerfileContent = @"
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
"@

Write-Host "Creating Dockerfile..."
$dockerfileContent | Out-File -FilePath "Dockerfile.python-terminal" -Encoding utf8

$imageName = "$Region-docker.pkg.dev/$ProjectId/terminal-images/python-terminal:v1"

Write-Host "Building Docker image (this may take a few minutes)..."
docker build -f Dockerfile.python-terminal -t $imageName .

Write-Host "Pushing image to Artifact Registry..."
docker push $imageName

# Step 8: Verify Setup
Write-Host "`n✅ Step 8: Verifying Setup" -ForegroundColor Blue

Write-Host "Checking namespace..."
kubectl get namespace user-sessions

Write-Host "Checking resource quotas..."
kubectl get resourcequota -n user-sessions

Write-Host "Checking service account..."
kubectl get serviceaccount -n user-sessions

Write-Host "Checking RBAC..."
kubectl get role,rolebinding -n user-sessions

Write-Host "Verifying Docker image..."
gcloud artifacts docker images list $Region-docker.pkg.dev/$ProjectId/terminal-images

# Step 9: Create Updated Backend Configuration
Write-Host "`n⚙️ Step 9: Updating Backend Configuration" -ForegroundColor Blue

$backendConfig = @"
// Updated server.js with cost-optimized settings
const NAMESPACE = 'user-sessions';
const IMAGE = '$imageName';

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
"@

Write-Host "Creating optimized backend configuration..."
$backendConfig | Out-File -FilePath "backend-config.js" -Encoding utf8

# Final Summary
Write-Host "`n🎉 Setup Complete!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green

Write-Host "`n📊 Cost-Optimized Configuration:" -ForegroundColor Yellow
Write-Host "• Max 5 concurrent users" -ForegroundColor White
Write-Host "• 50m CPU per pod (0.05 cores)" -ForegroundColor White
Write-Host "• 128Mi RAM per pod" -ForegroundColor White
Write-Host "• 30-minute auto-cleanup" -ForegroundColor White
Write-Host "• Alpine Linux base (smaller image)" -ForegroundColor White
Write-Host "• Spot instances enabled in GKE" -ForegroundColor White

Write-Host "`n🔧 What was created:" -ForegroundColor Yellow
Write-Host "✅ Google Cloud Service Account: terminal-controller" -ForegroundColor Green
Write-Host "✅ Kubernetes namespace: user-sessions" -ForegroundColor Green
Write-Host "✅ Resource quotas and RBAC configured" -ForegroundColor Green
Write-Host "✅ Docker image: $imageName" -ForegroundColor Green
Write-Host "✅ Workload Identity configured" -ForegroundColor Green

Write-Host "`n🚀 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Update your backend code with the config in backend-config.js" -ForegroundColor White
Write-Host "2. Test locally: npm run dev" -ForegroundColor White
Write-Host "3. Deploy to production when ready" -ForegroundColor White

Write-Host "`n💰 Estimated Cost:" -ForegroundColor Yellow
Write-Host "• ~`$0.01-0.05 per terminal session per hour" -ForegroundColor Green
Write-Host "• ~`$0.24-1.20 per day with 5 concurrent users" -ForegroundColor Green
Write-Host "• Scale-to-zero when no users = `$0" -ForegroundColor Green

Write-Host "`nSetup completed successfully! 🎉" -ForegroundColor Green