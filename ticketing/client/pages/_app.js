import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return(
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async appContext => {
  // getInitialProps for AppComponent
  const client = buildClient(appContext.ctx); // context === { Component, ctx: { req, res }}
  const { data } = await client.get('/api/users/currentuser');
  
  let pageProps = {};
  if(appContext.Component.getInitialProps){
    // execute getInitialProps for LandingPage
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  console.log(pageProps);
  // this will be the props ({ Component, pageProps }) of AppComponent above
  return {
    pageProps,
    ...data
  };
};

export default AppComponent;