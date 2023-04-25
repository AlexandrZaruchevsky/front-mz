import type { Arm } from "@/model/Arm";
import { EntityChoice } from "@/model/Choice";
import { Employee } from "@/model/Employee";
import type { Equip } from "@/model/Equip";
import type { POF } from "@/model/POF";
import ArmServiceV1 from "@/services/ArmServiceV1";
import EmplService from "@/services/EmplService";
import EquipService from "@/services/EquipServiceV1";
import POFService from "@/services/POFService";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useChoiceStore = defineStore("choiceStore", () => {

  /**Choice Employee -> start*/

  const emplService = new EmplService("employees");
  const empls = ref<Array<Employee>>(new Array());

  const choiceEmplList = computed<Array<EntityChoice>>(() => {
    return empls.value.map(empl => {
      return new EntityChoice(empl.accountName, getFio(empl), empl.posName, empl.depName)
    })
  })

  async function fetchEmployeeList(fio: string = ""): Promise<void> {
    await emplService.fetchAllForChoice(fio).then(resp => {
      empls.value = resp;
    }).catch(err => {
      console.log(err.response.data);
      empls.value = new Array();
    })
  }

  function getFio(e: Employee = new Employee()): string {
    return `${e.lastName} ${e.firstName} ${e.middleName}`
  }

  /** end */

  /**Choice Point of presence */
  const popService = new POFService("point-of-presences");
  const pops = ref<Array<POF>>(new Array());

  const choicePopList = computed<Array<EntityChoice>>(() => {
    return pops.value.map(pop => {
      return new EntityChoice(pop.id, pop.shortName, pop.orgName)
    })
  })

  async function fetchPOPList(name: string = ""): Promise<void> {
    await popService.fetchAllForChoice(name).then(resp => {
      pops.value = resp
    }).catch(err => {
      console.log(err.response.data);
      empls.value = new Array();
    })
  }

  /**end */

  /**Choice Arm */

  const armService = new ArmServiceV1("arms");
  const arms = ref<Array<Arm>>(new Array());

  const choiceArmList = computed<Array<EntityChoice>>(() => {
    return arms.value.map(arm => {
      return new EntityChoice(arm.id, arm.name, arm.molFio, arm.popName);
    })
  })

  async function fetchArmList(name: string = ""): Promise<void> {
    await armService.fetchAllForChoice(name).then(resp => {
      arms.value = resp
    }).catch(err => {
      console.log(err.response.data);
      empls.value = new Array();
    })
  }

  /**end */


  /**Choice Arm */

  const equipService = new EquipService("equips");
  const equips = ref<Array<Equip>>(new Array());

  const choiceEquipList = computed<Array<EntityChoice>>(() => {
    return equips.value.map(equip => {
      return new EntityChoice(equip.id, equip.shortName, equip.inventoryNumber, equip.equipTypeName);
    })
  })

  async function fetchEquipList(name: string = ""): Promise<void> {
    await equipService.fetchAllForChoice(name).then(resp => {
      equips.value = resp
    }).catch(err => {
      console.log(err.response.data);
      empls.value = new Array();
    })
  }

  async function fetchEquipListWithSort(sortBy: string = "", name: string = ""): Promise<void> {
    await equipService.fetchAllForChoiceWithSort(sortBy, name).then(resp => {
      equips.value = resp
    }).catch(err => {
      console.log(err.response.data);
      empls.value = new Array();
    })
  }



  /**end */

  return {
    choiceEmplList,
    fetchEmployeeList,
    choicePopList,
    fetchPOPList,
    choiceArmList,
    fetchArmList,
    choiceEquipList,
    fetchEquipList,
    fetchEquipListWithSort
  }

})