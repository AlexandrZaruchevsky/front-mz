import { Employee } from "./Employee";

export class EquipInfo {
  constructor(
    public id: number = -1,
    public shortName: string = "",
    public fullName: string = "",
    public serialNumber: string = "",
    public inventoryNumber: string = "",
    public manufacturer: string = "",
    public dateOfManufacture: Date = new Date(),
    public groupAccounting: boolean = false,
    public parentId: number = -1,
    public children: boolean = false,
    public employeeMol: string = "",
    public molFio: string = "",
    public ipV4: string = "",
    public equipTypeId: number = -1,
    public equipTypeName: string = "",
    public equipModelId: number = -1,
    public equipModelName: string = ""
  ) { }
}

export class ArmDetailInfo {
  constructor(
    public id: number = -1,
    public name: string = "",
    public domainName: string = "",
    public ipV4: string = "",
    public description: string = "",
    public equip: EquipInfo = new EquipInfo()
  ) { }
}

export class ArmInfo {
  constructor(
    public id: number = -1,
    public name: string = "",
    public office: string = "",
    public mol: string = "",
    public molFio: string = "",
    public description: string = "",
    public popId: number = -1,
    public popName: string = "",
    public armDetails: Array<ArmDetailInfo> = new Array()
  ) { }
}

export class EmplInfo {
  constructor(
    public emplId: number = -1,
    public employee: Employee = new Employee(),
    public armInfos: Array<ArmInfo> = new Array()
  ) { }
}