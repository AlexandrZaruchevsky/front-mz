import type { DepV1 } from "@/model/DepV1";
import { Employee, EmployeePage } from "@/model/Employee";
import type { Organization } from "@/model/Organization";
import { PageRequest } from "@/model/Page";
import type { POF } from "@/model/POF";
import type { Position } from "@/model/Position";
import type { ServiceRequest } from "@/model/ServiceRequest";
import router from "@/router";
import DepService from "@/services/DepService";
import EmplService from "@/services/EmplService";
import OrgService from "@/services/OrgService";
import POFService from "@/services/POFService";
import PosService from "@/services/PosService";
import { defineStore } from "pinia";
import { computed, reactive, ref, watch } from "vue";

export const useEmployeeStore = defineStore('employeeStore', () => {

  const emplService = new EmplService("employees");
  const orgService = new OrgService("organizations");
  const posService = new PosService("positions");
  const depService = new DepService("departments");
  const pofService = new POFService("point-of-presences");

  const emplPage = ref<EmployeePage>(new EmployeePage());
  const empls = computed<Array<Employee>>(() => emplPage.value.content);
  const empl = ref<Employee>(new Employee());
  const pageRequest = ref<PageRequest>(new PageRequest());
  const serviceRequest = reactive<ServiceRequest>(emplService.getServiceRequest());

  const orgs = ref<Array<Organization>>(new Array());
  const orgId = ref<number>(-1);

  const positions = ref<Array<Position>>(new Array());
  const deps = ref<Array<DepV1>>(new Array());
  const pofs = ref<Array<POF>>(new Array());

  async function fetchEmployees() {
    await emplService.getEntities(pageRequest.value).then(response => {
      emplPage.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchEmployee(id: number = -1) {
    await emplService.getEntity(id).then(async (response) => {
      empl.value = response;
      if (empl.value.depId > 0){
        await depService.getEntity(empl.value.depId).then((response) => {
          let dep = response
          orgId.value = dep.orgId;
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }

  function setAdd(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      empl.value = new Employee();
      orgId.value = -1;
    }
  }

  async function saveEmployee() {
    let flag = false;
    if (serviceRequest.isAdd()) {
      await emplService.addEntity(empl.value).then(response => {
        empl.value = response
        flag = true;
      })
    } else {
      await emplService.updateEntity(empl.value).then(response => {
        empl.value = response
        flag = true;
      })
    }
    if (flag) {
      await fetchEmployees();
      router.push({ name: 'Employees' })
    }
  }

  async function deleteEmployee(id: Number) {
    await emplService.deleteEntity(id).then(async () => {
      await fetchEmployees();
      router.push({ name: 'Employees' })
    }).catch(err => {
      console.log(err.response.data);
    })
  }


  async function fetchOrgs() {
    await orgService.getAllEntities().then(response => {
      orgs.value = [...response]
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchDepsByOrgId(id: number = -1) {
    depService.getAllDepsByOrg(id).then(response => {
      deps.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchPositionsByOrgId(id: number = -1) {
    await posService.getAllPositionByOrg(id).then(resp => {
      positions.value = resp
    })
  }

  async function fetchPOFsByOrdId(id: number = -1) {
    await pofService.getAllPOFByOrg(id).then(resp => {
      pofs.value = resp
    })
  }

  watch(orgId, ()=>{
    if(orgId.value>0){
      fetchDepsByOrgId(orgId.value)  
      fetchPositionsByOrgId(orgId.value)
      fetchPOFsByOrdId(orgId.value)
    }
  })
  

  return {
    empls,
    empl,
    serviceRequest,
    orgs,
    orgId,
    deps,
    positions,
    pofs,
    fetchEmployees,
    fetchEmployee,
    setAdd,
    saveEmployee,
    deleteEmployee,
    fetchOrgs,
    fetchDepsByOrgId,
    fetchPositionsByOrgId,
    fetchPOFsByOrdId
  }

})