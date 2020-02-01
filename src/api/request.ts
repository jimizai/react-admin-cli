import axios from "axios";
import { message } from "antd";

interface FetchConfig {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: Record<string, any>;
}

const env = process.env.NODE_ENV || "development";
export let BASE_URL = "";

if (env === "development") {
  BASE_URL = "dev";
}
if (env === "test") {
  BASE_URL = "test";
}
if (env === "production") {
  BASE_URL = "prod";
}

axios.defaults.timeout = 5000;

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    message.error("加载超时");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  data => {
    return data;
  },
  error => {
    message.error("加载失败");
    return Promise.reject(error);
  }
);

export function fetch(config: FetchConfig) {
  // NProgress.set(0.7);
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // 请求超时
      timeout: 5000,
      headers: {},
      // 定义请求根目录
      baseURL: BASE_URL
    });
    instance(config)
      .then(res => {
        if (res.data.code !== 0) {
          message.error(res.data.msg);
        }
        resolve(res.data);
        // 失败后执行的函数
      })
      .catch(err => {
        message.error("服务器异常");
        reject(err);
      });
  });
}

export function get(url: string) {
  return fetch({
    url: url,
    method: "get"
  });
}
export function post(url: string, data: Record<string, any>) {
  return fetch({
    url: url,
    method: "post",
    data
  });
}
export function del(url: string) {
  return fetch({
    url: url,
    method: "delete"
  });
}
