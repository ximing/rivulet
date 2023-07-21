---
title: 快速开始
date: '2023-07-20 15:28'
tags: ['guide']
published: true
---

# Stream 用户指南

**Stream** 是一个基于响应式编程思想的库，这意味着你可以创建、处理并对数据流进行订阅。让我们用一个真实的场景开始，然后逐步深入学习。

## 1. 为什么使用 Stream？

想象你正在构建一个实时天气应用。用户可以输入他们的城市，应用会显示实时天气。此外，如果天气有任何突然的变化，应用将立即更新。这就是响应式编程大展身手的地方！

## 2. 开始之前: 基础概念

- **Observable**: 代表一个值或值序列，你可以认为它是一个数据流。
- **Observer**: 一个可以监听 Observable 发出的数据的对象。
- **Subscription**: 一个表示可观察对象的订阅的对象。

现在，让我们从创建一个简单的 Observable 开始。

## 3. 第一个 Observable

假设你要从一个 API 获取天气数据。但在此之前，我们先模拟这个过程：

```javascript
const weatherObservable = new Observable((subscriber) => {
  subscriber.next('晴天');
  setTimeout(() => subscriber.next('多云'), 2000);
  setTimeout(() => subscriber.next('小雨'), 4000);
  setTimeout(() => subscriber.complete(), 6000);
});

const weatherSubscription = weatherObservable.subscribe({
  next: (weather) => console.log(`天气更新: ${weather}`),
  complete: () => console.log('天气数据流结束'),
});
```

上述代码将输出：

```
天气更新: 晴天
天气更新: 多云
天气更新: 小雨
天气数据流结束
```

## 4. 处理数据流

**Stream** 提供了多种操作符来处理 Observable。例如，我们可以使用 `combineLatest` 来转换数据流中的数据。

```javascript
// 模拟门店状态Observable
const storeStatusObservable = new Observable((subscriber) => {
  let count = 1;
  setInterval(() => {
    subscriber.next(`门店完成${count++}`);
  }, 1000); // 假设门店每隔2秒发生一次变化
});

// 模拟用户登录状态Observable
const userLoginStatusObservable = new Observable((subscriber) => {
  let count = 1;
  setInterval(() => {
    subscriber.next(`用户登录完成${count++}`);
  }, 3000); // 假设用户登录状态每3秒发生一次变化
});

// 使用 combineLatest 结合两个 Observable
const combinedObservables = combineLatest([
  storeStatusObservable,
  userLoginStatusObservable,
]);

// 订阅 combinedObservables
combinedObservables.subscribe({
  next: ([storeStatus, userStatus]) => {
    console.log(`门店状态: ${storeStatus}`);
    console.log(`用户状态: ${userStatus}`);
  },
  complete: () => console.log('两者都已完成!'),
});
```

以下是该代码的输出过程：

1. 在 1 秒时，`storeStatusObservable`发出`'门店完成1'`。

- 此时`userLoginStatusObservable`还没有发出值，因此`combineLatest`不会触发任何输出。

2. 在 2 秒时，`storeStatusObservable`发出`'门店完成2'`。

- 同样，`userLoginStatusObservable`还没有发出值，所以没有输出。

3. 在 3 秒时，`storeStatusObservable`发出`'门店完成3'`。
4. 也在 3 秒时，`userLoginStatusObservable`发出`'用户登录完成1'`。

- 现在两个 Observable 都发出了至少一次值，`combineLatest`将这两个值组合并触发`next`回调。
  输出：

```
门店状态: 门店完成3
用户状态: 用户登录完成1
```

5. 在 4 秒时，`storeStatusObservable`发出`'门店完成4'`。

- 与`userLoginStatusObservable`的最近值`'用户登录完成1'`结合。
  输出：

```
门店状态: 门店完成4
用户状态: 用户登录完成1
```

6. 在 5 秒时，`storeStatusObservable`发出`'门店完成5'`。

- 与`userLoginStatusObservable`的最近值`'用户登录完成1'`结合。
  输出：

```
门店状态: 门店完成5
用户状态: 用户登录完成1
```

7. 在 6 秒时，`storeStatusObservable`发出`'门店完成6'`。
8. 也在 6 秒时，`userLoginStatusObservable`发出`'用户登录完成2'`。
   输出：
   ```
   门店状态: 门店完成6
   用户状态: 用户登录完成2
   ```

...以此类推。

这样，每次任何一个 Observable 发出新的值，`combineLatest`都会触发输出。每次输出都将展示每个 Observable 最近发出的值。

## 5. 取消订阅

你可能不希望永远监听某些数据流。使用 **Subscription** 对象，你可以很容易地取消订阅。

```javascript
const intervalObservable = new Observable((subscriber) => {
  let counter = 0;
  const intervalId = setInterval(() => {
    subscriber.next(counter++);
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
});

const counterSubscription = intervalObservable.subscribe((value) => {
  console.log(value);
  if (value >= 4) {
    counterSubscription.unsubscribe();
  }
});
```

上述代码将仅输出 0 到 4。

## 6. 更多复杂的场景

随着你对库的了解增加，你会发现还有许多其他功能和概念，如 `Subject`、`BehaviorSubject` 以及组合多个 Observable。但现在，你已经掌握了开始使用 **Stream** 的基础知识！

希望你能够享受这种响应式编程的方法，并看到它在真实世界应用中的潜力！
