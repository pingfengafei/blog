title: js深度拷贝
date: 2015-10-09 14:26:27
tags:
---
仿佛记得几个月前前端面试的时候，被问到js浅拷贝深拷贝问题。直到现在我也没很明白浅拷贝深拷贝具体指代什么。anyway，在高大上名词下技术才是本质。

```javascript
var a = 1;
var b = a;
b = 2;
console.log(a);		//1
console.log(b);		//2

```
js基本变量Underfined，Boolean，Number，String Null是传值复制。但是js对象却是拷贝复制。原因想一想也就明白了，对象和类一样，太占用内存了，js对象复制和C++类似，传递的是指针地址。

```javascript
var a = {num : 1};
var b = a;
b.num = 2;
console.log(a.num);		//2
console.log(b.num);		//2
```
因为b地址指向a，当b属性被更改时，也修改了a属性。

解决方法：深度拷贝。
```javascript
<script>
	 function clone(Obj) {   
        var buf;   
        if (Obj instanceof Array){   
            buf = [];  //创建一个空的数组 
            var i = Obj.length;   
            while (i--) {   
                buf[i] = clone(Obj[i]);   
            }   
            return buf;   
        }else if (Obj instanceof Object){   
            buf = {};  //创建一个空对象 
            for (var k in Obj) {  //为这个对象添加新的属性 
                buf[k] = clone(Obj[k]);   
            }   
            return buf;   
        }else{   
            return Obj;   
        }   
    }  

	var a = {a : 1, b : 2};
	var b = clone(a);
	b.a = 3;
	b.b = 4;
	console.log(a.a);       //1
	console.log(a.b);       //2      
	console.log(b.a);       //3
	console.log(b.b);       //4
</script>
```
