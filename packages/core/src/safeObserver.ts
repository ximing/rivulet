import { Observer } from './type';

export class SafeObserver<T> implements Observer<T> {
    private observer: Observer<T>;
    private unsubscribed: boolean = false;

    constructor(observer: Observer<T>) {
        this.observer = observer;
    }

    next(value: T) {
        if (!this.unsubscribed) {
            this.observer.next(value);
        }
    }

    error(err: any) {
        if (!this.unsubscribed) {
            this.observer.error(err);
            this.unsubscribe();
        }
    }

    complete() {
        if (!this.unsubscribed) {
            this.observer.complete();
            this.unsubscribe();
        }
    }

    unsubscribe() {
        this.unsubscribed = true;
    }
}
