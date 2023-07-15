import { Subscriber } from './subscriber';
import { Subscription } from './subscription';
import { Observer, Operator, Subscribable, TeardownLogic } from './type';

export class Observable<T> implements Subscribable<T> {
    source: Observable<any> | undefined;
    operator: Operator<any, T> | undefined;

    constructor(
        private subscribeFn?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic,
    ) {}

    subscribe(
        observerOrNext?: Partial<Observer<T>> | ((value: T) => void),
        error?: (error: any) => void,
        complete?: () => void,
    ): Subscription {
        let observer: Partial<Observer<T>>;
        if (typeof observerOrNext === 'function') {
            observer = {
                next: observerOrNext,
                error,
                complete,
            };
        } else {
            observer = observerOrNext || {};
        }

        const subscriber = new Subscriber(observer as Observer<T>);
        const subscription = this.subscribeFn?.call(this, subscriber);
        if (subscription) {
            subscriber.add(subscription);
        }
        // @ts-ignore
        return subscriber;
    }

    // forEach(next: (value: T) => void, promiseCtor?: PromiseConstructorLike): Promise<void> {
    //     return new Promise<void>((resolve, reject) => {
    //         this.subscribe({
    //             next,
    //             error: reject,
    //             complete: resolve
    //         });
    //     });
    // }

    // pipe(...operations: OperatorFunction<any, any>[]): Observable<any> {
    //     return operations.reduce((prev, fn) => fn(prev), this);
    // }
}
