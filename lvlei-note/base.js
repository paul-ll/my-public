var a=10,b,setting

setting = function (c) {
	a = c
	var b = 20
}

setting(55)
console.log(a) //55
console.log(b) //undefind

//小程序跟H5交互
 /**
   * 初始化
   * 解析h5链接 拼接参数
   */
  initPage (res) {
    let link = this.pageOps.link && decodeURIComponent(this.pageOps.link) || ''
    let {
      uri,
      params,
      hash
    } = this.parseUrl(link)

    params = Object.assign({
      mffrom: 'wxapp',
      app_version: VERSION,
      wxapplng: parsePath('_locationInfo.res.position.lng')(res),
      wxapplat: parsePath('_locationInfo.res.position.lat')(res),
      addressCode: parsePath('_locationInfo.res.city.id')(res),
      stationCode: parsePath('_locationInfo.res.chrome.station_code')(res),
      token: parsePath('_loginInfo.access_token')(res),
      userid: parsePath('_loginInfo.user_id')(res),
      bigWarehouse: parsePath('_locationInfo.res.chrome.bigWarehouse')(res)
    }, params)

    // 河狸活动页会监听 hashchange
    if (this.isCastorPage(uri) && !hash) {
      hash = 'castor-0'
    }

    // 当前H5链接 是否在可分享的白名单链接中
    this._data.canShareWebPage = SHARE_LINKS.some(path => uri.indexOf(path) !== -1)

    link = this.buildUrl(uri, params, hash)
    this.setData({
      link,
      showWebView: true
    })
  }

//原型
function Person() {}
person = new Person();

console.log(person.__proto__ === Person.prototype);
console.log(Object.getPrototypeOf(person) === Person.prototype);
console.log(person.constructor === Person); // 注①
console.log(Person.prototype.__proto__ === Object.prototype); //注②
console.log(Object.prototype.__proto__ === null);
console.log(Person.prototype.constructor === Person);
console.log(Object.__proto__ === Function.prototype); //注③
console.log(Function.prototype.__proto__ === Object.prototype);


//发布订阅 && 观察者

//webpack优化。https://www.jeffjade.com/2017/08/12/125-webpack-package-optimization-for-speed/



//es6数组去重+找出去重的个数
 class Shuzu{
        constructor(arr) {
            this.arr=arr
        }
        unique3(){ //去重
            return Array.from(new Set(this.arr))
        }
        geshu(){ //找出重复的个数
            let num=[];
            let arrSum=this.unique3();
            arrSum.forEach(value=>{
                num.push(this.arr.join('').split(value).length-1)
            })
            return num
        } 
    }
     const arr = [1,4,1,3,2,3,1,1,1,1,1];
     const xxx=new Shuzu(arr)
     console.log(xxx.unique3()) //[1, 4, 3, 2]
     console.log(xxx.geshu()) //[7, 1, 2, 1]

//css画六边形
//<!-- 方法一(不兼容低版本浏览器) -->
/****
	<div class="lanren"></div>

	.lanren{width: 66px;height: 120px;margin:100px auto;background-color: #008000;position: relative;}
	.lanren::before{content:"";width: 0;height: 0;position:absolute;left:-35px;top:0;border-right:35px solid #008000;border-top:60px solid transparent;border-bottom:60px solid transparent;}
	.lanren::after{content:"";width: 0;height: 0;position:absolute;right:-35px;top:0;border-left:35px solid #008000;border-top:60px solid transparent;border-bottom:60px solid transparent;}
****/
//css劫持数据
/****
这个方法利用了CSS的两个特性：将内容注入HTML元素的能力（操纵DOM），
以及在用户执行操作后更改样式的能力（渲染页面）。
该网站的工作原理是使用content属性在执行操作时设置URL。 
URL调用一个PHP脚本，该脚本记录有关操作的详细信息，这些操作将作为URL参数传递。
使用:: before和:: after CSS选择器设置此URL可确保仅在执行操作时调用URL，
而不是在首次加载页面时调用URL。
#link:active::after{
	content:url('http://xxxxxxxx'')
}
****/
//css手风琴
//sdk监听技术
//async await 异常try{}catch(){}



