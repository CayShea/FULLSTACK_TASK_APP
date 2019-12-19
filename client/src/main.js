// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import App from './App';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faPlusCircle, faPen, faTrashAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon)

const http = axios.create({
  baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost:3000/',
});

Vue.prototype.$http = http;

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})






// new Vue({
//   render: (h) => h(App),
// }).$mount('#app');