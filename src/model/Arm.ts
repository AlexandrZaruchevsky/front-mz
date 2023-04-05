import { Entity } from "./Entity";

export class ArmDetail {
  constructor(
    public id: number = -1,
    public name: string = "",
    public domainName: string = "",
    public ipV4: string = "",
    public description: string = "",
    public armId: number = -1,
    public armName: string = "",
    public equipId: number = -1,
    public equipName: string = ""
  ) { }
}

export class Arm extends Entity {
  constructor(
    public id: number = -1,
    public name: string = "",
    public office: string = "",
    public mol: string = "",
    public molFio: string = "",
    public description: string = "",
    public popId: number = -1,
    public popName: string = "",
    public armDetails: Array<ArmDetail> = new Array()
  ) {
    super()
  }
}

