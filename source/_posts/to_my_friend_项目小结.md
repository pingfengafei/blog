---
title: to my friend 小项目总结
date: 2016-11-04 18:49:21
tags: 
---


写在最前面：
一直想找个云服务器玩一玩。一些日子前下定决心买一个试试。一顿折腾后发现了新大陆，架了VPN，突然想到，放个页面到云上也不错。

### 选择哪家云
国内阿里云很稳定，但是因为墙和价格，最终放弃。国外最先选中了AWS EC2，AWS一上来就让绑定信用卡，听说不少人被恶意消费掉了很多钱，因此又作废。DigitalOcean和LiNode最终选择了前者，送了10美刀，开了2个服务器，一个在SFC，一个在新加坡。新加坡连公司速度还行，服务器上访问主流网站简直是光速，之前每天大约会断4，5次，最近貌似好了。吐槽一句，家里用的是宽带通，访问服务器，说多了都是泪。未来很有可能尝试liNode.（后续添加），liNode不适合自己。


### 选择哪个操作系统
ubuntu16.0.4 我的地盘听我的。

### 架设VPN
1:[官方开启PPTP](https://www.digitalocean.com/community/tutorials/how-to-setup-your-own-vpn-with-pptp)
2：[mac vpn](http://jingyan.baidu.com/article/84b4f5653067d360f6da32cf.html)
想抽自己2巴掌，刚写的重启服务器后自动启动PPTP教程遗失了。

### 写个前端页面
##### 前端页面用到的技术栈
UI: React + ReactDOM
路由：React-router
数据管理 ： Redux + Immutable
脚手架工具 ： npm + webpack
其他通用工具：babel + eslint + ReduxDevTool + ReactDevTool
异步： fetch + promise

##### 前端架构
写个简单页面可以用不到上面的技术，但是作为一个前端，接受组件化思想后，写出来的页面要可维护，好扩展。
![页面架构图](http://7xne0t.com1.z0.glb.clouddn.com/%E6%9E%B6%E6%9E%84%E5%9B%BE.png)
page ：每一个页面即为一个page
container：容器组件，Redux写在container里，管理多个component
component：展示组件

经过博文的提点，我们认为一个container就是一个container是错误的。项目中发现，页面比较复杂是，container变得巨大无比，缺乏维护性。不如按逻辑拆成多个container，每个container dispatch事件和数据，container之间通过redux通信。componet即为展示组件。`个人认为，在不断细拆分组件和保持保持一定的组件杂糅之间折中，是一门艺术。`

### 接口设计
按照RESTful设计规范，使用fetch和promise解决异步。目前用不到身份验证和异常处理，因此这一部分处理的很简单。


### 后台设计
重头戏来了，之前完全不了解后台，摸索了2个礼拜后，居然写出了个小后台。

##### 后端用到的技术栈
服务器：koa koa-server
数据库：mongo
异步：generator + promise
爬虫：superagent + cheerio

##### 数据库
1：数据库设计
想法很简单，爬百度贴吧数据，保留四个字段：

    title ：帖子名
    star ： 被跟帖数量
    link ： 帖子的url链接
    date ： 最后回帖时间
数据没什么价值，仅当练习。
2：mongo数据库的增删改查
自己写了个简单的驱动，先截断仅仅是满足了需求而已

    var MongoClient = require('mongodb').MongoClient;
    // Connection URL
    var url = 'mongodb://localhost:27017/reptile';

    var insertDocuments = function (db, connectionName, data, callback) {
      var collection = db.collection(connectionName);
      collection.insertMany(data, function (err, result) {
        callback(result);
      });
    };

    var findDocuments = function (db, callback) {
      var collection = db.collection('baidutieba');
      collection.find({}).toArray(function (err, docs) {
        callback(docs);
      });
    };

    var removeDocument = function (db, callback) {
      var collection = db.collection('video');
      collection.remove({}, function (err, result) {
        callback(result);
      });
    };

    var updateDocument = function (db, callback) {
      var collection = db.collection('video');
      collection.updateOne({a: 2}
        , {$set: {b: 1}}, function (err, result) {
          callback(result);
        });
    };

    var dropDocument = function (db, callback) {
      var collection = db.collection('video');
      collection.drop(null, function () {
        console.log('drop video');
      });
    };

    var mongoDriver = {
      koaConnection: function (callback) {
        return MongoClient.connect(url, function (err, db) {
          assert.equal(null, err);
          findDocuments(db, function (data) {
            callback(data);
            db.close();
          });
        });
      },

      writeToConnection: function (connectionName, data, callback) {
        return MongoClient.connect(url, function (err, db) {
          assert.equal(null, err);
          insertDocuments(db, connectionName, data, function () {
            callback();
            db.close();
          });
        });
      }
    };

    module.exports = mongoDriver;

##### 爬虫
基本思路：用superagent爬取数据，用cheerio清洗数据，用上面main的驱动写到数据库里。

    var superagent = require('superagent');
    var charset = require('superagent-charset');
    var cheerio = require('cheerio');
    var async = require('async');

    var fs = require('fs');
    var request = require("request");
    var result = [];
    var pageUrl = [];

    charset(superagent);

    var mongoDriver = require('./server/mongodbApp');

    pageUrl.push('http://tieba.baidu.com/f?kw=%BA%A3%D4%F4%CD%F5&fr=ala0&tpl=5');

    function start() {
      pageUrl.forEach((url, index) => {
        superagent.get(url).end((err, res) => {
          console.log(url);
          if (err) {
            console.log('error');
          } else if (res) {
            var $ = cheerio.load(res.text, {decodeEntities: false});
            var contentList = $('body .j_thread_list');

            console.log(contentList.length);
            for (var i = 0; i < contentList.length; i++) {
              let obj = {
                star: 0,
                title: '',
                url: '',
                date: ''
              };

              var $liContent = cheerio.load(contentList[i], {decodeEntities: false});

              obj.star = $liContent('.threadlist_rep_num').html();
              obj.title = $liContent('.threadlist_title>a').html();
              obj.url = 'tieba.baidu.com' + $liContent('.threadlist_title > a').attr('href');
              //百度里是最后的回复时间
              if (!$liContent('.threadlist_reply_date').html()) {
                obj.date = null;
              } else {
                obj.date = $liContent('.threadlist_reply_date').html().match(/\d\d:\d\d/)[0];
              }
              result.push(obj);
            }
            console.log(result);

            mongoDriver.writeToConnection('baidutieba', result, function () {
              console.log('write to baidutieba success');
            });
          }
        });
      });
    }

    start();

在爬另一个编码为gb2312网页时中文显示为乱码。
[我的解决方法](https://segmentfault.com/q/1010000007716929?_ea=1431934)


##### 服务器
逼着自己放弃express，投入koa怀抱。

    var koa = require('koa');
    var router = require('koa-router')();
    var cors = require('koa-cors');
    var mongoDriver = require('./mongodbApp');
    var app = new koa();
    //一键搞定跨域
    app.use(cors());
    router.get('/video', function*(next) {
        this.body = yield new Promise(function (resolve, reject) {
          mongoDriver.koaConnection(function (data) {
            resolve(data);
          });
        }).then(function (data) {
          return data;
        });
      });
    app.use(router.routes()).use(router.allowedMethods());
    app.listen(3000, () => {
        console.log('koa start!');
    });

### 最终效果：
![](http://7xne0t.com1.z0.glb.clouddn.com/%E6%9C%80%E7%BB%88%E6%95%88%E6%9E%9C.png)

### 补充：服务器端部署
没想到部署到服务器上也够我喝上一壶。遇到问题有3个：
1：如何本地写好代码后，一键部署到服务器上。现在还不知道，靠手工scp
2：服务器上npm install 报killed错误。因为512M内存不够用。使用了swap。
3：npm run build后，我的电脑可以打开，其他电脑不能打开。经过分析，是redux-dev-tool问题。通过环境变量一顿折腾后解决问题。

### 再补充
仿照阿里的rc组件库，手写了个乞丐版本的分页组件，同时写好了分页接口。but，发现自己不会写数据库分页查询。网上找到的绝大多教程都是node-mongose，于是想了个蠢方法，让接口看起来支持分页查询。。。。

最终效果：


### 后记：
至此，前后端打通。自我膨胀一波。接下来需要改进的地方：
1：理解generator。服务器代码里的generator函数，是我试了一个晚上试出来的，到现在我还没搞懂为什么是这样的。为此，我显示回味了一遍generator函数语法逻辑，然后看了一眼《深入浅出NodeJS》里的异步章节，还是搞不懂，于是又看了一眼koa-router源码，koa源码，co源码，手动实现了一遍基础版co。虽然猪坚强，但是还是没搞懂。

2：改进driver，现在的driver只能说能用，回调嵌套回调，想改写成promise方式，或者未来熟悉了generator，用generator也说不定。

3：贴啊只是练手，接下来去扒一扒另一个网站，送给朋友们。
