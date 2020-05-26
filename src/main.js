import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css'
import 'material-design-icons/iconfont/material-icons.css'

Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
