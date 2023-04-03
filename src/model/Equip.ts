import type { Arm } from "./Arm";
import { Entity } from "./Entity";
import type { EquipModel } from "./EquipModel";
import type { EquipType } from "./EquipType";

export class Equip extends Entity {
  constructor(
    public shortName: string = "",
    public fullName: string = "",
    public serialNumber: string = "",
    public inventoryNumber: string = "",
    public manufacturer: string = "",
    public dateOfManufacture: string = "",
    public groupAccounting: boolean = false,
    public parentId: number = -1,
    public children: boolean = false,
    public employeeMol: string = "NONE",
    public molFio: string = "NONE",
    public ipV4: string = "NONE",
    public armId: number = -1,
    public armName: string = "",
    public equipTypeId: number = -1,
    public equipTypeName: string = "",
    public equipModelId: number = -1,
    public equipModelName: string = ""
  ) {
    super()
  }
}

export class EquipParents {
  constructor(
    public arms: Array<Arm> = new Array(),
    public equipTypes: Array<EquipType> = new Array(),
    public equipModels: Array<EquipModel> = new Array()
  ) { }
}