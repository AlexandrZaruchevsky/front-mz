import { useAuthStore } from "@/stores/AuthStore";
import EntityService from "./EntityService";
import { storeToRefs } from "pinia";
import axios from "axios";
import type { DepPageV1, DepV1 } from "@/model/DepV1";

const { token } = storeToRefs(useAuthStore())

export default class DepService extends EntityService<DepV1, DepPageV1>{
  constructor(
    public url: String,
  ) {
    super(url);
  }

  public async getAllDeps(): Promise<Array<DepV1>> {
    super.getServiceRequest().start();
    return await axios.get(`${super.getBaseFull()}/all`, {
      headers: {
        Authorization: token.value
      }
    }).then(response => {
      super.getServiceRequest().end()
      return response.data;
    }).catch(err => {
      super.getServiceRequest().error("Error fetch Departments")
      throw err;
    })
  }

  public async getAllDepsByOrg(orgId:Number= -1):Promise<Array<DepV1>>{
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
      super.getServiceRequest().error("Error fetch Departments")
      throw err;
    })
  }

}