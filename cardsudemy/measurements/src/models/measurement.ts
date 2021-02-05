import mongoose from 'mongoose';

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

interface MeasurementAttrs {
  stn: string;
  yyyymmdd: string;
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

export interface MeasurementDoc extends mongoose.Document {
  stn: string;
  yyyymmdd: string;
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

interface MeasurementModel extends mongoose.Model<MeasurementDoc> {
  build(attrs: MeasurementAttrs): MeasurementDoc;
}

const measurementSchema = new mongoose.Schema(
  {
    stn: {
      type: String,
      required: true,
    },
    yyyymmdd: {
      type: String,
      required: true,
    },
    ddvec: {
      type: String,
    },
    fhvec: {
      type: String,
    },
    fg: {
      type: String,
    },
    fhx: {
      type: String,
    },
    fhxh: {
      type: String,
    },
    fhn: {
      type: String,
    },
    fhnh: {
      type: String,
    },
    fxx: {
      type: String,
    },
    fxxh: {
      type: String,
    },
    tg: {
      type: String,
    },
    tn: {
      type: String,
    },
    tnh: {
      type: String,
    },
    tx: {
      type: String,
    },
    txh: {
      type: String,
    },
    t10n: {
      type: String,
    },
    t10nh: {
      type: String,
    },
    sq: {
      type: String,
    },
    sp: {
      type: String,
    },
    q: {
      type: String,
    },
    dr: {
      type: String,
    },
    rh: {
      type: String,
    },
    rhx: {
      type: String,
    },
    rhxh: {
      type: String,
    },
    pg: {
      type: String,
    },
    px: {
      type: String,
    },
    pxh: {
      type: String,
    },
    pn: {
      type: String,
    },
    pnh: {
      type: String,
    },
    vvn: {
      type: String,
    },
    vvnh: {
      type: String,
    },
    vvx: {
      type: String,
    },
    vvxh: {
      type: String,
    },
    ng: {
      type: String,
    },
    ug: {
      type: String,
    },
    ux: {
      type: String,
    },
    uxh: {
      type: String,
    },
    un: {
      type: String,
    },
    unh: {
      type: String,
    },
    ev24: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

measurementSchema.statics.build = (attrs: MeasurementAttrs) => {
  return new Measurement(attrs);
};

const Measurement = mongoose.model<MeasurementDoc, MeasurementModel>('Measurement', measurementSchema);

export { Measurement };
