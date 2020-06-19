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
  id: number;
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
}

export interface MeasurementDoc extends mongoose.Document {
  id: number;
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
}

interface MeasurementModel extends mongoose.Model<MeasurementDoc> {
  build(attrs: MeasurementAttrs): MeasurementDoc;
}

const measurementSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    stn: {
      type: Number,
      required: true,
    },
    yyyymmdd: {
      type: Number,
      required: true,
    },
    ddvec: {
      type: Number,
    },
    fhvec: {
      type: Number,
    },
    fg: {
      type: Number,
    },
    fhx: {
      type: Number,
    },
    fhxh: {
      type: Number,
    },
    fhn: {
      type: Number,
    },
    fhnh: {
      type: Number,
    },
    fxx: {
      type: Number,
    },
    fxxh: {
      type: Number,
    },
    tg: {
      type: Number,
    },
    tn: {
      type: Number,
    },
    tnh: {
      type: Number,
    },
    tx: {
      type: Number,
    },
    txh: {
      type: Number,
    },
    t10n: {
      type: Number,
    },
    t10nh: {
      type: Number,
    },
    sq: {
      type: Number,
    },
    sp: {
      type: Number,
    },
    q: {
      type: Number,
    },
    dr: {
      type: Number,
    },
    rh: {
      type: Number,
    },
    rhx: {
      type: Number,
    },
    rhxh: {
      type: Number,
    },
    pg: {
      type: Number,
    },
    px: {
      type: Number,
    },
    pxh: {
      type: Number,
    },
    pn: {
      type: Number,
    },
    pnh: {
      type: Number,
    },
    vvn: {
      type: Number,
    },
    vvnh: {
      type: Number,
    },
    vvx: {
      type: Number,
    },
    vvxh: {
      type: Number,
    },
    ng: {
      type: Number,
    },
    ug: {
      type: Number,
    },
    ux: {
      type: Number,
    },
    uxh: {
      type: Number,
    },
    un: {
      type: Number,
    },
    unh: {
      type: Number,
    },
    ev24: {
      type: Number,
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
