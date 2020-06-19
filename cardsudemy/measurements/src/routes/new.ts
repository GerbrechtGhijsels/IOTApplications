import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import nats from 'node-nats-streaming';
import { requireAuth  } from '../common';
import { validateRequest } from '../common';
import { Measurement } from '../models/measurement';

const router = express.Router();

const stan = nats.connect('measuring', 'measurements', {
  url: 'http://nats-srv:4222',
});

router.post(
  '/api/measurements',
  requireAuth,
  [
    body('id').not().isEmpty().withMessage('id is required'),
    body('stn')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { 
      id,
      stn,
      yyyymmdd,
      ddvec,
      fhvec,
      fg,
      fhx,
      fhxh,
      fhn,
      fhnh,
      fxx,
      fxxh,
      tg,
      tn,
      tnh,
      tx,
      txh,
      t10n,
      t10nh,
      sq,
      sp,
      q,
      dr,
      rh,
      rhx,
      rhxh,
      pg,
      px,
      pxh,
      pn,
      pnh,
      vvn,
      vvnh,
      vvx,
      vvxh,
      ng,
      ug,
      ux,
      uxh,
      un,
      unh,
      ev24,
     } = req.body;

    const measurement = Measurement.build({
      id,
      stn,
      yyyymmdd,
      ddvec,
      fhvec,
      fg,
      fhx,
      fhxh,
      fhn,
      fhnh,
      fxx,
      fxxh,
      tg,
      tn,
      tnh,
      tx,
      txh,
      t10n,
      t10nh,
      sq,
      sp,
      q,
      dr,
      rh,
      rhx,
      rhxh,
      pg,
      px,
      pxh,
      pn,
      pnh,
      vvn,
      vvnh,
      vvx,
      vvxh,
      ng,
      ug,
      ux,
      uxh,
      un,
      unh,
      ev24,
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
