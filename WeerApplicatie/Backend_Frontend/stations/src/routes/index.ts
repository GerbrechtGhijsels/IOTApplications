import express, { Request, Response } from 'express';
import { Station } from '../models/station';

const router = express.Router();

router.get('/api/stations', async (req: Request, res: Response) => {
  var limit = 100;

  const station = await Station.find(req.query).limit(limit);


  res.send(station);
});

export { router as indexstationRouter };
