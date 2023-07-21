---
title: \@rivuletjs/stream
date: '2023-07-20 15:28'
tags: ['utils']
published: true
---

## `Observable`

**简介**:

表示一个可观察对象，用于发送值给观察者。

### 构造函数

```javascript
new Observable(subscribeFn);
```

- `subscribeFn` {Function}: 订阅函数，用于定义订阅行为。

### 示例

```javascript
const observable = new Observable((subscriber) => {
  subscriber.next('Hello');
  subscriber.complete();
});

observable.subscribe({
  next: (value) => console.log(value), // Hello
  complete: () => console.log('Completed'),
});
```

### 实例方法

- `subscribe(observerOrNext, error?, complete?)`: 订阅可观察对象。

## `Subject`

**简介**:

是一种特殊的 Observable。可以用作事件流的源头，并让多个观察者订阅该事件流。

### 示例

```javascript
const subject = new Subject();

subject.subscribe({
  next: (value) => console.log(value), // Hello
});

subject.next('Hello');
```

### 实例方法

- `next(value)`: 发送下一个值给所有观察者。
- `error(err)`: 发送错误给所有观察者。
- `complete()`: 发送完成信号给所有观察者。
- `subscribe(observer)`: 订阅该 Subject。

## `BehaviorSubject`

**简介**:

表示一个行为主题（Behavior Subject），它是一种特殊的主题（Subject）。行为主题在订阅时会发送当前值给观察者，并在每次更新值时发送新值给观察者。

### 构造函数

```javascript
new BehaviorSubject(initialValue);
```

- `initialValue` {Any}: 初始值。

### 示例

```javascript
const subject = new BehaviorSubject(0);

subject.subscribe({
  next: (value) => console.log(value), // 0, 1, 2
});

subject.next(1);
subject.next(2);
```

### 实例方法

- `next(value)`: 发送下一个值给所有观察者，并更新当前值。
- `subscribe(observer)`: 订阅行为主题，并立即发送当前值给观察者。

## `Subscriber`

**简介**:

表示一个实现了 Observer 接口和 Subscription 接口的订阅者。

### 构造函数

```javascript
new Subscriber(observer);
```

- `observer` {Object}: 用于处理通知的观察者对象。

### 示例

```javascript
const subscriber = new Subscriber({
  next: (value) => console.log(value), // Hello
  complete: () => console.log('Completed'),
});

subscriber.next('Hello');
subscriber.complete();
```

### 实例方法

- `next(value)`: 通知下一个值。
- `error(err)`: 处理错误。
- `complete()`: 完成订阅。

## `Subscription`

**简介**:

表示对事件流或值流的订阅。

### 示例

```javascript
const subscription = new Subscription(() => {
  console.log('Teardown logic executed.');
});

subscription.unsubscribe(); // Teardown logic executed.
```

### 实例方法

- `unsubscribe()`: 取消订阅，执行清理逻辑。
- `add(teardown)`: 将清理逻辑函数添加到订阅中。
- `remove(teardown)`: 从订阅中移除清理逻辑函数。

## `combineLatest`

**简介**:

将多个可观察对象合并为一个新的可观察对象。

### 示例

```javascript
const observable1 = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next('A');
  }, 1000);
});

const observable2 = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next('B');
  }, 1500);
});

const combined = combineLatest(observable1, observable2);

combined.subscribe({
  next: (value) => console.log(value), // ['A', 'B']
});
```

## 操作符

### combineLatest

**概述:**

`combineLatest` 是一个操作符，它接受多个 Observable 并返回一个新的 Observable，这个新的 Observable 会在任何输入 Observable 发出值时发出一个数组，数组包含每个输入 Observable 的最新值。如果你传入一个投射函数作为最后一个参数，它会使用该函数来计算输出 Observable 发出的值。

**语法:**

```javascript
combineLatest(...observables[, projectFunction])
```

**参数:**

- **observables**: 需要组合的 Observable 列表。
- **projectFunction** (可选): 投射函数，接收所有 Observable 的最新值作为参数，并返回一个单一的合成值。

**返回值:**

一个新的 Observable，它发出每个输入 Observable 的最新值的数组，或者如果提供了投射函数，就是该函数返回的合成值。

---

**示例:**

1. **基本使用**

   ```javascript
   import { Observable, combineLatest } from './path-to-your-file';

   const observable1 = new Observable((subscriber) => {
     setTimeout(() => {
       subscriber.next('A');
     }, 1000);
   });

   const observable2 = new Observable((subscriber) => {
     setTimeout(() => {
       subscriber.next('B');
     }, 1500);
   });

   const combined = combineLatest(observable1, observable2);

   combined.subscribe({
     next: (value) => console.log(value), // 打印: ['A', 'B']
     error: (err) => console.error(err),
     complete: () => console.log('Completed!'),
   });
   ```

2. **使用投射函数**

   ```javascript
   const observable3 = new Observable((subscriber) => {
     setTimeout(() => {
       subscriber.next(1);
     }, 1000);
   });

   const observable4 = new Observable((subscriber) => {
     setTimeout(() => {
       subscriber.next(2);
     }, 1500);
   });

   const combinedWithProject = combineLatest(
     observable3,
     observable4,
     (a, b) => a + b
   );

   combinedWithProject.subscribe({
     next: (value) => console.log(value), // 打印: 3
     error: (err) => console.error(err),
     complete: () => console.log('Completed!'),
   });
   ```

---

**注意事项:**

- 如果任何输入 Observable 完成并且尚未发出任何值，则输出 Observable 也将完成，且不发出任何值。

- 如果某个 Observable 发生错误，输出 Observable 也会立即发出错误。

- 所有输入 Observable 都开始执行，即使有一个还没有完成。
