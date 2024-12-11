<script setup>
import VueTableLite from "vue3-table-lite";
import {computed, inject, onMounted, onUpdated, reactive, ref, watch} from "vue";
import axios from "axios";

const props = defineProps({
  searchParams: Object,
  searchTriggered: Boolean,
})

const emits = defineEmits([
  "resetSearchTrigger",
  "disableSearch",
])

const goodsData = ref([])
const totalData = ref(0)
const pageTable = ref(1)
const pageSizeTable = ref(10)

const showLoading = inject("showLoading")
const hideLoading = inject("hideLoading")

const getGoodsData = async (offset, limit, order, sort, page, pageSize) => {
  const pageParams = {
    offset: offset,
    limit: limit,
    order: order,
    sort: sort,
  }

  pageTable.value = page
  pageSizeTable.value = pageSize

  const params = {...props.searchParams, ...pageParams}
  table.isLoading = true

  emits("disableSearch", true)

  await axios({
    "method": "GET",
    "url": "http://127.0.0.1/api/v1/goods/",
    "params": params
  }).then((res) => {
    if (res.status === 200) {
      const dataList = res.data.data.data
      goodsData.value = []
      totalData.value = res.data.data.total
      dataList.forEach((data) => {
        goodsData.value.push({
          code: data.code,
          name: data.name,
          unit_of_goods: data.unit_of_good.name,
        })
      })
    }
    emits("disableSearch", false)
  })
}

const table = reactive({
  isLoading: true,
  columns: [
    {
      label: "Mã Hàng",
      field: "code",
      width: "10%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Tên Hàng",
      field: "name",
      width: "10%",
      sortable: true,
    },
    {
      label: "ĐVT",
      field: "unit_of_goods",
      width: "3%",
      sortable: true,
    },
  ],
  rows: computed(() => {
    return goodsData.value
  }),
  pageOptions: [
    {
      value: 10,
      text: 10,
    },
    {
      value: 25,
      text: 25,
    },
    {
      value: 50,
      text: 50,
    },
    {
      value: 100,
      text: 100,
    },
    {
      value: 250,
      text: 250,
    },
    {
      value: 500,
      text: 500,
    },
  ],
  page: computed(() => {
    return pageTable.value
  }),
  pageSize: computed(() => {
    return pageSizeTable.value
  }),
  messages: {
    pagingInfo: "Danh Sách: {0}-{1} Tổng: {2}",
    pageSizeChangeLabel: "Số Hàng: ",
    gotoPageLabel: "Trang: ",
    noDataAvailable: "Chưa Có Hàng",
  },
  totalRecordCount: computed(() => {
    return goodsData.value.length
  }),
  total: computed(() => {
    return totalData.value
  }),
  sortable: {
    order: "code",
    sort: "asc",
  },
});

getGoodsData()

watch(() => props.searchTriggered, () => {
  if (props.searchTriggered) {
    getGoodsData()
    pageSizeTable.value = 10
    pageTable.value = 1
    emits("resetSearchTrigger")
  }
})

</script>

<template>
  <VueTableLite
    :is-loading="table.isLoading"
    :columns="table.columns"
    :rows="table.rows"
    :page="table.page"
    :page-size="table.pageSize"
    :total="table.total"
    :sortable="table.sortable"
    :pageOptions="table.pageOptions"
    :messages="table.messages"
    @do-search="getGoodsData"
    @is-finished="table.isLoading = false"
  />
</template>

<style>

.vtl.vtl-card {
  margin-top: 30px;
}

table.vtl-table {
  max-height: 541px;
  overflow-y: auto;
}

span.vtl-paging-page-label {
  margin-left: 10px;
}
</style>
