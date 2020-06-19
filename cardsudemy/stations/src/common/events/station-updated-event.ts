import { Subjects } from './subjects';

export interface StationUpdatedEvent {
  subject: Subjects.StationUpdated;
  data: {
    id: string;
    stn: number;
    lon: number;
    lat: number;
    alt: number;
    name: string;
    amountofmeasurements: number;
  };
}
