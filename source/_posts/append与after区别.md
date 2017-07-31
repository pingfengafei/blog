layout: js
title: append与after的去呗
date: 2015-11-04 16:25:26
tags:
---
JQuery点滴
append vs after
Talk is cheap，show me the code！
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
</head>
<body>
	<div class="append">append</div>
	<div class="after">after</div>
	<script>
		$('.append').append('<p>this is test append</p>');
		$('.after').after('<p>this is test after</p>');
	</script>
</body>
</html>
```
![append vs after](http://7xne0t.com1.z0.glb.clouddn.com/append%20vs%20after.jpg)
查看DOM结构可知，append是附加到内容里面，after是附加到内容后面