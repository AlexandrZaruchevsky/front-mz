import type { Employee } from "@/model/Employee";
import http from './http-common';
import EntityServiceV1 from "./EntityServiceV1";
import type { PageRequest } from "@/model/Page";

export default class EmplService extends EntityServiceV1<Employee, PageRequest>{

  constructor(
    public url: String,
  ) {
    super(url);
  }

  public async getAllEmployees(orgId: Number = -1): Promise<Array<Employee>> {
    super.getServiceRequest().start();
    return await http.get(`${this.url}/all`, {
      params: {
        orgId
      }
    }).then(response => {
      super.getServiceRequest().end()
      return response.data;
    }).catch(err => {
      super.getServiceRequest().error("Error fetch Positions")
      throw err;
    })
  }

  public async fetchAllForChoice(fio: string = ""): Promise<Array<Employee>> {
    super.getServiceRequest().start();
    return await http.get(`${this.url}/list-choice`, {
      params: {
        fio
      }
    }).then(response => {
      super.getServiceRequest().end()
      return response.data;
    }).catch(err => {
      super.getServiceRequest().error("Error fetch Positions")
      throw err;
    })

  }


}