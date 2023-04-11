export class DepStat {
  constructor(
    public depId: number = -1,
    public depName: string = "",
    public emplCount: number = -1
  ) { }
}

export class EmplStat {
  constructor(
    public total: number = 0,
    public countActive: number = 0,
    public countNotActive: number = 0,
    public countDeleted: number = 0,
    public stats: Array<DepStat> = new Array()
  ) { }
}
