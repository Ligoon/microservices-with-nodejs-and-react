import buildClient from "../api/build-client";

const Landing = ({ currentUser }) => {
  console.log(currentUser);
  return currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>;
};

Landing.getInitialProps = async (context) => {
  console.log('LANDING PAGE!');
  const response = await buildClient(context).get('/api/users/currentuser');
  return response.data;
};

export default Landing;