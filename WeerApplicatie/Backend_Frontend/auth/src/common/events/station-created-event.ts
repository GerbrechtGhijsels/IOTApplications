import { Subjects } from './subjects';

export interface StationCreatedEvent {
  subject: Subjects.StationCreated;
  data: {
    STN: number;
    LON: number;
    LAT: number;
    ALT: number;
    NAME: string;
  };
}
