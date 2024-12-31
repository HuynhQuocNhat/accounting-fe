<script setup>
import VueTableLite from "vue3-table-lite";
import {computed, inject, reactive, ref, watch} from "vue";
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
const pageSizeTable = ref(25)

const getGoodsData = async (offset = 0, limit = 25, order, sort, page, pageSize) => {
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
      let count = 0
      goodsData.value = []
      totalData.value = res.data.data.total
      dataList.forEach((data) => {
        goodsData.value.push({
          numerical_order: offset + (++count),
          id: data.id,
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
      label: "STT",
      field: "numerical_order",
      width: "0.5%",
      sortable: true,
      headerStyles: {
        textAlign: "center"
      },
      columnStyles: {
        textAlign: "center"
      }
    },
    {
      label: "Mã Hàng",
      field: "code",
      width: "10%",
      sortable: true,
      isKey: true,
      headerStyles: {
        textAlign: "center"
      },
    },
    {
      label: "Tên Hàng",
      field: "name",
      width: "10%",
      sortable: true,
      headerStyles: {
        textAlign: "center"
      },
    },
    {
      label: "ĐVT",
      field: "unit_of_goods",
      width: "3%",
      sortable: true,
      headerStyles: {
        textAlign: "center"
      },
    },
    {
      label: "",
      field: "action",
      width: "3%",
      sortable: true,
      columnStyles: {
        textAlign: "center",
      },
      display: function (row) {

        return (
          '<button @click="alert(123)" data-type="update" data-goods-id="' + row.id + '" class="button">\n' +
          '            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"\n' +
          '                 className="bi bi-pencil-square" viewBox="0 0 16 16">\n' +
          '              <path\n' +
          '                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\n' +
          '              <path fill-rule="evenodd"\n' +
          '                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>\n' +
          '            </svg>\n' +
          '          </button>\n' +
          '<button data-type="delete" data-goods-id="" class="button delete-button">\n' +
          '          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash"\n' +
          '               viewBox="0 0 16 16">\n' +
          '            <path\n' +
          '              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>\n' +
          '            <path\n' +
          '              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>\n' +
          '          </svg>\n' +
          '        </button>'
        )
      }
    },
  ],
  rows: computed(() => {
    return goodsData.value
  }),
  pageOptions: [
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
    pageSizeTable.value = 25
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
  max-height: 700px;
  overflow-y: auto;
}

span.vtl-paging-page-label {
  margin-left: 10px;
}
</style>
