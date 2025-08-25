// Updated server.js with cost-optimized settings
const NAMESPACE = 'user-sessions';
const IMAGE = 'us-west3-docker.pkg.dev/blue-pigeon-460611/terminal-images/python-terminal:v1';

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
