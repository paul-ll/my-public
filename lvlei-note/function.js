//手写call（）
Function.prototype.myCall = function(context = window, ...args){
	if(this === Function.prototype){
		return undefined // 用于防止 Function.prototype.myCall() 直接调用
	}
	context = context || window;
	const fn = Symbol()
	context[fn] = this
	const result = context[fn](...args)
	delete context[fn] 
	return result
};
/**
1.判断当前this是否为函数，防止Function.prototype.myCall() 直接调用
2.context 为可选参数，如果不传的话默认上下文为 window
3.为context 创建一个 Symbol（保证不会重名）属性，将当前函数赋值给这个属性
4.处理参数，传入第一个参数后的其余参数
4.调用函数后即删除该Symbol属性
**/
//手写apply
//apply实现类似call，参数为数组
Function.prototype.myApply = function (context = window, args) {
  if (this === Function.prototype) {
    return undefined; // 用于防止 Function.prototype.myCall() 直接调用
  }
  const fn = Symbol();
  context[fn] = this;
  let result;
  if (Array.isArray(args)) {
    result = context[fn](...args);
  } else {
    result = context[fn]();
  }
  delete context[fn];
  return result;
}

//模拟实现bind
Function.prototype.myBind = function(context,...args1){
	if(this === Function.prototype){
		throw new TypeError('error')
	}
	const _this = this
	return function F(...args2){
		//判断是否适用于构造函数
		if(this instanceof F){
			return new _this(...args1,...args2)
		}
		return _this.apply(context, args1.concat(args2))
	}
};

var a =5
function b(){
	var a= 9
	return function c(){
		console.log(a)
		a=7
	}
}
let  c= b()
c()
console.log(a) // 5 闭包不能访问到闭包的变量

/**
1.处理参数，返回一个闭包
2.判断是否为构造函数调用，如果是则使用new调用当前函数
3.如果不是，使用apply，将context和处理好的参数传入
**/
//获取函数中的参数：
  // 获取argument对象 类数组对象 不能调用数组方法
    function test1() {
      console.log('获取argument对象 类数组对象 不能调用数组方法', arguments);
    }

    // 获取参数数组  可以调用数组方法
    function test2(...args) {
      console.log('获取参数数组  可以调用数组方法', args);
    }

    // 获取除第一个参数的剩余参数数组
    function test3(first, ...args) {
      console.log('获取argument对象 类数组对象 不能调用数组方法', args);
    }

    // 透传参数
    function test4(first, ...args) {
      fn(...args); //透传 2,3
      fn(...arguments);//透传 1,2,3
    }

    function fn() {
      console.log('透传', ...arguments);
    }

    test1(1, 2, 3);//获取argument对象 类数组对象 不能调用数组方法 Arguments(3)1,2,3
    test2(1, 2, 3);//获取参数数组  可以调用数组方法 [1,2,3]
    test3(1, 2, 3);//获取argument对象 类数组对象 不能调用数组方法 [2,3]
    test4(1, 2, 3);//

//浅拷贝 深拷贝
/**
arr.slice();
arr.concat();
*
*/
function clone(target){
	if(typeof target === 'object'){
		let cloneTarget;
		if(Array.isArray(target)){
			cloneTarget=[];
			for(let i=0;i<target.length;i++){
				cloneTarget[i] = clone(target[i])
			}
		}else {
			cloneTarget={}
			for(const key in target){
				cloneTarget[key] = clone(target[key])
			}
		}
		return cloneTarget
	}else {
		return target
	}
}

//去重
//set
const unique = arr => Array.from(new Set(arr));
//const unique = arr => [...new Set(arr)];
//object
const unique = (array)=>{
	var container = {};
    return array.filter((item, index) =>  container.hasOwnProperty(item) ? false : (container[item] = true));
}
//使用reduce实现map
Array.prototype.reduceToMap = function (handler) {
  return this.reduce((target, current, index) => {
    target.push(handler.call(this, current, index))
    return target;
  }, [])
};
//使用reduce实现filter
Array.prototype.reduceToFilter = function (handler) {
  return this.reduce((target, current, index) => {
    if (handler.call(this, current, index)) {
      target.push(current);
    }
    return target;
  }, [])
};

//数组乱序-洗牌算法
/**
从最后一个元素开始，从数组中随机选出一个位置，交换，直到第一个元素。
**/
function disorder(array){
	const length = array.length
	let current  = length-1
	let random;
	while(current>-1){
		random = Math.floor(length * Math.random())
		[array[current], array[random]] = [array[random], array[current]];
		current--
	}
	return array
}

//柯里化
/**
在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
通俗易懂的解释：用闭包把参数保存起来，当参数的数量足够执行函数了，就开始执行函数。


实现
判断当前函数传入的参数是否大于或等于fn需要参数的数量，如果是，直接执行fn
如果传入参数数量不够，返回一个闭包，暂存传入的参数，并重新返回currying函数
#
**/
function  currying(fn,...args){
	if(args.length >= fn.length){
		return fn(...args);
	}else {
		return (...args)=>{
			currying(fn, ...args, ...args2)
		}
	}
}

//手写instanceof
/**
判断Object的prototype是否在a的原型链上
**/
function myInstanceof(target, origin){
	const proto = target.__proto__;
	if(proto){
		if(origin.prototype === proto){
			return true
		}else {
			return myInstanceof(proto, origin)
		}
	}else {
		return false
	}
}
//单例模式
/***
在合适的时候才创建对像，并且只创建唯一的一个。

创建对象和管理单例的职责被分布在两个不同的方法中，这两个方法组合起来才具有单例模式的威力。

使用闭包实现：
**/

var Singleton = function(name) {
    this.name = name;
};

Singleton.prototype.getName = function() {
    alert(this.name);
};

Singleton.getInstance = (function(name) {
    var instance;
    return function(name){
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})();

var a = Singleton.getInstance('ConardLi');
var b = Singleton.getInstance('ConardLi2');

console.log(a===b);   //true


scp -P 29997 root@95.163.203.224:/home/www/ /Users/lvlei/Desktop/my-project
//实现sleep函数
/***
sleep函数作用是让线程休眠，等到指定时间在重新唤起。

**/
 //方法一
function sleep1(ms, callback) {
    setTimeout(callback, ms)
}
//sleep 1s
sleep1(1000, () => {
    console.log(1000)
})
//方法二
function sleep2(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, ms)
    })
}
sleep2(1000).then(() => {
    console.log(2000)
})
//方法三
function sleep3(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, ms)
    })
}
async function init() {
    await sleep3(1000);
}
init().then(() => {
    console.log(3000)
})


//instanceof原理
function new_instance_of(leftValue,rightValue){
	let rightProto = rightValue.prototype
	leftValue = leftValue.__proto__;
	while(true){
		if(leftValue === null){
			return false
		}
		if(leftValue === rightProto){
			return true
		}		
		leftValue = leftValue.__proto__;
	}
}

function deepClone(child,parent){
	child=child?child:{}
	for(let key in parent){
		if(parent.hasOwnProperty()){
			if(typeof child[key] == 'object'){
				child[key] = object.prototype.toString.call(parent[key])==[object object]?{}:[]
				deepClone(child[key],parent[key])
			}else {
				child[key] = parent[key]
			}
		}
	}
	return child
}






