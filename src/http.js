import axios from 'axios';
import router from './router';

console.log('axios');

// let loading;

function startLoading() {
  console.log('startLoading');
}

function endLoading() {
  console.log('endLoading');
}
// 请求拦截
axios.interceptors.request.use(config => {
    // 加载动画
    startLoading();
    config.headers['ACCESS_TOKEN'] = '14eeef49ffd34b558d911945b9410a1d'

    if (localStorage.eleToken) {
      // 设置统一的请求header
      config.headers.Authorization = localStorage.eleToken;
    }

    return config;
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
  // 结束加载动画
  endLoading();
  return response;
}, error => {
  // 错误提醒
  endLoading();
  // Message.error(error.response.data);

  // 获取错误状态码
  const { status } = error.response;
  // if (status == 401) {
  //   // Message.error('token失效,请重新登录！');
  //   // 清除token
  //   localStorage.removeItem('eleToken');
  //   // 跳转到登录页面
  //   router.push("/login")
  // }

  return Promise.reject(error)
})


export default axios;