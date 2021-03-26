import { Publisher, Subjects, StationCreatedEvent } from '../../common/';

export class StationCreatedPublisher extends Publisher<StationCreatedEvent> {
  subject: Subjects.StationCreated = Subjects.StationCreated;
}
