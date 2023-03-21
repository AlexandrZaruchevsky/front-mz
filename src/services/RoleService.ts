import { useAuthStore } from "@/stores/AuthStore";
import { storeToRefs } from "pinia";
import axios from "axios";
import type { RolePage } from "@/model/Role";
import { PageRequest } from "@/model/Page";

const { token } = storeToRefs(useAuthStore());
const baseUrl = `${import.meta.env.VITE_BASE_URL}/roles`;

export default class RoleService {

  public static async getUsers(pageRequest: PageRequest = new PageRequest()): Promise<RolePage> {
    return await axios.get(`${baseUrl}`, {
      params: {
        ...pageRequest
      },
      headers: {
        Authorization: token.value
      }
    }).then(response => {
      return response.data;
    })
  }

  // public static async fetchUser(id: Number): Promise<User> {
  //   return await axios.get(`${baseUrl}/users/${id}`, {
  //     headers: {
  //       Authorization: token.value
  //     }
  //   }).then(response => {
  //     return response.data;
  //   })
  // }

  // public static async addUser(user: User): Promise<User> {
  //   return await axios.post(`${baseUrl}/users`, user, {
  //     headers: {
  //       Authorization: token.value
  //     }
  //   }).then(response => {
  //     return response.data
  //   })
  // }

  // public static async updateUser(user: User): Promise<User> {
  //   return await axios.put(`${baseUrl}/users`, user, {
  //     headers: {
  //       Authorization: token.value
  //     }
  //   }).then(response => {
  //     return response.data
  //   })
  // }

}