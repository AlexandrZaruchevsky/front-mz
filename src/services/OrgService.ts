import { useAuthStore } from "@/stores/AuthStore";
import EntityService from "./EntityService";
import { storeToRefs } from "pinia";
import axios from "axios";
import type { Organization, OrganizationPage } from "@/model/Organization";

const { token } = storeToRefs(useAuthStore())

export default class OrgService extends EntityService<Organization, OrganizationPage>{
  constructor(
    public url: String,
  ) {
    super(url);
  }

  public async getAllOrgs(): Promise<Array<Organization>> {
    super.getServiceRequest().start();
    return await axios.get(`${super.getBaseFull()}/all`, {
      headers: {
        Authorization: token.value
      }
    }).then(response => {
      super.getServiceRequest().end()
      return response.data;
    }).catch(err => {
      super.getServiceRequest().error("Error fetch Organizations")
      throw err;
    })
  }

}