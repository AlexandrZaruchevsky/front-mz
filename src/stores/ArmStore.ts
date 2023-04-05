import { Arm } from "@/model/Arm";
import { CardData, CardFunction, PageGen, PageRequest, SelectOption } from "@/model/Page";
import type { ServiceRequest } from "@/model/ServiceRequest";
import router from "@/router";
import ArmServiceV1 from "@/services/ArmServiceV1";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";

export const useArmStore = defineStore("armStore", () => {

  const entityService = new ArmServiceV1("arms");

  const serviceRequest = reactive<ServiceRequest>(entityService.getServiceRequest());
  const pageRequest = reactive<PageRequest>(new PageRequest(0, 20, "name"));

  const page = ref<PageGen<Arm>>(new PageGen());
  const entities = computed<Array<Arm>>(() => page.value.content);
  const entity = ref<Arm>(new Arm());


  /**Common card data and function */

  const pageSizeList = [
    new SelectOption(10, 10),
    new SelectOption(20, 20),
    new SelectOption(50, 50)
  ]

  const sortByList = [
    new SelectOption("name", "Наименование"),
  ]

  const addEntity = async () => {
    router.push({ path: "/arms/add" })
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
        router.push({ name: "Arms" })
      }
    )
  })

  /**End */

  function setAdd(val: Boolean = true) {
    serviceRequest.add(val)
    if (serviceRequest.isAdd()) {
      entity.value = new Arm();
    }
  }

  async function editForm() {
    const paramId = useRoute().params.id as string;
    if (!parseInt(paramId)) {
      if (paramId === "add") {
        setAdd();
      } else {
        setAdd(false);
        router.push({ name: "Equips" })
      }
    }
    else {
      setAdd(false);
      await fetchEntity(parseInt(paramId));
    }
  }


  async function fetchEntities() {
    await entityService.getEntities(pageRequest).then(response => {
      page.value = response
    }).catch(err => {
      console.log(err.response.data);
    })
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
      await entityService.addEntity(entity.value).then(async response => {
        entity.value = response
        flag = true;
        await fetchEntity(entity.value.id);
        serviceRequest.add(false);
        router.push({ path: `/arms/${entity.value.id}` })
      })
    } else {
      await entityService.updateEntity(entity.value).then(async response => {
        entity.value = response
        flag = true;
        await fetchEntity(entity.value.id);
      })
    }
    if (flag) {
      await fetchEntities();
    }
  }

  async function deleteEntity(id: number = -1) {
    await entityService.deleteEntity(id).then(async () => {
      await fetchEntities();
      router.push({name:"Arms"})
    }).catch(err => {
      console.log(err.response.data);
    })
  }


  return {
    entities,
    entity,
    serviceRequest,
    cardData,
    cardFunction,
    headerForm: computed(() => {
      return serviceRequest.isAdd() ? "Arm | Add" : "Arm | Update"
    }),
    fetchEntities,
    editForm
  }

})