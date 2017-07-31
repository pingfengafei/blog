title: js变量提升
date: 2015-10-09 17:40:51
tags:
---
js变量提升是什么？为什么？
和C++、java、C不同，js没用块级作用域
{
    var i = 1;
}
console.log(i); // 1

js变量提升：
1：变量申明提升，定义不提升。
2：函数申明提升，定义不提升。因为函数有表达式形式，和函数形式，2者需要分别对待。

1；变量提升
```javascript
	function foo(){
		console.log(a);
		var a = 10;
	}
	foo(); //undefined
```
```javascript
等价于：
	function foo(){
		var a;
		console.log(a);
		 a = 10;
	}
	foo();
```
ps，如果a没有申明输出结果是：
```javascript
Uncaught ReferenceError: a is not defined
```

在[segmentfault](http://segmentfault.com/a/1190000002904707)上看到一段挺有趣的代码：
```javascript
var goo = "hello";
function foo(){
  if(true){
    goo = "world";
  }else {
    goo = "world";
  }
}
foo();
console.log(goo); //world
```
foo 函数内的goo是全局变量
```javascript
var goo = "hello";
function foo(){
  if(true){
    goo = "world";
  }else {
    var goo = "world";
  }
}
foo();
console.log(goo); //hello

```
感谢变量提升。foo函数等价于：
```javascript
```javascript
var goo = "hello";
function foo(){
  var goo；
  if(true){
    goo = "world";
  }else {
    goo = "world";
  }
}
foo();
console.log(goo); //hello
```
这时候foo()内的goo编程了函数内部局部变量。

2:函数提升
函数提升有点意思。众所周知js中函数有2中形式存在。
`function foo(){}`和`var foo = function(){}`

```javascript
	foo(); //1
	bar(); //Uncaught ReferenceError: bar is not defined
	function foo(){
		console.log(1);
	}
	var foo = function(){
		console.log(2);
	}
```
可见，普通函数形式被提升，表达式形式的函数不会被提升。