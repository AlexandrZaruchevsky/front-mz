import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { CardData, CardFunction, PageRequest, SelectOption } from '@/model/Page'
import type { ServiceRequest } from '@/model/ServiceRequest';
import EntityService from '@/services/EntityService';
import router from '@/router';
import type { Organization, OrganizationPage } from '@/model/Organization';
import POFService from '@/services/POFService';
import { POF, POFPage } from '@/model/POF';

export const usePopStore = defineStore('popStore', () => {

  const page = ref<POFPage>(new POFPage());
  const entityService = new POFService("point-of-presences");
  const serviceRequest = reactive<ServiceRequest>(entityService.getServiceRequest());
  const orgService = new EntityService<Organization, OrganizationPage>("organizations")

  const pageRequest = reactive<PageRequest>(new PageRequest(0, 20, "shortName"));
  const entities = computed<Array<POF>>(() => page.value.content);
  const entity = ref<POF>(new POF());

  const orgList = ref<Array<Organization>>(new Array);

  const pageSizeList = [
    new SelectOption(10, 10),
    new SelectOption(20, 20),
    new SelectOption(50, 50)
  ]

  const sortByList = [
    new SelectOption("shortName", "Наименование"),
  ]

  const addEntity = async () => {
    router.push({ path: "/admin/point-of-presences/add" })
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
        router.push({ name: "PointOfPresences" })
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
      entity.value = new POF();
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
      router.push({ name: 'PointOfPresences' })
    }
  }

  async function deleteEntity(id: number = -1) {
    await entityService.deleteEntity(id).then(async () => {
      await fetchEntities();
      router.push({ name: 'PointOfPresences' })
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

  return {
    cardData,
    cardFunction,
    entities,
    entity,
    serviceRequest,
    orgList,
    fetchEntities,
    setAdd,
    fetchEntity,
    saveEntity,
    deleteEntity,
    fetchAllOrgs,
  }

})
