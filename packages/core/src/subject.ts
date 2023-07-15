import { Observer, Subscription } from './type';

export class Subject<T> implements Observer<T> {
    private observers: Observer<T>[] = [];

    next(value: T) {
        this.observers.forEach((observer) => observer.next(value));
    }

    error(err: any) {
        this.observers.forEach((observer) => observer.error(err));
    }

    complete() {
        this.observers.forEach((observer) => observer.complete());
    }

    subscribe(observer: Observer<T>): Subscription {
        this.observers.push(observer);
        return {
            unsubscribe: () => {
                this.observers = this.observers.filter((obs) => obs !== observer);
            },
        };
    }
}
