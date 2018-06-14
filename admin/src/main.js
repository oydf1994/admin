// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {fetch} from './assets/js/axios.js'
import './assets/css/common.css'
import '../static/utf8-php/ueditor.config.js'
import '../static/utf8-php/ueditor.all.min.js'
import '../static/utf8-php/lang/zh-cn/zh-cn.js'
import '../static/utf8-php/ueditor.parse.min.js'
Vue.config.productionTip = false
Vue.http = Vue.prototype.$post = fetch
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
