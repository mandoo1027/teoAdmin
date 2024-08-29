<template>
  <v-select
    ref="selectModel"
    :items="bindItems"
    item-title="title"
    item-value="value"
    label="Select an option"
    placeholder="선택하세요"
    @update:model-value="changeValue"
    :rules="rules"
  ></v-select>
</template>
<script setup>
import { commonApi } from '@/api/index.ts'
const emit = defineEmits()
const props = defineProps({
  groupCode: {
    type: String,
    default: '',
  },
  subCode: {
    type: String,
    default: '',
  },
  selected: {
    type: String,
    default: '',
  },
  items: {
    type: Object,
    default: null,
  },
  isDefault: {
    type: Boolean,
    default: true,
  },
  isAll: {
    type: Boolean,
    default: false,
  },
  isShowEtc: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Object,
    default: [],
  },

  delItems: {
    type: Array,
    default: [],
  },
})

const selectModel = ref(null)
const searchItems = ref([])
//검색 파라미터
const searchParams = reactive({
  groupCode: '', //코드그룹
  pageNum: 1,
  etcCodeOrName: '',
})

const changeValue = (value) => {
  emit('changeValue', value)
}

//결과값 삭제
const delItems = () => {
  searchItems.value = searchItems.value.filter(
    (item) => !props.delItems.some((delItem) => delItem.code === item.value),
  )
}

/************************************* API ***************************/

//공통코드 조회
const callApi = () => {
  searchParams.codeGrp = props.groupCode || ''
  searchParams.etcCodeOrName = props.subCode || ''
  commonApi
    .searchCommonCode(searchParams)
    .then((response) => {
      const resultData = response?.result
      searchItems.value.push(
        ...resultData.map((item) => {
          return { value: item.code, title: item.name }
        }),
      )
      if (props.delItems.length > 0) {
        delItems()
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
const bindItems = computed(() => {
  let returnData = []
  if (props.items) {
    returnData = props.items
  } else {
    returnData = searchItems.value
  }
  const copiedArray = [...returnData]
  if (props.isDefault) {
    copiedArray.unshift({ title: '선택하세요', value: '' })
  }

  if (props.isAll) {
    copiedArray.unshift({ title: '전체', value: '' })
  }

  if (props.isShowEtc) {
    copiedArray.push({ title: '직접입력', value: 'etc' })
  }
  return copiedArray
})

const updateValue = (value) => {
  emit('update:modelValue', value)
  emit('changeValue', value)
}

onMounted(async () => {
  if (props.groupCode || props.subCode) {
    await callApi()
  }
})
</script>









