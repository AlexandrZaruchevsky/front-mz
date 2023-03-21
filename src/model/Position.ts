import { Page } from "./Page";

export class Position {
  constructor(
    public id: number = -1,
    public name: String = "",
    public orgId: number = -1,
    public orgName: String = ""
  ) { }
}

export class PositionPage extends Page {
  constructor(
    public content: Array<Position> = new Array()
  ) {
    super();
  }
}