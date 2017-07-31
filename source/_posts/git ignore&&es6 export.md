title: gitignore无法ignore问题解决 && es6的import带不带{}
date: 2015-11-02 15:56:47


###.gitignore无法ignore问题解决 && es6的import带不带{}
webstorm会给项目自动生成一个.idea文件夹，第一次创建项目并上传到github，没有注意到.idea文件也被上传上去。再次编辑文件并上传时发现了.idea文件也做了修改：


    modified:   .idea/workspace.xml
	modified:   components/Counter.js
	modified:   reducers/counterReducer.js

在.gitignore中添加配置项：

    #ignore .ignore files
    #.ignore
    #ignore node_modules
    /node_modules/*
    .idea

然而似乎.gitignore似乎失效了，每次修改后还是会提示modified了.idea文件。<br />
查证资料：如果一个文件已经存在于git远程仓库中，向.gitignore中添加配置项会失效（有人说这是git bug）。
删除远程git仓库代码：

    git rm -r —cached  .idea
    git commit -m 'delete file'
    git push origin master
再次编辑文件，.gitignore就能正常工作了。

最近写代码时，总是纠结import出来的结果要不要带{}，又听工友说

    if （export var a = 1）
        import {a}
    if（export default var a = 1）
        import a
今天早上为此纠结了很久，下午看了下阮一峰的es6入门，看到模块这一章节才恍然大悟：
正常export出来的模块都需要{}，export default出来的模块不需要添加。比如：

    export default function a（）{}
    import a from 'filepath'

这是因为default出一个默认模块，其他模块调用时随便给这个文件起个名字就行，例如：a <br />
古人云： 学而不思则罔，思而不学则殆。诚不欺余！