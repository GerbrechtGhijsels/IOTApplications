import mongoose from 'mongoose';

interface stationAttrs {
  STN: number;
  LON: number;
  LAT: number;
  ALT: number;
  NAME: string
}

interface stationDoc extends mongoose.Document {
  STN: number;
  LON: number;
  LAT: number;
  ALT: number;
  NAME: string;
}

interface stationModel extends mongoose.Model<stationDoc> {
  build(attrs: stationAttrs): stationDoc;
}

const stationschema = new mongoose.Schema(
  {
    stn: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    alt: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
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

stationschema.statics.build = (attrs: stationAttrs) => {
  return new station(attrs);
};

const station = mongoose.model<stationDoc, stationModel>('station', stationschema);

export { station };
