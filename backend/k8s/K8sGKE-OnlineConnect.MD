# 🚀 Replication Guide for New Developers (Google GKE)

This document provides step-by-step instructions for setting up your local machine to run this application against **Google Kubernetes Engine (GKE)**.

---

## 📋 Prerequisites

Before you begin, ensure you have the following tools installed:

- **Google Cloud SDK (gcloud CLI)**  
  Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) and ensure the `gcloud` command is available in your terminal.

- **Docker**  
  Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your operating system.

- **kubectl**  
  Install `kubectl`, the Kubernetes command-line tool. You can install it via `gcloud components install kubectl` or follow the [official documentation](https://kubernetes.io/docs/tasks/tools/).

---

## 🔐 Step 1: Authenticate with Google Cloud

Log in to your Google Cloud account:

```bash
gcloud auth login
```

Select your project:

```bash
gcloud config set project blue-pigeon-460611
```

---

## 🔗 Step 2: Connect kubectl to GKE

This command fetches credentials for your GKE cluster and updates your local kubeconfig:

```bash
gcloud container clusters get-credentials <your-cluster-name> --zone <your-cluster-zone>
```

**🔹 Important:** Replace `<your-cluster-name>` and `<your-cluster-zone>` with values provided by your team.

After this command, `kubectl` will point to your remote GKE cluster.

**Test the connection:**

```bash
kubectl get nodes
```

You should see your GKE cluster nodes listed.

---

## 📁 Step 3: Create the Application Namespace

Our backend is configured to use the `user-sessions` namespace:

```bash
kubectl create namespace user-sessions
```

---

## 👤 Step 4: Create the Application's Service Account

```bash
kubectl create serviceaccount terminal-controller --namespace user-sessions
```

---

## 🛡️ Step 5: Apply RBAC Rules

Create a file named `local-dev-rbac.yaml` with the following content:

```yaml
# local-dev-rbac.yaml

apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: terminal-pod-manager
  namespace: user-sessions
rules:
- apiGroups: [""]
  resources: ["pods", "pods/log"]
  verbs: ["create", "get", "list", "watch", "delete"]
- apiGroups: [""]
  resources: ["pods/exec"]
  verbs: ["create", "get"]

---

apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: terminal-controller-binding
  namespace: user-sessions
subjects:
- kind: ServiceAccount
  name: terminal-controller
  namespace: user-sessions
roleRef:
  kind: Role
  name: terminal-pod-manager
  apiGroup: rbac.authorization.k8s.io
```

Apply it to GKE:

```bash
kubectl apply -f local-dev-rbac.yaml
```

---

## 🐳 Step 6: Configure Docker Credential Helper

This step allows Docker (and Kubernetes) to use your Google credentials when pulling images from Artifact Registry:

```bash
gcloud auth configure-docker us-west3-docker.pkg.dev
```

---

## 🔑 Step 7: Create Kubernetes Secret for Image Pull

If your application fails to pull images from Google Artifact Registry, create a Kubernetes secret with an access token.

**Get a token:**

```bash
gcloud auth print-access-token
```

**Create the secret in your namespace** (replace `[YOUR_ACCESS_TOKEN]`):

```bash
kubectl create secret docker-registry gcr-cred \
  --namespace user-sessions \
  --docker-server=us-west3-docker.pkg.dev \
  --docker-username=oauth2accesstoken \
  --docker-password=[YOUR_ACCESS_TOKEN]
```

**Patch the Service Account to use the secret:**

```bash
kubectl patch serviceaccount terminal-controller --namespace user-sessions -p "{\"imagePullSecrets\": [{\"name\": \"gcr-cred\"}]}"
```

---

## 🎯 Step 8: Run the Application

Your GKE cluster is now configured! Start your application's backend/frontend:

```bash
# Example command (replace with your actual project start command)
npm start
```

Your backend should now connect to the GKE cluster and manage pods in the `user-sessions` namespace without authentication or permission errors.

---

## ✅ Verification

To verify everything is working correctly:

1. Check that your namespace exists:
   ```bash
   kubectl get namespaces | grep user-sessions
   ```

2. Verify the service account was created:
   ```bash
   kubectl get serviceaccounts --namespace user-sessions
   ```

3. Confirm RBAC rules are applied:
   ```bash
   kubectl get roles,rolebindings --namespace user-sessions
   ```

---

## 🆘 Troubleshooting

**Common Issues:**

- **Permission Denied Errors:** Ensure you've completed Step 5 (RBAC rules) and Step 7 (Image Pull Secret)
- **Image Pull Errors:** Verify Step 6 (Docker credential helper) and Step 7 (Kubernetes secret)
- **Connection Issues:** Double-check that your `kubectl` context is pointing to the correct GKE cluster

**Need Help?** Contact your team lead or refer to the [Google Cloud Kubernetes Engine documentation](https://cloud.google.com/kubernetes-engine/docs).

---

*Happy coding! 🎉*