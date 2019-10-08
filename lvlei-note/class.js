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





root /www/server/phpmyadmin;
include /www/server/panel/vhost/nginx/*.conf;
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDsEoRhCWUCTNqjzvnM8ySvtNAIADK9t7S8KRSzYHQ1yi8Mc+Ja/HkAWANYKMkaWa41KvOgBLLC+fA/QzBOZdEexF5vZ+OVG+5x1gSsp+vQvMyu+NnwEeawuMr1TJoITGOHrKDyQoZf7Txo5n2hyArq8pZJzEA3vbfDwFc47DJXZjnMDBDF7VJ5t7XArcE9C5BhYODuPZXV8YRGXlfJEWOa2mDMsw2PJB+OTBfq4ZA69QTUmzYNW0BlUYs6uL3oC9jLLfij1svR6GivmT1SYygbMiXyLyTHl3TCwQ8o0sBhgYvkY/Q2ff6C2hdmAzMb41yex7hKyDMdPy3b+STAGLKugNF0CS4c8t0hl/DAm/tquB7Hhuc36uTpbgsgXu1GnYPWamDnYyMmUsRKF7Aj92zlO4X3ilAM95hn4GcwMGVL8wz1HICKFyXkb1lmk1hE4tClvurQ82KBtVh6ZU5J/QgMv3Qb9Ff+qFrclTXZgI7pj26Gkkqdiyt3qqMlw2FZkiSRBuoFeuIZ1HoYueOifvvuet8hv7DZ/vERJUv3wuRJyEgPSYq7gDN7q6G18ab+JqjAb6lVaSFNYksqqGXEV8WiO7QKIveLYpnNPJDpoOJz8yWj55bc27XdCN+DDQfhbkiJoT988gZOjakGyN4rHndxSHogioyz+RRMcw8V+pgsPQ== lvl8961@163.com


