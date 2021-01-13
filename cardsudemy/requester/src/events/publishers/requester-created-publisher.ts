import { Publisher, Subjects, RequesterCreatedEvent } from '../../common';

export class RequesterCreatedPublisher extends Publisher<RequesterCreatedEvent> {
    subject: Subjects.RequesterCreated = Subjects.RequesterCreated;
}
