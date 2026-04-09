import axios from 'axios'

export const kanjiapi = axios.create({
  baseURL: 'https://kanjiapi.dev/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})
