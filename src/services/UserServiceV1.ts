import EntityServiceV1 from "./EntityServiceV1";
import type { PageRequest } from "@/model/Page";
import { LoginPassword, type User } from "@/model/User";

export default class UserServiceV1 extends EntityServiceV1<User, PageRequest>{
  constructor(
    public url: String
  ) {
    super(url)
  }

  public async userChangePassword(loginPassword: LoginPassword = new LoginPassword()): Promise<String> {
    return await this.http.post(`/${this.url}/change-password`, loginPassword).then(resp => {
      return resp.data;
    })
  }

}