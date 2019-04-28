---
title: understand compose and pipe in JS
date: 2019-04-28 15:29:55
tags:
---

在`redux`源代码中看到`compose`辅助函数
```js
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```
我对这里的`compose`函数感兴趣, compose的定义是，给定一个内部元素为函数（除了最后一个函数外，其它函数都只接受一个参数）的数组，从右往左依次执行，最终返回结果。和`pipe`函数相反。很长一段时间我不能理解`compse`函数，what a pity~

```js
const add10 = x => x + 10
const minus5 = x => x - 5
const multi3 = x => x * 3
const div2 = x => x / 2 
const num = 10
```
期望`compose(add10, minus5, multi3, div2)(num)`等价于：`add10(minus5(multi3(div2(num))))`

用数学归纳法推算规则
```
compose1 = add10 = x => x + 10
compose2 = y => compose1(minus5(y)) = y => ( x => x + 10 )(minus5(y)) = y => add10(minus5(y))
compose3 = z => compose2(multi3(z)) = z => (y => ( x => x + 10 )(minus5(y)))(multi3(z)) = z => add10(minus5(multi3(z)))
```
综上，
```
    composeN = (...args) => compsoeN-1(fun(...args))
```
容易用reduce得出最优雅的js compse写法： 
```
    [add10, minus5, multi3, div2].reduce((a,b)=> (...args) => a(b(...args)))
```
也就是`redux compose`的写法. 由于目的是从右往左执行函数，中间步骤一定会被记录，有可能会导致栈溢出。
```
   const compose =  Array.from({length: maxLenght }).map( x => x => x + 1).reduce((a,b)=> (...args)=> a(b(...args)))
```

测试到6000的时候（非精确值）报`VM271:1 Uncaught RangeError: Maximum call stack size exceeded`

理解了compose再回头看看pipe： 
```
const add10 = x => x + 10
const minus5 = x => x - 5
const multi3 = x => x * 3
const div2 = x => x / 2 
const num = 10

const chains = [add10,minus5,multi3,div2]

const compose = chains.reduce((a,b) => (...args)=> a(b(...args)))
const pipe = chains.reduce((a,b) => (...args) => b(a(...args)))
```
