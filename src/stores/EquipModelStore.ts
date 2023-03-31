import { EquipModel } from "@/model/EquipModel"
import type { EquipType } from "@/model/EquipType"
import { CardData, CardFunction, PageGen, PageRequest, SelectOption } from "@/model/Page"
import type { ServiceRequest } from "@/model/ServiceRequest"
import router from "@/router"
import EntityServiceV1 from "@/services/EntityServiceV1"
import { defineStore } from "pinia"
import { computed, reactive, ref, watch } from "vue"

export const useEquipModelStore = defineStore('equipModelStore', () => {
  
  const page = ref<PageGen<EquipModel>>(new PageGen<EquipModel>())
  const entities = computed<Array<EquipModel>>(() => page.value.content)
  const entity = ref<EquipModel>(new EquipModel());
  const entityService = new EntityServiceV1<EquipModel>("equip-models");

  const serviceRequest = reactive<ServiceRequest>(entityService.getServiceRequest());
  const pageRequest = reactive<PageRequest>(new PageRequest(0, 20, "name"));

  const equipTypeService = new EntityServiceV1<EquipType>("equip-types");
  const equipTypeList = ref<Array<EquipType>>(new Array());

  const currentEquipTypeId = computed<number>(()=>pageRequest.parentId);

  const pageSizeList = [
    new SelectOption(10, 10),
    new SelectOption(20, 20),
    new SelectOption(50, 50)
  ]

  const sortByList = [
    new SelectOption("name", "Наименование"),
  ]

  const addEntity = async () => {
    router.push({ path: "/dictionaries/equip-models/add" });

  }

  const search = async () => {
    pageRequest.pageCurrent = 0;
    fetchEntities();
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
        router.go(-1)
      }
    )
  })

  async function fetchEntities() {
    await entityService.getEntities(pageRequest).then(async response => {
      page.value = response;
      await fetchtEquipTypes();
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  function setAdd(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      entity.value = new EquipModel();
      entity.value.equipTypeId = pageRequest.parentId >= 0 ? pageRequest.parentId : -1;
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
      router.go(-1);
    }
  }

  async function deleteEntity(id: number = -1) {
    await entityService.deleteEntity(id).then(async () => {
      await fetchEntities();
      router.go(-1);
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  async function fetchtEquipTypes() {
    await equipTypeService.getAllEntities().then(response => {
      equipTypeList.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
  }

  watch(currentEquipTypeId, async()=>{
    await fetchEntities();
  })

  return {
    entities,
    entity,
    cardData,
    cardFunction,
    serviceRequest,
    equipTypeList,
    pageRequest,
    setAdd,
    fetchEntities,
    fetchEntity,
    saveEntity,
    fetchtEquipTypes
  }
})