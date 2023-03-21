import { Page } from "./Page";

export class POF {
  constructor(
    public id: number = -1,
    public shortName: String = "",
    public fullName: String = "",
    public postcode: String = "",
    public region: String = "",
    public district: String = "",
    public city: String = "",
    public village: String = "",
    public street: String = "",
    public house: String = "",
    public corpus: String = "",
    public apartment: String = "",
    public bossId: number = -1,
    public orgId: number = -1,
    public orgName: String = ""
  ) { }
}

export class POFPage extends Page {
  constructor(
    public content: Array<POF> = new Array()
  ) {
    super();
  }
}