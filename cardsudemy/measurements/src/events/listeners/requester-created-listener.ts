import { Listener, RequesterCreatedEvent, Subjects } from '../../common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Measurement } from '../../models/measurement';
import { MeasurementCreatedPublisher } from '../publishers/measurement-created-publisher';

export class RequesterCreatedListener extends Listener<RequesterCreatedEvent> {
    subject: Subjects.RequesterCreated = Subjects.RequesterCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: RequesterCreatedEvent['data'], msg: Message) {
        console.log('recieved request');
        const datetime = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '');
        // Find the measurement
        const stn = String(data.stn);
        const yyyymmdd = datetime
        const tg  = data.temp;
        const ug = data.humidity;
        const fg = data.wind;

        const measurement = new Measurement();
        measurement.stn = stn;
        measurement.yyyymmdd = yyyymmdd;
        measurement.tg = tg;
        measurement.ug = ug;
        measurement.fg = fg;


        await measurement.save();
        await new MeasurementCreatedPublisher(this.client).publish({
            ddvec: "",
            dr: "",
            ev24: "",
            fhn: "",
            fhnh: "",
            fhvec: "",
            fhx: "",
            fhxh: "",
            fxx: "",
            fxxh: "",
            ng: "",
            pg: "",
            pn: "",
            pnh: "",
            px: "",
            pxh: "",
            q: "",
            rh: "",
            rhx: "",
            rhxh: "",
            sp: "",
            sq: "",
            t10n: "",
            t10nh: "",
            tn: "",
            tnh: "",
            tx: "",
            txh: "",
            un: "",
            unh: "",
            ux: "",
            uxh: "",
            vvn: "",
            vvnh: "",
            vvx: "",
            vvxh: "",
            stn: measurement.stn,
            yyyymmdd: measurement.yyyymmdd,
            tg: measurement.tg,
            ug: measurement.ug,
            fg: measurement.fg
        });

        // ack the message
        msg.ack();
    }
}