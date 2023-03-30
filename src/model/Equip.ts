import { Entity } from "./Entity";

export class Equip extends Entity {
  constructor(
    public shortName: string = "",
    public fullName: string = "",
    public serialNumber: string = "",
    public inventoryNumber: string = "",
    public manufacturer: string = "",
    public dateOfManufacture: string = "",
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