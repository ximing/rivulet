import { Observer, Subscription, TeardownLogic } from './type';

export class Subscriber<T> implements Observer<T>, Subscription {
    closed = false;
    private teardowns: TeardownLogic[] = [];

    constructor(private observer: Observer<T>) {}

    next(value: T) {
        if (!this.closed && this.observer.next) {
            this.observer.next(value);
        }
    }

    error(err: any) {
        if (!this.closed) {
            if (this.observer.error) {
                this.observer.error(err);
            }
            this.unsubscribe();
        }
    }

    complete() {
        if (!this.closed && this.observer.complete) {
            this.observer.complete();
        }
        this.unsubscribe();
    }

    executeTeardown() {
        if (!this.closed) {
            for (const teardown of this.teardowns) {
                if (typeof teardown === 'function') {
                    teardown();
                } else if (teardown && typeof teardown.unsubscribe === 'function') {
                    teardown.unsubscribe();
                }
            }
        }
    }

    unsubscribe(): void {
        if (this.closed) {
            return;
        }
        this.closed = true;
        this.executeTeardown();
        this.teardowns = [];
    }

    add(teardown: TeardownLogic): void {
        this.teardowns.push(teardown);
    }

    remove(teardown: TeardownLogic): void {
        const index = this.teardowns.indexOf(teardown);
        if (index !== -1) {
            this.teardowns.splice(index, 1);
        }
    }
}
