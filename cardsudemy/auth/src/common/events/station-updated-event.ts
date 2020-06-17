import { Subjects } from './subjects';

export interface StationUpdatedEvent {
  subject: Subjects.StationUpdated;
  data: {
    STN: number;
    LON: number;
    LAT: number;
    ALT: number;
    NAME: string;
  };
}
