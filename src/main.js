import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import instance from '@/utils/axios'

import {
  locale,
  Message
} from 'iview';
import lang from 'iview/dist/locale/en-US'
require('iview/dist/styles/iview.css');
require('@styles/styles.less');

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)


Vue.config.productionTip = false


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)


locale(lang);
Vue.prototype.$Message = Message
// Vue.component('Message', Message);

Vue.prototype.$http = instance

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')