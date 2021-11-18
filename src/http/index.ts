import {
  RequestProxyType,
  CustomConfigType,
  RequestType
} from "./index.type";
import Request from "./request";
import { ElLoading, ElMessage, ILoadingInstance } from 'element-plus'
import { AxiosRequestConfig, AxiosResponse } from "axios";

let loadingInstance: ILoadingInstance;

class Http implements RequestProxyType {
  private axios: RequestType;
  private defaultCustomConfig: CustomConfigType = {
    isNeedLoading: false,
    isNeedToken: true,
    isNeedShowError: true
  };

  constructor(config: AxiosRequestConfig) {
    this.axios = new Request(config);
  }

  /**
   * 统一处理请求
   * @param config 配置项
   * @param customConfig 自定义配置
   */
  private async transfromRquest(
    config: AxiosRequestConfig,
    customConfig: CustomConfigType = {}
  ): Promise<AxiosResponse> {
    // 传入的customConfig覆盖defaultCustomConfig
    customConfig = { ...this.defaultCustomConfig, ...customConfig };
    try {
      if (customConfig.isNeedLoading) {
        this.handleLoading()
      }
      if (customConfig.isNeedToken) {
        this.handleToken(config)
      }
      const result = await this.axios.request(config);
      loadingInstance?.close()
      return result;
    } catch (error: any) {
      let { message } = error
      loadingInstance?.close()
      if (customConfig.isNeedShowError) ElMessage.error(message)
      this.handleError(error)
      return Promise.reject({
        ...error
      });
    }
  }

  // 处理异常情况
  private handleError(error: any) {
    let { code, message } = error
    if (code == 300) {

    } else if (code == 400) {

    }
    // ...
  }

  // 处理isNeedLoading情况
  private handleLoading() {
    loadingInstance = ElLoading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }

  private handleToken(config: AxiosRequestConfig) {
    let token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5MjljNjQwLTg3OWQtMTFlYi1iNGExLTMzM2ZhNTQ5ZjVlYSIsImlhdCI6MTYzNzA1NDQzNywiZXhwIjoxNjM3MTQwODM3fQ.05n7AWbMZWvCFLmPHmv0UECaiqChTkzTmmowyTET8wg'
    config.headers = {
      'authorization': `Bearer ${token}`
    }
  }

  public async post(
    url: string,
    config?: AxiosRequestConfig,
    customConfig: CustomConfigType = this.defaultCustomConfig
  ): Promise<AxiosResponse> {
    return this.transfromRquest({
      url,
      method: 'post',
      ...config
    }, customConfig)
  }

  public async get(
    url: string,
    config?: AxiosRequestConfig,
    customConfig: CustomConfigType = this.defaultCustomConfig
  ): Promise<AxiosResponse> {
    return this.transfromRquest({
      url,
      method: 'get',
      ...config
    }, customConfig)
  }
}

const http = new Http({
  baseURL: ''
})

export default http
