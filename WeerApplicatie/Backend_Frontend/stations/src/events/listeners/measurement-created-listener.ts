import { Listener, MeasurementCreatedEvent, Subjects } from '../../common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Station } from '../../models/station';
import { StationUpdatedPublisher } from '../publishers/station-updated-publisher';

export class MeasurementCreatedListener extends Listener<MeasurementCreatedEvent> {
  subject: Subjects.MeasurementCreated = Subjects.MeasurementCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: MeasurementCreatedEvent['data'], msg: Message) {
    // Find the measurement
    const station = await Station.findOne([['stn', data.stn]]);

    if (!station) {
      throw new Error('Station not found');
    }
    station.amountofmeasurements += 1;
    station.set({ amountofmeasurements: station.amountofmeasurements });

    // Save the ticket
    await station.save();
    await new StationUpdatedPublisher(this.client).publish({
      stn: station.stn,
      lon: station.lon,
      lat: station.lat,
      alt: station.alt,
      name: station.name,
      amountofmeasurements: station.amountofmeasurements,
    });

    // ack the message
    msg.ack();
  }
}