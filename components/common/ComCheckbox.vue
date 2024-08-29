<template>
  <v-checkbox v-model="checkData" @change="changeData"></v-checkbox>
</template>
<script setup>
const checkData = ref(false)
const emit = defineEmits()
const changeData = () => {
  console.log(checkData.value)
  emit('onCheckboxChange', checkData.value)
}
</script>