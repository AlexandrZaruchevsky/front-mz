import { useAuthStore } from "@/stores/AuthStore";
import axios , { type AxiosInstance } from "axios";
import { storeToRefs } from "pinia";

const { token } = storeToRefs(useAuthStore())

const apiClient: AxiosInstance =  axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: token.value
  }
})

export default apiClient