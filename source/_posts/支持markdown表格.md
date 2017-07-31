layout: hexo
title: hexo markdown支持表格
date: 2015-10-11 22:54:49
tags:
---
今天遇到md编写表格问题。本地预览无法正确显示表格。又是一番折腾。不过倒是理清楚了很多思路。
github page原生支持Jekyll,使用的md解析器是redcarpet，但是hexo不支持啊。hexo的做法，现在本地安装各种modules插件，然后一句`hexo generate`生成pulic文件夹。public里是纯网页文本。上传到repository中即可。

hexo使用`hexo-renderer-marked`解释器，开启支持tables，配置_comfig.yml文件：
```javascript
marked:
  gfm: true
  pedantic: false
  sanitize: false
  tables: true
  breaks: true
  smartLists: true
  smartypants: true
```
`ps:再次吐槽一下yml语法，marked前面不能有空格，联系到：后面必须有空格`。想一想也是醉了。

but，wait，配置好了，刷新页面，为什么还是无法显示表格？
联想到grunt watch文件，只有文件被改动后才会重新解析一遍文件。于是在md中加了个空行。
yes，it worked！
well done！！！