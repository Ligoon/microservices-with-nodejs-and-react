# Ticketing Website

![](https://img.shields.io/badge/Skaffold-v1.38.0-blue) ![](https://img.shields.io/badge/Docker-20.10.14-blue) ![](https://img.shields.io/badge/Kubernetes-v1.24.0-blue) ![](https://img.shields.io/badge/Ingress--Nginx-v1.2.0-blue) ![](https://img.shields.io/badge/platfrom-windows%20%7C%20WSL2-orange)

### How to Run
You need to install all the environments and tools first, see [Environment Setup](). Under the folder `microservices-with-nodejs-and-react/testing`, run: 
```
skaffold dev
```

### Develope
Since the docker image was built and pushed using my docker id, you need to change the docker id `9heich` into your own docker id in all the yaml files. Then follow these steps:
- Make an update to your code
- build the image: `docker build -t <your docker ID>/<image name> .`
- push the image to docker hub: `docker push <your docker ID>/<image name>`