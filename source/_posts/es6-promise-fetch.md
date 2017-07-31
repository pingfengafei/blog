---
title: es6 promise && fetch
date: 2016-10-17 18:45:07
tags:
---


初次看阮一峰写的es6 promise和MDN文档里写的promise总有点云里雾里的感觉，一方面是自己心浮气躁，更多的是自己火候没到。自己看了个总结很好的es6 promise总结[谈谈 ES6 的 Promise 对象](https://segmentfault.com/a/1190000002928371)。
Talk is cheap, show me the code：
```js
function testPromise(src) {
	return new Promise((resolve, reject) => {
		if (src === 'hello') {
			resolve(src);
		}
		else {
			reject(src);
		}
	});
}

testPromise('hello world').then((src)=> {
	console.log(src);
}, (src)=> {
	console.log(src);
});
```
promise对象有三种状态：pendding,fulfilled和rejected状态。初始化创建一个promise对象，其状态为pendding，promise对象的参数是一个函数，该函数有2个参数，第一个是resolve，第二个是reject。这2个参数都是函数。调用resolve函数，会将pendding状态变成fulfilled状态，调用rejected函数会变成rejected状态。如果是fulfilled,则调用then的第一个函数参数，rejected调用then的第二个函数参数。then方法返回一个新的promise对象（此时新的对象为pendding），一路链式调用then下去。
`attention :`
```js
    then(resolve).catch(reject);
    等价于
    then.(resolve).then(null, reject);

```
工程中，异步调用通常会在请求后台API接口。在想去，一招jQuery.ajax+回调函数吃遍所有接口。现在featch是个更好的选择。
BOM window提供了fetch接口,返回一个promise对象，nice，可以和promise组合使用了。

`为什么要用fetch取代XMLHttpRequest`？
`featch(url,option)`
原始的featch写法：
````js
//原始config
url = 'www.baidu.com';
options = {
	method : 'post',
	headers : {
		'Content-Type' :'application/json',
		'Authorization' : `JWT ${token}`,
		'Acception' : 'application/json'
 	}，
 	body:json.stringfy(payload)
}
fetch(url, options).then();
```
fetch还有`request`,`header`,`response`对象，但是我不喜欢这些对象，层层用类抽象，最终等价于url和options参数。不如后者来的简单直接。

现在fetch还不支持全系IE浏览器，chrome从42版本开始，safari从10开始。脊梁吓出了一身冷汗，现在mofa后端用的是fetch。还好用了pollyfill :[whatwg-fetch](https://github.com/github/fetch).