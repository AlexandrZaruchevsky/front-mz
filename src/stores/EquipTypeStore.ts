import { EquipType } from "@/model/EquipType"
import { CardData, CardFunction, PageGen, PageRequest, SelectOption } from "@/model/Page"
import type { ServiceRequest } from "@/model/ServiceRequest"
import router from "@/router"
import EntityServiceV1 from "@/services/EntityServiceV1"
import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"

export const useEquipTypeStore = defineStore('equipTypeStore', () => {
  const page = ref<PageGen<EquipType>>(new PageGen<EquipType>())
  const entities = computed<Array<EquipType>>(() => page.value.content)
  const entity = ref<EquipType>(new EquipType);
  const entityService = new EntityServiceV1<EquipType, PageGen<EquipType>>("equip-types");

  const serviceRequest = reactive<ServiceRequest>(entityService.getServiceRequest());
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
    router.push({ path: "#" })
    router.push({ path: "/dictionaries/equip-types/add" })
  }

  const search = async () => {
    pageRequest.pageCurrent = 0;
    fetchEntities()
  }

  const setSearchText = async (searchText: string = "") => {
    pageRequest.search = searchText;
  }

  const changeSort = async (sort: string = "name") => {
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
        router.push({ name: "Employees" })
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
      entity.value = new EquipType();
    }
  }

  async function fetchEntity(id: Number = -1) {
    await entityService.getEntity(id).then(async response => {
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
      router.push({ name: 'EquipTypes' })
    }
  }

  async function deleteEntity(id: number = -1) {
    await entityService.deleteEntity(id).then(async () => {
      await fetchEntities();
      router.push({ name: 'Employees' })
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  return {
    entities,
    entity,
    cardData,
    cardFunction,
    serviceRequest,
    setAdd,
    fetchEntities,
    fetchEntity,
    saveEntity
  }
})