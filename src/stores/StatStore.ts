import type { Employee } from "@/model/Employee";
import { EmplStat } from "@/model/Stats";
import StatService from "@/services/StatService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatStore = defineStore('statStore', () => {

  const statService = new StatService("stats")
  const emplStat = ref<EmplStat>(new EmplStat());
  const empls = ref<Array<Employee>>(new Array());

  async function fetchEmplStat():Promise<void> {
    emplStat.value = await statService.fetchEmplStat()
  }

  async function fetchEmplByDep(depId:number=-1):Promise<void>{
    empls.value = await statService.fetchEmplByDep(depId);
  }
  
  return {
    emplStat,
    fetchEmplStat,
    empls,
    fetchEmplByDep
  }

})