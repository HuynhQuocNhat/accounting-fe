<script setup>
import SearchGoods from "@/components/goods/SearchGoods.vue";
import GoodsList from "@/components/goods/GoodsList.vue";
import {ref} from "vue";
import {isDisabled} from "bootstrap/js/src/util/index.js";

const searchParams = ref({})
const searchTriggered = ref(false)
const isDisable = ref(false)

</script>

<template>
  <div class="container">
    <left-nav/>
    <div class="content">
      <search-goods
        @search-triggered="(params) => {
          searchParams = params
          searchTriggered = true
        }"
        :is-disable="isDisable"
      />
      <goods-list
        :search-params="searchParams"
        :search-triggered="searchTriggered"
        @reset-search-trigger="searchTriggered = false"
        @disable-search="(isDis) => isDisable = isDis"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
