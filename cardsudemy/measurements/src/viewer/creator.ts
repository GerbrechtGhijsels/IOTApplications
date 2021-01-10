import { MeasurementFullView,MeasurementDetailView,MeasurementsRequired } from './views';
import { MeasurementDoc} from '../models/measurement'
/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
abstract class Creator {
    /**
     * Note that the Creator may also provide some default implementation of the
     * factory method.
     */
    public abstract factoryMethod(model: MeasurementDoc): MeasurementsRequired;

    
}

/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 */
class ViewCreatorDetails extends Creator {
    
    public factoryMethod(model: MeasurementDoc): MeasurementsRequired {
        return new DetailView(model);
    }
}

class ViewCreatorFull extends Creator {
    public factoryMethod(model: MeasurementDoc): MeasurementsRequired {
        return new FullView(model);
    }
}


export class RequiredView implements MeasurementsRequired {
    stn: string;
    yyyymmdd: string;
    
    constructor(model: MeasurementDoc)
    {
        this.stn = model.stn;
        this.yyyymmdd = model.yyyymmdd;
    }
}

/**
 * Concrete Products provide various implementations of the View interface.
 */
class DetailView extends RequiredView implements MeasurementDetailView {
    ddvec: string;
    fhvec: string;
    tg: string;
    rh: string;
    pg: string;
    ng: string;
    ug: string;

    constructor(model: MeasurementDoc)
    {
        super(model);
        this.ddvec = model.ddvec;
        this.fhvec = model.fhvec;
        this.tg = model.tg;
        this.rh = model.rh;
        this.pg = model.pg;
        this.ng = model.ng;
        this.ug = model.ug;
    }

    
}

class FullView extends RequiredView implements MeasurementFullView {
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

    constructor(model: MeasurementDoc)
    {
        super(model);
        this.ddvec = model.ddvec;
        this.fhvec = model.fhvec;
        this.tg = model.tg;
        this.rh = model.rh;
        this.pg = model.pg;
        this.ng = model.ng;
        this.ug = model.ug;
        this.fg = model.fg;
        this.fhx = model.fhx;
        this.fhxh = model.fhxh;
        this.fhn = model.fhn;
        this.fhnh = model.fhnh;
        this.fxx = model.fxx;
        this.fxxh = model.fxxh;
        this.tn = model.tn;
        this.tnh = model.tnh;
        this.tx = model.tx;
        this.txh = model.txh;
        this.t10n = model.t10n;
        this.t10nh = model.t10nh;
        this.sq = model.sq;
        this.sp = model.sp;
        this.q = model.q;
        this.dr = model.dr;
        this.rhx = model.rhx;
        this.rhxh = model.rhxh;
        this.px = model.px;
        this.pxh = model.pxh;
        this.pn = model.pn;
        this.pnh = model.pnh;
        this.vvn = model.vvn;
        this.vvnh = model.vvnh;
        this.vvx = model.vvx;
        this.vvxh = model.vvxh;
        this.ux = model.ux;
        this.uxh = model.uxh;
        this.un = model.un;
        this.unh = model.unh;
        this.ev24 = model.ev24;
    }
}

/**
 * The client code works with an instance of a concrete creator, albeit through
 * its base interface. As long as the client keeps working with the creator via
 * the base interface, you can pass it any creator's subclass.
 */
export function clientCode(type: string,model: MeasurementDoc): MeasurementsRequired| null{
    if( type == "Detail")
    {
        return(new ViewCreatorDetails().factoryMethod(model));
    }
    if( type == "Full")
    {
        return(new ViewCreatorFull().factoryMethod(model));
    }
    return(new ViewCreatorFull().factoryMethod(model));
}