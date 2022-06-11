Tools and frameworks that this project used: React, Express, NodeJs, Docker and Kubernetes(k8s).

### How to run: 
1. build docker image: `docker build -t <docker id>/<component name> .`
2. push the image to docker hub: `docker push <docker id>/<component name>`
3. process the config file, in the foler `infra/k8s`, run: `kubectl apply -f .`

**Note**: If you make an update of your code, you need to rerun step 1 & 2, and run the command `kubectl rollout restart deployment <deployment name>` 