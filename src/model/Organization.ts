import type { DepV1 } from "./DepV1";
import { Employee } from "./Employee";
import { Page } from "./Page";
import type { POF } from "./POF";
import type { Position } from "./Position";

export class Organization {
  constructor(
    public id: number = -1,
    public shortName: String = "",
    public fullName: String = "",
    public inn: String = "",
    public kpp: String = "",
    public bossId: number = -1,
    public pofs: Array<POF> = new Array(),
    public departments: Array<DepV1> = new Array(),
    public positions: Array<Position> = new Array(),
    public boss: Employee = new Employee()
  ) { }
}

export class OrganizationPage extends Page {
  constructor(
    public content: Array<Organization> = new Array()
  ) {
    super();
  }
}