<template>
  <CommonComAgGridBasic
    ref="agGrid"
    :columnDefs="columnDefs"
    :showOptions="showOptions"
    :defaultColDef="defaultColDefReceive"
  />
</template>

<script setup>
import { memApi } from '@/api/index.ts'

const emits = defineEmits(['close-dialog'])

const searchParams = ref({
  instId: '',
})

const columnDefs = ref([
  { headerName: 'NO.', field: 'no', width: 80, valueGetter: 'node.rowIndex + 1' },
  {
    headerName: '변경일시',
    field: 'histStrtDt',
    width: 150,
    valueFormatter: (params) => $utils.getFormatDate(params?.value),
  },
  {
    headerName: '사업자등록번호',
    field: 'instBrno',
    width: 150,
    valueFormatter: (params) => $utils.bizNumberformatter(params?.value),
  },
  {
    headerName: '사업자 명',
    field: 'instBrnoNm',
    width: 300,
  },
  {
    headerName: '대표자 명',
    field: 'rprsvNm',
    width: 150,
  },
  {
    headerName: '사업장 주소',
    field: 'bplcAddr',
    width: 350,
  },
])
// 그리드 눌리지않게 확인
const defaultColDefReceive = {
  editable: false,
}
const showOptions = ref({
  isChangeSearchData: false, // 검색 조건 변경시 더보기 노출 여부
  isShowMoreBtn: false, // 더보기 버튼 노출여부
})
watch(searchParams.value, () => (showOptions.value.isChangeSearchData = false))

// 변수명
const agGrid = ref(null) // 그리드 넣는 변수

// 넘어온 데이터
const props = defineProps({
  data: {
    type: Object,
    default: [],
  },
})

/********************************* api 선언 및 정의 ****************************/
onMounted(async () => {
  // console.log('====props====', props.data.memberInfo.instId)
  searchParams.value.instId = props.data.memberInfo.instId // 회원ID넘겨주기
  callDown()
})

const callDown = () => {
  // agGrid.value.removeData()
  callApi()
}

// 사업자 변경 이력정보 조회
const callApi = () => {
  const params = searchParams.value
  // console.log(params, 'params')
  $fx.startLoadingbar()
  memApi
    .MEM0202S08(params)
    .then((response) => {
      const resultData = response.result.regResult

      agGrid.value.addData(resultData)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
