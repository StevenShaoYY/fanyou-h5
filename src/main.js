import Vue from "vue";
import App from "./App.vue";
import axios from "./http";
import router from "./router";
import store from "./store";
import MintUI from "mint-ui";
import { Toast } from 'mint-ui';
import { Checkbox, CheckboxGroup } from 'vant';
import 'vant/lib/index.css';
import "mint-ui/lib/style.css";
import "@/assets/styles/global.scss"
Vue.use(MintUI);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.prototype.$axios = axios;

Vue.prototype.toast = (msg) => {
    Toast(msg)
}
Vue.config.productionTip = false;
// 判断该路由是否需要登录权限
// router.beforeEach((to) => {
//   window.scrollTo(0, 0)
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
// })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");