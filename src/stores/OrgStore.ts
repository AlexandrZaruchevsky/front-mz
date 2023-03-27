import { ref, computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { CardData, CardFunction, PageRequest, SelectOption } from '@/model/Page'
import type { ServiceRequest } from '@/model/ServiceRequest';
import { Organization, OrganizationPage } from '@/model/Organization';
import EntityService from '@/services/EntityService';
import router from '@/router';

export const useOrgStore = defineStore('orgStore', () => {

  const page = ref<OrganizationPage>(new OrganizationPage());
  const entityService = new EntityService<Organization, OrganizationPage>("organizations");
  const serviceRequest = reactive<ServiceRequest>(entityService.getServiceRequest());

  const pageRequest = reactive<PageRequest>(new PageRequest(0, 20, "shortName"));
  const entities = computed<Array<Organization>>(() => page.value.content);
  const org = ref<Organization>(new Organization());

  const pageSizeList = [
    new SelectOption(10, 10),
    new SelectOption(20, 20),
    new SelectOption(50, 50)
  ]

  const sortByList = [
    new SelectOption("shortName", "Наименование"),
  ]

  const addEntity = async () => {
    router.push({ path: "/admin/organizations/add" })
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

  const cardFunction = computed<CardFunction>(()=>{
    return new CardFunction(
      org.value.id,
      saveEntity,
      deleteEntity,
      ()=>{
        router.push({name:"Organizations"})
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

  //Current Store


  function setAdd(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      org.value = new Organization();
    }
  }

  async function fetchEntity(id: Number = -1) {
    await entityService.getEntity(id).then(response => {
      org.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function saveEntity() {
    let flag = false;
    if (serviceRequest.isAdd()) {
      await entityService.addEntity(org.value).then(response => {
        org.value = response
        flag = true;
      })
    } else {
      await entityService.updateEntity(org.value).then(response => {
        org.value = response
        flag = true;
      })
    }
    if (flag) {
      await fetchEntities();
      router.push({ name: 'Organizations' })
    }
  }

  async function deleteEntity(id: number = -1) {
    await entityService.deleteEntity(id).then(async () => {
      await fetchEntities();
      router.push({ name: 'Departments' })
    }).catch(err => {
      console.log(err.response.data);
    })
    router.push({name:"Organizations"})
  }

  return {
    cardData,
    cardFunction,
    entities,
    org,
    serviceRequest,
    fetchEntities,
    setAdd,
    fetchEntity,
    saveEntity,
    deleteEntity,
  }

})
