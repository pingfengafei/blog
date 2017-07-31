---
title: js 的类与继承
date: 2017-07-31 12:07:51
tags: ['frontend', 'inherit']
---


js的继承真是天坑，看过红宝书的原型链和继承章节不知所云。各种继承方式，颇有种乱花渐欲迷人眼的感觉。

es6的class和extends给了我一丝曙光。

```
class Foo {
  constructor(name){
    this.name = name
  }
  sayHello(){
    console.log(`super name is ${this.name}`)
  }
}

class Bar extends Foo{
  sayHello(){
    super.sayHello()
    console.log(`sub name is ${this.name}`)
  }
}

var bar = new Bar('aaa')
bar.sayHello()
```
这个简单例子包含了类，继承和调用父类。麻雀虽小却五脏俱全。不知道有没有人想的和我一样，类
只是个语法糖，在现有的环境下还是要被babel转换成es5的原型链继承方法。

wait,`被babel转换成es5的原型链继承方法`，babel翻译后的一定是优秀的继承方式，我仿佛找到了onepiece

先看看babel如何翻译Foo
```angular2html
'use strict' //严格模式

var _createClass = function () {
  function defineProperties (target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
}()

function _classCallCheck (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var Foo = function () {
  function Foo (name) {
    _classCallCheck(this, Foo)

    this.name = name
  }

  _createClass(Foo, [
    {
      key: 'sayHello',
      value: function sayHello () {
        console.log('super name is ' + this.name)
      }
    }])

  return Foo
}()

```

深入代码理清逻辑：
```angular2html
var Foo = function(){}()

```
还有这种写法？？？匿名函数先赋值给Foo，Foo和()结合在一起，执行Foo

看看关键函数`_createClass`

```angular2html
var _createClass = function () {
  function defineProperties (target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
}()
```
背后的原理：
```angular2html
Foo.prototype.key = value
Foor.key = value //静态方法

```

再看看继承
```angular2html
function _inherits (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass)
  }
  subClass.prototype = Object.create(superClass && superClass.prototype,
    {constructor: {value: subClass, enumerable: false, writable: true, configurable: true}})
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass
}

```


### 回味原型链和继承
对象都有一个私有属性`[[prptotype]]`,attention,这个私有属性有别于`prototype`,通常私有属性实现时用__proto__替代。
每个对象都有__proto__
函数对象拥有prototype对象，函数也是对象，自然也拥有__proto__

object.__proto__指向object的原型
object.prototype指向object的原型对象 ？？？


`Object.defineProperty`
`Object.create`
`Object.getPrototypeOf`
`Object.setPrototypeOf`

