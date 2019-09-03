//1，前端路由原理

const Home = { template:'<div>home</div>' }
const Book = { template:'<div>book</div>' }
const Moive = { template:'<div>moive</div>' }

const routes = [
	{path:'/',component:Home},
	{path:'/book',component:Book},
	{path:'/moive',component:Book},
]

const router = new VueRouter(Vue,{
	routes
})

new Vue({
	el:'#app',
	router
})

class VueRouter{
	constructor(Vue, options){
		this.$options = options;
		this.routeMap = {};
		this.app = new Vue({
			data:{
				current:'#/'
			}
		})
		this.init()
		this.createRouteMap(this.$options)
		this.initComponent(Vue)
	}
	//绑定事件
	init(){
		window.addEventListener('load', this.onHashChange.bind(this), false)
		window.addEventListener('hashchange', this.onHashChange.bind(this), false)
	}
	//路由映射表
	createRouteMap(options){
		options.routes.forEach(item=>{
			this.routeMap[item.path]=item.component;
		})
	}
	//注册组件
	initComponent(Vue){
		Vue.component('router-link',{
			props:{
				to:String
			},
			template:'<a :href='to'><slot></slot></a>'
		})

		const _this = this;
		Vue.component('router-link',{
			render(h){
				var component = _this.routeMap[_this.app.current];
				return h(component)
			}
		})
	}

	//获取当前hash串
	getHash(){
		return window.location.hash.slice(1) || '/'
	}

	//设置当前路径
	onHashChange(){
		this.app.current = this.getHash()
	}
}






