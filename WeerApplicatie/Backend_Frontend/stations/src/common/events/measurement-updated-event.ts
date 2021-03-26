import { Subjects } from './subjects';

export interface MeasurementUpdatedEvent {
  subject: Subjects.MeasurementUpdated;
  data: {
    stn: number;
    yyyymmdd: number;
    ddvec: number;
    fhvec: number;
    fg: number;
    fhx: number;
    fhxh: number;
    fhn: number;
    fhnh: number;
    fxx: number;
    fxxh: number;
    tg: number;
    tn: number;
    tnh: number;
    tx: number;
    txh: number;
    t10n: number;
    t10nh: number;
    sq: number;
    sp: number;
    q: number;
    dr: number;
    rh: number;
    rhx: number;
    rhxh: number;
    pg: number;
    px: number;
    pxh: number;
    pn: number;
    pnh: number;
    vvn: number;
    vvnh: number;
    vvx: number;
    vvxh: number;
    ng: number;
    ug: number;
    ux: number;
    uxh: number;
    un: number;
    unh: number;
    ev24: number;
  };
}
