import type { EquipModel } from "@/model/EquipModel"
import type { EquipType } from "@/model/EquipType"
import { SelectOption } from "@/model/Page"

class ArrayUtil {
  constructor() { }

  public selectOptionsFromEquipType(equipType: Array<EquipType> = new Array()): Array<SelectOption> {
    return [...equipType.map(item => new SelectOption(item.id, item.name))]
  }

  public selectOptionsFromEquipModels(equipModels: Array<EquipModel> = new Array()): Array<SelectOption> {
    return [...equipModels.map(item => new SelectOption(item.id, item.name))]
  }

  public equipModelsByTypeId(equipModels: Array<EquipModel>, typeId: number = -1): Array<EquipModel> {
    return typeId == -1
      ? []
      : equipModels.filter(item => item.equipTypeId == typeId)
  }

  public keyInSelectOptions(selectOptions: Array<SelectOption> = new Array(), id: number | string = -1): boolean {
    if (id == -1 || selectOptions.length == 0) return false;
    return selectOptions.filter(selOpt => selOpt.key == id).length > 0;
  }

}

export const arrayUtil = new ArrayUtil()