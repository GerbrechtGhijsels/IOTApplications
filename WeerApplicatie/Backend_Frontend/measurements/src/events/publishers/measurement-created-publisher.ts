import { Publisher, Subjects, MeasurementCreatedEvent } from '../../common';

export class MeasurementCreatedPublisher extends Publisher<MeasurementCreatedEvent> {
  subject: Subjects.MeasurementCreated = Subjects.MeasurementCreated;
}
