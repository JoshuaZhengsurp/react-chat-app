import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import config, {
  defaultRequestInterceptor,
  defaultResponseInterceptorRes,
  cancelAllRequest,
  cancelRequest,
} from "./defaultConfig";
import { Response } from "./type";
import { toToastError } from "@/utils/toast";
/**
 * @todo 有些过度封装了，需要简洁下
 */

function useRequest(): AxiosInstance {
  const service = axios.create({
    baseURL: config.baseUrl.base,
    timeout: config.timeout,
    responseType: "json",
  });

  service.defaults.withCredentials = false;
  service.defaults.headers.post["Content-Type"] = config.defaultHeaders;
  service.defaults.headers.put["Content-Type"] = config.defaultHeaders;
  service.defaults.headers.delete["Content-Type"] = config.defaultHeaders;

  service.interceptors.request.use(defaultRequestInterceptor, (error) => {
    toToastError(error);
    return Promise.reject(error);
  });

  service.interceptors.response.use(defaultResponseInterceptorRes, (error) => {
    toToastError(error);
    return Promise.reject(error);
  });

  return service;
}

const service = useRequest();
const request = {
  get: <T = any>(url: string, option?: AxiosRequestConfig) => {
    return service({ method: "get", url, ...option }) as Promise<Response<T>>;
  },
  post: <T = any>(url: string, option?: AxiosRequestConfig) => {
    return service({ method: "post", url, ...option }) as Promise<Response<T>>;
  },
  delete: <T = any>(url: string, option?: AxiosRequestConfig) => {
    return service({ method: "delete", url, ...option }) as Promise<Response<T>>;
  },
  put: <T = any>(url: string, option?: AxiosRequestConfig) => {
    return service({ method: "put", url, ...option }) as Promise<Response<T>>;
  },
  cancelRequest: (url: string | string[]) => {
    return cancelRequest(url);
  },
  cancelALlRequest: () => {
    return cancelAllRequest();
  },
};

export { useRequest, request };
