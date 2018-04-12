import Vue from "vue";
import axios from 'axios';
import router from "../router";

axios.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest' };
axios.defaults.timeout = 10000;
axios.defaults.validateStatus = (status) => {
  return status >= 200 && status < 300;
}

let ajaxMethods = ["get", "post"];
let ajax = {};
let tempStorage = 0;

axios.interceptors.request.use((config) => {
  tempStorage++;
  console.log("start loading");
  if (sessionStorage.token) {
    config.headers.Authorization = sessionStorage.token;
  }
  return config;
}, function (error) {
  console.log("弹窗error")
  return Promise.reject(error);
});

axios.interceptors.response.use((res) => {
  tempStorage--;
  if (!tempStorage) {
    console.log("end loading1");
  }
  if (res.data && !res.data.success) {
    console.log("response error");
    return Promise.reject(res.data.error.message);
  }
  return Promise.resolve(res);
}, (err) => {
  tempStorage = 0;
  console.log("end loading2");
  if (err.response.status === 403) {
    router.push({
      path: "/transition/switchBtn"
    })
  } else if (err.response.status === 404) {

  } else if (err.response.status === 500) {

  } else if (err.response.status === 502) {

  } else if (err.response.status === 504) {

  }
  return Promise.reject(err)
});

ajaxMethods.forEach((method) => {
  ajax[method] = (url, data, headers, auth) => {
    return new Promise((resolve, reject) => {
      let options = {
        method,
        url,
      };
      if (method === "get") {
        options.params = data || {};
      } else {
        options.data = data || {};
      }
      if (headers) {
        options.headers = headers || {};
      }
      if (auth) {
        options.auth = auth || {};
      }
      axios(options).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      });
    });
  }
});

export default {
  install: (Vue) => {
    Vue.prototype.$ajax = ajax;
  }
}
