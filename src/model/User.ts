import { Page } from "./Page";
import type { Role } from "./Role";

export class LoginPassword {
  constructor(
    public username: String = "",
    public password: String = ""
  ) { }
}

export class User {
  constructor(
    public id: Number = 0,
    public username: String = "",
    public password: String = "",
    public lastName: String = "",
    public firstName: String = "",
    public middleName: String = "",
    public email: String = "",
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
