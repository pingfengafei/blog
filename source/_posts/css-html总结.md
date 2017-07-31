title: css_html总结
date: 2015-10-15 08:05:38
tags:
---
**IE盒子模型 vs w3c标准盒子模型**
![](http://7xne0t.com1.z0.glb.clouddn.com/20094219263340677801[1].jpg)

![](http://7xne0t.com1.z0.glb.clouddn.com/20094219263343777802[1].jpg)

`为什么博客网站图片都要防外链呢？还好哥有七牛图片云存储`

`IE盒子宽度 = content_width + 2*（padding-left + border-left）；假设left right数值一样
w3c盒子宽度 = content_width;`

```script
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>IE盒子模型 vs W3C盒子模型</title>
</head>
<style>
	div{
		width:200px;
		height:100px;
		margin:20px;
		padding: 20px;
		border: solid 10px green;
		background-color: white;
	}
</style>
<body>
	<div>我快要连div标签都快不会写了</div>
</body>
<script>
	var myDiv = document.createElement('div');
	myDiv.innerHTML = '我是新创建的div';
	myDiv.style.width = '100px';
	myDiv.style.height = '100px';
	myDiv.style.border = 'solid 1px red';
	myDiv.style.padding = '10px';
	myDiv.style.margin = '20px';
	document.body.appendChild(myDiv);

	var doc = document.getElementsByTagName('div');
	alert(doc[0].offsetHeight);//160px
	alert(doc[1].offsetHeight);//122px
</script>
</html>
```

那么问题又来，如何获得margin padding值？