import express, { Request, Response } from 'express';
import { Measurement } from '../models/measurement';

const router = express.Router();

router.get('/api/measurements', async (req: Request, res: Response) => {
  const measurements = await Measurement.find({});

  res.send(measurements);
});

export { router as indexMeasurementRouter };
