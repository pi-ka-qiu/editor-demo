/* eslint-disable no-param-reassign */
import Axios from 'axios';

let baseURL = process.env.VUE_APP_API_URL;
if (process.env.NODE_ENV !== 'production') baseURL = 'http://localhost:8080/api';
if (process.env.VUE_APP_MOCK) baseURL = 'http://localhost:8080/mock/6096';
Axios.defaults.baseURL = baseURL;
Axios.defaults.error = true;
Axios.defaults.headers = { token: 'b69064128b0940aa89399f9ff6edabd47980f73e' };
// 添加请求拦截器
Axios.interceptors.request.use(async config => config);

// 添加响应拦截器
Axios.interceptors.response.use(response => response,
  error => Promise.reject(error));


export default Axios;
