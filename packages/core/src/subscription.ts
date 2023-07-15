import { TeardownLogic } from "./type";

export class Subscription {
    closed: boolean = false;
    private teardowns: TeardownLogic[] = [];

    static EMPTY: Subscription = (() => {
        const empty = new Subscription();
        empty.closed = true;
        return empty;
    })();

    constructor(private initialTeardown?: TeardownLogic) {}

    unsubscribe(): void {
        if (this.closed) {
            return;
        }
        this.closed = true;
        if (this.initialTeardown) {
            this.executeTeardown(this.initialTeardown);
        }
        for (const teardown of this.teardowns) {
            this.executeTeardown(teardown);
        }
        this.teardowns = [];
    }

    add(teardown: TeardownLogic): void {
        if (!teardown || (teardown === this)) {
            return;
        }
        if (this.closed) {
            this.executeTeardown(teardown);
        } else {
            this.teardowns.push(teardown);
        }
    }

    remove(teardown: TeardownLogic): void {
        const index = this.teardowns.indexOf(teardown);
        if (index !== -1) {
            this.teardowns.splice(index, 1);
        }
    }

    private executeTeardown(teardown: TeardownLogic): void {
        if (typeof teardown === "function") {
            teardown();
        } else if (teardown && (typeof teardown.unsubscribe === "function")) {
            teardown.unsubscribe();
        }
    }
}
