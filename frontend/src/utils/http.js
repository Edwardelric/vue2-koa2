import axios from 'axios';
import router from '../router';
import { isLoading } from './util';

let ajax = {};
let instance = axios.create({
  baseUrl: '',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

instance.loadingTimes = 0;
instance.interceptors.request.use((config) => {
  instance.loadingTimes++;
  isLoading(true, config.opts);
  return config;
}, function (error) {
  isLoading(false, config.opts);
  return Promise.reject(error);
});

instance.interceptors.response.use((res) => {
  instance.loadingTimes--;
  if (!instance.loadingTimes) {
    isLoading(false, res.config.opts);
  }
  if ([200, 302, 304].indexOf(res.status) > -1) {
    return Promise.resolve(res);
  } else {
    return Promise.reject(res.data);
  }
}, (err) => {
  instance.loadingTimes = 0;
  isLoading(false, res.config.opts);
  return Promise.reject(err);
});

['get', 'post'].forEach((item, index) => {
  ajax[item] = (url, data = {}, opts = {}) => {
    return new Promise((resolve, reject) => {
      let options = {url, opts};
      if (item === 'get') {
        // get请求
        options = Object.assign({}, options, {method: 'get', params: data});
      } else {
        // post请求
        options = Object.assign({}, options, {method: 'post', data});
      }
      instance(options).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      })
    });
  };
});

export default {
  install: (Vue) => {
    Vue.prototype.$ajax = ajax;
  }
}
