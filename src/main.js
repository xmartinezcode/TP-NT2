import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps"
import VueRouter from 'vue-router'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'
import VModal from 'vue-js-modal'






Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
Vue.use(Axios)
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
