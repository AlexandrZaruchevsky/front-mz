import type { Equip, EquipParents } from "@/model/Equip";
import EntityServiceV1 from "./EntityServiceV1";
import type { PageRequestEquip } from "@/model/Page";
import http from './http-common';

export default class EquipService extends EntityServiceV1<Equip, PageRequestEquip>{
  constructor(
    public url: String
  ) {
    super(url)
  }

  public async fetchEquipParents(): Promise<EquipParents> {
    this.getServiceRequest().start();
    return await http.get(`${this.url}/equip-parents`).then(response => {
      this.getServiceRequest().end();
      return response.data
    }).catch(err=>{
      this.getServiceRequest().error("Error fetch Entites")
      throw err;
    })
  }

  public async fetchChildren(parentId:number): Promise<Array<Equip>> {
    this.getServiceRequest().start();
    return await http.get(`${this.url}/${parentId}/children`).then(response => {
      this.getServiceRequest().end();
      return response.data
    }).catch(err=>{
      this.getServiceRequest().error("Error fetch equip children")
      throw err;
    })
  }  

}