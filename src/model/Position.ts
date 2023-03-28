import { Page } from "./Page";

export class Position {
  constructor(
    public id: number = -1,
    public name: string = "",
    public orgId: number = -1,
    public orgName: string = ""
  ) { }
}

export class PositionPage extends Page {
  constructor(
    public content: Array<Position> = new Array()
  ) {
    super();
  }
}