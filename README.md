# microservices-with-nodejs-and-react

![](https://img.shields.io/badge/Skaffold-v1.38.0-blue) ![](https://img.shields.io/badge/Docker-20.10.14-blue) ![](https://img.shields.io/badge/Kubernetes-v1.24.0-blue) ![](https://img.shields.io/badge/Ingress--Nginx-v1.2.0-blue) ![](https://img.shields.io/badge/platfrom-windows%20%7C%20WSL2-orange) ![](https://img.shields.io/badge/Node.js-v16.15.0-brightgreen)

This repository contains the source code and the class notes from the course "microservices with nodejs and react" taught by Stephen Grider.

## Installation
To run this repository, you need to install **Docker**, **Kubernetes**, **Ingress-Nginx** and **Skaffold**. Since this repository is built on Windows / WSL2, the following tutorial will only contains the steps for Windows users.

**note**: make sure you also set up the environment for ReactJs.
### Docker Desktop on Windows
Follow the steps from the [docker official website](https://docs.docker.com/desktop/windows/install/). Be sure to install WSL2 before installing docker.
**Note**: you need to enable the integration with your WSL2. Open Docker Desktop > Settings > Resources > WSL integration.
### Kubernetes (k8s)
For Windows / WSL2 users, you just need to enable kubernetes in your Docker Desktop. Open Docker Desktop > Settings > Kubernetes > Enable Kubernetes. For Linux User, you need to install minikube.
### Ingress-Nginx
Install by using kubernetes. Runs `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml`

See：[NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop)
### Skaffold
If you are using WSL2, remember install skaffold for **linux**. Follow the steps in this page: [installing skaffold](https://skaffold.dev/docs/install/)

## How to run
If you installed all the requirements mentioned above, you can just run the following command in the `blog` folder or the `ticketing` folder.
```
cd ./microservices-with-nodejs-and-react/ticketing
skaffold dev
```