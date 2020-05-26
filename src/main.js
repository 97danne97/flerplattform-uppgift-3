import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css'
import { store } from './store'

import 'material-design-icons/iconfont/material-icons.css'
import Vue2Filters from 'vue2-filters'

Vue.use(Vuex)
Vue.use(Vue2Filters)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
