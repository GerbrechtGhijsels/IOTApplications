import express, { Request, Response } from 'express';
import { Measurement, MeasurementDoc } from '../models/measurement';
import { MeasurementsCollection } from '../common';

import { clientCode, RequiredView} from '../viewer/creator'

const router = express.Router();

router.get('/api/measurements/all/:type', async (req: Request, res: Response) => {
  var limit = 100;
  const measurements = await Measurement.find({}).sort([['yyyymmdd', -1]]).limit(limit);

  const collection = new MeasurementsCollection(measurements);
  const iterator = collection.getIterator();

  var list = [];
  while (iterator.valid()) {
    const measurement =  clientCode(req.params.type,iterator.next())
    list.push(measurement);
  }


  res.send(list);
});

router.get('/api/measurements/latest/', async (req: Request, res: Response) => {
  const measurement = await Measurement.find({}).sort([['yyyymmdd', -1]]).limit(100);

  const collection = new MeasurementsCollection(measurement);
  const iterator = collection.getIterator();


  while (iterator.valid()) {
    console.log(iterator.next());
  }

  res.send(measurement);
});

export { router as indexMeasurementRouter };
