import express, { Request, Response } from 'express';
import { Station } from '../models/station';

const router = express.Router();

router.get('/api/stations', async (req: Request, res: Response) => {
  const stations = await Station.find({});

  res.send(stations);
});

export { router as indexstationRouter };
