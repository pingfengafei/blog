---
title: Immutable总结
date: 2016-10-17 18:42:18
tags:
---


###immutable基本用法
immutable解决了JS没有不可变对象问题。不知道谁说过，可变对象是万恶之源。可见Immutable的伟大。虽然现在掩盖在React的光芒下，但是，看看吧，是金子总会发光的。从[API文档](http://facebook.github.io/immutable-js/docs/#/List/forEach)里可以看出作者的努力，JS里常见的数据结构和方法都应有尽有。有种感觉，immutable可以替代js的Array和Object对象。
自己做了一些小测试：
```js
/**
 * Created by pingfengafei on 16/8/29.
 */
import Immutable from 'immutable';
{
	let map1 = Immutable.Map({a: 1, b: 2, c: 3});
	let map5 = Immutable.Map({a: 1, b: 2, c: 3});

	let map2 = map1.set('b', 2);
	let map3 = map1;
	let map4 = map1.set('b', 20);

	console.log(map2 === map1); //true
	console.log(map3 === map1); //true
	console.log(map4 === map1); //false

	console.log(map1 === map5); //false
	console.log(Immutable.is(map1, map5)); //true
}

{
	let map1 = Immutable.fromJS({a: 1, b: 2, c: 3});
	let map5 = Immutable.fromJS({a: 1, b: 2, c: 3});

	let map2 = map1.set('b', 2);
	let map3 = map1;
	let map4 = map1.set('b', 20);

	console.log(map2 === map1); //true
	console.log(map3 === map1); //true
	console.log(map4 === map1); //false

	console.log(map1 === map5); //false
	console.log(Immutable.is(map1, map5)); //true
}

{
	//用fromJS替换Map和List
	let map1 = Immutable.fromJS([{a: 1, b: 2, c: 3}]);
	let map2 = Immutable.List([{a: 1, b: 2, c: 3}]);
	let map3 = Immutable.fromJS({a: 1, b: 2, c: 3});
	let map4 = Immutable.Map({a: 1, b: 2, c: 3});

	console.log(map1);
	console.log(map2);
	console.log(map3);
	console.log(map4);
}

//修改Map(Object)对象
{
	let map = Immutable.fromJS({a: 1, b: 2, c: 3});
	let ma1 = Immutable.fromJS([{a: 1, b: 2, c: 3}]);

	//查
	console.log(map.get('a')); //1
	console.log(map.get('d')); //undefined
	//改
	console.log(map.set('a', 4)); //new Map with a : 4
	//增
	console.log(map.set('d', 5)); //new Map with d :5
	//删
	console.log(map.delete('d', 5)); // new Map without d:5
}

//修改List(Array)对象
{
	let list = Immutable.fromJS([1, 2, {a: 'aaaaaaaa'}]);

	console.log(list.size);
	list.forEach((val, index)=> {
		list[index] = 'aaa';
	});
	console.log(list);
}
```
个人的小总结：
1:通常只用到Map和List，对应Object和Array
2:用fromJS替换Map和List
3:用toJS方法将Map或者List对象转换成Object或Array对象
4：immutable.is()比较2个immutable对象数值相等效率特别特别高
5：利用4，在用react性能优化的大杀器：`shouldComponentUpdate`时候，通过(immutable.is(nextPrps, this.props))能极大的提高性能。
6：凡事都有双刃剑，使用5，会使得使用chrome react调试工具调试变得苦难，因为immutable对象不已阅读，从props和state里判断数据变得异常困难。

最后测试一下immutable的效率:
```
function testEfficiency() {
	var a = [];
	var b = [];
	console.time('创建数组');
	for (var i = 0; i <= 1000000; i++) {
		a.push(i);
		b.push(i);
	}
	console.timeEnd('创建数组');


	console.time('List');
	var $$b = Immutable.List(b);
	console.timeEnd('List');

	console.time('fromJS');
	var $$a = Immutable.fromJS(a);
	console.timeEnd('fromJS');

	console.time('is比较');
	Immutable.is($$a, $$b);
	console.timeEnd('is比较');

	console.time('lodash比较');
	_.isEqual($$a, $$b);
	console.timeEnd('lodash比较');

	var $$c = $$b.shift();

	console.time('immutable比较');
	_.isEqual($$c, $$b);
	console.timeEnd('immutable比较');

	console.time('lodash比较');
	_.isEqual(a, b);
	console.timeEnd('lodash比较');

	console.time('is比较');
	Immutable.is(a, b);
	console.timeEnd('is比较');

}
testEfficiency();
```
结论：
1：相同数据创建Immutable对象，多数测试下，fromJS要比List耗时长一点，偶尔List长一点，不排除是JS引擎问题。
2：在比较2各完全不同的Immutable对象时，用lodah的is_Equal会比is方法快一丢丢。
3：is方法不能比较非Immutable对象
4：比较有相同原的Immutable对象时is god damn fast！！！