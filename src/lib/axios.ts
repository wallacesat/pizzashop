import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => {
      const time = setTimeout(() => {
        clearTimeout(time)
        return resolve(null)
      }, 2000)
    })

    return config
  })
}
