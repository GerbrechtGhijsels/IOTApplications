import {Injectable} from "@angular/core";

/**
 # YYYYMMDD = Datum (YYYY=jaar MM=maand DD=dag);
 # DDVEC    = Vectorgemiddelde windrichting in graden (360=noord, 90=oost, 180=zuid, 270=west, 0=windstil/variabel). Zie http://www.knmi.nl/kennis-en-datacentrum/achtergrond/klimatologische-brochures-en-boeken;
 # FHVEC    = Vectorgemiddelde windsnelheid (in 0.1 m/s). Zie http://www.knmi.nl/kennis-en-datacentrum/achtergrond/klimatologische-brochures-en-boeken;
 # FG       = Etmaalgemiddelde windsnelheid (in 0.1 m/s);
 # FHX      = Hoogste uurgemiddelde windsnelheid (in 0.1 m/s);
 # FHXH     = Uurvak waarin FHX is gemeten;
 # FHN      = Laagste uurgemiddelde windsnelheid (in 0.1 m/s);
 # FHNH     = Uurvak waarin FHN is gemeten;
 # FXX      = Hoogste windstoot (in 0.1 m/s);
 # FXXH     = Uurvak waarin FXX is gemeten;
 # TG       = Etmaalgemiddelde temperatuur (in 0.1 graden Celsius);
 # TN       = Minimum temperatuur (in 0.1 graden Celsius);
 # TNH      = Uurvak waarin TN is gemeten;
 # TX       = Maximum temperatuur (in 0.1 graden Celsius);
 # TXH      = Uurvak waarin TX is gemeten;
 # T10N     = Minimum temperatuur op 10 cm hoogte (in 0.1 graden Celsius);
 # T10NH    = 6-uurs tijdvak waarin T10N is gemeten; 6=0-6 UT, 12=6-12 UT, 18=12-18 UT, 24=18-24 UT
 # SQ       = Zonneschijnduur (in 0.1 uur) berekend uit de globale straling (-1 voor <0.05 uur);
 # SP       = Percentage van de langst mogelijke zonneschijnduur;
 # Q        = Globale straling (in J/cm2);
 # DR       = Duur van de neerslag (in 0.1 uur);
 # RH       = Etmaalsom van de neerslag (in 0.1 mm) (-1 voor <0.05 mm);
 # RHX      = Hoogste uursom van de neerslag (in 0.1 mm) (-1 voor <0.05 mm);
 # RHXH     = Uurvak waarin RHX is gemeten;
 # PG       = Etmaalgemiddelde luchtdruk herleid tot zeeniveau (in 0.1 hPa) berekend uit 24 uurwaarden;
 # PX       = Hoogste uurwaarde van de luchtdruk herleid tot zeeniveau (in 0.1 hPa);
 # PXH      = Uurvak waarin PX is gemeten;
 # PN       = Laagste uurwaarde van de luchtdruk herleid tot zeeniveau (in 0.1 hPa);
 # PNH      = Uurvak waarin PN is gemeten;
 # VVN      = Minimum opgetreden zicht; 0: <100 m, 1:100-200 m, 2:200-300 m,..., 49:4900-5000 m, 50:5-6 km, 56:6-7 km, 57:7-8 km,..., 79:29-30 km, 80:30-35 km, 81:35-40 km,..., 89: >70 km)
 # VVNH     = Uurvak waarin VVN is gemeten;
 # VVX      = Maximum opgetreden zicht; 0: <100 m, 1:100-200 m, 2:200-300 m,..., 49:4900-5000 m, 50:5-6 km, 56:6-7 km, 57:7-8 km,..., 79:29-30 km, 80:30-35 km, 81:35-40 km,..., 89: >70 km)
 # VVXH     = Uurvak waarin VVX is gemeten;
 # NG       = Etmaalgemiddelde bewolking (bedekkingsgraad van de bovenlucht in achtsten, 9=bovenlucht onzichtbaar);
 # UG       = Etmaalgemiddelde relatieve vochtigheid (in procenten);
 # UX       = Maximale relatieve vochtigheid (in procenten);
 # UXH      = Uurvak waarin UX is gemeten;
 # UN       = Minimale relatieve vochtigheid (in procenten);
 # UNH      = Uurvak waarin UN is gemeten;
 # EV24     = Referentiegewasverdamping (Makkink) (in 0.1 mm);

 */


export interface Measurement {
    stn: string;
    yyyymmdd: string;
    ddvec:number;
    fhvec    : number;
    fg       : number;
    fhx      : number;
    fhxh     : number;
    fhn      : number;
    fhnh     : number;
    fxx      : number;
    fxxh     : number;
    tg       : number;
    tn       : number;
    tnh      : number;
    tx       : number;
    txh      : number;
    t10n     : number;
    t10nh    : number;
    sq       : number;
    sp       : number;
    q        : number;
    dr       : number;
    rh       : number;
    rhx      : number;
    rhxh     : number;
    pg       : number;
    px       : number;
    pxh      : number;
    pn       : number;
    pnh      : number;
    vvn      : number;
    vvnh     : number;
    vvx      : number;
    vvxh     : number;
    ng       : number;
    ug       : number;
    ux       : number;
    uxh      : number;
    un       : number;
    unh      : number;
    ev24     : number;
}

@Injectable({
    providedIn: 'root'
})
export class MeasurementsService {

    constructor() {
    }

    stringToNumber(text: string) {
        let number = parseInt(text);
        if(isNaN(number)){
            return null;
        }
        return Math.round(((number * 0.1) + Number.EPSILON) * 100) / 100;
    }

    stringToDate(text: string) {
        if(/^(\d){8}$/.test(text)) {
            var y = text.substr(0, 4),
                m = text.substr(4, 2),
                d = text.substr(6, 2);
            return new Date(y + "-" + m + "-" + d).toISOString();
        }
        if(!/^(\d){8}$/.test(text)) {

        }
    }

    converter(measurement:any) {
        let uiMeasurement: Measurement = {
            tx: this.stringToNumber(measurement.tx),
            dr: this.stringToNumber(measurement.dr) ,
            ev24: this.stringToNumber(measurement.ev24),
            fg: this.stringToNumber(measurement.fg),
            fhn: this.stringToNumber(measurement.fhn),
            fhvec: this.stringToNumber(measurement.fhvec),
            fhx: this.stringToNumber(measurement.fhx),
            fxx: this.stringToNumber(measurement.fxx),
            pn: this.stringToNumber(measurement.pn),
            px: this.stringToNumber(measurement.px),
            rh: this.stringToNumber(measurement.rh),
            rhx: this.stringToNumber(measurement.rhx),
            sq: this.stringToNumber(measurement.sq),
            t10n: this.stringToNumber(measurement.t10n),
            tg: this.stringToNumber(measurement.tg),
            tn: this.stringToNumber(measurement.tn),
            ddvec: parseInt(measurement.ddvec),
            fhnh: parseInt(measurement.fhnh),
            fhxh: parseInt(measurement.fhxh),
            fxxh: parseInt(measurement.fxxh),
            ng: parseInt(measurement.ng),
            pg: parseInt(measurement.pg),
            pnh: parseInt(measurement.pnh),
            pxh: parseInt(measurement.pxh),
            q: parseInt(measurement.q),
            rhxh: parseInt(measurement.rhxh),
            sp: parseInt(measurement.sp),
            stn: measurement.stn,
            t10nh: parseInt(measurement.t10nh),
            tnh: parseInt(measurement.tnh),
            txh: parseInt(measurement.txh),
            ug: parseInt(measurement.ug),
            un: parseInt(measurement.un),
            unh: parseInt(measurement.unh),
            ux: parseInt(measurement.ux),
            uxh: parseInt(measurement.uxh),
            vvn: parseInt(measurement.vvn),
            vvnh: parseInt(measurement.vvnh),
            vvx: parseInt(measurement.vvx),
            vvxh: parseInt(measurement.vvxh),
            yyyymmdd: this.stringToDate(measurement.yyyymmdd)


        };
        //console.log(uiMeasurement.yyyymmdd);
        return uiMeasurement;

    }
}