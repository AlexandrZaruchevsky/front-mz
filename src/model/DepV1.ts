import { Page } from "./Page";

export class DepV1 {
  constructor(
    public id: number = -1,
    public name: String = "",
    public topLevel: Boolean = true,
    public parentId: number = -1,
    public bossId: number = -1,
    public orgId: number = -1,
    public orgName: String = "",
  ) { }
}

export class DepPageV1 extends Page {
  constructor(
    public content: Array<DepV1> = new Array()
  ) {
    super();
  }
}