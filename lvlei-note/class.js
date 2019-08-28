// function Animal() {
// 	this.eat=function(){
// 		console.log('Animal eat')
// 	}
// }
// function Dog() {
// 	this.break=function(){
// 		console.log('Dog break')
// 	}
// }

// Dog.prototype = new Animal()

// var hashiqi = new Dog()
// hashiqi.eat()
// hashiqi.break()

class Animal{
	constructor(name){
		this.name=name
	}
	eat (){
		console.log( this.name+'eat')
	}
}
class Dog extends Animal{
	constructor(name){
		super(name)
		this.name=name
	}
	say(){
		console.log( this.name+'say')
	}
}
const hashiqi = new Dog()

hashiqi.say()
hashiqi.eat()




