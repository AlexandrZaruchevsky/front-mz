import type { Entity } from "@/model/Entity";
import { PageRequest, type PageGen } from "@/model/Page";
import { ServiceRequest } from "@/model/ServiceRequest";
import type { AxiosInstance } from "axios";
import { HttpAxios } from "./http-common-v1";

export default class EntityServiceV1<T extends Entity, K extends PageRequest>{
  constructor(
    public url: String,
    private serviceRequest: ServiceRequest = new ServiceRequest(),
    protected http: AxiosInstance = HttpAxios.getHttp()
  ) {
  }

  public getServiceRequest(): ServiceRequest {
    return this.serviceRequest;
  }

  public async getEntities(pageRequest: PageRequest | K = new PageRequest()): Promise<PageGen<T>> {
    this.serviceRequest.start();
    return await this.http.get(`${this.url}`, {
      params: pageRequest
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
    return await this.http.get(`${this.url}/all`).then(response => {
      this.serviceRequest.end()
      return response.data;
    }).catch(err => {
      this.serviceRequest.error("Error fetch Entites")
      throw err;
    })
  }

  public async getEntity(id: Number = -1): Promise<T> {
    this.serviceRequest.start();
    return await this.http.get(`${this.url}/${id}`).then(response => {
      this.serviceRequest.end();
      return response.data
    }).catch(err => {
      this.serviceRequest.error("Error fetch Entity")
      throw err;
    });
  }

  public async addEntity(department: T): Promise<T> {
    this.serviceRequest.start();
    return await this.http.post(`${this.url}`, department).then(response => {
      this.serviceRequest.end();
      return response.data
    }).catch(() => {
      this.serviceRequest.error("Error ADD Entity")
    })
  }

  public async updateEntity(t: T): Promise<T> {
    this.serviceRequest.start();
    return await this.http.put(`${this.url}`, t,).then(response => {
      this.serviceRequest.end();
      return response.data
    }).catch(() => {
      this.serviceRequest.error("Error UPDATE Entity")
    })
  }

  public async deleteEntity(id: Number = -1): Promise<Boolean> {
    this.serviceRequest.start()
    return await this.http.delete(`${this.url}/${id}`).then(() => {
      this.serviceRequest.end()
      return true;
    }).catch(err => {
      this.serviceRequest.error("Error DELETE Entity")
      throw err;
    })
  }

}