title: 某生it金融公司面试题
date: 2015-10-17 19:45:27
tags:
---
1：正则表达式
已经三次考到正则表达式了，再考要自杀了。
[正则表达式 from csdn](http://blog.csdn.net/zaifendou/article/details/5746988)

2:查找最短字符串
查找出现频率最小的字符
参考之前写过类似的题目：[统计字符串字母个数](http://blog.csdn.net/pingfengafei/article/details/44999457)
输入：aadaabbbccddddddffddd
输出：c f
1：统计str字符格式
```script
    function countNum(str){
        var obj = {};
        for(var i = 0; i < str.length; i++)
            !obj[str[i]] ? obj[str[i]] = 1 : ++obj[str[i]];
        console.log(obj);
    }
    countNum('aadaabbbccddddddffddd')
```
2:按照value值排序对象
```script
    function sortObj(obj){
    var tmp = [];
    for(var i in obj){
        tmp.push([obj[i], i]); //[obj[i], i]封装成数组形式
    }
    tmp.sort(function(a,b){
        return a[0] - b[0]; //按照数组首个值排序
    });
    var obj = {}; //需要将obj清空
    for(var i = 0; i < tmp.length; i++){
        obj[tmp[i][1]] = tmp[i][0]; //二维数组又重新放回obj中
    }    
    return obj;
}
sortObj({a: 4, d: 10, b: 3, c: 2, f: 2});
```
这样，我们已经完成了整个str对象按照个数的对象排序。

那么，更简洁的方法呢？


3：股票问题
参考segmentfault问答
[算法编程计算题](http://segmentfault.com/q/1010000003870494?_ea=404131)