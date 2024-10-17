import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import https from 'https'
import { inject, injectable } from 'inversify'
import { Configuration } from './config'
import { TYPES } from '../constants/constants'

@injectable()
class AxiosConfig {
  private readonly axiosInstance: AxiosInstance

  constructor (@inject(TYPES.Configuration) private readonly config: Configuration) {
    this.axiosInstance = axios.create({
      baseURL: this.config.get('NASA_BASE_URL'),
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })

    this.setupInterceptors()
  }

  getInstance (): AxiosInstance {
    return this.axiosInstance
  }

  private setupInterceptors () {
    this.axiosInstance.interceptors.request.use(
      (axiosRequestConfig: InternalAxiosRequestConfig) => {
        const params = axiosRequestConfig.params || {}

        if (axiosRequestConfig.url?.startsWith('/neo')) {
          params.api_key = this.config.get('NASA_API_KEY')
        }

        axiosRequestConfig.params = params
        return axiosRequestConfig
      },
      (error: Error) => {
        return Promise.reject(error)
      }
    )
  }
}

export { AxiosConfig }
