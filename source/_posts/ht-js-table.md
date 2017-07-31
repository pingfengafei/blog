title: ht_js_table
date: 2015-10-27 16:25:38
tags:
---

一张图解释table主要元素关系
![able](http://7xne0t.com1.z0.glb.clouddn.com/tr.jpg)
tr：表格一行
th：表格
tbody：表格单元内容集合
td：表格单元内容
操作表单样式有2种方式，css或者html内添加
个人觉得html内添加不够方便，被限制的地方比较多，还是css好
注意边框融合：
css：border-collapse：collapse；
html：ceilspacing="0"
attention:html中，border='1',等价于border="1px",solid red不起作用。

`html创建table + js动态添加tr`
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>table</title>
	<style>
		#table1{
			width : 400px;
			text-align: center;
			border-collapse: collapse;
		}
		#table1 th, #table1 td{
			border: 1px solid red;
		}
	</style>
</head>
<style>
</style>
<body>
	<table id="table1">
		<caption>test table 1</caption>
		<tr>
			<th>姓名</th>
			<th>学号</th>
			<th>成绩</th>
		</tr>
		<tbody id="mybody">
			<tr>
				<td>张三</td>
				<td>1</td>
				<td>100</td>
			</tr>
			<tr>
				<td>李四</td>
				<td>2</td>
				<td>90</td>
			</tr>
			<tr>
				<td>王五</td>
				<td>3</td>
				<td>80</td>
			</tr>
		</tbody>
	</table>

	<table id="table2" width="300" border="1px" cellspacing="0">
		<caption>test table 2</caption>
		<tr>
			<th>姓名</th>
			<th>学号</th>
			<th>成绩</th>
		</tr>
		<tbody>
			<tr>
				<td>张三</td>
				<td>1</td>
				<td>100</td>
			</tr>
			<tr>
				<td>李四</td>
				<td>2</td>
				<td>90</td>
			</tr>
			<tr>
				<td>王五</td>
				<td>3</td>
				<td>80</td>
			</tr>
		</tbody>
	</table>
</body>
<script>
	//js动态添加table内容
	var _tbody = document.getElementById('mybody');
	var _tr = document.createElement('tr');
	var array = ['tom', 4, 70];
	var td_array = [];
	for(var i = 0; i < 3;i++){
		var _td = document.createElement('td');
		var node = document.createTextNode(array[i]);
		_td.appendChild(node);
		_tr.appendChild(_td);
	}
	_tbody.appendChild(_tr);
</script>
</html>
```