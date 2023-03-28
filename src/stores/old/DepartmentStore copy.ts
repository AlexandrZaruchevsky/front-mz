import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router';
import { PageRequest } from '@/model/Page';
import EntityService from '@/services/EntityService'
import type { ServiceRequest } from '@/model/ServiceRequest';
import { Organization, OrganizationPage } from '@/model/Organization';
import DepService from '@/services/DepService';
import { DepPageV1, DepV1, } from '@/model/DepV1';

export const useDepartmentStore = defineStore('departmentStore', () => {
  //deps for combobox
  const depList = ref<Array<DepV1>>(new Array());
  const depPageV1 = ref<DepPageV1>(new DepPageV1());
  const dep = ref<DepV1>(new DepV1());
  const deps = computed<Array<DepV1>>(() => depPageV1.value.content);
  const pageRequest = reactive<PageRequest>(new PageRequest(0, 20, "name"));
  const orgPage = ref<OrganizationPage>(new OrganizationPage());
  const orgs = computed<Array<Organization>>(() => orgPage.value.content);
  const depService = new DepService("departments");
  const serviceRequest = reactive<ServiceRequest>(depService.getServiceRequest());

  // const pageNavigation = computed<IPageNavigation>(() => {
  //   return new IPageNavigation(
  //     depPageV1.value.totalElements,
  //     depPageV1.value.number,
  //     depPageV1.value.totalPages,
  //     depPageV1.value.first as boolean,
  //     depPageV1.value.last as boolean,
  //     pageRequest.pageSize,
  //     previos,
  //     next
  //   )
  // });

  // const next = async () => {
  //   if(!depPageV1.value.last){
  //     pageRequest.pageCurrent += 1;
  //     await fetchDepartments();
  //   }
  // }

  // const previos = async () => {
  //   if(!depPageV1.value.first){
  //     pageRequest.pageCurrent -= 1;
  //     await fetchDepartments();
  //   }
  // }

  const organizationService = new EntityService<Organization, OrganizationPage>("organizations");

  async function fetchOrganizations() {
    await organizationService.getEntities().then(response => {
      orgPage.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchDeps(orgId: Number = 0) {
    await depService.getAllDepsByOrg(orgId).then(response => {
      depList.value = [...response]
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  function depsClear() {
    depList.value = new Array();
  }

  async function fetchDepartments() {
    await depService.getEntities(pageRequest).then(response => {
      depPageV1.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchDepartment(id: Number = -1) {
    await depService.getEntity(id).then(response => {
      dep.value = response;
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  function setAdd(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      dep.value = new DepV1();
    }
  }

  async function saveDepartment() {
    let flag = false;
    if (serviceRequest.isAdd()) {
      await depService.addEntity(dep.value).then(response => {
        dep.value = response
        flag = true;
      })
    } else {
      await depService.updateEntity(dep.value).then(response => {
        dep.value = response
        flag = true;
      })
    }
    if (flag) {
      await fetchDepartments()
      router.push({ name: 'Departments' })
    }
  }

  // async function deleteDepartment(id: Number) {
  //   await depService.deleteEntity(id).then(async () => {
  //     await fetchDepartments();
  //     router.push({ name: 'Departments' })
  //   }).catch(err => {
  //     console.log(err.response.data);
  //   })
  // }

  return {
    orgs,
    dep,
    deps,
    depList,
    serviceRequest,
    pageRequest,
    page: depPageV1,
    // pageNavigation,
    depsClear,
    fetchOrganizations,
    fetchDeps,
    fetchDepartments,
    fetchDepartment,
    setAdd,
    saveDepartment
  }

})
