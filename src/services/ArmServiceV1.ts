import EntityServiceV1 from "./EntityServiceV1";
import type { PageRequest } from "@/model/Page";
import type { Arm } from "@/model/Arm";

export default class ArmServiceV1 extends EntityServiceV1<Arm, PageRequest>{
  constructor(
    public url: String
  ) {
    super(url)
  }

  public async fetchAllForChoice(name: string = ""): Promise<Array<Arm>> {
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


}