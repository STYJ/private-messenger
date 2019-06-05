import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store/index.js";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
