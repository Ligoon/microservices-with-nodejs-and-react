import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true); // make sure Express is aware that it's behind a proxy of Ingress Nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: true // user must use https connection
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
// use 'express-async-errors' so we do not need to use "next funciton" when using async
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connect to MongoDB');
  }
  catch(err){
    console.log(err);
  }
  app.listen(3000, () => {
    console.log('listening on port 3000!!!!');
  });
};

start();
