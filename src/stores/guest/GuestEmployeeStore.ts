import type { Employee } from "@/model/Employee";
import { CardData, CardDataV1, PageGen, PageRequest, SelectOption } from "@/model/Page";
import EmplService from "@/services/EmplService";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useGuestEmployeeStore = defineStore("guestEmployeeStore", () => {

  const emplService = new EmplService("/all/employees");
  const page = ref<PageGen<Employee>>(new PageGen());
  const employees = computed<Array<Employee>>(() => page.value.content);

  const pageRequest = reactive<PageRequest>(new PageRequest(0, 20, "shortName"));

  const pageSizeList = [
    new SelectOption(10, 10),
    new SelectOption(20, 20),
    new SelectOption(50, 50)
  ]

  const sortByList = [
    new SelectOption("shortName", "No Change"),
  ]

  const addEntity = async () => { }
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

  /**Add functions for CardDataV1 */
  const firstPage = async () => {
    if (!page.value.first) {
      pageRequest.pageCurrent = 0;
      await fetchEntities();
    }
  }

  const lastPage = async () => {
    if (!page.value.last) {
      pageRequest.pageCurrent = page.value.totalPages - 1;
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

  const cardDataV1 = computed<CardDataV1>(() => {
    return new CardDataV1(
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
      firstPage,
      lastPage,
      setPageSize
    );
  })

  async function fetchEntities() {
    await emplService.getEntities(pageRequest).then(response => {
      page.value = response
    }).catch(err => {
      console.log(err);
    })
  }

  return {
    employees,
    cardData,
    cardDataV1,
    fetchEntities
  }

})