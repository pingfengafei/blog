title: getElementsByClassName
date: 2015-10-16 16:01:35
tags:
---

今天室友们都被某家创业公司请去喝咖啡了，而我只能苦逼的整理着前端试题。
缘分尽在一线，有时候就是试卷上的一道题目吧。

题目描述：获得document下的class = ‘div1’标签。

IE浏览器 ： 不支持getElementsByClassName，需要自己撸。
火狐浏览器 ： 原生getElementsByClassName。

很久以前自己写一个getElementsByClassName方法，无奈时间久远忘记.className这个API了。一次面试机会就这样没了。

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>

<style>
	div{
		width : 100px;
		height : 50px;
		background : yellow;
		margin-bottom: 10px;
	}

</style>

<body>
	<div class="div1"></div>
	<div class="div2"></div>
</body>

<script>
	var elementList = getElementsByClassName('div1');
	for(var i = 0; i < elementList.length; i++)
		elementList[i].style.background = 'red';

	function getElementsByClassName(src){
		var elementList = [];
	    if(document.getElementsByClassName(src))
	 		return elementArray = document.getElementsByClassName(src);
		 else{
			var  tagList = document.getElementsByTagName('*');
			var tmpList = [];
			for(var i = 0; i < tagList.length; i++){	
				//continue不是求值语句，但是我就是想用三元表达式
				tagList[i].className == src ? tmpList.push(tagList[i]) : 'continue' ;
			}
			return tmpList;
		 }
	}
</script>

</html>
```