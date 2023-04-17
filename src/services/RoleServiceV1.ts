import EntityServiceV1 from "./EntityServiceV1";
import type { PageRequest } from "@/model/Page";
import type { Role } from "@/model/Role";

export default class RoleServiceV1 extends EntityServiceV1<Role, PageRequest>{
  constructor(
    public url: String
  ) {
    super(url)
  }

}