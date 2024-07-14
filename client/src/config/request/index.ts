import axios, { AxiosInstance } from "axios";
import config, {
  defaultRequestInterceptor,
  defaultResponseInterceptorRes,
  cancelAllRequest,
  cancelRequest,
} from "./defaultConfig";
import { AxiosConfig, Response } from "./type";
import { toToastError } from "@/utils/toast";

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
  get: <T = any>(option: AxiosConfig) => {
    return service({ method: "get", ...option }) as Promise<Response<T>>;
  },
  post: <T = any>(option: AxiosConfig) => {
    return service({ method: "post", ...option }) as Promise<Response<T>>;
  },
  delete: <T = any>(option: AxiosConfig) => {
    return service({ method: "delete", ...option }) as Promise<Response<T>>;
  },
  put: <T = any>(option: AxiosConfig) => {
    return service({ method: "put", ...option }) as Promise<Response<T>>;
  },
  cancelRequest: (url: string | string[]) => {
    return cancelRequest(url);
  },
  cancelALlRequest: () => {
    return cancelAllRequest();
  },
};

export { useRequest, request };
