import express, { Request, Response } from 'express';
import { NotFoundError } from '@ggmeasurements/common';
import { Measurement } from '../models/measurement';

const router = express.Router();

router.get('/api/measurements/:id', async (req: Request, res: Response) => {
  const measurement = await Measurement.findById(req.params.id);

  if (!measurement) {
    throw new NotFoundError();
  }

  res.send(measurement);
});

export { router as showMeasurementRouter };
