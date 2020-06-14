import express, { Request, Response } from 'express';
import { station } from '../models/station';

const router = express.Router();

router.get('/api/stations', async (req: Request, res: Response) => {
  const stations = await station.find({});

  res.send(stations);
});

export { router as indexstationRouter };
