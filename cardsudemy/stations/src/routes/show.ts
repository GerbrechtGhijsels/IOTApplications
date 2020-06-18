import express, { Request, Response } from 'express';
import { NotFoundError } from '../common';
import { Station } from '../models/station';

const router = express.Router();

router.get('/api/stations/', async (req: Request, res: Response) => {
  console.dir(req.query);
  
  var limit = 100;
  if(req.query.limit)
  {
    limit = +req.query.limit;
  }

  //limit
  //offset
  //.sort(req.query.sort).limit(limit)
  const station = await Station.find(req.query);

  if (!station) {
    throw new NotFoundError();
  }

  res.send(station);
});

export { router as showstationRouter };
