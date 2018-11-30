window.Promise = Promise;
Object.defineProperty(window,'config',{
  configurable:false,
  writable:false
})
import Vue from 'vue'
import App from './app'
import router from './router'
// import config from './assets/js/config.js'
import dialogs from './plugins/dialog'
import filter from './plugins/filter'
//登录
import {logon} from './plugins/logon';

logon(function(){
  const http = require('./plugins/http').default;
  Vue.use(http)
  Vue.use(dialogs)
  Vue.use(filter)  
  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
})
