import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/AuthStore";
import axios, { type AxiosInstance } from "axios";


export class HttpAxios {
  public static getHttp(): AxiosInstance {
    const { token, isAuth } = storeToRefs(useAuthStore())
    apiClient.interceptors.request.use(config => {
      if (isAuth.value) {
        config.headers.Authorization = token.value
      }
      return config
    })
    return apiClient
  }
}

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
})

export default apiClient