import { SafeObserver } from './safeObserver';
import { Observer, Subscription } from './type';

export class Observable<T> {
    private _subscribe: (observer: Observer<T>) => Subscription;

    constructor(subscribe: (observer: Observer<T>) => Subscription) {
        this._subscribe = subscribe;
    }

    subscribe(observer: Observer<T>): Subscription {
        const safeObserver = new SafeObserver(observer);
        return this._subscribe(safeObserver);
    }
}
