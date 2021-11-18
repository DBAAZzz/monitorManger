import http from '../http'

export function login(data: object) {
  return http.post('/user/login', {
    data
  }, {
    isNeedLoading: false,
    isNeedShowError: false
  })
}

export function getList(params: object) {
  return http.get('/mock/event', {
    params
  }, {
    isNeedToken: true,
  })
}