import { useAuthStore } from "@/stores/AuthStore";
import axios, { type AxiosInstance } from "axios";
import { storeToRefs } from "pinia";

const { token, isAuth } = storeToRefs(useAuthStore())

const apiClient: AxiosInstance = isAuth.value
  ? axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-type": "application/json",
      Authorization: token.value
    }
  })
  : axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      "Content-type": "application/json"
    }
  })



export default apiClient