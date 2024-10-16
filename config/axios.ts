import axios, { AxiosInstance } from 'axios'
import https from 'https'

const axiosInstance: AxiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

export default axiosInstance
