// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import rating from './components/rating/rating'
import seller from './components/seller/seller'
import './common/stylus/index.styl';
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)
window.evenBus=new Vue();
const routes=[
		    {
				path:'/',
				redirect:'/goods'
			},
			{
				path: '/goods',
				component: goods
			},
			{
				path: '/rating',
				component: rating
			},
			{
				path: '/seller',
				component: seller
			}
]
const router=new VueRouter({
	linkActiveClass:'active',
	routes
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
