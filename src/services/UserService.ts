import { useAuthStore } from "@/stores/AuthStore";
import { storeToRefs } from "pinia";
import axios from "axios";
import type { User, UserPage } from "@/model/User";
import { PageRequest } from "@/model/Page";

const { token } = storeToRefs(useAuthStore());
const baseUrl = import.meta.env.VITE_BASE_URL;

export default class UserService {

  public static async getUsers(pageRequest: PageRequest = new PageRequest()): Promise<UserPage> {
    return await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: token.value
      },
      params: { ...pageRequest }
    }).then(response => {
      return response.data;
    })
  }

  public static async fetchUser(id: Number): Promise<User> {
    return await axios.get(`${baseUrl}/users/${id}`, {
      headers: {
        Authorization: token.value
      }
    }).then(response => {
      return response.data;
    })
  }

  public static async addUser(user: User): Promise<User> {
    return await axios.post(`${baseUrl}/users`, user, {
      headers: {
        Authorization: token.value
      }
    }).then(response => {
      return response.data
    })
  }

  public static async updateUser(user: User): Promise<User> {
    return await axios.put(`${baseUrl}/users`, user, {
      headers: {
        Authorization: token.value
      }
    }).then(response => {
      return response.data
    })
  }

}