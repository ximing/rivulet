export const LOGGER = Symbol('Logger');

type AnyFunc = (...args: any) => any;

type LogFunc = AnyFunc;

export interface ILogger {
  trace: LogFunc;
  debug: LogFunc;
  info: LogFunc;
  warn: LogFunc;
  error: LogFunc;
}

export const REPORT = Symbol('Report');

export interface IReport {
  error: AnyFunc;
}

export const EVENT = Symbol('event');

export { IEventEmitter } from './event.type';
