import { Subject } from './subject';
import { Observer, Subscription } from './type';

export class BehaviorSubject<T> extends Subject<T> {
    private currentValue: T;

    constructor(initialValue: T) {
        super();
        this.currentValue = initialValue;
    }

    next(value: T) {
        this.currentValue = value;
        super.next(value);
    }

    subscribe(observer: Observer<T>): Subscription {
        observer.next(this.currentValue);
        return super.subscribe(observer);
    }
}
