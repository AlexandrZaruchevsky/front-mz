import type { Entity } from "./Entity";

export class PageRequest {
  constructor(
    public pageCurrent: number = 0,
    public pageSize: number = 20,
    public sortBy: string = "",
    public search: string = "",
    public parentId: number = -1
  ) { }
}

export class PageRequestEquip extends PageRequest {
  constructor(
    public pageCurrent: number = 0,
    public pageSize: number = 20,
    public sortBy: string = "",
    public search: string = "",
    public equipTypeId: number = -1,
    public equipModelId: number = -1
  ) {
    super(pageCurrent, pageSize, sortBy, search);
  }
}

export class Sort {
  constructor(
    public empty: Boolean = true,
    public sorted: Boolean = false,
    public unsorted: Boolean = true
  ) { }
}

export class Pageable {
  constructor(
    public offset: Number = 0,
    public pageNumber: Number = 0,
    public pageSize: Number = 10,
    public paged: Boolean = true,
    public sort: Sort = new Sort(),
    public unpaged: Boolean = false
  ) { }
}

export class Page {
  constructor(
    public empty: boolean = true,
    public first: boolean = true,
    public last: boolean = true,
    public number: number = 0,
    public numberOfElements: number = 0,
    public pageable: Pageable = new Pageable(),
    public size: number = 0,
    public sort: Sort = new Sort(),
    public totalElements: number = 0,
    public totalPages: number = 0
  ) { }
}

export class PageGen<T extends Entity> extends Page {
  constructor(
    public content: Array<T> = new Array()
  ) {
    super();
  }
}

export class SelectOption {
  constructor(
    public key: number | string = -1,
    public value: string | number = ""
  ) { }
}

export class PageStat {
  constructor(
    public first: boolean = true,
    public last: boolean = true,
    public totalElements: number = 0,
    public numberPage: number = 0,
    public totalPages: number = 0,
  ) { }
}

export class CardData {
  constructor(
    public page: Page = new Page(),
    public pageRequest: PageRequest = new PageRequest(),
    public pageSizeOptions: Array<SelectOption> = [new SelectOption()],
    public sortOptions: Array<SelectOption> = [new SelectOption()],
    public addEntityFunc?: Function,
    public searchFunc?: Function,
    public setSearchFunc?: Function,
    public changeSortFunc?: Function,
    public previosPageFunc?: Function,
    public nextPageFunc?: Function,
    public changePageSizeFunc?: Function
  ) { }

  public addEntity() {
    if (typeof this.addEntityFunc == "function") {
      this.addEntityFunc()
    } else {
      console.log("previos not implemented");
    }
  }

  public setSearch(searchText: string = "") {
    if (typeof this.setSearchFunc == "function") {
      this.setSearchFunc(searchText)
    } else {
      console.log("previos not implemented");
    }
  }

  public search() {
    if (typeof this.searchFunc == "function") {
      this.searchFunc()
    } else {
      console.log("previos not implemented");
    }
  }

  public changeSort(sort: string = "") {
    if (typeof this.changeSortFunc == "function") {
      this.changeSortFunc(sort)
    } else {
      console.log("previos not implemented");
    }
  }

  public previos() {
    if (typeof this.previosPageFunc == "function") {
      this.previosPageFunc()
    } else {
      console.log("previos not implemented");
    }
  }

  public next() {
    if (typeof this.nextPageFunc == "function") {
      this.nextPageFunc();
    } else {
      console.log("next not implemented");
    }
  }

  public changeSizePage(pageSize: number | string = 20) {
    if (typeof this.changePageSizeFunc == "function") {
      this.changePageSizeFunc(pageSize);
    } else {
      console.log("changeSizePage not implemented");
    }
  }

}

export class CardDataV1 {
  constructor(
    public page: Page = new Page(),
    public pageRequest: PageRequest = new PageRequest(),
    public pageSizeOptions: Array<SelectOption> = [new SelectOption()],
    public sortOptions: Array<SelectOption> = [new SelectOption()],
    public addEntityFunc?: Function,
    public searchFunc?: Function,
    public setSearchFunc?: Function,
    public changeSortFunc?: Function,
    public previosPageFunc?: Function,
    public nextPageFunc?: Function,
    public firstPageFunc?: Function,
    public lastPageFunc?: Function,
    public changePageSizeFunc?: Function,
    //additional
    public fetchEntityFunc?: Function,
    public sortDefault: string = ""
  ) { }

  public addEntity() {
    if (typeof this.addEntityFunc == "function") {
      this.addEntityFunc()
    } else {
      console.log("previos not implemented");
    }
  }

  public setSearch(searchText: string = "") {
    if (typeof this.setSearchFunc == "function") {
      this.setSearchFunc(searchText)
    } else {
      console.log("previos not implemented");
    }
  }

  public search() {
    if (typeof this.searchFunc == "function") {
      this.searchFunc()
    } else {
      console.log("previos not implemented");
    }
  }

  public changeSort(sort: string = "") {
    if (typeof this.changeSortFunc == "function") {
      this.changeSortFunc(sort)
    } else {
      console.log("previos not implemented");
    }
  }

  public previos() {
    if (typeof this.previosPageFunc == "function") {
      this.previosPageFunc()
    } else {
      console.log("previos not implemented");
    }
  }

  public next() {
    if (typeof this.nextPageFunc == "function") {
      this.nextPageFunc();
    } else {
      console.log("next not implemented");
    }
  }

  public first() {
    if (typeof this.firstPageFunc == "function") {
      this.firstPageFunc()
    } else {
      console.log("previos not implemented");
    }
  }

  public last() {
    if (typeof this.lastPageFunc == "function") {
      this.lastPageFunc();
    } else {
      console.log("next not implemented");
    }
  }

  public changeSizePage(pageSize: number | string = 20) {
    if (typeof this.changePageSizeFunc == "function") {
      this.changePageSizeFunc(pageSize);
    } else {
      console.log("changeSizePage not implemented");
    }
  }

  public async fetchEntity() {
    if (typeof this.fetchEntityFunc == "function") {
      await this.fetchEntityFunc();
    } else {
      console.log("fetchEntity not implemented");
    }
  }

}

const cardDataV1 = new CardDataV1();

cardDataV1.pageSizeOptions = [
  new SelectOption(10, 10),
  new SelectOption(20, 20),
  new SelectOption(50, 50)
]

cardDataV1.searchFunc = async () => {
  cardDataV1.pageRequest.pageCurrent = 0;
  await cardDataV1.fetchEntity();
}

cardDataV1.previosPageFunc = async () => {
  if (!cardDataV1.page.first) {
    cardDataV1.pageRequest.pageCurrent -= 1;
    await cardDataV1.fetchEntity();
  }
}

cardDataV1.nextPageFunc = async () => {
  if (!cardDataV1.page.last) {
    cardDataV1.pageRequest.pageCurrent += 1;
    await cardDataV1.fetchEntity();
  }
}

cardDataV1.firstPageFunc = async () => {
  if (!cardDataV1.page.first) {
    cardDataV1.pageRequest.pageCurrent = 0;
    await cardDataV1.fetchEntity();
  }
}

cardDataV1.lastPageFunc = async () => {
  if (!cardDataV1.page.last) {
    cardDataV1.pageRequest.pageCurrent = cardDataV1.page.totalPages - 1;
    await cardDataV1.fetchEntity();
  }
}

cardDataV1.changePageSizeFunc = async (pageSize: number | string = 20) => {
  cardDataV1.pageRequest.pageSize = pageSize as number
  cardDataV1.pageRequest.pageCurrent = 0;
  // console.log(cardDataV1.pageRequest);
  
  await cardDataV1.fetchEntity();
}

cardDataV1.changeSortFunc = async (sort: string) => {
  if(sort){
    cardDataV1.pageRequest.sortBy = sort;
  }else{
    cardDataV1.pageRequest.sortBy = cardDataV1.sortDefault;
  }
  cardDataV1.pageRequest.search = ""
  await cardDataV1.fetchEntity();
}

export const cardData = cardDataV1;

// export const cardData = new CardDataV1(
//   new Page(),
//   new PageRequest(),
//   [
//     new SelectOption(10, 10),
//     new SelectOption(20, 20),
//     new SelectOption(50, 50)
//   ],
//   [new SelectOption()],
//   () => { },  //addEntityFunc
//   ()=>{
//     this.pageRequest
//   }
// );



export class CardFunction {
  constructor(
    public id: number = -1,
    public saveEntityFunc?: Function,
    public deleteEntityFunc?: Function,
    public cancelFunc?: Function
  ) { }

  public saveEntity() {
    if (typeof this.saveEntityFunc == "function") {
      this.saveEntityFunc()
    } else {
      console.log("saveEntity not implemented");
    }
  }

  public deleteEntity(id: number = -1) {
    if (typeof this.deleteEntityFunc == "function") {
      this.deleteEntityFunc(id)
    } else {
      console.log("deleteEntity not implemented");
    }
  }

  public cancel() {
    if (typeof this.cancelFunc == "function") {
      this.cancelFunc()
    } else {
      console.log("cancel not implemented");
    }
  }

}

export class StringPage extends Page {
  constructor(
    public content: Array<string> = new Array()
  ) {
    super();
  }
}