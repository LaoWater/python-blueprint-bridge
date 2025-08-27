Replication Guide for New Developers Here are the step-by-step
instructions for a developer to configure their local machine to run
this application.

## Prerequisites

-   **Docker Desktop**: Install Docker Desktop for your OS and ensure it
    is running.
-   **Enable Kubernetes**: In Docker Desktop settings, go to the
    "Kubernetes" section and check the box to "Enable Kubernetes". Wait
    for it to start (the icon in the bottom-left should turn green).
-   **kubectl**: Install kubectl, the Kubernetes command-line tool.
    Docker Desktop has an option to install it for you, or you can
    follow the official Kubernetes documentation.

------------------------------------------------------------------------

## Step 1: Configure kubectl to Target Docker Desktop

This ensures your command line and your application can find the local
cluster.

1.  Open your terminal (Command Prompt, PowerShell, or Terminal).
2.  Verify that kubectl sees the Docker Desktop cluster context:

``` bash
kubectl config get-contexts
```

You should see `docker-desktop` in the list.

3.  Set `docker-desktop` as your active context:

``` bash
kubectl config use-context docker-desktop
```

4.  Test the connection by listing the nodes. This command should
    execute without error:

``` bash
kubectl get nodes
```

You should see one node named `docker-desktop`.

------------------------------------------------------------------------

## Step 2: Create the Application's Namespace

Applications should run in their own dedicated namespace. Our backend is
configured to use `user-sessions`.

``` bash
kubectl create namespace user-sessions
```

------------------------------------------------------------------------

## Step 3: Create the Application's Service Account

The application's backend needs an identity within the cluster to
perform actions. This is its Service Account.

``` bash
kubectl create serviceaccount terminal-controller --namespace user-sessions
```

------------------------------------------------------------------------

## Step 4: Grant Permissions to the Service Account (RBAC)

The Service Account needs permission to create, delete, and manage pods.
We will apply a Role-Based Access Control (RBAC) configuration.

1.  Create a new file in your project directory named
    **local-dev-rbac.yaml**.
2.  Copy and paste the following content into that file:

``` yaml
# local-dev-rbac.yaml
# This file defines the permissions for our backend service account.

# 1. The Role: Defines a set of permissions (verbs) on specific resources.
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: terminal-pod-manager
  namespace: user-sessions
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods", "pods/log"]
  verbs: ["create", "get", "list", "watch", "delete"]
- apiGroups: [""]
  resources: ["pods/exec"]
  verbs: ["create", "get"]

---

# 2. The RoleBinding: Binds the Role (permissions) to a specific subject (the Service Account).
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: terminal-controller-binding
  namespace: user-sessions
subjects:
- kind: ServiceAccount
  name: terminal-controller # The account we created in Step 3
  namespace: user-sessions
roleRef:
  kind: Role
  name: terminal-pod-manager # The Role we defined above
  apiGroup: rbac.authorization.k8s.io
```

3.  Apply this configuration to your cluster using kubectl. Run this
    command from the same directory where you saved the file:

``` bash
kubectl apply -f local-dev-rbac.yaml
```

You will see a confirmation that the role and rolebinding have been
created.

------------------------------------------------------------------------

## Step 5: Run the Application

Your local Kubernetes environment is now fully configured. You can now
start the application's backend and frontend services as per the
project's instructions.

``` bash
# Example command, replace with your project's actual start command
npm start
```

The backend should now successfully connect to the Kubernetes API and
create pods in the `user-sessions` namespace without any 404 or 403
errors.
