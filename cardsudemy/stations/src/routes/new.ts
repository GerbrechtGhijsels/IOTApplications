import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import nats from 'node-nats-streaming';
import { validateRequest, requireAuth } from '../common';
import { Station } from '../models/station';
import { StationCreatedPublisher } from '../events/publishers/station-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();


router.post(
  '/api/stations',
  requireAuth,
  [
    body('STN').not().isEmpty().withMessage('STN is required'),
    body('LON')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { 
      STN,
      LON,
      LAT,
      ALT,
      NAME,
     } = req.body;

    const station = Station.build({
      STN,
      LON,
      LAT,
      ALT,
      NAME,
    });
    await station.save();

    await new StationCreatedPublisher(natsWrapper.client).publish({
      STN: station.STN,
      LON: station.LON,
      LAT: station.LAT,
      ALT: station.ALT,
      NAME: station.NAME,
    });

    res.status(201).send(station);
  }
);

export { router as createstationRouter };
