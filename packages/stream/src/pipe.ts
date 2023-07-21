import { Observable } from './observable';

/**
 * 表示一个操作符函数类型，它接受一个输入 Observable 并返回一个输出 Observable。
 *
 * @typeparam T 输入 Observable 的值类型。
 * @typeparam R 输出 Observable 的值类型。
 */
type OperatorFunction<T, R> = (source: Observable<T>) => Observable<R>;

/**
 * 将多个操作符函数连接在一起，以构建一个管道（pipe）函数。
 *
 * @returns 一个操作符函数，将输入 Observable 转换为输出 Observable。
 */
function pipe<T>(): OperatorFunction<T, T>;
/**
 * 将一个操作符函数应用到输入 Observable 上，返回一个输出 Observable。
 *
 * @typeparam T 输入 Observable 的值类型。
 * @typeparam R1 输出 Observable 的值类型。
 * @param op1 要应用的第一个操作符函数。
 * @returns 一个操作符函数，将输入 Observable 转换为输出 Observable。
 */
function pipe<T, R1>(op1: OperatorFunction<T, R1>): OperatorFunction<T, R1>;
/**
 * 将两个操作符函数依次应用到输入 Observable 上，返回一个输出 Observable。
 *
 * @typeparam T 输入 Observable 的值类型。
 * @typeparam R1 中间 Observable 的值类型。
 * @typeparam R2 输出 Observable 的值类型。
 * @param op1 要应用的第一个操作符函数。
 * @param op2 要应用的第二个操作符函数。
 * @returns 一个操作符函数，将输入 Observable 转换为输出 Observable。
 */
function pipe<T, R1, R2>(
  op1: OperatorFunction<T, R1>,
  op2: OperatorFunction<R1, R2>
): OperatorFunction<T, R2>;
// More overloads for more operators as needed...

/**
 * 将多个操作符函数连接在一起，以构建一个管道（pipe）函数。
 *
 * @typeparam T 输入 Observable 的值类型。
 * @typeparam R 输出 Observable 的值类型。
 * @param operators 要应用的操作符函数列表。
 * @returns 一个操作符函数，将输入 Observable 转换为输出 Observable。
 */
function pipe<T, R>(
  ...operators: OperatorFunction<any, any>[]
): OperatorFunction<T, R> {
  return function piped(input: Observable<T>): Observable<R> {
    return operators.reduce((prev: any, fn: any) => fn(prev), input as any);
  };
}

export { pipe };
