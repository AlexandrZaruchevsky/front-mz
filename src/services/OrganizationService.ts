import { useAuthStore } from "@/stores/AuthStore";
import { storeToRefs } from "pinia";
import axios from "axios";
import { PageRequest } from "@/model/Page";
import type { Organization, OrganizationPage } from "@/model/Organization";

const { token } = storeToRefs(useAuthStore());
const baseUrl = `${import.meta.env.VITE_BASE_URL}/organizations`;

export default class OrganizationService {

  public static async getOrgs(pageRequest: PageRequest = new PageRequest()): Promise<OrganizationPage> {
    return await axios.get(`${baseUrl}`, {
      headers: {
        Authorization: token.value
      },
      params: { ...pageRequest }
    }).then(response => {
      return response.data;
    })
  }

  public static async getOrg(id: Number = -1): Promise<Organization> {
    return await axios.get(`${baseUrl}/${id}`, {
      headers: {
        Authorization: token.value
      }
    }).then(response => response.data);
  }

  public static async addOrg(org: Organization): Promise<Organization> {
    return await axios.post(`${baseUrl}`, org, {
      headers: {
        Authorization: token.value
      }
    }).then(response => response.data)
  }

  public static async updateOrg(org: Organization): Promise<Organization> {
    return await axios.put(`${baseUrl}`, org, {
      headers: {
        Authorization: token.value
      }
    }).then(response => response.data)
  }

  public static async deleteOrg(id: Number = -1): Promise<Boolean> {
    return await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: token.value
      }
    }).then(response => {
      console.log(response.data);
      return true;
    }).catch(err => {
      console.log(err.data);
      return false;
    })
  }

}