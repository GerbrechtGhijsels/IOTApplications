import express, { Request, Response } from 'express';
import { Station } from '../models/station';

const router = express.Router();

router.get('/api/stations/all/', async (req: Request, res: Response) => {
  console.dir(req.query);


  var query = {};
  var limit = 100;



  console.dir(query);

  const station = await Station.find(query).limit(limit);


  res.send(station);
});

export { router as indexstationRouter };
