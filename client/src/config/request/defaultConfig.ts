import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { AxiosConfig } from "./type";
import { toToastError } from "@/utils/toast";

const base = import.meta.env.VITE_SERVICE_APP;
const config: AxiosConfig = {
  baseUrl: {
    base,
  },
  code: 0,
  timeout: 600000,
  defaultHeaders: "application/json",
  interceptors: {},
};

const abortControllerMap = new Map();
const defaultRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const controller = new AbortController();
  const url = config.url || "";
  config.signal = controller.signal;
  abortControllerMap.set(url, controller);
  return config;
};

const defaultResponseInterceptorRes = (response: AxiosResponse<any>) => {
  const url = response.config.url || "";
  abortControllerMap.delete(url);

  const status = response.status;
  if (status >= 400) {
    const error = errorMsg(status);
    toToastError(error);
    return;
  }
  if (response?.config.responseType === "blob") {
    return response;
  } else if (response.data.code === config.code) {
    return response.data;
  } 
};

function cancelRequest(url: string | string[]) {
  const urlList = Array.isArray(url) ? url : [url];
  for (const _url of urlList) {
    abortControllerMap.get(_url)?.abort();
    abortControllerMap.delete(_url);
  }
}

function cancelAllRequest() {
  for (const [_, controller] of abortControllerMap) {
    controller.abort();
  }
  abortControllerMap.clear();
}

const errorMsg = (status: number) => {
  switch (status) {
    case 400:
      return "请求错误";
    case 401:
      return "未授权，请登录";
    case 403:
      return "拒绝访问";
    case 404:
      return `请求地址出错`;
    case 408:
      return "请求超时";
    case 500:
      return "服务器端错误";
    case 501:
      return "服务未实现";
    case 502:
      return "网关错误";
    case 503:
      return "服务不可用";
    case 504:
      return "网关超时";
    case 505:
      return "HTTP版本不受支持";
    default:
      return "未知错误";
  }
};

export {
  defaultRequestInterceptor,
  defaultResponseInterceptorRes,
  cancelRequest,
  cancelAllRequest,
};
export default config;
