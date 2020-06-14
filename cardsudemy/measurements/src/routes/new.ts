import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import nats from 'node-nats-streaming';
import { requireAuth  } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
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
    const { 
      id,
      stn,
      YYYYMMDD,
      DDVEC,
      FHVEC,
      FG,
      FHX,
      FHXH,
      FHN,
      FHNH,
      FXX,
      FXXH,
      TG,
      TN,
      TNH,
      TX,
      TXH,
      T10N,
      T10NH,
      SQ,
      SP,
      Q,
      DR,
      RH,
      RHX,
      RHXH,
      PG,
      PX,
      PXH,
      PN,
      PNH,
      VVN,
      VVNH,
      VVX,
      VVXH,
      NG,
      UG,
      UX,
      UXH,
      UN,
      UNH,
      EV24,
     } = req.body;

    const measurement = Measurement.build({
      id,
      stn,
      YYYYMMDD,
      DDVEC,
      FHVEC,
      FG,
      FHX,
      FHXH,
      FHN,
      FHNH,
      FXX,
      FXXH,
      TG,
      TN,
      TNH,
      TX,
      TXH,
      T10N,
      T10NH,
      SQ,
      SP,
      Q,
      DR,
      RH,
      RHX,
      RHXH,
      PG,
      PX,
      PXH,
      PN,
      PNH,
      VVN,
      VVNH,
      VVX,
      VVXH,
      NG,
      UG,
      UX,
      UXH,
      UN,
      UNH,
      EV24,
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
