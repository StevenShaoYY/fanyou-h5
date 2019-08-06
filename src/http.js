import axios from "axios";
import router from "./router";
import { Toast } from "mint-ui";

console.log("axios");

// let loading;

function startLoading() {
  console.log("startLoading");
}

function endLoading() {
  console.log("endLoading");
}
const request = axios.create({
  baseURL: "https://www.fanyoutech.com/h5",
  timeout: 5000 // 请求超时时间
});

// 请求拦截
request.interceptors.request.use(
  config => {
    // 加载动画
    startLoading();
    // config.headers['ACCESS_TOKEN'] = '7650f0c667d541a1ad55def0db1d58ae'

    if (localStorage.getItem("ACCESS_TOKEN")) {
      // 设置统一的请求header
      config.headers["ACCESS_TOKEN"] = localStorage.getItem("ACCESS_TOKEN");
      // config.headers['ACCESS_TOKEN'] = '7650f0c667d541a1ad55def0db1d58ae'
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  response => {
    // 结束加载动画
    // endLoading();
    // console.log('response');
    // console.log('response: ', response);
    return response;
  },
  error => {
    // 错误提醒
    // endLoading();

    console.log(error.response);
    // Message.error(error.response.data);
    if (
      (error.response &&
        error.response.data &&
        error.response.data.msg == "ACCESS_TOKEN无对应信息") ||
      (error.response &&
        error.response.data &&
        error.response.data.msg == "ACCESS_TOKEN已过期")
    ) {
      Toast("登录信息过期，请重新登录");
      router.push("login");
    } else {
      Toast("数据异常: " + error);
    }
    // 获取错误状态码
    // const { status, data } = error.response;
    // console.log('status: ', status)
    // if (!data.ok) {
    //     // Message.error(status.data.msg);

    // alert('数据异常: ' + data.msg)
    // 清除token
    // localStorage.removeItem('ACCESS_TOKEN');
    // 跳转到登录页面
    // router.push("/login")
    // }

    return Promise.reject(error);
  }
);

export default request;
