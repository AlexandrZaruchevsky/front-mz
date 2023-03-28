import { Page } from "./Page";

export class Role {
  constructor(
    public id: number = -1,
    public name: string = "",
    public permissions: string[] = new Array<string>()
  ) { }
}

export class RolePage extends Page {
  constructor(
    public content: Role[] = new Array<Role>()
  ) {
    super();
  }
}