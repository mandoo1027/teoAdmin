<template>
  <div class="caution_box mb_20">
    <ul>
      <li>실행중인 배치를 조회/정지할 수 있습니다.</li>
    </ul>
  </div>

  <v-table class="mb_20">
    <tbody>
      <tr>
        <th class="">JOB실행ID</th>
        <td>
          <v-text-field
            label="JOB실행ID"
            v-model="searchParams.jobExecutionId"
            class="i_basics"
            @keydown.enter="searchData"
            maxlength="20"
          ></v-text-field>
        </td>
        <th class="">JOB인스턴스ID</th>
        <td>
          <v-text-field
            label="JOB인스턴스ID"
            v-model="searchParams.jobInstanceId"
            class="i_basics"
            @keydown.enter="searchData"
            maxlength="20"
          ></v-text-field>
        </td>
        <th class="">배치명</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="배치명"
              v-model="searchParams.operName"
              class="i_basics"
              @keydown.enter="searchData"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
            <v-btn class="vbtn ml_10" size="small" @click="searchRset">초기화</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="d_flex">
    <v-btn class="vbtn ml_10" size="small" @click="batchStop">실행정지</v-btn>
  </div>

  <CommonComAgGridBasic
    ref="agGrid"
    :columnDefs="columnDefs"
    :currentPage="currentPage"
    :defaultColDef="defaultColDef"
    :pageSize="pageSize"
    :showOptions="showOptions"
    @clickPagingNumber="clickPagingNumber"
    @setPageSize="setPageSize"
  />
</template>

<style scoped></style>

<script setup>
import { batApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/
/* 검색 변수 파라미터  */
const searchParams = ref({
  jobExecutionId: '', //JOB실행ID
  jobInstanceId: '', //JOB인스턴스ID
  operName: '', //배치명
  execSeq: '',
})

const nameRules = [
  (v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(1) //현재페이지
const pageSize = ref(100)

const columnDefs = ref([
  {
    headerName: '선택',
    field: 'chk',
    width: 80,
    cellRenderer: 'agCheckboxCellRenderer',
    editable: false,
    cellRendererParams: {
      disabled: false,
    },
  },
  { headerName: '실행순번', field: 'execSeq', width: '200px' },
  { headerName: 'JOB실행ID', field: 'jobExecutionId', width: '130px' },
  { headerName: 'JOB인스턴스ID', field: 'jobInstanceId', width: '200px' },
  { headerName: 'JOB명', field: 'jobName', width: '200px' },
  { headerName: '배치명', field: 'operName', width: '200px' },
  { headerName: '버전', field: 'version', width: '100px' },
  { headerName: '실행일시', field: 'startTime', width: '150px' },
  { headerName: '상태', field: 'status', width: '130px' },
  { headerName: '종료코드', field: 'exitCode', width: '130px' },
])
//그리드 기본 셋팅
const defaultColDef = {
  sortable: true, // 정렬 기능
  filter: true, // 필터 기능
  editable: false, // 편집 여부
  resizable: true, // 모르겠다
  cellStyle: { textAlign: 'center' }, //전체 컬럼 정렬
}
const showOptions = ref({
  isChangeSearchData: true, //검색 조건 변경시 더보기 노출 여부
})
/********************************* 초기화 *************************/
onMounted(() => {
  // 조회
  searchData()
})

/********************************* methods *************************/
//초기화

const searchRset = () => {
  searchParams.value.jobExecutionId = '' //JOB실행ID
  searchParams.value.jobInstanceId = '' //JOB인스턴스ID
  searchParams.value.operName = '' //배치명
  searchParams.value.execSeq = ''
  searchData()
}
//검색
const searchData = () => {
  currentPage.value = 1
  agGrid.value.removeData()
  callApi()
}
//페이지 클릭
const clickPagingNumber = (number) => {
  currentPage.value = Number(currentPage.value) + 1
  callApi()
}

const setPageSize = (number) => {
  pageSize.value = number
  searchData()
}

/************************************* API ***************************/
// 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  params.pageNum = currentPage.value //페이지 넘버
  params.pageSize = pageSize.value //페이지 사이즈
  $fx.startLoadingbar()
  batApi
    .BAT0401S01(params)
    .then((response) => {
      const resultData = response.result.result
      agGrid.value.addData(resultData)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

//배치정지
const batchStop = () => {
  if (agGrid.value.getCheckData().length == 0) {
    $fx.throwAlert('실행정지할 배치의 체크박스를 선택해주세요.', '알람')
    return
  }
  if (agGrid.value.getCheckData().length > 1) {
    $fx.throwAlert('실행정지는 한 건씩 할 수 있습니다. 한 건의 체크박스를 선택해주세요.', '알람')
    return
  }

  const rchk = ref(0)
  const jobExecutionId = agGrid.value.getCheckData().map((item) => {
    searchParams.value.jobExecutionId = item.jobExecutionId
    searchParams.value.jobInstanceId = item.jobInstanceId
    searchParams.value.execSeq = item.execSeq

    return item.jobExecutionId
  })

  if (rchk.value == 1) {
    return
  }

  // $fx.throwAlert('아직 작업중입니다....', '알람')
  // return
  const params = searchParams.value //파라미터 셋팅
  $fx.startLoadingbar()
  batApi
    .BAT0401S02(params)
    .then((response) => {
      const resultData = response.result

      if (resultData.resultCd === 'Y') {
        $fx.throwAlert(
          '정상 처리되었습니다. \n배치 순번 : " + resultData.execSeq + "\n실행 결과 : " + resultData.execResult + "\n오류 메시지 : " + resultData.errDsc',
          '알람',
        )
        searchData()
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
