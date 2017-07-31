title: 搭建github博客走过的路
date: 2015-10-09 22:46:10
tags:
---

搭建github博客走过了不少歪路子，就在刚刚还踩了一个坑。
搭建博客用到的相关：gitbash,node.js, hexo,github pages 七牛云存储 md在线编辑器 markdown

不多述流水过程，写一写踩过的坑。

1：node.js npm安装module失败。
原因：缓存问题
删除`C:\Users\af\AppData\Roaming\npm-cache`文件夹里的全部内容

2:hexo无法编译yml文件
![](http://7xne0t.com1.z0.glb.clouddn.com/clipboard.png)
原因：yml语法错误,:后面必须要一个空格
![](http://7xne0t.com1.z0.glb.clouddn.com/clipboard2.png)
ps，图库来自[七牛](https://portal.qiniu.com/)图云存储，刚刚注册的新用户，挺好用的。

3:gitpages repository命令规则
完整的 repository name是pingfengafei.github.io

4源文件使用[md在线编辑器](https://www.zybuluo.com/)，实时生成预览图，挺好用的。我手指在键盘上飞舞着，配合红轴行云流水的操作，自我陶醉，TM我就是传说中的键盘小王子。兴奋中不能自己，于是习惯性的按``ctrl + s`,错误按成了`ctrl + w`。我想静一静，不要问我静静是谁。
