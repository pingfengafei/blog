---
title: react autoFocus问题总结
date: 2016-11-23 18:50:04
tags:
---

# react autoFocus问题总结

标签（空格分隔）： react

---

有个组件，展开时`input`需要自动focus.

    <MyComponent>
        <input autoFocus = {true} />
    </MyComponent>

这样在组件加载后（componentDidMount）input可以自动focus了。
测试后发现，focus只会在`mounted`后触发，当nextProps来了之后就不能autoFocus了。

解决办法：

    class MyComponent exetends React.Component{
        componentWillReceiveProps(nextProps){
             //make sure render returned before following code
             this.refs.input.focus();
        }
        componentDidMount(){
            this.refs.input.focus();
        }
        render(){
        <input ref = "input"/>
    }
组件加载完成和收到nextProps后都调用一次focus(), ==,好像有更好的解决办法，=我查看一下react生命周期。15.4里`componentDidUpdate()`是个更好的选择。
