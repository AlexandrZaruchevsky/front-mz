import { Page } from "./Page";
import type { Role } from "./Role";

export class LoginPassword {
  constructor(
    public username: string = "",
    public password: string = ""
  ) { }
}

export class User {
  constructor(
    public id: number = 0,
    public username: string = "",
    public password: string = "",
    public lastName: string = "",
    public firstName: string = "",
    public middleName: string = "",
    public email: string = "",
    public roles: Role[] = new Array<Role>()
  ) { }
}

export class UserAuth {
  constructor(
    public token: String = "",
    public isAuth: Boolean = false,
    public user: User = new User()
  ) { }
}

export class UserPage extends Page {
  constructor(
    public content: Array<User> = new Array()
  ) {
    super();
  }
}
