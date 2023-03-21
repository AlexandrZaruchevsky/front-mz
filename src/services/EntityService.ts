import { PageRequest, type Page } from "@/model/Page";
import { ServiceRequest } from "@/model/ServiceRequest";
import { useAuthStore } from "@/stores/AuthStore";
import axios from "axios";
import { storeToRefs } from "pinia";

const { token } = storeToRefs(useAuthStore())

export default class CrudService<T, K extends Page>{
  constructor(
    public url: String,
    private baseUrl: String = "",
    private serviceRequest: ServiceRequest = new ServiceRequest(),
  ) {
    this.baseUrl = `${import.meta.env.VITE_BASE_URL}/${url}`;
  }

  public getBaseFull(): String {
    return this.baseUrl;
  }

  public getServiceRequest(): ServiceRequest {
    return this.serviceRequest;
  }

  public async getEntities(pageRequest: PageRequest = new PageRequest()): Promise<K> {
    this.serviceRequest.start();
    return await axios.get(`${this.baseUrl}`, {
      headers: {
        Authorization: token.value
      },
      params: { ...pageRequest }
    }).then(response => {
      this.serviceRequest.end()
      return response.data;
    }).catch(err => {
      this.serviceRequest.error("Error fetch Entites")
      throw err;
    })
  }

  public async getAllEntities(): Promise<Array<T>> {
    this.serviceRequest.start();
    return await axios.get(`${this.baseUrl}/all`, {
      headers: {
        Authorization: token.value
      }
    }).then(response => {
      this.serviceRequest.end()
      return response.data;
    }).catch(err => {
      this.serviceRequest.error("Error fetch Entites")
      throw err;
    })
  }

  public async getEntity(id: Number = -1): Promise<T> {
    this.serviceRequest.start();
    return await axios.get(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: token.value
      }
    }).then(response => {
      this.serviceRequest.end();
      return response.data
    }).catch(err => {
      this.serviceRequest.error("Error fetch Entity")
      throw err;
    });
  }

  public async addEntity(department: T): Promise<T> {
    this.serviceRequest.start();
    return await axios.post(`${this.baseUrl}`, department, {
      headers: {
        Authorization: token.value
      }
    }).then(response => {
      this.serviceRequest.end();
      return response.data
    }).catch(err => {
      this.serviceRequest.error("Error ADD Entity")
    })
  }

  public async updateEntity(t: T): Promise<T> {
    this.serviceRequest.start();
    return await axios.put(`${this.baseUrl}`, t, {
      headers: {
        Authorization: token.value
      }
    }).then(response => {
      this.serviceRequest.end();
      return response.data
    }).catch(err => {
      this.serviceRequest.error("Error UPDATE Entity")
    })
  }

  public async deleteEntity(id: Number = -1): Promise<Boolean> {
    this.serviceRequest.start()
    return await axios.delete(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: token.value
      }
    }).then(() => {
      this.serviceRequest.end()
      return true;
    }).catch(err => {
      this.serviceRequest.error("Error DELETE Entity")
      throw err;
    })
  }

}