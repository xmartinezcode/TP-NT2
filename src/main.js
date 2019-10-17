import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps"
import VueRouter from 'vue-router'




Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBhpgWurgQ_iwcZKqXCnD6x6Zma6ooi5Xw",
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
