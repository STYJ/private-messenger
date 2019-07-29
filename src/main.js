import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store/index.js";
import "./registerServiceWorker";

// This is for font awesome icons
import Vuetify from "vuetify";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader

Vue.use(Vuetify, {
  iconfont: "fa"
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
