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
/*****:hover*****/
//sdk监听技术
//async await 异常try{}catch(){}

//javascript中怎么判断某变量是null,undefined,还是不存这个变量 ? 以及变量是array 还是 object 还是 null ?
/***
下面是具体区分是  null / object /array 类型方法:

先查看  i == null  返回true则 i 为 null  反之返回false则不是

然后使用  i.constructor.toString().indexOf('Array')  > -1   如果表达式返回了true 则是 Array类型

同理使用  i.constructor.toString().indexOf('Object')  > -1   如果表达式返回了true 则是 object类型

[  说明: i.constructor返回的是i变量的构建函数,譬如i的是数字型变量    则返回  function Number() { [native code] }

toString() 则将上面的结果转换为字符串,indexOf('数值')则是匹配某个变量中有无存在括号内的数值,有则返回数值在变量中位置,如果没找到则什么都没返回,所以只要大于-1就是有匹配到 ]
***/




/***
function中的this是个例外，this并不指function对象本身，也不是指function的作用域对象。而是在运行时绑定到特定的对象上。即它采用的是动态作用域规则
***/
function foo() {
    console.log( a ); // 2
}

function bar() {
    var a = 3;
    foo();
}

var a = 2;

bar(); //2

/////
var obj = {
    a: 1,
    foo: function f() {
        console.log(this.a);        
    }
}

obj.foo(); //1

var g = obj.foo;
g();    //undefined

g = obj.foo.bind(obj);
g();    //1
/*
上面的代码段中，函数foo在非严格模式下如果没有明确绑定对象，则会绑定到全局对象，所以输出undefined。在严格模式下则会报错。

为什么obj.foo() 可以正确输出呢？原因在于这种调用方式会隐式绑定到执行这个方法的对象上（obj）。
***/
var log = console.log;
console.log.call(console, "stuff")//stuff
console.log.call(window, "stuff") //TypeError: Illegal invocation

var log = console.log.bind(console);

//代码
function Foo(){
  getName = function(){
    console.log(1)
  }
  return this
}
Foo.getName = function(){
  console.log(2)
}
Foo.prototype.getName = function(argument){
  // body... 
  console.log(3)
};
var getName = function(){
  console.log(4)
}

function getName(){
  console.log(5)
}

Foo.getName() //2
getName() //4
console.log(getName)
Foo().getName()//1
console.log(getName)
getName() //1
new Foo.getName() //2
new Foo().getName()//3
new new Foo().getName() //3



function a(){
  return Promise.resolve(1).then(res=>{
    console.log(res)
  })
}
function b(){
  console.log(2)
}

async function c(){
  await a() //1
  console.log(3)
  await b() //2
  console.log(4)
  console.log(5)
}

//可以用数组的 Array.prototype.slice 方法把 arguments 对象转变为一个真正的数组
var argsToArray = function() {
    console.log(typeof arguments.callee); // 'function'
    var args = Array.prototype.slice.call(arguments);
    console.log(typeof arguments.callee); // 'undefined'
    console.log(typeof arguments.slice); // 'function'
};

argsToArray();


//柯里化
function add(a, b) {
    return a + b;
}

function curryAdd(a) {
    return function(b) {
        return add(a, b);
    }
}

var add5 = curryAdd(5);

add5(2);
add5(5);
add5(200);
//变量提升
foo();  // 报错  
var foo = function () {
    console.log('foo1');
}

foo();  // foo1，foo重新赋值

var foo = function () {
    console.log('foo2');
}

foo(); // foo2，foo重新赋值
//函数提升
foo();  // foo2
function foo() {
    console.log('foo1');
}

foo();  // foo2

function foo() {
    console.log('foo2');
}

foo(); // foo2
//声明优先级，函数 > 变量
foo();  // foo2
var foo = function() {
    console.log('foo1');
}

foo();  // foo1，foo重新赋值

function foo() {
    console.log('foo2');
}

foo(); // foo1
/**
上面三个例子中，第一个例子是变量提升，第二个例子是函数提升，第三个例子是函数声明优先级高于变量声明。

需要注意的是同一作用域下存在多个同名函数声明，后面的会替换前面的函数声明
**/

//手写new对象
function creat(){
  var obj = new Object()
  Con = [].shift.call(arguments)
  obj.__proto__=Con.prototype;
  var ret = Con.apply(obj,arguments)
  return ret instanceof Object ? ret :obj
}



var name = 'window'

var person1 = {
  name: 'person1',
  show1: function () {
    console.log(this.name)
  },
  show2: () => console.log(this.name),
  show3: function () {
    return function () {
      console.log(this.name)
    }
  },
  show4: function () {
    return () => console.log(this.name)
  }
}
var person2 = { name: 'person2' }

person1.show1() // person1，隐式绑定，this指向调用者 person1 
person1.show1.call(person2) // person2，显式绑定，this指向 person2

person1.show2() // window，箭头函数绑定，this指向外层作用域，即全局作用域
person1.show2.call(person2) // window，箭头函数绑定，this指向外层作用域，即全局作用域

person1.show3()() // window，默认绑定，这是一个高阶函数，调用者是window
          // 类似于`var func = person1.show3()` 执行`func()`
person1.show3().call(person2) // person2，显式绑定，this指向 person2
person1.show3.call(person2)() // window，默认绑定，调用者是window

person1.show4()() // person1，箭头函数绑定，this指向外层作用域，即person1函数作用域
person1.show4().call(person2) // person1，箭头函数绑定，
                // this指向外层作用域，即person1函数作用域
person1.show4.call(person2)() // person2



var name = 'window'

function Person (name) {
  this.name = name;
  this.show1 = function () {
    console.log(this.name)
  }
  this.show2 = () => console.log(this.name)
  this.show3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.show4 = function () {
    return () => console.log(this.name)
  }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1() // personA，隐式绑定，调用者是 personA
personA.show1.call(personB) // personB，显式绑定，调用者是 personB

personA.show2() // personA，首先personA是new绑定，产生了新的构造函数作用域，
        // 然后是箭头函数绑定，this指向外层作用域，即personA函数作用域
personA.show2.call(personB) // personA，同上

personA.show3()() // window，默认绑定，调用者是window
personA.show3().call(personB) // personB，显式绑定，调用者是personB
personA.show3.call(personB)() // window，默认绑定，调用者是window

personA.show4()() // personA，箭头函数绑定，this指向外层作用域，即personA函数作用域
personA.show4().call(personB) // personA，箭头函数绑定，call并没有改变外层作用域，
                // this指向外层作用域，即personA函数作用域
personA.show4.call(personB)() // personB，解析同题目1，最后是箭头函数绑定，
                // this指向外层作用域，即改变后的person2函数作用域



function add(a) {
  function sum(b) { // 使用闭包
      a = a + b; // 累加
      return sum;
   }
   sum.toString = function() { // 重写toString()方法
        return a;
    }
   return sum; // 返回一个函数
}

add(1); // 1
add(1)(2);  // 3
add(1)(2)(3) // 6
add(1)(2)(3)(4) // 10 

function add(num){
  const sum = (arguments[1] || 0) + num;
  console.log(sum);
  return add.bind(this, sum)
}


/*****如何用 css 或 js 实现多行文本溢出省略效果，考虑兼容性
单行：
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
多行：
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3; //行数
overflow: hidden;
兼容：
p{position: relative; line-height: 20px; max-height: 40px;overflow: hidden;}
p::after{content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px;
background: -webkit-linear-gradient(left, transparent, #fff 55%);
background: -o-linear-gradient(right, transparent, #fff 55%);
background: -moz-linear-gradient(right, transparent, #fff 55%);
background: linear-gradient(to right, transparent, #fff 55%);
}
***/

