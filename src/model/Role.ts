import { Page } from "./Page";

export class Role {
  constructor(
    public id: Number = -1,
    public name: String = "",
    public permissions: String[] = new Array<String>()
  ) { }
}

export class RolePage extends Page {
  constructor(
    public content: Role[] = new Array<Role>()
  ) {
    super();
  }
}