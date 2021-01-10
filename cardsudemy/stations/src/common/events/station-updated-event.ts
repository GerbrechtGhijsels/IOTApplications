import { Subjects } from './subjects';

export interface StationUpdatedEvent {
  subject: Subjects.StationUpdated;
  data: {
    stn: number;
    lon: number;
    lat: number;
    alt: number;
    name: string;
    amountofmeasurements: number;
  };
}
