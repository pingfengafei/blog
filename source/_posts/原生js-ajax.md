title: 原生js_ajax
date: 2015-11-02 15:56:47
tags:
---
**前端拼图之--ajax**
ajax返回码：
readyState:联想open(）和send()函数
0:open失败
1：open成功sned失败
2：send成功没有响应数据
3：响应部分数据
4：数据完全响应并返回

status状态码：
1**：http建立响应
2**：响应成功
3**：响应需要进一步跟进，典型304，缓存问题
4**：客户端问题 404 url错误
5**：服务器错误
9**：自定义错误
参考：![状态码](http://www.cnblogs.com/lxinxuan/archive/2009/10/22/1588053.html)

`attention，state是adj，status是n`

终于撸了第一个简单ajax，找了很久bug，原来是readyState和status写错了。
关于跨域请求问题，jsonp可以部分解决，添加允许跨域头可以解决。测试的时候，我的做法是统一放到本地虚拟服务器下。
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ajax</title>
</head>
<body>
	<div>1212</div>
</body>
<script>
	var xmlhttp;
	//适配现在浏览器和古老的ie 5,6浏览器
	window.XMLHttpRequest ? xmlhttp = new XMLHttpRequest() : xmlhttp = new ActiveObject("Microsoft.XMLHttpRequest");
	//get or post
	//url
	//true = 异步加载，false = 同步加载
	//xmlhttp.open("get","http://127.0.0.1/test/test.asp",true);
	xmlhttp.open("GET","test.text",true);
	xmlhttp.send();
	
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			document.getElementsByTagName("div")[0].innerHTML = xmlhttp.responseText;
		}
	} 
</script>
</html>
```
test.text文件
```text
<p style='color:red;'>本内容是使用 GET 方法请求的。</p><p style='color:red;'>请求时间：2015-10-28 16:16:47</p>
```