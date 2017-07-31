---
title: 原生nodejs爬mdn
date: 2017-07-31 12:07:51
tags: ['frontend', 'nodejs', 'reptile']
---

作者的一道题目：<br>
nodejs爬https://developer.mozilla.org/zh-CN/docs/Web/API, 把所有api对用的html文档保存在本地。


作者推荐使用node-fetch，cherrio，super-agent。因为我用过上述三者爬虫，这次打算使用原生api开发，刚好
测试一下最近学习的正则表达式有没有长进。

原材料 ： https + fs + es6 + nodeV8.21

### promise是上帝，promise是魔鬼
promise是上帝，只要是异步，完全可以用promise替代毁掉函数；promise是魔鬼，只要用了promise就得全盘用promise

自己对promise在实际使用中的理解 <br>
callback promise化<br>
普通回调函数写法：
```javascript
function myAwesomeAsyncMethod(callback){
  http.get('url', (res)=>{
    if(some condition){
      callback('success')
    }else{
      callback('error')
    }
  })
}
```
promise化回调函数：
```javascript
function myAwesomeAsyncMethod(callback){
  return new Promise((resolve, reject)=>{
    http.get('url', (res)=>{
      if(some condition){
        resolve('success')
      }else{
        reject('error')
      }
    })
  })
}
```
如果用了promise需要全盘使用promise
这一点让人很不爽，一旦用了promise，代码中其他的异步操作统统需要promise化。

promsie配合async await一起用
单纯的用promise和Promise.then一步步链式调用本质上和callback并没有太大区别，但是配合async await则
可以将异步函数改造成形式上的同步函数， 举个板栗：
```javascript
let fetchWebApi = async (url) => {
  let data = await fetch(url)
  let apiList = getApiList(data)

  let fetchAndSave = (apiName) => {
    return new Promise(async (resolve, reject) => {
      let data
      try {
        data = await fetch(`https://developer.mozilla.org${apiName}`)
        await  writeToLocal(apiName, data)
        resolve()
      } catch (e) {
        console.log('error')
        reject()
      }
    })
  }

  let count = 0
  console.log('apiList length : ' + apiList.length)
  while (count < apiList.length) {
    try {
      let subApiList = apiList.slice(count, count + 100)
      let tmp = []
      for (let i = 0; i < subApiList.length; i++) {
        tmp.push(fetchAndSave(subApiList[i]))
      }
      await Promise.all(tmp).then((result) => {
        count += subApiList.length
      })
    } catch (e) {
      console.log('error ' + e)
    }
  }
  stats(resultList)
}

fetchWebApi(url)
```
理由很简单： await修饰的函数必须要promise化。需要注意的是，使用到await的函数必须是async,
promise是promise，async是async，二者promsie对象接受的函数当然也可以用async修饰，参照fetchAndSave方法。


### https请求
如果目标url是http，需要使用http模块，如果是https，需要使用https模块。使用http模块调用
https url会报错。

实际问题中遇到重定向问题。[300, 400）之间的状态码是重定向，又细分301的永久重定向和302的临时重定向。对于2者和搜索引擎
的纠葛在此不做深入探讨。对于需求，只需要获取重定向后的url内容即可。
```javascript
await fetch(res.headers.location)
```
`res.headers.location`中包含了重定向的url

获取数据用到的data事件很有趣，返回的data应该对应http的一个请求包。一堆请求包组成一个html文档。

### 清洗html文档，提取apiList
当获取完成包含api的html文档后，下一步是要提取apiList。cherrio是node的jquery,api和jquery，zepto大同小异。
但是我们的目标是<s>没有蛀牙</s>不使用第三方库。我改怎样做呢？

request.get返回html文档的字符串，如果在浏览器端，会被浏览器解析成dom树。服务端并不需要解析成dom树，只要从字符串中提取
api的路径。

一开始观察，发现关键字段在`<code>API</code>`中，正则用：
```javascript
let reg = /<code>.+?<\/code>/ig  //惰性匹配
```
注意全局搜索和利用?实现惰性匹配，否则会将开头的`<code>`和结尾`</code>`之间的所有字符串一次性匹配。


坑爹是的，code之间的字段并不能100%当时api的路径，老老实实用href里的字段，
```javascript
let reg = /"\/zh-CN\/docs\/Web\/API\/.+?"/ig
```
自从刷了hackerrank里的大部分正则基础题后，写这些正则变得砍瓜切菜一样简单。

### 分布提取api文档
一共有748个api，如果for循环一次性请求会挂掉。从作者那里偷学了while用法：
```javascript
while(some condition){
  await Promise.all(partOfApiList)
}
```
这里，Promise.all接受一个数组，数组的每个元素都是promise对象。于是又要promise化。

### 为什么只写入了747个文档？
可能是99%的情况下永远少写入一个文档，只有一次测试的时候，5个请求写入3个文档，其他都是写入4个文档。测试很久之后才反应过来，
fs.writeFile也是个异步方法，需要promise化。


至此，爬虫遇到的主要难点都写完了，我们实现了纯nodejs api爬虫。

附录：百行代码就不开git仓库了：
```javascript
/**
 * Created by pingfengafei on 2017/7/30.
 * pure node.js api without any third part library
 *
 */

const https = require('https')
const fs = require('fs')

const url = 'https://developer.mozilla.org/zh-CN/docs/Web/API'
const dir = './web-api'
const resultList = []

let fetch = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, async (res) => {
      if (res.statusCode !== 200) {
        if (res.statusCode >= 300 && res.statusCode < 400) {
          let data = await fetch(res.headers.location)
          resolve(data)
        } else {
          reject('error code ' + res.statusCode)
        }
      } else {
        let responseData = ''
        res.on('data', (data) => {
          responseData += data
        })
        res.on('end', () => {
          resolve(responseData)
        })
      }
    })
  })
}

let getApiList = function (content) {
  //let reg = /<code>.+?<\/code>/ig  //惰性匹配  枣糕，code不是精确匹配
  let reg = /"\/zh-CN\/docs\/Web\/API\/.+?"/ig
  let arr = []
  let apiList = []
  while (arr = reg.exec(content)) {
    apiList.push(arr[0].substring(1, arr[0].length - 1))
  }
  return apiList
}

let writeToLocal = async (title, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${dir}/${title.substring(20, title.length)}`, content, (err) => {
      let obj = {}
      if (err) {
        obj = {
          status: 'error',
          api: title
        }
        reject()
      } else {
        obj = {
          status: 'success',
          api: title,
          path: `${dir}/${title}`
        }
      }
      resultList.push(obj)
      resolve()
    })
  })
}

let stats = (list) => {
  //todo 调查实际是748，最后却只输出了747个文档
  console.log('resultList length : ' + list.length)
  fs.appendFile('./stats.json', JSON.stringify(list), (err) => {
    if (err) {
      console.log(err)
    }
  })
}

let fetchWebApi = async (url) => {
  let data = await fetch(url)
  let apiList = getApiList(data)

  let fetchAndSave = (apiName) => {
    return new Promise(async (resolve, reject) => {
      let data
      try {
        data = await fetch(`https://developer.mozilla.org${apiName}`)
        await  writeToLocal(apiName, data)
        resolve()
      } catch (e) {
        console.log('error')
        reject()
      }
    })
  }

  let count = 0
  console.log('apiList length : ' + apiList.length)
  while (count < apiList.length) {
    try {
      let subApiList = apiList.slice(count, count + 100)
      let tmp = []
      for (let i = 0; i < subApiList.length; i++) {
        tmp.push(fetchAndSave(subApiList[i]))
      }
      await Promise.all(tmp).then((result) => {
        count += subApiList.length
      })
    } catch (e) {
      console.log('error ' + e)
    }
  }
  stats(resultList)
}

fetchWebApi(url)
```