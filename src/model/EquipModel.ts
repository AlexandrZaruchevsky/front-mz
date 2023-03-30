import { Entity } from "./Entity";
import type { Equip } from "./Equip";

export class EquipModel extends Entity {
  constructor(
    public name: string = "",
    public equipTypeId: number = -1,
    public equipTypeName: string = "",
    public equips: Array<Equip> = new Array()
  ) {
    super()
  }
}