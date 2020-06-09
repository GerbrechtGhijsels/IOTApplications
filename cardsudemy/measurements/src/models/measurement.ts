import mongoose from 'mongoose';

interface MeasurementAttrs {
  title: string;
  price: number;
  userId: string;
}

interface MeasurementDoc extends mongoose.Document {
  id: number;
  stn: number;
  YYYYMMDD: number;
  DDVEC: number;
  FHVEC: number;
  FG: number;
  FHX: number;
  FHXH: number;
  FHN: number;
  FHNH: number;
  FXX: number;
  FXXH: number;
  TG: number;
  TN: number;
  TNH: number;
  TX: number;
  TXH: number;
  T10N: number;
  T10NH: number;
  SQ: number;
  SP: number;
  Q: number;
  DR: number;
  RH: number;
  RHX: number;
  RHXH: number;
  PG: number;
  PX: number;
  PXH: number;
  PN: number;
  PNH: number;
  VVN: number;
  VVNH: number;
  VVX: number;
  VVXH: number;
  NG: number;
  UG: number;
  UX: number;
  UXH: number;
  UN: number;
  UNH: number;
  EV24: number;
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
    YYYYMMDD: {
      type: Number,
      required: true,
    },
    DDVEC: {
      type: Number,
    },
    FHVEC: {
      type: Number,
    },
    FG: {
      type: Number,
    },
    FHX: {
      type: Number,
    },
    FHXH: {
      type: Number,
    },
    FHN: {
      type: Number,
    },
    FHNH: {
      type: Number,
    },
    FXX: {
      type: Number,
    },
    FXXH: {
      type: Number,
    },
    TG: {
      type: Number,
    },
    TN: {
      type: Number,
    },
    TNH: {
      type: Number,
    },
    TX: {
      type: Number,
    },
    TXH: {
      type: Number,
    },
    T10N: {
      type: Number,
    },
    T10NH: {
      type: Number,
    },
    SQ: {
      type: Number,
    },
    SP: {
      type: Number,
    },
    Q: {
      type: Number,
    },
    DR: {
      type: Number,
    },
    RH: {
      type: Number,
    },
    RHX: {
      type: Number,
    },
    RHXH: {
      type: Number,
    },
    PG: {
      type: Number,
    },
    PX: {
      type: Number,
    },
    PXH: {
      type: Number,
    },
    PN: {
      type: Number,
    },
    PNH: {
      type: Number,
    },
    VVN: {
      type: Number,
    },
    VVNH: {
      type: Number,
    },
    VVX: {
      type: Number,
    },
    VVXH: {
      type: Number,
    },
    NG: {
      type: Number,
    },
    UG: {
      type: Number,
    },
    UX: {
      type: Number,
    },
    UXH: {
      type: Number,
    },
    UN: {
      type: Number,
    },
    UNH: {
      type: Number,
    },
    EV24: {
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
