import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/mock/event',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          event: 10,
        },
      }
    },
  },
] as MockMethod[]