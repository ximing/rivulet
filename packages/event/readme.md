## 用户指南

本项目来源 [eventemitter3@5.0.1](https://github.com/primus/eventemitter3/tree/5.0.1)

### 差异点

- `removeListener` 和 `off` 第二个参数 fn 必传，防止 业务中误传 `undefined` 造成的线上问题
- `addListener` 和 `off` 返回的是取消订阅函数，不再是 event 实例，防止初学者写出 `event.off(XXX_EVENT,this.fn.bind(this))` 的代码造成潜在内存问题

### 使用方式

#### 监听/注销事件

```typescript
import { EventEmitter } from '@rivuletjs/event';

const eventBus = new EventEmitter();

// 推荐用法
class User {
  constructor() {
    this.unSub = eventBus.on('LOGIN_SUCCESS', () => {
      // do some thind
    });
  }

  // 销毁时
  destory() {
    this.unSub();
  }
}
```

#### 触发事件

```typescript
eventBus.emit(EVENT_NAME, arg1, arg2);
```

## 维护人员

@ximing

## 更新日志

- 2023-07-20 fork 自[eventemitter3@5.0.1](https://github.com/primus/eventemitter3/tree/5.0.1) 按照差异点进行修改
