import express, { Request, Response } from 'express';
import { NotFoundError } from '../common';
import { Measurement } from '../models/measurement';

const router = express.Router();

router.get('/api/measurements/:id', async (req: Request, res: Response) => {
  const measurement = await Measurement.findOne({measurementid: req.params.id});

  if (!measurement) {
    throw new NotFoundError();
  }

  res.send(measurement);
});


export { router as showMeasurementRouter };
