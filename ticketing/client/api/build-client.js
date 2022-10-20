import axios from "axios";

export default ({req}) => {
  if(typeof window === 'undefined'){
    // we are on the server
    // request should be made to http://ingress-nginx-controller.ingress-nginx...
    // create a preconfigured version of axios
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  }
  else{
    // we must be on the browser
    // requests can be made with a base url of ''
    return axios.create({
      baseURL: '/'
    });
  }
};