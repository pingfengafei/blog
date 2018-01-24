/**
 *
 * @param obj 接口返回的json对象
 * @returns {*} 返回首字母大写的对象
 *
 * 如果只针对接口返回的json字段这一种情况，接口返回的是纯粹的object对象，可能不需要判断属性是否从原型链上继承
 * todo : 添加判继承的属性逻辑，完善之
 */

function upperCase(obj){
  var newObj;
  if (Object.prototype.toString.call(obj) === '[object Object]'){
    newObj = {}
    for(var key in obj){
      newObj[key[0].toUpperCase() + key.substring(1)] =upperCase(obj[key])
    }
  }else if(Object.prototype.toString.call(obj) === '[object Array]') {
    newObj = []
    obj.map(function (val) {
      newObj.push(upperCase(val))
    })
  }else{
    return obj
  }
  return newObj
}


//驱动测试
var testObj = {
  aaa: 'hello world',
  bbb: {
    ccc: 2,
    dd: 3,
    adf: {
      fdfd: 4
    },
    hello: [
      {world: 'aaaa'},
      {react: ['bbbbb', {vue: '1212aaaa'}]}
    ]
  }
}

var testObj2 = {
  'ResponseStatus': {
    'Timestamp': '/Date(1501817410341+0800)/',
    'Ack': 'Success',
    'Errors': [],
    'Version': '1.0',
    'Extension': [{'Id': 'CLOGGING_TRACE_ID', 'Value': '4157712533531410375'}, {
      'Id': 'RootMessageId',
      'Value': '921812-0a022627-417171-66818'
    }, {'Id': 'auth', 'Value': '9F4FFA7265D96D6F6CAFB397445EEF07C3C3A1F76A952D3C9353ED0C9870BA03'}]
  },
  'responseMessage': {'code': 1, 'message': 'success'},
  'convs': [{
    'gid': '710481646213660676',
    'showGid': '710481646213660676',
    'name': '新增测试0717002',
    'avatar': '',
    'lastTimestamp': 1501817049287,
    'role': 1,
    'empty': false
  }],
  'authorities': ['1', '2', '3', '4', '5'],
  'authorityEncryps': ['LnBm4oOgA8ZKRqG3Yt08GQ==', 'LnBm4oOgA8Z9TGmKMntoOg==', 'LnBm4oOgA8ZazFljH6TGCQ==', 'LnBm4oOgA8ZnnjvTEaMnwQ==', 'LnBm4oOgA8aSncjQEiyfhg==']
}

var a = upperCase(testObj)
console.log(a)
console.log(testObj)

var b = upperCase(testObj2)
console.log(b)
console.log(testObj2)
