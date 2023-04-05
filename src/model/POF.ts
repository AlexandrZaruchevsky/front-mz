import { Page } from "./Page";

export class POF {
  constructor(
    public id: number = -1,
    public shortName: string = "",
    public fullName: string = "",
    public postcode: string = "",
    public region: string = "",
    public district: string = "",
    public city: string = "",
    public village: string = "",
    public street: string = "",
    public house: string = "",
    public corpus: string = "",
    public apartment: string = "",
    public bossId: number = -1,
    public orgId: number = -1,
    public orgName: string = ""
  ) { }
}

export class POFPage extends Page {
  constructor(
    public content: Array<POF> = new Array()
  ) {
    super();
  }
}