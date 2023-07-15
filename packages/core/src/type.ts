export interface Unsubscribable {
    unsubscribe(): void;
}

export interface Observer<T> {
    next: (value: T) => void;
    error: (err: any) => void;
    complete: () => void;
}

export type TeardownLogic = Subscription | Unsubscribable | (() => void) | void;

export interface Subscription extends Unsubscribable {
    closed: boolean;
    add(teardown: TeardownLogic): void;
    remove(teardown: TeardownLogic): void;
}

export interface Subscriber<T> extends Observer<T>, Subscription {}

export interface Operator<T, R> {
    call(subscriber: Subscriber<R>, source: any): TeardownLogic;
}

interface Observable<T> {
    subscribe(observer: Observer<T>): Subscription;
}

export interface OperatorFunction<T, R> {
    (source: Observable<T>): Observable<R>;
}

export interface Subscribable<T> {
    subscribe(observer: Partial<Observer<T>>): Unsubscribable;
}
