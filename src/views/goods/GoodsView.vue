<script setup>
import {ref} from "vue";

const searchParams = ref({})
const searchTriggered = ref(false)
const isDisable = ref(false)

</script>

<template>
  <div class="container">
    <left-nav/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<style>
.content {
  flex: 1;
  width: 85%;
  padding: 20px;
}

body {
  overflow: auto !important;
}

label.text-form {
  font-weight: bold;
}

.add-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.input-box {
  margin-left: 10px;
}

.text-form {
  vertical-align: middle;
}

.input-block {
  display: inline-block;
}

.form {
  padding-right: 100px;
  border: 1px solid #e9e5dd;
  border-radius: 30px;
  padding: 20px 50px;
}
</style>
