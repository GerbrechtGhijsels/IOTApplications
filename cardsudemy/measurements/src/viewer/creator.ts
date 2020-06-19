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
    /**
     * Note that the signature of the method still uses the abstract product
     * type, even though the concrete product is actually returned from the
     * method. This way the Creator can stay independent of concrete product
     * classes.
     */
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
    id: number;
    stn: number;
    yyyymmdd: number;
    
    constructor(model: MeasurementDoc)
    {
        this.id = model.id;
        this.stn = model.stn;
        this.yyyymmdd = model.yyyymmdd;
    }
}

/**
 * Concrete Products provide various implementations of the Product interface.
 */
class DetailView extends RequiredView implements MeasurementDetailView {
    ddvec: number;
    fhvec: number;
    tg: number;
    rh: number;
    pg: number;
    ng: number;
    ug: number;

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
    if( type = "Full")
    {
        return(new ViewCreatorDetails().factoryMethod(model));
    }
    if( type = "Detail")
    {
        return(new ViewCreatorFull().factoryMethod(model));
    }
    return null;
}