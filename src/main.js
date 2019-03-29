import Vue from "vue";
import App from "./App.vue";
import axios from "./http";
import router from "./router";
import store from "./store";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import "@/assets/styles/global.scss"
Vue.use(MintUI);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
