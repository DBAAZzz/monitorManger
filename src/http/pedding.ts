import axios, { AxiosRequestConfig } from 'axios'

// 使用Map来缓存请求
let pendingMap = new Map()


/**
 * 生成每个请求唯一的键
 * @param {*} config 
 * @returns string 
 */
export function getPendingKey(config: AxiosRequestConfig): string {
  let { url, method, params, data } = config
  if (typeof data === 'string') data = JSON.parse(data)
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
* 存储每个请求唯一值，也就是cancel方法，用于取消请求
* @param {*} config 
*/
export function addPending(config: AxiosRequestConfig): void {
  const paddingKey = getPendingKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingMap.has(paddingKey)) {
      pendingMap.set(paddingKey, cancel)
    }
  })
}

/**
* 删除重复的请求
* @param {*} config 
*/
export function removePending(config: AxiosRequestConfig): void {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey);
  }
}