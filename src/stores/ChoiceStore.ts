import { EntityChoice } from "@/model/Choice";
import { Employee } from "@/model/Employee";
import EmplService from "@/services/EmplService";
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




  return {
    choiceEmplList,
    fetchEmployeeList
  }

})