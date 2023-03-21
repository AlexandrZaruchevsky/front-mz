import type { UserAuth, LoginPassword, User } from "@/model/User";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export class AuthSevice {

  public static async getAuth(loginPassword: LoginPassword): Promise<UserAuth> {
    return await axios.post(
      `${baseUrl}/auth/login`,
      loginPassword
    )
      .then(response => {
        return response.data
      })
  }

  public static async validateToken(token: String): Promise<User> {
    return await axios.post(
      `${baseUrl}/auth/validate`,
      null,
      {
        params: {
          token
        }
      }
    ).then(response => response.data)
  }

}