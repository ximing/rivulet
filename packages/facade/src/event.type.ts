/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 */
export interface IEventEmitter<
  EventTypes extends ValidEventTypes = string | symbol,
  Context = any
> {
  // eventNames(): Array<EventNames<EventTypes>>;

  // listeners<T extends EventNames<EventTypes>>(
  //   event: T
  // ): Array<EventListener<EventTypes, T>>;

  // listenerCount(event: EventNames<EventTypes>): number;

  emit<T extends EventNames<EventTypes>>(
    event: T,
    ...args: EventArgs<EventTypes, T>
  ): boolean;

  on<T extends EventNames<EventTypes>>(
    event: T,
    fn: EventListener<EventTypes, T>,
    context?: Context
  ): () => void;

  once<T extends EventNames<EventTypes>>(
    event: T,
    fn: EventListener<EventTypes, T>,
    context?: Context
  ): this;

  off<T extends EventNames<EventTypes>>(
    event: T,
    fn: EventListener<EventTypes, T>,
    context?: Context,
    once?: boolean
  ): this;

  removeAllListeners(event?: EventNames<EventTypes>): this;
}

// interface StaticEventEmitter {
//   prefixed: string | boolean;
// }

// interface ListenerFn<Args extends any[] = any[]> {
//   (...args: Args): void;
// }

/**
 * `object` should be in either of the following forms:
 * ```
 * interface EventTypes {
 *   'event-with-parameters': any[]
 *   'event-with-example-handler': (...args: any[]) => void
 * }
 * ```
 */
type ValidEventTypes = string | symbol | object;

type EventNames<T extends ValidEventTypes> = T extends string | symbol
  ? T
  : keyof T;

type ArgumentMap<T extends object> = {
  [K in keyof T]: T[K] extends (...args: any[]) => void
    ? Parameters<T[K]>
    : T[K] extends any[]
    ? T[K]
    : any[];
};

type EventListener<
  T extends ValidEventTypes,
  K extends EventNames<T>
> = T extends string | symbol
  ? (...args: any[]) => void
  : (
      ...args: ArgumentMap<Exclude<T, string | symbol>>[Extract<K, keyof T>]
    ) => void;

type EventArgs<T extends ValidEventTypes, K extends EventNames<T>> = Parameters<
  EventListener<T, K>
>;
