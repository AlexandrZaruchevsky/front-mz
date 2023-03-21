import { useAuthStore } from "@/stores/AuthStore";
import EntityService from "./EntityService";
import { storeToRefs } from "pinia";
import axios from "axios";
import type { POF, POFPage } from "@/model/POF";

const { token } = storeToRefs(useAuthStore())

export default class POFService extends EntityService<POF, POFPage>{
  constructor(
    public url: String,
  ) {
    super(url);
  }

  public async getAllPOFs(): Promise<Array<POF>> {
    super.getServiceRequest().start();
    return await axios.get(`${super.getBaseFull()}/all`, {
      headers: {
        Authorization: token.value
      }
    }).then(response => {
      super.getServiceRequest().end()
      return response.data;
    }).catch(err => {
      super.getServiceRequest().error("Error fetch Points of Presence")
      throw err;
    })
  }

  public async getAllPOFByOrg(orgId:Number= -1):Promise<Array<POF>>{
    super.getServiceRequest().start();
    return await axios.get(`${super.getBaseFull()}/all`, {
      headers: {
        Authorization: token.value
      },
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

}