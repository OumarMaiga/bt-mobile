import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.billetteliman.com',
  timeout: 10000,
})
