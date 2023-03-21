import { Page } from "./Page";

export class Organization {
  constructor(
    public id: Number = -1,
    public shortName: String = "",
    public fullName: String = "",
    public inn: String = "",
    public kpp: String = "",
    public bossId: Number = -1
  ) { }
}

export class OrganizationPage extends Page {
  constructor(
    public content: Array<Organization> = new Array()
  ) {
    super();
  }
}