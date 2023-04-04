import { Page } from "./Page";

export class Employee {
  constructor(
    public id: number = -1,
    public lastName: string = "",
    public firstName: string = "",
    public middleName: string = "",
    public email: string = "",
    public phone: string = "",
    public kspd: string = "",
    public accountName:string="",
    public principalName:string="",
    public description:string="",
    public wsName:string="",
    public depId: number = -1,
    public depName: string = "",
    public posId: number = -1,
    public posName: string = "",
    public pofId: number = -1,
    public pofName: string = ""
  ) { }
}

export class EmployeePage extends Page {
  constructor(
    public content: Array<Employee> = new Array()
  ) {
    super();
  }
}