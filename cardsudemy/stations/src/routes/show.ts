import express, { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Station } from '../models/station';

const router = express.Router();

router.get('/api/stations/:id', async (req: Request, res: Response) => {
  const station = await Station.findById(req.params.id);

  if (!station) {
    throw new NotFoundError();
  }

  res.send(station);
});

export { router as showstationRouter };
