import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useUserStore } from 'stores/user';

// 创建 Axios 实例并设置基本配置
const http: AxiosInstance = axios.create({
  baseURL: 'http://link.ichgo.cn/api/v1/', // 替换为你的 API 基础 URL
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在这里添加身份验证逻辑或其他请求前的逻辑
    const store = useUserStore();
    const token = store.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 请求错误的处理
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // 根据返回的 HTTP 状态码来处理响应
    return response;
  },
  (error) => {
    // 响应错误的处理
    return Promise.reject(error);
  }
);

export default http;
