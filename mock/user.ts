import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/mock/createUser',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          a: 1,
          b: 2
        },
      }
    },
  },
] as MockMethod[]