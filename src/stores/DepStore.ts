import { ref, computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { CardData, CardFunction, PageRequest, SelectOption } from '@/model/Page'
import type { ServiceRequest } from '@/model/ServiceRequest';
import EntityService from '@/services/EntityService';
import router from '@/router';
import { DepPageV1, DepV1 } from '@/model/DepV1';
import type { Organization, OrganizationPage } from '@/model/Organization';
import DepService from '@/services/DepService';

export const useDepStore = defineStore('depStore', () => {

  const page = ref<DepPageV1>(new DepPageV1());
  const entityService = new DepService("departments");
  const serviceRequest = reactive<ServiceRequest>(entityService.getServiceRequest());
  const orgService = new EntityService<Organization, OrganizationPage>("organizations")

  const pageRequest = reactive<PageRequest>(new PageRequest(0, 20, "name"));
  const entities = computed<Array<DepV1>>(() => page.value.content);
  const entity = ref<DepV1>(new DepV1());

  const orgList = ref<Array<Organization>>(new Array);
  const depList = ref<Array<DepV1>>(new Array());

  const changeParams = computed(() => {
    return {
      topLevel: entity.value.topLevel,
      orgId: entity.value.orgId
    }
  })

  const pageSizeList = [
    new SelectOption(10, 10),
    new SelectOption(20, 20),
    new SelectOption(50, 50)
  ]

  const sortByList = [
    new SelectOption("name", "Наименование"),
  ]

  const addEntity = async () => {
    fetchAllDepsByOrgId();
    router.push({ path: "/admin/departments/add" })
  }

  const search = async () => {
    fetchEntities()
  }

  const setSearchText = async (searchText: string = "") => {
    pageRequest.search = searchText;
  }

  const changeSort = async (sort: string = "fio") => {
    pageRequest.sortBy = sort;
    pageRequest.search = ""
    await fetchEntities();
  }

  const previosPage = async () => {
    if (!page.value.first) {
      pageRequest.pageCurrent -= 1;
      await fetchEntities();
    }
  }

  const nextPage = async () => {
    if (!page.value.last) {
      pageRequest.pageCurrent += 1;
      await fetchEntities();
    }
  }

  const setPageSize = async (pageSize: number | string = 20) => {
    pageRequest.pageSize = pageSize as number
    pageRequest.pageCurrent = 0;
    await fetchEntities();
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

  const cardFunction = computed<CardFunction>(() => {
    return new CardFunction(
      entity.value.id,
      saveEntity,
      deleteEntity,
      () => {
        router.push({ name: "Departments" })
      }
    )
  })

  async function fetchEntities() {
    await entityService.getEntities(pageRequest).then(response => {
      page.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }


  function setAdd(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      entity.value = new DepV1();
    }
  }

  async function fetchEntity(id: Number = -1) {
    await entityService.getEntity(id).then(response => {
      entity.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function saveEntity() {
    let flag = false;
    if (serviceRequest.isAdd()) {
      await entityService.addEntity(entity.value).then(response => {
        entity.value = response
        flag = true;
      })
    } else {
      await entityService.updateEntity(entity.value).then(response => {
        entity.value = response
        flag = true;
      })
    }
    if (flag) {
      await fetchEntities();
      router.push({ name: 'Departments' })
    }
  }

  async function deleteEntity(id: number = -1) {
    await entityService.deleteEntity(id).then(async () => {
      await fetchEntities();
      router.push({ name: 'Departments' })
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchAllOrgs() {
    if (orgList.value.length == 0) {
      await orgService.getAllEntities().then(response => {
        orgList.value = response;
      })
    }
  }

  async function fetchAllDepsByOrgId() {
    if (changeParams.value.orgId == -1) {
      depList.value = [];
    } else if (!changeParams.value.topLevel && depList.value.length == 0 && changeParams.value.orgId > 0) {
      await entityService.getAllDepsByOrg(changeParams.value.orgId).then(response => {
        depList.value = [...response];
      })
    }
  }

  watch(changeParams, () => {
    fetchAllDepsByOrgId();
  })

  return {
    cardData,
    cardFunction,
    entities,
    entity,
    serviceRequest,
    orgList,
    depList,
    fetchEntities,
    setAdd,
    fetchEntity,
    saveEntity,
    deleteEntity,
    fetchAllOrgs,
  }

})
