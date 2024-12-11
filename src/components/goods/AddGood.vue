<script setup>
import VueTableLite from "vue3-table-lite";
import {computed, inject, onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import axios from "axios";
import Alert from "@/components/Modal/alert.vue";
import Papa from 'papaparse'

const alertObj = inject("alertObj")
const setAlertMessage = inject("setAlertMessage")
const showLoading = inject("showLoading")
const hideLoading = inject("hideLoading")

const goodsFile = ref(null)

const goods = ref([
  {
    code: '',
    name: '',
    unit_of_good_id: '',
  },
]);

const props = defineProps({
  unitOfGoods: Array
})

const table = reactive({
  isLoading: false,
  isSlotMode: true,
  columns: [
    {
      label: "STT",
      field: "index",
      width: "3%",
      sortable: false,
      isKey: true,
      headerStyles: {textAlign: "center"},
      columnStyles: {textAlign: "center"},
    },
    {
      label: "Mã Hàng",
      field: "code",
      width: "10%",
      sortable: false,
      headerClasses: "text-form" ,
      headerStyles: {textAlign: "center"},
      columnStyles: {textAlign: "center"},
    },
    {
      label: "Tên Hàng",
      field: "name",
      width: "15%",
      sortable: false,
      headerClasses: "text-form" ,
      headerStyles: {textAlign: "center"},
      columnStyles: {textAlign: "center"},
    },
    {
      label: "ĐVT",
      field: "unit_of_good_id",
      width: "10%",
      sortable: false,
      headerClasses: "text-form" ,
      headerStyles: {textAlign: "center"},
      columnStyles: {textAlign: "center"},
    },
    {
      label: "",
      field: "action",
      width: "5%",
      sortable: false,
      headerClasses: "text-form" ,
      headerStyles: {textAlign: "center"},
      columnStyles: {textAlign: "center"},
    },
  ],
  rows: computed(() => {
    return goods.value
  }),
  totalRecordCount: goods.value.length,
  sortable: {
    order: "id",
    sort: "asc",
  },
});

const addMoreRow = () => {
  goods.value.push({
    code: '',
    name: '',
    unit_of_good_id: '',
  })
}

const removeRow = (event) => {
  const removedIndex = event.currentTarget.getAttribute("data-index");
  goods.value.splice(removedIndex, 1);
}

const submit = async () => {
  showLoading();
  await axios({
    method: "POST",
    url: "http://127.0.0.1/api/v1/goods/",
    data: {...goods.value}
  }).then((res) => {
    if (res.status === 200) {
      setAlertMessage("success", res.data.message)
    }
  }).catch((res) => {
    if (res.response.status === 422) {
      setAlertMessage("danger", res.response.data.errors)
    }
  })
  hideLoading()
}

const uploadFileEvent = () => {
  document.getElementById('getFile').click()
}

const onFileChange = async (event) => {
  showLoading()
  const target = event.target;

  if (target && target.files) {
    goodsFile.value = target.files[0];
  }
  await parseFile()

  hideLoading();
}

const parseFile = async () => {
  await Papa.parse(goodsFile.value, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      const data = results.data;
      const header = results.meta.fields;
      if (
        data && header.includes("MÃ HÀNG")
        && header.includes("TÊN HÀNG")
        && header.includes("ĐVT")
      ) {
        goods.value = [];
        const unit = {};
        props.unitOfGoods.map((object) => {
          unit[object.name.toLowerCase()] = object.id
        })
        data.map((object) => {
          if (object["MÃ HÀNG"] && object["TÊN HÀNG"] && object["ĐVT"]) {
            const goodData = {
              code: object["MÃ HÀNG"],
              name: object["TÊN HÀNG"],
              unit_of_good_id: unit[object["ĐVT"].toLowerCase()]
            }
            goods.value.push(goodData)
          }
        })
      }
    }
  })
}

</script>

<template>
  <div class="add-good-component">
    <h3 class="form-title">Hàng Hóa</h3>
    <form class="form">
      <alert v-if="alertObj.type && alertObj.message" :type="alertObj.type" :message="alertObj.message"/>
      <div class="upload-file-block">
        <button style="float: right" class="button upload-file-button" @click.prevent="uploadFileEvent">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
            <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707z"/>
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
          </svg>
          File
        </button>
        <input @change="onFileChange($event)" type='file' id="getFile" style="display:none">
        <div class="clear-both"></div>
      </div>
      <vue-table-lite
        :is-loading="table.isLoading"
        :is-slot-mode="table.isSlotMode"
        :is-hide-paging="true"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        @is-finished="table.isLoading = false"
      >
        <template #index="good"><span>{{ good.index + 1 }}</span></template>
        <template #code="good"><input class="input-box text-form" type="text" v-model="goods[good.index].code" required></template>
        <template #name="good"><input class="input-box text-form" type="text" v-model="goods[good.index].name" required></template>
        <template #unit_of_good_id="good">
          <select id="unit-of-good-selector" class="drop-down input-box text-form" v-model="goods[good.index].unit_of_good_id">
            <option v-for="unitOfGood in props.unitOfGoods" :key="unitOfGood.id" :value="unitOfGood.id">{{ unitOfGood.name }}</option>
          </select>
        </template>
        <template v-if="goods.length > 1" #action="good">
          <button :data-index="good.index" @click.prevent="removeRow" class="button delete-row">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </button>
        </template>
      </vue-table-lite>
      <div class="add-block">
        <div class="add-more-block">
          <button @click.stop.prevent="addMoreRow" class="button add-more">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="button-block">
        <button class="add-button button" @click.prevent="submit">Thêm Hàng</button>
      </div>
    </form>
  </div>

</template>

<style scoped>

table {
  max-height: 540px;
  overflow: auto;
}

div.add-good-component {
  position: relative;
  margin-top: 40px;
}

.add-block {
  margin-top: 20px;
}

.vtl-thead-th {
  text-align: center !important;
}

.vtl-tbody-td{
  text-align: center;
}

button.add-more, button.delete-row {
  padding: 0;
  margin: 0;
  border-radius: 100%;
  background-color: #343a40;
  border: 1px solid #454d55;
}

button.delete-row {
  background: #c94848;
}

button.add-more:hover {
  background: #343a40b5;
}

button.delete-row:hover {
  background: #c94848a1;
}

.add-more-block {
  margin-bottom: 50px;
}

.add-more-block, .button-block {
  width: 100%;
  display: flex;
  justify-content: center;
}

.upload-file-block {
  margin: 10px;
}

button.upload-file-button {
  background: #7a8bab;
  padding: 10px 20px;
}

button.upload-file-button:hover {
  background: #7a8cab94;
}

</style>
