import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps"
import VueRouter from 'vue-router'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import VModal from 'vue-js-modal'
import Axios from 'axios'
import AsyncComputed from 'vue-async-computed'

Vue.prototype.$http = Axios;
Vue.use(AsyncComputed)
Vue.use(VModal)
Vue.use(VueResource)
Vue.use(BootstrapVue)
 
Vue.use(Datetime)




Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBGQSt703j5v4FOLnFANwgjKC-J32jOTgU",
    libraries: "places" // necessary for places input
  }
});

Vue.use(VueRouter);

Vue.config.productionTip = false

import{routes} from './routes'

const router = new VueRouter({
  routes, 
  linkActiveClass:'Active'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
