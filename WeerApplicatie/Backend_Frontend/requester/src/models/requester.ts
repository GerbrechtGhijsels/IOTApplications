import mongoose from "mongoose";

/**
 # stn      = station nummer;         external = 999
 # lon      = Longitude;              coord/lon
 # lat      = Latitude;               coord/lat
 # name     = Naam van het station;   name
 # temp     = tempratuur;             main/temp
 # humidity = vochtigheid;            main/humidity
 # wind     = Windsnelheid;           wind/speed
 */

interface RequesterAttrs {
    stn: number;
    lon: number;
    lat: number;
    name: string;
    temp: string;
    humidity: string;
    wind: string;
}

interface RequesterDoc extends mongoose.Document {
    stn: number;
    lon: number;
    lat: number;
    name: string;
    temp: string;
    humidity: string;
    wind: string;
}

interface RequesterModel extends mongoose.Model<RequesterDoc> {
    build(attrs: RequesterAttrs): RequesterDoc;
}

const requesterschema = new mongoose.Schema(
    {
        stn: {
            type: Number,
            required: true,
        },
        lon: {
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
        temp: {
            type: String,
            required: true,
        },
        humidity: {
            type: String,
            required: true,
        },
        wind: {
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

requesterschema.statics.build = (attrs: RequesterAttrs) => {
    return new Requester(attrs);
};

const Requester = mongoose.model<RequesterDoc, RequesterModel>('Requester', requesterschema);

export { Requester };
