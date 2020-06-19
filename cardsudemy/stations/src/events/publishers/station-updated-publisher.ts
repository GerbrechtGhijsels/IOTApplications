import { Publisher, Subjects, StationUpdatedEvent } from '../../common/';

export class StationUpdatedPublisher extends Publisher<StationUpdatedEvent> {
  subject: Subjects.StationUpdated = Subjects.StationUpdated;
}