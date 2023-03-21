import { Page } from "./Page";

export class DepV1 {
  constructor(
    public id: number = -1,
    public name: String = "",
    public topLevel: Boolean = true,
    public parentId: Number = -1,
    public bossId: Number = -1,
    public orgId: Number = -1,
    public orgName: String = "",
  ) { }
}

export class DepPageV1 extends Page {
  constructor(
    public content: Array<Dep> = new Array()
  ) {
    super();
  }
}