import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import nats from 'node-nats-streaming';
import { requireAuth, validateRequest } from '@ggmeasurements/common';
import { Measurement } from '../models/measurement';

const router = express.Router();

const stan = nats.connect('measuring', 'measurements', {
  url: 'http://nats-srv:4222',
});

router.post(
  '/api/measurements',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const measurement = Measurement.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await measurement.save();

    const event = {
      type: 'measurement:created',
      data: measurement,
    };
    stan.publish('measurement:created', JSON.stringify(event), () => {
      console.log('Measurement creation event published');
    });

    res.status(201).send(measurement);
  }
);

export { router as createMeasurementRouter };
