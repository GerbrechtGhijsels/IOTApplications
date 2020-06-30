import express, { Request, Response } from 'express';
import { NotFoundError } from '../common';
import { Station } from '../models/station';


const router = express.Router();


router.get('/api/stations/:stn', async (req: Request, res: Response) => {
  const station = await Station.findOne({
    stn: Number(req.params.stn)
  });
  if (!station) {
    throw new NotFoundError();
  }

  res.send(station);
});


export { router as showstationRouter };
