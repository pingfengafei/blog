---
title: 回掉函数和promise
date: 2017-03-04 18:38:48
tags:
---

对个人而言，刚开始学习js，最难的一点在理解回调函数上。滑稽与可笑，前端一年半了，在昨天晚上回去的路上才想通了回调函数，算是打通了js的任督二脉吧。

所谓回调函数，即在函数返回时被调用的函数。在js中函数可以为当做参数传递。简单的例子：

```
function b(callback){
    var src = 'hello world';
    //b do other steps;
    //返回时调用了一次callback，即a函数
    return callback(src);
}
b(a);
//匿名函数也一样
b(src=>console.log(src))
```

知乎上看到一个很有趣的理解回调函数的例子：

我去商店买东西，没有了，我给商店留下了电话号码。这里，电话号码就是回调函数。东西到货了，商家打电话给我。打电话这个过程就叫调用回调哈数。

打通理解回调函数后，es6的promise就好理解了：

Promise对象接受一个回调函数作为参数，该回调函数接受2个回调函数作为参数，第一个为pennding->sucess时调用，第二个参数为pending->failed时调用的；

```
var time = function(time){
    return new Promise((sucess, failed)=>{
        setTimeout(sucess, time,['hello','world','pingfengafe']);});
}
time(1000).then(src=>console.log(src));
```