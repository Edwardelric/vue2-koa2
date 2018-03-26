import Vue from "vue";
import axios from 'axios';

axios.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest' };
axios.defaults.timeout = 10000;
axios.defaults.validateStatus = (status) => {
  return status >= 200 && status < 300;
}

let ajaxMethods = ["get", "post"];
let ajax = {};
let tempStorage = [];

axios.interceptors.request.use((config) => {
  tempStorage.push(true);
  console.log("start loading");
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use((res) => {
  tempStorage.shift();
  if (!tempStorage.length) {
    console.log("end loading");
  }
  return res;
}, (err) => {
  return Promise.reject(err)
});

ajaxMethods.forEach((item) => {
  ajax[item] = (url, data, config) => {
    return new Promise((resolve, reject) => {
      axios[item](url, data, config).then((res) => {
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
