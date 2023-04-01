import { Employee } from "./Employee";
import { Entity } from "./Entity";
import type { Equip } from "./Equip";

export class Arm extends Entity {
  constructor(
    public name:string="",
    public office:string="",
    public popId:number= -1,
    public popName:string="",
    public boss:Employee = new Employee(),
    public equips:Array<Equip> = new Array()  
  ) {
    super()
  }
}

