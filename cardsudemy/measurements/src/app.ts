import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler } from './common';
import { currentUser } from './common';
import { NotFoundError } from './common';
import { createMeasurementRouter } from './routes/new';
import { showMeasurementRouter } from './routes/show';
import { indexMeasurementRouter } from './routes/index';

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

app.use(createMeasurementRouter);
app.use(showMeasurementRouter);
app.use(indexMeasurementRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
