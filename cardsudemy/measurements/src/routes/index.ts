import express, { Request, Response } from 'express';
import { Measurement, MeasurementDoc } from '../models/measurement';
import { MeasurementsCollection } from '../common';

import { clientCode, RequiredView} from '../viewer/creator'

import { MongooseQueryParser } from 'mongoose-query-parser';

const router = express.Router();
const parser = new MongooseQueryParser();

router.get('/api/measurements/all/query', async (req: Request, res: Response) => {
  console.dir(req.query)
  var measurements = await Measurement.find(req.query).limit(100);

 
  res.send(measurements);
});

router.get('/api/measurements/all/test', async (req: Request, res: Response) => {
  console.dir(req.query);
  const parsedQuery = parser.parse(req.query);
  console.dir(parsedQuery);
  var measurements = await Measurement.find(parsedQuery.filter).sort(parsedQuery.sort || [['yyyymmdd', -1]]).limit(parsedQuery.limit || 100);


  res.send(measurements);
});

router.get('/api/measurements/overview/:type', async (req: Request, res: Response) => {
  var limit = 100;
  var measurements = await Measurement.find({}).sort([['yyyymmdd', -1]]).limit(limit);

  var collection = new MeasurementsCollection(measurements);
  var iterator = collection.getIterator();

  var list = [];
  while (iterator.valid()) {
    var measurement =  clientCode(req.params.type,iterator.next());
    list.push(measurement);
  }


  res.send(list);
});

router.get('/api/measurements/overview/latest/:type', async (req: Request, res: Response) => {
  var measurements = await Measurement.find({}).sort([['yyyymmdd', -1]]).limit(100);

  var collection = new MeasurementsCollection(measurements);
  var iterator = collection.getIterator();

  var list = [];
  while (iterator.valid()) {
    var measurement =  clientCode(req.params.type,iterator.next());
    list.push(measurement);
  }

  res.send(list);
});


export { router as indexMeasurementRouter };
