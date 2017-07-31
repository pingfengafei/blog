---
title: spring13小结
date: 2017-03-04 11:48:02
tags:
---

马云讲过人离职的原因，钱给的少  || 呆的不开心。以前我一直只觉得第一个原因，如今第二个原因也满足了。到该走了时候了。

直到现在才开始写项目总结，想想蛮可笑的。写一写自己的项目心得吧。

一句话总结：学到很多，项目设计很乱，时间人为地很赶，自己进步一点。

这次项目需要写2个配置页面，使用2个带有get和put方法的Restful风格接口从服务器端获取J和上传JSON对象。

页面设计图：

就从router入口写吧。
```
<Route path="device_endpoint_feature" component={DeviceSingleFeatureContainer}/>
<Route path="device_frequency_feature" component={EventFrequencyFeatureContainer}/>
```
SingleFeature页面比较简单:
![](http://7xne0t.com1.z0.glb.clouddn.com/device_single.png)
1.写了一个mapKeyToDisplayName方法，匹配key和显示的名字。
2.以前一直有个烦心事，用className方法生成新的class不知道取什么名字，有一天在看ant-design源代码，发现他们如下用，一举解决了命名问题：
```
    const titleCls = className({title : this.state.showTitle});
```
3.下拉框设计难点:
UI设计稿中，异常度下拉框是个输入框，不是下拉框。考虑到未来的可扩展性，我建议UI改成了下拉框，被采纳。手写了个下拉框组件，有如下特点：
3.1 如果下拉框内容只有1条，则禁止触发onClick和onMouseOver事件，并且:
```
  cursor:not-allow;
```
3.2 鼠标hover时展开，离开后下拉框收起。有2个难点:
   onMouseOut, onMouseLeave的选择。二者都能相应鼠标离开事件，区别是，out只对被设置的DOM对象起作用，比如，out在父DOM节点上，移动到子DOM节点上就触发一次out，leave则是离开整个DOM节点才会触发。这里，选择onMouseLeave。

   通过父组件position:realative,子组件absolution + z-index方式生成，遇到个问题，图片中上面的边框和下面的边框有个间隙，鼠标触碰到间隙后也会触发Leave事件，解决的办法是，用个大div包裹下面的dom并连接上面的dom，设置成透明即可。

4 关于重置逻辑:
```
this.setState({config:this.props.config})
```

5 关于保存逻辑:
在reducer中，如果后台返回了类似`{ok:true}`字段，则使用上传给后台的数据。
```
case PUT_DEVICE_SINGLE_FEATURE_CONFIG_SUCCESS:
return {config: action.data, status: 'put_device_single_feature_success'};
```

6:源于添加逻辑:
通过`feature.disabled`的值来判断，true在放置在添加栏内，false则放置在属性展示框内

7：关于小开关的逻辑:
    感谢state和prop,让我实现各种逻辑得心应手。

8：关于Immutable对象的思考:
如果没有Immutable.JS，我也不知道该怎样去安全地去操作对象。
```
var a = {};
var b = a;
b.a = 1;
```
同样，如果没有this.state也存在被共用修改内容的危险。Immutable.JS一举解决了所有问题。实测效率不差。网上关于Immutable.JS有2种不好的观点，第一，api很难用，第二，体积有点大（其实是api太多了）。我觉得，类似于java风格的api，用着用着就习惯了。第二，（个人猜测）Immutable.JS是有野心的。api覆盖了js原生操作对象，数组的所有方法，这样，我们不妨脑洞大开，以后在React项目中，全部用Immutable.JS API操作对象（数组）。下一个项目打算这么干。

[后续补充], oh my dear,恰巧遇到了错误修改state姿势，导致的迷之bug，修改了半天。
```
 this.state = {
      paginationConfig: {
        total: 30,
        selectedPage: 10
      }
    };
  handlePaginationChange(page) {
    let paginationConfig = Object.assign(this.state.paginationConfig);
    paginationConfig.selectedPage = page;
    this.setState({paginationConfig: paginationConfig});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state));
  }
```
一个分页组件的点击页面逻辑。
bug描述 : 分页组件失效。
bug追踪 : 从react-dev-tool中发现，`this.sate.paginationConfig.selectedPage`发生了变化，但是分页组件实现。分析可能是没有触发render,上游原因是`shouldComponentUpdate`, 分析可知:
```
  paginationConfig.selectedPage = page; //共享对象,直接修改了state
```
导致`_.isEqual(nextState, this.state)`返回true.
先不忙着修改，此处应该还有更有趣的问题。
1:错误使用了`Object.assign`方法,正确姿势：
```
 const paginationConfig = Object.assign({}, this.state.paginationConfig);
```
2.`Object.assign`本质上是浅拷贝
```
const obj = {a:1,b:{c:1}};
const cp = Object.assign({},obj);
cp.a = 2;
cp.b.c = 2;
console.log(obj.a); //1
console.log(obj.b.c); //2 assign是浅拷贝
```
吓得我赶紧换回Immutable，彻底清净了。







EventFrequency页面比较复杂:
![](http://7xne0t.com1.z0.glb.clouddn.com/%E4%B8%9A%E5%8A%A1%E4%BA%8B%E4%BB%B6.png)
这里坑比较多。总结起来有点：
1. 设计不合理，不合理，不合理！
2. 因为1的关系，操作json数据逻辑复杂
3. UI设计没有适配低分辨率屏幕

关于1和3具体内容我不想过多讨论，但是直接导致了实际开发中，我抛弃设计稿，调整了排版布局，也导致了问题2，一度困扰了我整个周末。整个周末都没过好，在电影院看电影都在想如何操作数据。

1. 接口字段名和API不一致
小问题

2. 一堆子的交互逻辑
小问题，配合state和props好写，担心后来人看不懂为什么代码里要添加那么多开关，多写了几行注释。

3. 频次数值和异常度每次只能修改其中1个。要突出timeFerature（分钟，小时，日）的作用
![](http://7xne0t.com1.z0.glb.clouddn.com/%E9%A2%91%E6%AC%A1%E6%95%B0%E5%80%BC.png)
  2个很大问题。
 按照后台设计逻辑，只能传输`频次数值（value）和异常度（anomaly）`其中的一个。这个坑了。之前设计好的逻辑是，在container容器中统一分发给每个component内容，获取和修改的json所有key都相同，只有value不同。这种方式修改起来比较简单。但是现在接口每次只给一个value或anomaly，我在上传json前也做做判断，判断用户选择了哪个字段，我要剔除相应的字段。

为了适应前期的工作，我在get到数据后，在container组件里，手动添加了所有缺失的字段。按照设计理念，timeFeature可以全选，但不能全空，选择后对应显示对应的字段，关闭后，不选择对应的字段。

1.timeFeature开关逻辑
```
selectTimeFeature(type) {
    //判断时间feature不能全为空
    switch (type) {
      case 'minute': {
        if (!(this.state.config.day || this.state.config.hour || !this.state.config.minute)) {
          return;
        }
        break;
      }
      case 'hour': {
        if (!(this.state.config.day || !this.state.config.hour || this.state.config.minute)) {
          return;
        }
        break;
      }
      case 'day': {
        if (!(!this.state.config.day || this.state.config.hour || this.state.config.minute)) {
          return;
        }
        break;
      }
      default :
        return;
    }

    /**
     * 向对象里添加字段和删除字段
     * 删除： 删除key && value
     * 添加： 添加key && value
     */
    const reg = new RegExp(type, 'i');
    let obj = {};
    const newConfig = {};
    const config = Immutable.fromJS(this.state.config.data).toJS();


    if (this.state.config[type]) { //关闭时间按钮，去除timeFeature
      _.forEach(config, (val, item1) => {
        obj[item1] = {};
        _.forEach(val, (val, item2) => {
          if (item2 === 'disabled') {
            obj[item1].disabled = val;
          } else {
            obj[item1][item2] = {};
            _.forEach(val, (val, item3) => {
              obj[item1][item2][item3] = {};
              _.forEach(val, (val, item4) => {
                if (!reg.test(item4)) {
                  obj[item1][item2][item3][item4] = val;
                }
              });
            });
          }
        });
      });

      //组装newConfig
      newConfig.data = obj;
      newConfig.minute = (type !== 'minute') ? this.state.config.minute : !this.state.config[type];
      newConfig.hour = (type !== 'hour') ? this.state.config.hour : !this.state.config[type];
      newConfig.day = (type !== 'day') ? this.state.config.day : !this.state.config[type];

      this.setState({config: newConfig, configChanged: true});

    } else if (!this.state.config[type]) { //打开时间按钮，添加timeFeature
      _.forEach(config, (val, item1) => {
        _.forEach(val, (val, item2) => {
          if (item2 !== 'disabled') {
            _.forEach(val, (val, item3) => {
              switch (type) {
                case 'minute': {
                  config[item1][item2][item3].oneMinute = {
                    disabled: false,
                    value: item3 === 'anomaly' ? 1 : ''
                  };
                  config[item1][item2][item3].fiveMinute = {
                    disabled: false,
                    value: item3 === 'anomaly' ? 1 : ''
                  };
                  config[item1][item2][item3].fifteenMinute = {
                    disabled: false,
                    value: item3 === 'anomaly' ? 1 : ''
                  };
                  break;
                }
                case 'hour': {
                  config[item1][item2][item3].oneHour = {
                    disabled: false,
                    value: item3 === 'anomaly' ? 1 : ''
                  };
                  config[item1][item2][item3].sixHour = {
                    disabled: false,
                    value: item3 === 'anomaly' ? 1 : ''
                  };
                  break;
                }
                case 'day': {
                  config[item1][item2][item3].oneDay = {
                    disabled: false,
                    value: item3 === 'anomaly' ? 1 : ''
                  };
                  config[item1][item2][item3].sevenDay = {
                    disabled: false,
                    value: item3 === 'anomaly' ? 1 : ''
                  };
                  break;
                }
                default :
                  break;
              }
            });
          }
        });
      });

      //组装newConfig
      newConfig.data = config;
      newConfig.minute = (type !== 'minute') ? this.state.config.minute : !this.state.config[type];
      newConfig.hour = (type !== 'hour') ? this.state.config.hour : !this.state.config[type];
      newConfig.day = (type !== 'day') ? this.state.config.day : !this.state.config[type];

      this.setState({config: newConfig, configChanged: true});
    }
  }
```

2.自动填充数据逻辑

```
  /**
   * 后台的逻辑是anomaly或者value只能上传一个
   *
   * @param config
   * @return newConfig
   */
  autoFillConfig(config) {
    const newConfig = Immutable.fromJS(config).toJS();
    const anomaly = {
      fiveMinute: {disabled: false, value: 1},
      oneMinute: {disabled: false, value: 1},
      sevenDay: {disabled: false, value: 1},
      oneHour: {disabled: false, value: 1},
      fifteenMinute: {disabled: false, value: 1},
      sixHour: {disabled: false, value: 1},
      oneDay: {disabled: false, value: 1}
    };
    const value = {
      fiveMinute: {disabled: false, value: ''},
      oneMinute: {disabled: false, value: ''},
      sevenDay: {disabled: false, value: ''},
      oneHour: {disabled: false, value: ''},
      fifteenMinute: {disabled: false, value: ''},
      sixHour: {disabled: false, value: ''},
      oneDay: {disabled: false, value: ''}
    };

    for (const key in anomaly) {
      if (!config.minute) {
        if ((/minute/i.test(key))) {
          delete anomaly[key];
          delete value[key];
        }
      }
      if (!config.hour) {
        if ((/hour/i.test(key))) {
          delete anomaly[key];
          delete value[key];
        }
      }
      if (!config.day) {
        if ((/day/i.test(key))) {
          delete anomaly[key];
          delete value[key];
        }
      }
    }

    for (const akey in newConfig.data) { //sameIPGeo
      for (const bkey in newConfig.data[akey]) {
        if (bkey !== 'disabled') { //transaction createAccount
          if (newConfig.data[akey][bkey].anomaly) {//value不存在
            newConfig.data[akey][bkey].value = value;
          } else if (newConfig.data[akey][bkey].value) {
            newConfig.data[akey][bkey].anomaly = anomaly;
          }
        }
      }
    }
    return newConfig;
  }
```

3. 我需要一个state记录每次修改的下拉框类型，以便上传数据时剔除没有被选中的字段。
```
      case 'changeType': {
        const configDropSelectedType = Immutable.fromJS(this.state.configDropSelectedType).toJS();
        if (!configDropSelectedType[feature][type][dropdownType]) {
          switch (dropdownType) {
            case 'value': {
              delete configDropSelectedType[feature][type].anomaly;
              configDropSelectedType[feature][type][dropdownType] = true;
              break;
            }
            case 'anomaly': {
              delete configDropSelectedType[feature][type].value;
              configDropSelectedType[feature][type][dropdownType] = true;
              break;
            }
            default:
              return;
          }
          this.setState({configChanged: true});
        }
        this.setState({configDropSelectedType: configDropSelectedType});
        break;
      }
```
4.比较config和记录修改下拉框类型的state，上传数据
```
    //比较configDropSelectedType和config，去除多余的数据
    const config = Immutable.fromJS(this.state.config).toJS();
    for (const akey in config.data) {
      for (const bkey in config.data[akey]) {
        if (bkey !== 'disabled') {
          if (this.state.configDropSelectedType[akey][bkey].value) {
            delete config.data[akey][bkey].anomaly;
          } else if (this.state.configDropSelectedType[akey][bkey].anomaly) {
            delete config.data[akey][bkey].value;
          }
        }
      }
    }
```

学习到一个技巧:修改原生dom的class样式:
```
const node = this.refs.promotion_bonus_fraud;
node.classNmae = 'scene-content scene-content-2';
node.setAttribute('class', 'scene-content scene-content-2');
```
还有输入框内容校验等，不多赘述。

至此，项目写完了。全部原生代码，没有使用任何UI组件库。原因是，觉得material-ui下拉框太丑，引入ant-design dropdown会导致bundle.js（未压缩）多了6M,权衡下手写了个下拉框组件，花了点时间。
其次就是组织业务事件频次的数据上花了不少时间。再一次深刻的感受了下，不合理的设计会给实现带来很大的困难。
