import type { Equip, EquipParents } from "@/model/Equip";
import EntityServiceV1 from "./EntityServiceV1";
import type { PageRequestEquip } from "@/model/Page";

export default class EquipService extends EntityServiceV1<Equip, PageRequestEquip>{
  constructor(
    public url: String
  ) {
    super(url)
  }

  public async fetchAllForChoice(name: string = ""): Promise<Array<Equip>> {
    return await this.http.get(`${this.url}/list-choice`, {
      params: {
        name
      }
    }).then(response => {
      super.getServiceRequest().end()
      return response.data;
    }).catch(err => {
      super.getServiceRequest().error("Error fetch Positions")
      throw err;
    })
  }

  public async fetchAllForChoiceWithSort(sortBy: string = "", name: string = ""): Promise<Array<Equip>> {
    return await this.http.get(`${this.url}/list-choice`, {
      params: {
        sortBy,
        name
      }
    }).then(response => {
      super.getServiceRequest().end()
      return response.data;
    }).catch(err => {
      super.getServiceRequest().error("Error fetch Positions")
      throw err;
    })
  }

  public async fetchEquipParents(): Promise<EquipParents> {
    this.getServiceRequest().start();
    return await this.http.get(`${this.url}/equip-parents`).then(response => {
      this.getServiceRequest().end();
      return response.data
    }).catch(err=>{
      this.getServiceRequest().error("Error fetch Entites")
      throw err;
    })
  }

  public async fetchChildren(parentId:number): Promise<Array<Equip>> {
    this.getServiceRequest().start();
    return await this.http.get(`${this.url}/${parentId}/children`).then(response => {
      this.getServiceRequest().end();
      return response.data
    }).catch(err=>{
      this.getServiceRequest().error("Error fetch equip children")
      throw err;
    })
  }  

}