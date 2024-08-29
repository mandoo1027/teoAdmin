<template>
  <v-radio-group v-model="internalValue" :inline="isInline" @change="changeValue">
    <v-radio
      v-for="item in bindItems"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></v-radio>
  </v-radio-group>
</template>

<script setup>
import { commonApi } from '@/api/index.ts'
let searchItems = ref([])
const bindItems = computed(() => searchItems.value)
const emit = defineEmits(['input', 'changeData'])
// const internalValue = ref(props.value)
const internalValue = ref('')
const props = defineProps({
  groupCode: {
    type: String,
    default: '',
  },
  subCode: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: [],
  },
  value: {
    type: String,
    default: '',
  },
  isInline: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: [],
  },
  delItems: {
    type: Array,
    default: [],
  },
})

const searchParams = reactive({
  groupCode: '', //코드그룹
  pageNum: 1,
  etcCodeOrName: '',
})

watch(internalValue, (newValue) => {
  emit('input', newValue)
})
const changeValue = (e) => {
  emit('changeData', e.target.value)
}

onBeforeMount(async () => {
  //api호출
  if (props.groupCode || props.subCode) {
    //await callApi()
  } else {
    searchItems.value = props.options
  }
})

//결과값 삭제
const delItems = () => {
  searchItems.value = searchItems.value.filter(
    (item) => !props.delItems.some((delItem) => delItem.code === item.value),
  )
}
/************************************* API ***************************/
//공통코드 조회
const callApi = async () => {
  searchParams.codeGrp = props.groupCode || ''
  searchParams.etcCodeOrName = props.subCode || ''
  await commonApi
    .searchCommonCode(searchParams)
    .then((response) => {
      const resultData = response?.result
      searchItems.value = resultData.map((item) => {
        return { value: item.code, label: item.name }
      })
      if (props.delItems.length > 0) {
        delItems()
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
