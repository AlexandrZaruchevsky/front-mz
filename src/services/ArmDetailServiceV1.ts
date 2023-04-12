// import type { Equip, EquipParents } from "@/model/Equip";
import EntityServiceV1 from "./EntityServiceV1";
import type { PageRequest } from "@/model/Page";
// import http from './http-common';
import type { ArmDetail } from "@/model/Arm";

export default class ArmDetailServiceV1 extends EntityServiceV1<ArmDetail, PageRequest>{
  constructor(
    public url: String
  ) {
    super(url)
  }

  public async fetchArmDetailsByArmId(id: number): Promise<Array<ArmDetail>> {
    return this.http.get(`/${this.url}`, {
      params: {
        id
      }
    }).then(response => {
      return response.data
    }).catch(err => {
      throw err;
    })
  }

}