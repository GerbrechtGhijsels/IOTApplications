import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

/** 
# stn    = station nummer;
# lon    = Longitude;
# lat    = Latitude;
# alt    = Altitude;
# name   = Naam van het station; 
*/

interface StationAttrs {
  stn: number;
  lon: number;
  lat: number;
  alt: number;
  name: string;
}

interface StationDoc extends mongoose.Document {
  stn: number;
  lon: number;
  lat: number;
  alt: number;
  name: string;
  amountofmeasurements: number;
}

interface StationModel extends mongoose.Model<StationDoc> {
  build(attrs: StationAttrs): StationDoc;
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
    amountofmeasurements: {
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

stationschema.plugin(updateIfCurrentPlugin);

stationschema.statics.build = (attrs: StationAttrs) => {
  return new Station(attrs);
};

const Station = mongoose.model<StationDoc, StationModel>('Station', stationschema);

export { Station };
