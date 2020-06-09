import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@ggMeasurements/common';
import { createMeasurementRouter } from './routes/new';
import { showMeasurementRouter } from './routes/show';
import { indexMeasurementRouter } from './routes/index';
import { updateMeasurementRouter } from './routes/update';

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
app.use(updateMeasurementRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
