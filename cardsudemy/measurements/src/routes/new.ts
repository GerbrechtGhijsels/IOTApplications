import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import nats from 'node-nats-streaming';
import { requireAuth  } from '../common';
import { requireToken  } from '../common';
import { validateRequest } from '../common';
import { Measurement } from '../models/measurement';
import { natsWrapper } from '../nats-wrapper';
import {MeasurementCreatedPublisher} from "../events/publishers/measurement-created-publisher";

const router = express.Router();

const stan = nats.connect('measuring', 'measurements', {
  url: 'http://nats-srv:4222',
});

router.post(
  '/api/measurements',
  requireAuth,
  [
    body('stn')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { 
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

    await new MeasurementCreatedPublisher(natsWrapper.client).publish(measurement);
    console.log('Measurement creation event published');

    res.status(201).send(measurement);
  }
);

router.post(
    '/api/measurements/token',
    requireToken,
    [
      body('stn')
          .isFloat({ gt: 0 })
          .withMessage('Price must be greater than 0'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const {
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

      await new MeasurementCreatedPublisher(natsWrapper.client).publish(measurement);
      console.log('Measurement creation event published');

      res.status(201).send(measurement);
    }
);

export { router as createMeasurementRouter };
