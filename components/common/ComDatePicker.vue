<template>
  <vue-date-picker
    class="dp"
    v-model="selectDate"
    placeholder="선택하세요"
    :format="format"
    locale="ko"
    :noMinutesOverlay="true"
    :enable-time-picker="false"
    auto-apply
    :close-on-auto-apply="true"
    @update:model-value="changeValue"
  />
</template>
<script setup>
//    @update:model-value="changeValue"
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const emit = defineEmits()
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  format: { type: String, default: 'yyyy-MM-dd' },
})
const internalValue = computed(() => props.modelValue)

const selectDate = ref('')

watch(internalValue, (newValue) => {
  selectDate.value = $utils.formatDate(newValue)
})

onMounted(() => {
  selectDate.value = $utils.formatDate(props.modelValue)
})
const changeValue = (value) => {
  emit('update:modelValue', $utils.formatDate(value, '', false))
}
</script>