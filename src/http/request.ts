import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig
} from "axios";
import { RequestType, CustomConfigType } from './index.type'
import { removePending, addPending } from './pedding'

export default class Request implements RequestType {
  // axios实例
  public instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = this.genInstance(config);
    this.interceptorsResponse()
    this.interceptorsRequest()
  }

  private genInstance(config: AxiosRequestConfig) {
    return axios.create({
      timeout: 1000 * 10,
      ...config
    })
  }

  // 添加请求拦截器
  private interceptorsRequest() {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      removePending(config);
      addPending(config);
      return config
    })
  }

  // 添加响应拦截器
  private interceptorsResponse(): void {
    this.instance.interceptors.response.use((response: AxiosResponse<any>) => {
      const { code, data, message } = response.data
      // 响应码为200时，为正常响应
      if (code == 200) {
        return Promise.resolve(data)
      } else {
        return Promise.reject({
          code,
          data,
          message
        })
      }
    }, error => {
      removePending(error.config);
      return Promise.reject(error)
    })
  }

  // 使用axios的request方法
  public async request(config: AxiosRequestConfig) {
    return await this.instance.request(config)
  }

}