<script setup>
import Multiselect from "vue-multiselect";
import {computed, inject, reactive, ref, watch} from "vue";
import axios from "axios";

const value = ref([])
const options = ref([])
const isShowSearchBox = ref(true)

const searchParams = reactive({
  code: '',
  name: '',
  unit_of_good_ids: []
})

const props = defineProps({
  isDisable: Boolean
})

const emits = defineEmits([
  "searchTriggered"
])

const showLoading = inject("showLoading")
const hideLoading = inject("hideLoading")

const getUnitOfGoodData = () => {
  showLoading();
  axios({
    method: 'GET',
    url: 'http://127.0.0.1/api/v1/goods/unit-of-goods',
  }).then(res => {
    if (res.status === 200) {
      options.value = res.data.data;
    }
    hideLoading()
  }).catch(() => {
    hideLoading()
  })
}

const resetSearch = () => {
  searchParams.code = ''
  searchParams.name = ''
  searchParams.unit_of_good_ids = []
  value.value = []

  emits("searchTriggered", searchParams)
}

watch(value, () => {
  searchParams.unit_of_good_ids = []
  value.value.forEach((unit) => {
    searchParams.unit_of_good_ids.push(unit.id)
  })
})

getUnitOfGoodData()
</script>

<template>
  <div class="search-block">

    <p class="show-hide-icon" @click="isShowSearchBox = !isShowSearchBox">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-slash-minus" viewBox="0 0 16 16">
        <path d="m1.854 14.854 13-13a.5.5 0 0 0-.708-.708l-13 13a.5.5 0 0 0 .708.708M4 1a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 4 1m5 11a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 9 12"/>
      </svg>
    </p>

    <form class="form">
      <h3 class="form-title">Tìm Hàng</h3>
      <div v-if="isShowSearchBox" class="search-box">
        <div class="add-block search-block">
          <div class="input-block">
            <label class="text-form" for="goods_code">Mã Hàng</label>
            <input type="text" class="input-box text-form" id="goods_code" v-model="searchParams.code">
          </div>

          <div class="input-block">
            <label class="text-form" for="goods_name">Tên Hàng</label>
            <input type="text" class="input-box text-form" id="goods_name" v-model="searchParams.name">
          </div>

          <div class="input-block">
            <label class="text-form" for="goods_name">ĐVT</label>
            <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Tìm ĐVT" label="name"
                         track-by="id" :options="options" :multiple="true" :taggable="true"
                         selectLabel="Chọn ĐVT" deselectLabel="Bỏ chọn ĐVT" selectedLabel="Đã chọn"></multiselect>
          </div>

        </div>

        <div class="search-button-block">
          <button :disabled="props.isDisable" @click.stop.prevent="resetSearch" class="delete-button button search-button">Xóa Tìm Kiếm</button>
          <button :disabled="props.isDisable" @click.stop.prevent="emits('searchTriggered', searchParams)" class="add-button button search-button">Tìm Hàng</button>
        </div>
      </div>
    </form>
  </div>

</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.multiselect__tag {
  background: #ab987a;
}

.multiselect__option--highlight, .multiselect__option--highlight::after {
  background: #ab987a;
}

.multiselect__option--selected.multiselect__option--highlight, .multiselect__option--selected.multiselect__option--highlight::after {
  background: #cd6b6b;
}

.multiselect {
  width: 250px !important;
  vertical-align: middle;
  margin-left: 10px;
  font-size: 16px;
  font-weight: normal;
}

.multiselect__tags {
  border: 1px solid #e2e3e9;
  border-radius: 13px;
  box-shadow: 0 1px 3px rgba(143, 147, 163, .6);
}

</style>

<style scoped>

div.search-block {
  position: relative;
}

p.show-hide-icon {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 30px;
  right: 20px;
  color: #031822f2;
  z-index: 9;
}

p.show-hide-icon:hover {
  cursor: pointer;
  color: #0622307a;
}

p.show-hide-icon svg {
  width: 20px;
  height: 20px;
}

.text-form, .multiselect {
  display: block;
}

label.text-form {
  text-align: center;
}

.input-box, .multiselect {
  margin: 10px 0;
}

.form {
  position: relative;
}

.search-block {
  padding-top: 20px;
}

.search-button-block {
  text-align: center;
  padding-top: 50px;
}

.add-button {
  width: 127px;
  margin-left: 20px;
}

</style>
