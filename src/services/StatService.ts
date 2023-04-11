import type { EmplStat } from '@/model/Stats';
import http from './http-common';
import type { Employee } from '@/model/Employee';
import type { EmplInfo } from '@/model/Info';

export default class StatService {
  constructor(
    public url: String,
  ) { }

  public async fetchEmplStat(): Promise<EmplStat> {
    return await http.get(`/${this.url}/employees`)
      .then(resp => resp.data);
  }

  public async fetchEmplByDep(depId: number = -1): Promise<Array<Employee>> {
    return await http.get(`/${this.url}/dep/${depId}/employees`)
      .then(resp => resp.data);
  }

  public async fetchEmplInfoByUsername(username: string = ""): Promise<EmplInfo> {
    return await http.get(`/${this.url}/employee/arms`, { params: { username } })
      .then(resp => resp.data);
  }

}
