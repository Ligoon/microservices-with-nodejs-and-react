## Client

![](../img/server_side_rendering.png)
We will be writing the Next app using JavaScript, not Typescript. It would be normally beneficial to use TS, but this app in particular would need a lot of extra TS stuff written out for little benefit.

![](../img/server_side_rendering2.png)

`getInitialProps` is the only location where we can fetch data during the server side rendering process. However, since we are using k8s, if we directly fetch data in `getInitialProps`, such as calling a `GET request`, it will cause an error.

**What we want**
![](../img/ssr_fetch_data.png)

**What actually happend**

![](../img/ssr_fetch_data2.png)
The request went to the localhost inside of the Client container while there is nothing running on port 80 inside that container.

Thus, we need to make a request to Ingress-Nginx from Client so that Ingress will access to the port 80 in auth container.

**Solution**
![](../img/ssr_fetch_data_sol.png)
