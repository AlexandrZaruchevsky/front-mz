import type { Entity } from "@/model/Entity";
import { PageRequest, type Page, PageGen, SelectOption } from "@/model/Page";
import { ServiceRequest } from "@/model/ServiceRequest";
import http from './http-common';
import router from "@/router";
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";


export default class TestServiceV1<T extends Entity>{
  private page  = reactive<PageGen<T>>( new PageGen());
  private entities: Array<T> = new Array();
  private localEntity: T;
  private add: boolean = false;
  constructor(
    public entityInit: T,
    public restApiUrl: string,
    public localUrl: string = "",
    public serviceRequest: ServiceRequest = new ServiceRequest(),
    public pageRequest: PageRequest = new PageRequest(),
    public sortByList: Array<SelectOption> = [
      new SelectOption("name", "Наименование")
    ],
    public pageSizeList: Array<SelectOption> = [
      new SelectOption(10, 10),
      new SelectOption(20, 20),
      new SelectOption(50, 50)
    ],
  ) {
    this.localEntity = entityInit;
  }

  public async changeSort(sort: string = "name"):Promise<void>{
    this.pageRequest.sortBy = sort;
    this.pageRequest.search = ""
    await this.fetchEntities();
  }

  public async setPageSize(pageSize: number | string = 20):Promise<void> {
    this.pageRequest.pageSize = pageSize as number
    this.pageRequest.pageCurrent = 0;
    await this.fetchEntities();
  }

  public async previosPage():Promise<void> {
    if (!this.page.first) {
      this.pageRequest.pageCurrent -= 1;
      await this.fetchEntities();
    }
  }

  public async nextPage():Promise<void> {
    if (!this.page.last) {
      this.pageRequest.pageCurrent += 1;
      await this.fetchEntities();
    }
  }

  public setAdd(isAdd: boolean = true): void {
    this.add = isAdd;
  }

  public isAdd(): boolean {
    const paramId = useRoute().params.id as string;
    if (!parseInt(paramId)) {
      if (paramId === "add") {
        return true
      } else {
        return false;
      }
    }
    else {
      return false
    }
  }

  public addForm(): void {
    const addPath: string = `${useRoute().fullPath}/add`
    this.localEntity = this.entityInit;
    router.push({ path: addPath });
  }

  public async updateForm(id: number = -1): Promise<void> {
    if (id <= 1) return
    const addPath: string = `${useRoute().fullPath}/${id}`;
    await this.fetchEntity(id).then(() => {
      router.push({ path: addPath });
    })
  }

  public async saveEntity(): Promise<void> {
    if (this.isAdd()) {
      this.addEntity(this.localEntity).then(() => {
        router.push({ path: this.getPreviosPath() })
      })
    } else {
      this.updateEntity(this.localEntity).then(() => {
        router.push({ path: this.getPreviosPath() })
      })
    }
  }

  private getPreviosPath(): string {
    const path = useRoute().fullPath;
    const index = path.indexOf(useRoute().params.id as string);
    return path.substring(0, index - 1);
  }

  public getEntity(): T {
    return this.localEntity;
  }

  public getPage(): PageGen<T> {
    return this.page.value
  }

  public getEntities(): Array<T> {
    return this.entities
  }

  public setSearchText(searchText: string = ""): void {
    this.pageRequest.search = searchText
  }

  public async search(): Promise<void> {
    this.pageRequest.pageCurrent = 0;
    await this.fetchEntities()
  }

  public async fetchEntities(): Promise<PageGen<T>> {
    this.serviceRequest.start();
    return await http.get(`${this.restApiUrl}`, {
      params: this.pageRequest
    }).then(response => {
      this.serviceRequest.end()
      this.page = response.data
      console.log(this.page.content);
      
      return response.data;
    }).catch(err => {
      this.serviceRequest.error("Error fetch Entites")
      throw err;
    })
  }

  public async fetchAllEntities(): Promise<Array<T>> {
    this.serviceRequest.start();
    return await http.get(`${this.restApiUrl}/all`).then(response => {
      this.serviceRequest.end()
      this.entities = response.data
      return response.data;
    }).catch(err => {
      this.serviceRequest.error("Error fetch Entites")
      throw err;
    })
  }

  public async fetchEntity(id: Number = -1): Promise<T> {
    this.serviceRequest.start();
    return await http.get(`${this.restApiUrl}/${id}`).then(response => {
      this.serviceRequest.end();
      this.localEntity = response.data;
      return response.data
    }).catch(err => {
      this.serviceRequest.error("Error fetch Entity")
      throw err;
    });
  }

  public async addEntity(department: T): Promise<T> {
    this.serviceRequest.start();
    return await http.post(`${this.restApiUrl}`, department).then(response => {
      this.serviceRequest.end();
      router.go(-1);
      return response.data
    }).catch(() => {
      this.serviceRequest.error("Error ADD Entity")
    })
  }

  public async updateEntity(t: T): Promise<T> {
    this.serviceRequest.start();
    return await http.put(`${this.restApiUrl}`, t,).then(response => {
      this.serviceRequest.end();
      router.go(-1);
      return response.data
    }).catch(() => {
      this.serviceRequest.error("Error UPDATE Entity")
    })
  }

  public async deleteEntity(id: Number = -1): Promise<Boolean> {
    this.serviceRequest.start()
    return await http.delete(`${this.restApiUrl}/${id}`).then(() => {
      this.serviceRequest.end()
      router.go(-1);
      return true;
    }).catch(err => {
      this.serviceRequest.error("Error DELETE Entity")
      throw err;
    })
  }

  public cancel(): void {
    router.go(-1);
  }

}