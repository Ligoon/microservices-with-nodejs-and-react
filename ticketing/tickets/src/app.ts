// configures the express application but does not start up (start up in index.ts)
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@ligoon/common';

import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true); // make sure Express is aware that it's behind a proxy of Ingress Nginx
app.use(json());
app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: process.env.NODE_ENV !== 'test' // user must use https connection, otherwise cookie will not be send
  })
);

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

// use 'express-async-errors' so we do not need to use "next funciton" when using async
app.all('*', async (req, res) => {
  throw new NotFoundError(); // 404 error
});

app.use(errorHandler);

export { app };