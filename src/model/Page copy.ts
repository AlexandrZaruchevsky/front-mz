export class PageRequest {
  constructor(
    public pageCurrent: number = 0,
    public pageSize: number = 20,
    public sortBy: String = "",
    public search: String = "",
    public parentId: Number = -1
  ) { }
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
    public empty: Boolean = true,
    public first: Boolean = true,
    public last: Boolean = true,
    public number: number = 0,
    public numberOfElements: number = 0,
    public pageable: Pageable = new Pageable(),
    public size: number = 0,
    public sort: Sort = new Sort(),
    public totalElements: number = 0,
    public totalPages: number = 0
  ) { }
}


// export interface IPageNavigation {
//   totalElements?: number;
//   currentPage?: number;
//   totalPage?: number;
//   previos: Function;
//   next: Function;
// }

export class IPageNavigation {
  constructor(
    public totalElements: number = 0,
    public currentPage: number = 0,
    public totalPages: number = 0,
    public first: boolean = false,
    public last: boolean = false,
    public pageSize: number = 0,
    public previosL?: Function,
    public nextL?: Function
  ) {

  }
  public previos(): void {
    if (this.previosL && typeof this.previosL == "function") {
      this.previosL()
    } else {
      console.log("Not implemented");
    }
  }
  public next(): void {
    if (this.nextL && typeof this.nextL == "function") {
      this.nextL()
    } else {
      console.log("Not implemented");
    }
  }
}