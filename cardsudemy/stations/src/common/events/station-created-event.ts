import { Subjects } from './subjects';

export interface StationCreatedEvent {
  subject: Subjects.StationCreated;
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
