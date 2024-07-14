import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosError,
} from "axios";

export interface Response<T> {
  code: number;
  data: T;
  message: string;
}
export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptors?: (config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}
export interface AxiosConfig<T = AxiosResponse> {
  baseUrl: {
    base: string;
    dev?: string;
    pro?: string;
    test?: string;
  };
  code: number;
  defaultHeaders: AxiosHeaders;
  timeout: number;
  interceptors: RequestInterceptors<T>;
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
}
