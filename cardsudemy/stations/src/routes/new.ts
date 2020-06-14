import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import nats from 'node-nats-streaming';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { station } from '../models/station';

const router = express.Router();

const stan = nats.connect('measuring', 'stations', {
  url: 'http://nats-srv:4222',
});

router.post(
  '/api/stations',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
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

    const station = station.build({
      STN,
      LON,
      LAT,
      ALT,
      NAME,
    });
    await station.save();

    const event = {
      type: 'station:created',
      data: station,
    };
    stan.publish('station:created', JSON.stringify(event), () => {
      console.log('station creation event published');
    });

    res.status(201).send(station);
  }
);

export { router as createstationRouter };
