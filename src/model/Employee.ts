import { Page } from "./Page";

export class Employee {
  constructor(
    public id: number = -1,
    public lastName: String = "",
    public firstName: String = "",
    public middleName: String = "",
    public email: String = "",
    public phone: String = "",
    public kspd: String = "",
    public depId: number = -1,
    public depName: String = "",
    public posId: number = -1,
    public posName: String = "",
    public pofId: number = -1,
    public pofName: String = ""
  ) { }
}

export class EmployeePage extends Page {
  constructor(
    public content: Array<Employee> = new Array()
  ) {
    super();
  }
}