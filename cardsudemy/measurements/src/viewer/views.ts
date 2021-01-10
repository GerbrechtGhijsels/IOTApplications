export interface MeasurementsRequired {
    stn: string;
    yyyymmdd: string;
}


export interface MeasurementFullView extends MeasurementsRequired{
    ddvec: string;
    fhvec: string;
    fg: string;
    fhx: string;
    fhxh: string;
    fhn: string;
    fhnh: string;
    fxx: string;
    fxxh: string;
    tg: string;
    tn: string;
    tnh: string;
    tx: string;
    txh: string;
    t10n: string;
    t10nh: string;
    sq: string;
    sp: string;
    q: string;
    dr: string;
    rh: string;
    rhx: string;
    rhxh: string;
    pg: string;
    px: string;
    pxh: string;
    pn: string;
    pnh: string;
    vvn: string;
    vvnh: string;
    vvx: string;
    vvxh: string;
    ng: string;
    ug: string;
    ux: string;
    uxh: string;
    un: string;
    unh: string;
    ev24: string;
}

export interface MeasurementDetailView extends MeasurementsRequired{
    ddvec: string;
    fhvec: string;
    tg: string;
    rh: string;
    pg: string;
    ng: string;
    ug: string;
}