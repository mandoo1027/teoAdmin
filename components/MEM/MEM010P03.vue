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
  memId: '',
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
    headerName: '성명',
    field: 'memNm',
    width: 150,
  },
  {
    headerName: '회원구분',
    field: 'memDivCd',
    width: 100,
    valueGetter: (params) => {
      return $utils.getCodeValue(memDivCdCode?.value, params?.data?.memDivCd)
    },
  },
  {
    headerName: '안내채널',
    field: 'memNm',
    width: 100,
    valueGetter: (params) => {
      return $utils.getCodeValue(ntcnChnlDivCdCode?.value, params?.data?.ntcnChnlDivCd)
    },
  },
  {
    headerName: '휴대전화번호',
    field: 'moblTelno',
    width: 160,
    valueGetter: (params) => {
      if (params.data.moblTelno1) {
        return `${params.data.moblTelno1}-${params.data.moblTelno2}-${params.data.moblTelno3}`
      } else {
        return ''
      }
    },
  },
  {
    headerName: '이메일주소',
    field: 'email',
    width: 300,
  },
  {
    headerName: '소속기관직무',
    field: 'memJoinDate',
    width: 120,
    valueGetter: (params) => {
      return $utils.getCodeValue(instDtyCdCode?.value, params?.data?.instDtyCd)
    },
  },
  {
    headerName: '책임자선정사유',
    field: 'rbprsnChgResn',
    width: 450,
  },
  {
    headerName: '회원가입상태',
    field: 'memJoinDate',
    width: 120,
    valueGetter: (params) => {
      return $utils.getCodeValue(memJoinStatCdCode?.value, params?.data?.memJoinStatCd)
    },
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
const currentPage = ref(0) //현재페이지
// 변수명
const agGrid = ref(null) // 그리드 넣는 변수

// 넘어온 데이터
const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

const ntcnChnlDivCdCode = ref('')
const memDivCdCode = ref('')
const memJoinStatCdCode = ref('')
const instDtyCdCode = ref('')

/********************************* api 선언 및 정의 ****************************/
onMounted(async () => {
  // console.log('====props====', props)
  searchParams.value.memId = props.data.memId // 회원ID넘겨주기

  $fx.startLoadingbar()
  instDtyCdCode.value = await $fx.getCommonCodeList('INST_DTY_CD') //
  memDivCdCode.value = await $fx.getCommonCodeList('MEM_DIV_CD') //
  ntcnChnlDivCdCode.value = await $fx.getCommonCodeList('NTCN_CHNL_DIV_CD') // 알림채널구분
  memJoinStatCdCode.value = await $fx.getCommonCodeList('MEM_JOIN_STAT_CD') // 회원가입상태
  $fx.finishLoadingbar()
  currentPage.value = 0
  callDown()
})

const callDown = () => {
  // agGrid.value.removeData()
  callApi()
}

// 이력정보 조회
const callApi = () => {
  const params = searchParams.value
  // console.log(params, 'params')
  $fx.startLoadingbar()
  memApi
    .MEM0202S09(params)
    .then((response) => {
      const resultData = response?.histResult
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
