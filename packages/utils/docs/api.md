---
title: \@rivuletjs/utils
date: '2023-07-18 15:28'
tags: ['utils']
published: true
---

# @rivuletjs/utils

## Object

### assign

`Object.assign()` 的引用。这个方法被用来从一个或多个源对象复制所有可枚举自身属性的值到目标对象。它将返回目标对象。

#### Since

1.0.0

#### Arguments

`target(object)`: The target object.
`sources(...object)`: The source object(s).

#### Returns

`(object)`: Returns the target object.

#### Example

```javascript
const target = { a: 1 };
const source = { b: 2 };
extend(target, source); // => { a: 1, b: 2 }
```

## String

### camelCase(str: TSAnyKeyword)

将字符串转换为[驼峰命名法](https://en.wikipedia.org/wiki/CamelCase)。

#### Since

1.0.0

#### Arguments

`str(string)`: 要转换的字符串。

#### Returns

`(string)`: 返回驼峰命名法的字符串。

#### Example

```javascript
camelCase('--foo-bar--');
// => 'fooBar'
```

## Lang

### getTag(value)

获取`value`的 toStringTag。toStringTag 是一个标准的内置属性，用于对象的默认字符串描述。
它用于更好地、更健壮地对值进行类型标记，特别用于调试和错误处理目的。
例如，即使在 JavaScript 中它们都是假值，null 和 undefined 类型也是有区别的。

#### Since

1.0.0

#### Arguments

`value(*)`: 要获取 toStringTag 的值。

#### Returns

`(string)`: 返回`value`的 toStringTag。

#### Example

```javascript
getTag(2);
// => '[object Number]'

getTag('abc');
// => '[object String]'

getTag(null);
// => '[object Null]'

getTag(undefined);
// => '[object Undefined]'

getTag({});
// => '[object Object]'
```

### isArray

检查`value`是否被归类为一个数组对象。该函数使用内置的`Array.isArray()`方法来确定一个值是否为数组。

#### Since

1.0.0

#### Arguments

`value(*)`: 要检查的值。

#### Returns

`(boolean)`: 如果`value`是一个数组，则返回`true`，否则返回`false`。

#### Example

```javascript
isArray([1, 2, 3]);
// => true

isArray({ x: 0, y: 0 });
// => false

isArray('Not an array');
// => false
```

### isDate(value: undefined)

检查`value`是否被归类为一个`Date`对象。

#### Since

1.0.0

#### Arguments

`value(*)`: 要检查的值。

#### Returns

`(boolean)`: 如果`value`是一个日期对象，则返回`true`，否则返回`false`。

#### Example

```javascript
isDate(new Date());
// => true

isDate('Mon April 23 2012');
// => false
```

### isFunction(value)

检查`value`是否被归类为一个`Function`对象。

#### Since

1.0.0

#### Arguments

`value(*)`: 要检查的值。

#### Returns

`(boolean)`: 如果`value`是一个函数，则返回`true`，否则返回`false`。

#### Example

```javascript
isFunction(class Any {});
// => true

isFunction(() => {});
// => true

isFunction(async () => {});
// => true

isFunction(function* Any() {});
// => true

isFunction(Math.round);
// => true

isFunction(/abc/);
// => false
```

### isMap(value: undefined)

检查`value`是否被归类为一个`Map`对象。

#### Since

1.0.0

#### Arguments

`value(*)`: 要检查的值。

#### Returns

`(boolean)`: 如果`value`是一个 Map，则返回`true`，否则返回`false`。

#### Example

```javascript
isMap(new Map());
// => true

isMap(new WeakMap());
// => false
```

### isNil(value)

检查 value 是否为 null 或 undefined。

#### Since

1.0.0

#### Arguments

`value(*)`: 要检查的值。

#### Returns

`(boolean)`: 如果 value 是 nullish（null 或 undefined），则返回 true，否则返

#### Example

```javascript
isNil(null);
// => true

isNil(void 0);
// => true

isNil(NaN);
// => false
```

### isObject(value)

检查 `value` 是否为 `Object` 的[语言类型](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)。
（例如，数组、函数、对象、正则表达式、`new Number(0)` 和 `new String('')`）

#### Since

1.0.0

#### Arguments

`value(*)`: 要检查的值。

#### Returns

`(boolean)`: 如果 `value` 是对象，则返回 `true`，否则返回 `false`。

#### Example

```javascript
isObject({});
// => true

isObject([1, 2, 3]);
// => true

isObject(Function);
// => true

isObject(null);
// => false
```

### isObjectLike(value)

检查 `value` 是否类似于对象。如果 `value` 不是 `null` 且其 `typeof` 结果为 "object"，则被视为类似于对象。

#### Since

1.0.0

#### Arguments

`value(*)`: 要检查的值。

#### Returns

`(boolean)`: 如果 `value` 类似于对象，则返回 `true`，否则返回 `false`。

#### Example

```javascript
isObjectLike({});
// => true

isObjectLike([1, 2, 3]);
// => true

isObjectLike(Function);
// => false

isObjectLike(null);
// => false
```

### isPlainObject(value)

检查 `value` 是否为纯对象，即由 `Object` 构造函数创建的对象或具有 `[[Prototype]]` 为 `null` 的对象。

#### Since

1.0.0

#### Arguments

`value(*)`: 要检查的值。

#### Returns

`(boolean)`: 如果 `value` 是纯对象，则返回 `true`，否则返回 `false`。

#### Example

```javascript
function Foo() {
  this.a = 1;
}

isPlainObject(new Foo());
// => false

isPlainObject([1, 2, 3]);
// => false

isPlainObject({ x: 0, y: 0 });
// => true

isPlainObject(Object.create(null));
// => true
```

### isPromise(val: TSAnyKeyword)

检查 `val` 是否为 Promise。在 JavaScript 中，Promise 被认为是具有 `then` 和 `catch` 方法的对象。
此函数检查输入的 `val` 是否为对象，并且是否具有 `then` 和 `catch` 方法，这两个方法是 Promise 的典型属性。

#### Since

1.0.0

#### Arguments

`val(unknown)`: 要检查的值。

#### Returns

`(boolean)`: 如果 `val` 是 Promise，则返回 `true`，否则返回 `false`。

#### Example

```javascript
isPromise(new Promise((resolve, reject) => {}));
// => true

isPromise({ then: () => {}, catch: () => {} });
// => true

isPromise({ x: 0, y: 0 });
// => false

isPromise('Not a promise');
// => false
```

### isRegExp(value: undefined)

检查 `value` 是否被归类为一个 `RegExp` 对象。

#### Since

1.0.0

#### Arguments

`value(*)`: 要检查的值。

#### Returns

`(boolean)`: 如果 `value` 是一个正则表达式，则返回 `true`，否则返回 `false`。

#### Example

```javascript
isRegExp(/abc/);
// => true

isRegExp('/abc/');
// => false
```

### isSet(value: undefined)

检查 `value` 是否被归类为一个 `Set` 对象。

#### Since

1.0.0

#### Arguments

`value(*)`: 要检查的值。

#### Returns

`(boolean)`: 如果 `value` 是一个 Set，则返回 `true`，否则返回 `false`。

#### Example

```javascript
isSet(new Set());
// => true

isSet(new WeakSet());
// => false
```

### isString(val: TSUnknownKeyword)

检查 value 是否被归类为一个 String 原始类型或对象。

#### Since

1.0.0

#### Arguments

`value(*)`: 要检查的值。

#### Returns

`(boolean)`: 如果 value 是一个字符串，则返回 true，否则返回 false。

#### Example

```javascript
isString('abc');
// => true
isString(1);
// => false
```

### isSymbol(value)

检查 `value` 是否被归类为一个 `Symbol` 原始类型或对象。

#### Since

1.0.0

#### Arguments

`value(*)`: 要检查的值。

#### Returns

`(boolean)`: 如果 `value` 是一个符号，则返回 `true`，否则返回 `false`。

#### Example

```javascript
isSymbol(Symbol.iterator);
// => true

isSymbol('abc');
// => false
```

### toNumber(value)

将 `value` 转换为数字。

#### Since

1.0.0

#### Arguments

`value(*)`: 要处理的值。

#### Returns

`(number)`: 返回数字。

#### Example

```javascript
toNumber(3.2);
// => 3.2

toNumber(Number.MIN_VALUE);
// => 5e-324

toNumber(Infinity);
// => Infinity

toNumber('3.2');
// => 3.2
```

### toString(value)

将 `value` 转换为字符串。对于 `null` 和 `undefined` 值，返回空字符串。负零的符号被保留。

#### Since

1.0.0

#### Arguments

`value(*)`: 要转换的值。

#### Returns

`(string)`: 返回转换后的字符串。

#### Example

```javascript
toString(null);
// => ''

toString(-0);
// => '-0'

toString([1, 2, 3]);
// => '1,2,3'
```

## Util

### isModelListener(key: TSStringKeyword)

检查给定的 `key` 是否以 'onUpdate:' 开头。这常常被用来检查对象的属性中的更新事件监听器。

#### Since

1.0.0

#### Arguments

`key(string)`: The key to check.

#### Returns

`(boolean)`: Returns `true` if `key` starts with 'onUpdate:', else `false`.

#### Example

```javascript
isModelListener('onUpdate:value');
// => true

isModelListener('onClick');
// => false
```

### isOn(key: TSStringKeyword)

检查给定的 `key` 是否以 'on' 开头，后面跟着一个大写字母。这经常用于检查对象的属性中的 on\* 事件处理程序。

#### Since

1.0.0

#### Arguments

`key(string)`: The key to check.

#### Returns

`(boolean)`: Returns `true` if `key` starts with 'on' and followed by an uppercase letter, else `false`.

#### Example

```javascript
isOn('onClick');
// => true

isOn('onupdate');
// => false
```

### no()

一个始终返回 false 的函数。这经常被用作一个条件函数的占位符，该条件函数尚未实现。

#### Since

1.0.0

#### Arguments

空

#### Returns

`(boolean)`: Returns `false`.

#### Example

```javascript
NO();
// => false
```

### noop()

一个 "无操作" 函数，当被调用时什么也不做。这通常被用作一个占位函数，在需要函数但不需要操作的地方使用。

#### Since

1.0.0

#### Arguments

空

#### Returns

void

#### Example

```javascript
NOOP();
// => undefined
```

## Function

### memoize(this, func, resolver)

创建一个将 `func` 的结果进行记忆化的函数。如果提供了 `resolver`，它将根据提供给记忆化函数的参数确定用于存储结果的缓存键。
默认情况下，记忆化函数使用提供给它的第一个参数作为映射缓存键。`func` 使用记忆化函数的 `this` 绑定进行调用。

**注意：** 缓存以 `cache` 属性的形式暴露在记忆化函数上。可以通过将 `memoize.Cache` 构造函数替换为一个实例实现了 [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object) 方法接口的对象来自定义其创建方式，包括 `clear`、`delete`、`get`、`has` 和 `set`。

#### Since

1.0.0

#### Arguments

`func(Function)`: 要进行结果记忆化的函数。

#### Returns

void

#### Example

```javascript

```
