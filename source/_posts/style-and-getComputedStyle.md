---
title: .style and getComputedStyle
date: 2017-03-04 18:49:21
tags:
---

#.style vs window.getComputedStyle
```
    <div className="filter-header-tabs" ref="filterHeaderTabs" style={{'width': '500px'}}>
```
```
 .filter-header-tabs {
    display: inline-block;
    width: 85%;
    min-width: 660px;
```
```
console.log(window.getComputedStyle(this.refs.filterHeaderTabs).width); // 660px
console.log(this.refs.filterHeaderTabs.style.width); // 500px
```
总结：
1：.style只能获得div标签上的style，无法获得css内的style和真实的style, 未设置的style都是`""`
2：window.getComputedStyle获取的是节点的真实style

#getDOMNode() vs findDOMNode() vs this.refs
从react14版本开始，getDOMNode被遗弃，使用findDOMNode替代
`With this change, we’re deprecating .getDOMNode() and replacing it with ReactDOM.findDOMNode (see below). If your components are currently using .getDOMNode(), they will continue to work with a warning until 0.15.`
##findDOMNode()和this.refs的区别
14版本又说了：
`Starting with this release, this.refs.giraffe is the actual DOM node`
从这个版本开始，this.refs等同于真实的dom节点，也就是说（部分地）， findDOMNode9()等同于this.refs
14版本又说了：
`Note that refs to custom (user-defined) components work exactly as before; only the built-in DOM components are affected by this change.`

总结：
1：在dom节点（div, p, span...）上用findDOMNode()等同于this.refs
2：在React组件上用，this.refs获取的是组件的引用，findDOMNode()获取的是组件的dom树

作用在dom节点上
```
<div className="filter-header-tabs" ref="filterHeaderTabs">
//<div class="filter-header-tabs">...</div>
console.log(ReactDOM.findDOMNode(this.refs.filterHeaderTabs));
//<div class="filter-header-tabs">...</div>
console.log(this.refs.filterHeaderTabs);
```
作用在React组件上
![](http://7xne0t.com1.z0.glb.clouddn.com/refs.png)