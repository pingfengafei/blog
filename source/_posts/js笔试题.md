title: js笔试题
date: 2015-10-13 18:25:01
tags:
---
笔试时遇到这样一题：
js once函数。
通过js来实现一个函数once，这个函数在整个应用运行的时候只被访问一次。如果再次访问就会访问上次的执行结果。
当时写了类似的方法，网上找了一个思路类似，但更漂亮一些的代码。
```javascript
	var instance;
	function once(src){
		var num = Math.random();
		function init(){
			return num;
		}
		if(!instance)
			instance = init();
		return instance;	
	}
	console.log(once());
	console.log(once());
```
应付面试题，答案已经有了，但是这里定义了一个全局变量，其实，不是我很想看到的，那么有没有非全局变量的方式呢？

撸一个script代码，检测页面上输入框，内容是A-Z，a-z是不改变，其他内容是输入框背景颜色变成红色。
难点，js代码，不能用jquery，正则表达式。
```script
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	 <input type="text" name="input" id="input" value="121" />
	 <input type="button" onclick="getInputValue()" value="输入按钮">
</body>
<script>
	function getInputValue(){
		var value = document.getElementById("input").value;
		//reg表达式多打磨打磨
		var reg = /^[A-Za-z]+$/; 
		if(!reg.test(value))
		//哎，笔试的时候把js写法和jquery写法混淆了
		document.getElementById("input").style.background = 'red';
		else
			alert('输入正确');
	}
</script>
</html>
```
js正则表达式
老秦课上Reg挺得云里雾里，尼玛现实中发现真是好用啊。可惜好用有什么用？哥又不会。。。。