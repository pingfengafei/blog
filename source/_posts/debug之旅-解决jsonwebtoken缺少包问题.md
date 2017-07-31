---
title: debug之旅--解决jsonwebtoken缺少包问题
date: 2016-07-23 18:40:54
tags:
---

###debug之旅--解决jsonwebtoken缺少包问题。
最近倒腾一个带有实验性质的小程序用到jsonwebtoken。 <br />
npm install jsonwebtoken，引入包后出错：
```js
ERROR in ./~/dns/~/native-dns/lib/server.js
Module not found: Error: Cannot resolve module 'dgram' in /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/dns/node_modules/native-dns/lib
 @ ./~/dns/~/native-dns/lib/server.js 23:12-28

ERROR in ./~/dns/~/native-dns/lib/platform.js
Module not found: Error: Cannot resolve module 'fs' in /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/dns/node_modules/native-dns/lib
 @ ./~/dns/~/native-dns/lib/platform.js 23:9-22

ERROR in ./~/dns/~/native-dns/lib/utils.js
Module not found: Error: Cannot resolve module 'dgram' in /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/dns/node_modules/native-dns/lib
 @ ./~/dns/~/native-dns/lib/utils.js 21:12-28

ERROR in ./~/native-dns-cache/lookup.js
Module not found: Error: Cannot resolve module 'dgram' in /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/native-dns-cache
 @ ./~/native-dns-cache/lookup.js 21:12-28

ERROR in ./~/tap/lib/test.js
Module not found: Error: Cannot resolve module 'child_process' in /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/tap/lib
 @ ./~/tap/lib/test.js 31:12-36

ERROR in ./~/tap/lib/test.js
Module not found: Error: Cannot resolve module 'fs' in /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/tap/lib
 @ ./~/tap/lib/test.js 35:9-22

ERROR in ./~/graceful-fs/graceful-fs.js
Module not found: Error: Cannot resolve module 'fs' in /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/graceful-fs
 @ ./~/graceful-fs/graceful-fs.js 1:9-22

ERROR in ./~/mkdirp/index.js
Module not found: Error: Cannot resolve module 'fs' in /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/mkdirp
 @ ./~/mkdirp/index.js 2:9-22

ERROR in ./~/graceful-fs/fs.js
Module not found: Error: Cannot resolve module 'fs' in /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/graceful-fs
 @ ./~/graceful-fs/fs.js 3:9-22

ERROR in ./~/convert-source-map/index.js
Module not found: Error: Cannot resolve module 'fs' in /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/convert-source-map
 @ ./~/convert-source-map/index.js 2:9-22

ERROR in ./~/glob-stream/~/glob/glob.js
Module not found: Error: Cannot resolve module 'fs' in /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/glob-stream/node_modules/glob
 @ ./~/glob-stream/~/glob/glob.js 43:9-22

ERROR in ./~/clone-stats/index.js
Module not found: Error: Cannot resolve module 'fs' in /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/clone-stats
 @ ./~/clone-stats/index.js 1:11-24

ERROR in ./~/constants-browserify/constants.json
Module parse failed: /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/constants-browserify/constants.json Unexpected token (2:12)
You may need an appropriate loader to handle this file type.
SyntaxError: Unexpected token (2:12)
    at Parser.pp.raise (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:923:13)
    at Parser.pp.unexpected (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1490:8)
    at Parser.pp.semicolon (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1469:73)
    at Parser.pp.parseExpressionStatement (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1994:8)
    at Parser.pp.parseStatement (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1772:188)
    at Parser.pp.parseBlock (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:2009:21)
    at Parser.pp.parseStatement (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1753:19)
    at Parser.pp.parseTopLevel (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1666:21)
    at Parser.parse (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1632:17)
    at Object.parse (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:885:44)
 @ ./~/graceful-fs/polyfills.js 2:16-36

```
一堆错误，说的是缺少必要包。stackoverflow上仅有的几个回答，意思是说在webpack中添加node字段：
```js
node: {
        tap: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty',
        dgram: 'empty',
        child_process :'empty'
    },
```
上面添加了所有能忽略的字段，结果还是出现了问题：

```js
ERROR in ./~/constants-browserify/constants.json
Module parse failed: /Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/constants-browserify/constants.json Unexpected token (2:12)
You may need an appropriate loader to handle this file type.
SyntaxError: Unexpected token (2:12)
    at Parser.pp.raise (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:923:13)
    at Parser.pp.unexpected (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1490:8)
    at Parser.pp.semicolon (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1469:73)
    at Parser.pp.parseExpressionStatement (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1994:8)
    at Parser.pp.parseStatement (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1772:188)
    at Parser.pp.parseBlock (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:2009:21)
    at Parser.pp.parseStatement (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1753:19)
    at Parser.pp.parseTopLevel (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1666:21)
    at Parser.parse (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:1632:17)
    at Object.parse (/Users/pingfengafei/Desktop/learn_luo/redux-learn/node_modules/acorn/dist/acorn.js:885:44)
 @ ./~/graceful-fs/polyfills.js 2:16-36
```
到这里我已经不想再追究下去了，fs，net等都是node自带的核心包，一般不可能找不到，事出反常必有妖。对比了工友的和老项目的package.json文件，发现了思路：
```js
    npm install jsonwebtoken --save
    //安装的版本：
    "jsonwebtoken": "^7.1.6",
```
老项目用到的版本：
```js
"jsonwebtoken": "^5.4.1",
```
果断删除掉7.1.6版本，手动安装5.4.1版本。it works！

ps：配置node项最初是工友告诉我的，他配置后能够运行，但是到我这儿就不行了。初步怀疑是我用的package.json的安装包比较老，不兼容7.1.6版本。  magic！
