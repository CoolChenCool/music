// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import store from './store';
 import router from './router';
import 'common/stylus/index.styl';
import fastClick from 'fastclick';
import VueLoad from 'vue-lazyload';
/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
 import vConsole from 'vconsole';
 console.log('test');
Vue.use(VueLoad, {
  loading: require('./images/loading.gif')
});
fastClick.attach(document.body);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
