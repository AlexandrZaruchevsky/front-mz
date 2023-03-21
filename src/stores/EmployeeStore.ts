import type { DepV1 } from "@/model/DepV1";
import { Employee, EmployeePage } from "@/model/Employee";
import type { Organization } from "@/model/Organization";
import { PageRequest } from "@/model/Page";
import type { POF } from "@/model/POF";
import type { Position } from "@/model/Position";
import type { ServiceRequest } from "@/model/ServiceRequest";
import DepService from "@/services/DepService";
import EmplService from "@/services/EmplService";
import OrgService from "@/services/OrgService";
import POFService from "@/services/POFService";
import PosService from "@/services/PosService";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

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
      empl.value = response
      await depService.getEntity(empl.value.depId).then(async (response) => {
        let dep = response
        orgId.value = dep.orgId;
        await fetchDepsByOrgId(dep.orgId);
        await fetchPositionsByOrgId(dep.orgId);
        // await pofService.getAllPOFByOrg(dep.orgId).then(resp => {
        //   pofs.value = resp
        // })
      })
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  function setAdd(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      empl.value = new Employee();
    }
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

  return {
    empls,
    empl,
    serviceRequest,
    orgs,
    orgId,
    deps,
    positions,
    fetchEmployees,
    fetchEmployee,
    setAdd,
    fetchOrgs,
    fetchDepsByOrgId,
    fetchPositionsByOrgId
  }

})