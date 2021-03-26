import {MeasurementDoc} from '../../models/measurement'


/**
 * Iterator Design Pattern
 *
 * Intent: Lets you traverse elements of a collection without exposing its
 * underlying representation (list, stack, tree, etc.).
 */

interface CustomIterator<T> {
    // Return the current element.
    current(): T;

    // Return the current element and move forward to next element.
    next(): T;

    // Return the key of the current element.
    key(): number;

    // Checks if current position is valid.
    valid(): boolean;

    // Rewind the Iterator to the first element.
    rewind(): void;
}

interface Aggregator {
    // Retrieve an external iterator.
    getIterator(): CustomIterator<MeasurementDoc>;
}

/**
 * Concrete Iterators implement various traversal algorithms. These classes
 * store the current traversal position at all times.
 */

class FieldIterator implements CustomIterator<MeasurementDoc> {
    private collection: MeasurementsCollection;

    /**
     * Stores the current traversal position. An iterator may have a lot of
     * other fields for storing iteration state, especially when it is supposed
     * to work with a particular kind of collection.
     */
    private position: number = 0;

    /**
     * This variable indicates the traversal direction.
     */
    private reverse: boolean = false;

    constructor(collection: MeasurementsCollection, reverse: boolean = false) {
        this.collection = collection;
        this.reverse = reverse;

        if (reverse) {
            this.position = collection.getCount() - 1;
        }
    }

    public rewind() {
        this.position = this.reverse ?
            this.collection.getCount() - 1 :
            0;
    }

    public current(): MeasurementDoc {
        return this.collection.getItems()[this.position];
    }

    public key(): number {
        return this.position;
    }

    public next(): MeasurementDoc {
        const item = this.collection.getItems()[this.position];
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }
}

export class MeasurementsCollection implements Aggregator {
    private measurements: MeasurementDoc[];



    constructor(measurements: MeasurementDoc[]) {
        this.measurements = measurements;
    }

    public getItems(): MeasurementDoc[] {
        return this.measurements;
    }

    public getCount(): number {
        return this.measurements.length;
    }

    public addItem(measurement: MeasurementDoc): void {
        this.measurements.push(measurement);
    }

    public getIterator(): CustomIterator<MeasurementDoc> {
        return new FieldIterator(this);
    }

    public getReverseIterator(): CustomIterator<MeasurementDoc> {
        return new FieldIterator(this, true);
    }
}