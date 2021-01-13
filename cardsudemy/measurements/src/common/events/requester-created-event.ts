import { Subjects } from './subjects';

export interface RequesterCreatedEvent {
    subject: Subjects.RequesterCreated;
    data: {
        stn: number;
        lon: number;
        lat: number;
        name: string;
        temp: string;
        humidity: string;
        wind: string;
    };
}
