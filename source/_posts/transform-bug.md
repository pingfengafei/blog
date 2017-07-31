---
title: transform bug
date: 2016-10-17 18:46:19
tags:
---


#transform有毒
`transform : translate(1px, 1px)`有毒，`translate`会导致`z-index`混乱，stackoverflow上有大神解析了原因：[z-index is canceled by setting transform(rotate)](http://stackoverflow.com/questions/20851452/z-index-is-canceled-by-setting-transformrotate),奈何等级不够无法理解，不知道怎么去处理这个问题。那就只能绕过这个问题：实际项目中的需求是鼠标hover上去x轴上平移-2个像素，完全可以用`margin`去替代`transform`:
```js
    element{
        transition : margin 1s linear;
        margin : 0 ;
    }
    element:hover{
        margin : 0 0 0 -2px;
    }
```