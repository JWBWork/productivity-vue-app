import Vue from 'vue'
import App from './App.vue'
import Vuebar from 'vuebar';
import vuetify from './plugins/vuetify';

Vue.use(Vuebar);
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
