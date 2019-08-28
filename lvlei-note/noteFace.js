//内存
var a= 1;

function foo() {
	console.log(a) //ƒ a(){}
	a=3
	console.log(a) //3
	var a=2
	console.log(a) //2
	console.log(arguments[0]) //1
	for(let a=0;a<2;a++){
		let a = 5;
		console.log(a)// 5 5
	}
	function a(){}

}
foo(this.a)

//this问题
function foo() {
	console.log(this.a)
}
var a = 1
foo() //1

var obj = {
	a: 2,
	foo: foo
}
obj.foo() //2

// 以上两者情况 `this` 只依赖于调用函数前的对象，优先级是第二个情况大于第一个情况

// 以下情况是优先级最高的，`this` 只会绑定在 `c` 上，不会被任何方式修改 `this` 指向
var c = new foo() //undefind
c.a = 3
console.log(c.a) //3

// 还有种就是利用 call，apply，bind 改变 this，这个优先级仅次于 new

//函数，高阶函数
//vue热更新原理