import { ref, computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { CardData, PageRequest, SelectOption } from '@/model/Page'
import { DepPageV1, DepV1 } from '@/model/DepV1';
import type { ServiceRequest } from '@/model/ServiceRequest';
import DepService from '@/services/DepService';
import type { Organization, OrganizationPage } from '@/model/Organization';
import EntityService from '@/services/EntityService';
import router from '@/router';

export const useDepartmentStore = defineStore('departmentStore', () => {

  const depList = ref<Array<DepV1>>(new Array());
  const dep = ref<DepV1>(new DepV1());
  const orgList = ref<Array<Organization>>(new Array());
  const depService = new DepService("departments");
  const serviceRequest = reactive<ServiceRequest>(depService.getServiceRequest());

  const currentOrg = computed<number>(() => dep.value.orgId);
  const topLevel = computed<boolean>(() => dep.value.topLevel as boolean)

  watch(currentOrg, () => {
    fetchAllDeps(dep.value.orgId)
  })
  watch(topLevel, () => {
    fetchAllDeps(dep.value.orgId)
  })

  const orgService = new EntityService<Organization, OrganizationPage>("organizations");

  const page = ref<DepPageV1>(new DepPageV1());
  const deps = computed<Array<DepV1>>(() => page.value.content)
  const pageRequest = reactive<PageRequest>(new PageRequest(0, 20, "name"));

  const pageSizeList = [
    new SelectOption(10, 10),
    new SelectOption(20, 20),
    new SelectOption(50, 50)
  ]

  const sortByList = [
    new SelectOption("name", "Наименование"),
  ]

  const addEntity = async () => {
    router.push({ path: "/admin/departments/add" })
  }

  const search = async () => {
    console.log("Search ...");
  }

  const setSearchText = async (searchText: string = "") => {
    pageRequest.search = searchText;
  }

  const changeSort = async (sort: string = "fio") => {
    pageRequest.sortBy = sort;
    pageRequest.search = ""
    await fetchDepartments();
  }

  const previosPage = async () => {
    if (!page.value.first) {
      pageRequest.pageCurrent -= 1;
      await fetchDepartments();
    }
  }

  const nextPage = async () => {
    if (!page.value.last) {
      pageRequest.pageCurrent += 1;
      await fetchDepartments();
    }
  }

  const setPageSize = async (pageSize: number | string = 20) => {
    pageRequest.pageSize = pageSize as number
    pageRequest.pageCurrent = 0;
    await fetchDepartments();
  }

  const cardData = computed<CardData>(() => {
    return new CardData(
      page.value,
      pageRequest,
      [...pageSizeList],
      [...sortByList],
      addEntity,
      search,
      setSearchText,
      changeSort,
      previosPage,
      nextPage,
      setPageSize
    )
  })

  async function fetchDepartments() {
    await depService.getEntities(pageRequest).then(response => {
      page.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchAllOrgs() {
    await orgService.getAllEntities().then(response => {
      orgList.value = response
    })
  }

  async function fetchAllDeps(orgId: number = -1) {
    if (orgId > 0 && !dep.value.topLevel) {
      await depService.getAllDepsByOrg(orgId).then(response => {
        depList.value = [...response]
      }).catch(() => {
        depList.value = []
      })
    } else {
      depList.value = []
    }
  }

  function setAdd(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      dep.value = new DepV1();
    }
  }

  async function fetchDepartment(id: Number = -1) {
    await depService.getEntity(id).then(response => {
      dep.value = response;
    }).catch(err => {
      console.log(err.response.data);
    })
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

  async function deleteDepartment(id: number = -1) {
    await depService.deleteEntity(id).then(async () => {
      await fetchDepartments();
      router.push({ name: 'Departments' })
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  return {
    cardData,
    deps,
    dep,
    orgList,
    depList,
    serviceRequest,
    fetchDepartments,
    fetchAllOrgs,
    setAdd,
    fetchDepartment,
    saveDepartment,
    deleteDepartment,
  }

})
