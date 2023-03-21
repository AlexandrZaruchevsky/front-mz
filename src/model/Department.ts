import { Organization } from "./Organization";
import { Page } from "./Page";

export class Department {
  constructor();
  constructor(
    public id: number = -1,
    public name: String = "",
    public topLevel: Boolean = true,
    public parentId: Number = -1,
    public bossId: Number = -1,
    public orgId: Number = -1,
    public orgName: String = "",
    public organization: Organization = new Organization()
  ) { }
}

export class DepartmentPage extends Page {
  constructor(
    public content: Array<Department> = new Array()
  ) {
    super();
  }
}