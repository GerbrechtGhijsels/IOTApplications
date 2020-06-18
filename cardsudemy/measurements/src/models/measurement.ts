import mongoose from 'mongoose';

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

interface MeasurementDoc extends mongoose.Document {
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
