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
    public number: Number = 0,
    public numberOfElements: Number = 0,
    public pageable: Pageable = new Pageable(),
    public size: Number = 0,
    public sort: Sort = new Sort(),
    public totalElements: Number = 0,
    public totalPages: Number = 0
  ) { }
}
