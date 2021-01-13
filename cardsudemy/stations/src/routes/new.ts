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
    body('stn').not().isEmpty().withMessage('stn is required'),
    body('lon')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      stn,
      lon,
      lat,
      alt,
      name,
     } = req.body;

    const station = Station.build({
      stn,
      lon,
      lat,
      alt,
      name,
    });
    await station.save();

    await new StationCreatedPublisher(natsWrapper.client).publish({
      stn: station.stn,
      lon: station.lon,
      lat: station.lat,
      alt: station.alt,
      name: station.name,
      amountofmeasurements: 0,
    });
    console.log('Station creation event published');

    res.status(201).send(station);
  }
);

export { router as createstationRouter };
