<script setup>
import axios from "axios";
import {computed, ref, watch} from "vue";

const unitOfGoods = ref(null);

const unitOfGoodsId = defineModel('unitOfGoodsId')
const emits = defineEmits(['selectedUnitName'])

const getUnitOfGoodData = async () => {
  await axios({
    method: 'GET',
    url: 'http://127.0.0.1/api/v1/goods/unit-of-goods',
  }).then(res => {
    if (res.status === 200) {
      unitOfGoods.value = res.data.data;
    }
  })
}

const changeUnitSelect = (event) => {
  let unitName = event.currentTarget.options[event.currentTarget.selectedIndex].text
  emits("selectedUnitName", unitName)
}

await getUnitOfGoodData()

</script>

<template>
  <select id="unit-of-good-selector" class="drop-down input-box text-form" @change="changeUnitSelect" v-model="unitOfGoodsId">
    <option v-for="unitOfGood in unitOfGoods" :key="unitOfGood.name" :value="unitOfGood.id">{{ unitOfGood.name }}</option>
  </select>
</template>

<style scoped>

</style>
