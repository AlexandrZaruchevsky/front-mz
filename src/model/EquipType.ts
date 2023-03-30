import { Entity } from "./Entity";
import type { Equip } from "./Equip";
import type { EquipModel } from "./EquipModel";

export class EquipType extends Entity {
  constructor(
    public id: number = -1,
    public name: string = "",
    public equipModels: Array<EquipModel> = new Array(),
    public equips: Array<Equip> = new Array()
  ) {
    super()
  }
}