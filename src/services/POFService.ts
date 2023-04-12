// import http from './http-common';
import type { POF } from "@/model/POF";
import type { PageRequest } from "@/model/Page";
import EntityServiceV1 from "./EntityServiceV1";

export default class POFService extends EntityServiceV1<POF, PageRequest>{
  constructor(
    public url: String,
  ) {
    super(url);
  }

  public async getAllPOFs(): Promise<Array<POF>> {
    super.getServiceRequest().start();
    return await this.http.get(`${this.url}/all`).then(response => {
      super.getServiceRequest().end()
      return response.data;
    }).catch(err => {
      super.getServiceRequest().error("Error fetch Points of Presence")
      throw err;
    })
  }

  public async getAllPOFByOrg(orgId:Number= -1):Promise<Array<POF>>{
    super.getServiceRequest().start();
    return await this.http.get(`${this.url}/all`, {
      params:{
        orgId
      }
    }).then(response => {
      super.getServiceRequest().end()
      return response.data;
    }).catch(err => {
      super.getServiceRequest().error("Error fetch Points of Presence")
      throw err;
    })
  }

  public async fetchAllForChoice(name:string):Promise<Array<POF>>{
    super.getServiceRequest().start();
    return await this.http.get(`${this.url}/list-choice`,{
      params:{
        name
      }
    }).then(response=>{
      super.getServiceRequest().end()
      return response.data;
    }).catch(err => {
      super.getServiceRequest().error("Error fetch Positions")
      throw err;
    })
  }

}