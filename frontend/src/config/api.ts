import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.BACKEND_PORT ?? 'http://localhost:8086',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})
