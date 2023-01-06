import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosRequest {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  baseURL?: string;
  path?: string;
  params?: Record<string, string | number | boolean>;
  data?: Record<string, string | number | boolean>;
  headers?: Record<string, string | number | boolean>;
}

enum HTTPStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

const axiosClient = (request: AxiosRequest) => {
  const baseURL = request.baseURL ? request.baseURL : 'https://reqres.in';
  const path = request.path ? request.path : '';
  const headers = request.headers
    ? request.headers
    : {
        'Content-Type': 'application/json',
      };

  const axiosInstance = axios.create();
  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    function (config: AxiosRequestConfig) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    function (response: AxiosResponse) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response.data;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      switch (error.response.status) {
        case HTTPStatusCode.BAD_REQUEST:
          break;
        case HTTPStatusCode.NOT_FOUND:
          break;
        case HTTPStatusCode.UNAUTHORIZED:
        case HTTPStatusCode.FORBIDDEN:
          break;
        default:
          break;
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance.request({
    method: request.method,
    baseURL,
    url: path,
    params: request.params,
    data: request.data,
    headers,
  });
};

export default axiosClient;
