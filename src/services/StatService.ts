import type { EmplStat } from '@/model/Stats';
import { HttpAxios } from './http-common-v1';
import type { Employee } from '@/model/Employee';
import type { EmplInfo } from '@/model/Info';
import type { AxiosInstance } from 'axios';

export default class StatService {
  constructor(
    public url: String,
    private http: AxiosInstance = HttpAxios.getHttp()
  ) {
  }

  public async fetchEmplStat(): Promise<EmplStat> {
    return await this.http.get(`/${this.url}/employees`)
      .then(resp => resp.data);
  }

  public async fetchEmplByDep(depId: number = -1): Promise<Array<Employee>> {
    return await this.http.get(`/${this.url}/dep/${depId}/employees`)
      .then(resp => resp.data);
  }

  public async fetchEmplInfoByUsername(username: string = ""): Promise<EmplInfo> {
    return await this.http.get(`/${this.url}/employee/arms`, { params: { username } })
      .then(resp => resp.data);
  }

}



/**It's working */
// import type { EmplStat } from '@/model/Stats';
// import http from './http-common';
// import type { Employee } from '@/model/Employee';
// import type { EmplInfo } from '@/model/Info';

// export default class StatService {
//   constructor(
//     public url: String,
//   ) {
//   }

//   public async fetchEmplStat(): Promise<EmplStat> {
//     return await http.get(`/${this.url}/employees`)
//       .then(resp => resp.data);
//   }

//   public async fetchEmplByDep(depId: number = -1): Promise<Array<Employee>> {
//     return await http.get(`/${this.url}/dep/${depId}/employees`)
//       .then(resp => resp.data);
//   }

//   public async fetchEmplInfoByUsername(username: string = ""): Promise<EmplInfo> {
//     return await http.get(`/${this.url}/employee/arms`, { params: { username } })
//       .then(resp => resp.data);
//   }

// }

