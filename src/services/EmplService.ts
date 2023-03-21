import type { Employee, EmployeePage } from "@/model/Employee";
import { useAuthStore } from "@/stores/AuthStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import EntityService from "./EntityService";

const { token } = storeToRefs(useAuthStore())

export default class EmplService extends EntityService<Employee, EmployeePage>{

  constructor(
    public url: String,
  ) {
    super(url);
  }

  public async getAllEmployees(orgId: Number = -1): Promise<Array<Employee>> {
    super.getServiceRequest().start();
    return await axios.get(`${super.getBaseFull()}/all`, {
      headers: {
        Authorization: token.value
      },
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


}