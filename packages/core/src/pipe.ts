import { Observable } from './observable';

type OperatorFunction<T, R> = (source: Observable<T>) => Observable<R>;

function pipe<T>(): OperatorFunction<T, T>;
function pipe<T, R1>(op1: OperatorFunction<T, R1>): OperatorFunction<T, R1>;
function pipe<T, R1, R2>(
  op1: OperatorFunction<T, R1>,
  op2: OperatorFunction<R1, R2>,
): OperatorFunction<T, R2>;
// More overloads for more operators as needed...
function pipe<T, R>(...operators: OperatorFunction<any, any>[]): OperatorFunction<T, R> {
  return function piped(input: Observable<T>): Observable<R> {
    return operators.reduce((prev: any, fn: any) => fn(prev), input as any);
  };
}

export { pipe };
