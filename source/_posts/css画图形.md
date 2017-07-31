title: css画图形
date: 2015-10-27 00:00:55
tags:
---
css画图，常见只是利用2个小技巧。
1：border画多边形
2：border-radiou画曲边图形

理解border一张图就行了
![border边框的分布特性](http://7xne0t.com1.z0.glb.clouddn.com/border.jpg)
```css
    div{
        width:100px;
        height:100px;
        background: red;
        border-top: 100px solid green;
        border-left:50px solid yellow;
        border-bottom: 100px solid blue;
        border-right: 30px solid violet;
    }

```

理解border-radious
参考：![border-radious详解](http://m.baidu.com/from=0/bd_page_type=1/ssid=0/uid=0/pu=usm%400%2Csz%401320_1001%2Cta%40iphone_2_4.4_3_537/baiduid=85F0DAA52ED6462F809926FDA8E3A4EC/w=0_10_border-radius%E5%8E%9F%E7%90%86/t=iphone/l=3/tc?ref=www_iphone&lid=8686234121857571593&order=1&vit=osres&tj=www_normal_1_0_10_title&m=8&srd=1&cltj=cloud_title&dict=30&nt=wnor&title=css3%3Aborder-radius%E5%9C%86%E8%A7%92%E8%BE%B9%E6%A1%86%E8%AF%A6%E8%A7%A3_%E7%BD%91%E9%A1%B5%E8%AE%BE%E8%AE%A1_%E9%85%B7%E5%8B%A4%E7%BD%91&sec=7439&di=78173669b86634f4&bdenc=1&tch=124.0.0.0.0.0&nsrc=IlPT2AEptyoA_yixCFOxXnANedT62v3IEQGG_yNFAz3595qshbWxBcNiVzz7RDrIBZOddTLPsR9JtXLR0GIo8xB0wvQkfjS)

链接这么长，可以压缩一下吗？




来，少年，画完这个图还有三个图！
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<style>
	div{
		margin:20px;
		text-align: center;
		background: red;
		line-height: 100px;
	}
	.square{
		width:100px;
		height:100px; 
	}
	.rectangle{
		width:200px;
		height:100px;
	}
	.circle{
		width:100px;
		height:100px;
		border-radius:50px;
	}
	.oval{
		width:200px;
		height:100px;
		border-radius: 100px / 50px; /*水平半径 垂直半径*/
	}
	.diamond{
		margin:0;
		width:500px;
		height:100px;
		background: white;
		overflow: hidden;
	}
	.diamond .left_triangle{
		margin:0;
		width:0;
		height:0;
		border-bottom: 50px solid yellow;
		border-right:50px solid yellow;
		border-top:50px solid transparent;
		border-left:50px solid transparent;
		float:left;
		background: white;
	}
	.diamond .square{
		margin:0;
		width:100px;
		height:100px;
		background: yellow;
		float:left;
	}
	.diamond .right_triangle{
		margin:0;
		width:0;
		height:0;
		border-bottom: 50px solid transparent;
		border-right:50px solid transparent;
		border-top:50px solid  yellow;
		border-left:50px solid  yellow;
		float:left;
		background: white;
	}
	.diamond_css3{
		overflow: hidden;
		width:200px;
		height:100px;
		-webkit-transform:skew(-45deg);
		-moz-transform:skew(-45deg);
		-ms-transform:skew(-45deg);
		transform:skew(-45deg);
	}
	.diamond_css3 span{
	 	display: block;/*inline to block*/
		-webkit-transform:skew(45deg);
		-moz-transform:skew(45deg);
		-ms-transform:skew(45deg);
		transform:skew(45deg);
	}
	.trapezoid{
		width:100px;
		height:0;
		border-bottom:100px solid yellow;
		border-left:50px solid transparent;
		border-right:50px solid transparent;
	}
	.concentric_circle{
		 width: 100px; 
		 height: 100px; 
		 background: red;
		/* border:20px solid red;
		 background: #fff; 
		 -moz-border-radius: 100px; 
		 -webkit-border-radius: 100px; 
		 -ms-border-radius:100px;
		 border-radius: 100px; */
		 border-radius:50px;
		 border:20px solid yellow;


	}
</style>
<body>
	<div class="square">square</div>
	<div class="rectangle">rectangle</div>
	<div class="circle">circle</div>
	<div class="oval">oval</div>
	<div class="diamond">
		<div class="left_triangle"></div>
		<div class="square">diamond</div>
		<div class="right_triangle"></div>
	</div>
	<div class="diamond_css3"><span>diamond by css3</span></div>
	<div class="trapezoid"><span>梯形</span></div>
	<div class="concentric_circle">同心圆</div>
</body>
</html>
```