import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

Vue.prototype.checkLogin = function(backpage, backtype){
	var userInfo  = uni.getStorageSync('userInfo');
	console.log(userInfo);
	if(userInfo == '' ){
		uni.redirectTo({
			url:'/pages/my/login?backpage='+backpage+"&backtype="+backtype
		});
		return false;
	}
	return userInfo;
}
Vue.prototype.LoginOut = function(backpage, backtype){
	var userInfo  = uni.removeStorage({
		key:"userInfo"
	})
	uni.redirectTo({
			url:'/pages/my/login'
		});
	return false;
}
const app = new Vue({
    store,
    ...App
})
app.$mount()