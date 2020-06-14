import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler} from './middlewares/error-handler';
import { currentUser } from './middlewares/current-user';
import { NotFoundError } from './errors/not-found-error';
import { createstationRouter } from './routes/new';
import { showstationRouter } from './routes/show';
import { indexstationRouter } from './routes/index';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(createstationRouter);
app.use(showstationRouter);
app.use(indexstationRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
