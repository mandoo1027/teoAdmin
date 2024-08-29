<template>
  <div class="caution_box mb_20">
    <ul>
      <li>배치실행 결과를 조회할 수 있습니다.</li>
      <li>실패, 정지된 배치작업을 재실행할 수 있습니다.</li>
      <li>재실행은 비동기로 처리되며 배치 작업에 따라 소요되는 시간이 다를 수 있습니다.</li>
    </ul>
  </div>

  <v-table class="mb_20">
    <tbody>
      <tr>
        <th class="">배치명</th>
        <td>
          <v-text-field
            label="배치명"
            v-model="searchParams.operName"
            class="i_basics"
            maxlength="200"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">상태</th>
        <td>
          <CommonComSelectBox
            v-model="searchParams.execResult"
            :items="execResult"
            :isDefault="false"
            class="s_basics w_150"
            @changeValue="searchData"
          />
        </td>
      </tr>
      <tr>
        <th class="">배치ID</th>
        <td>
          <v-text-field
            label="배치ID"
            v-model="searchParams.operId"
            class="i_basics"
            maxlength="5"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">실행일자</th>
        <td>
          <div class="d_flex">
            <CommonComDatePicker v-model="searchParams.stdt" class="w_200" />
            ~
            <CommonComDatePicker v-model="searchParams.eddt" class="w_200" />

            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
            <v-btn class="vbtn ml_10" size="small" @click="searchRset">초기화</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="d_flex">
    <v-btn class="vbtn ml_10" size="small" @click="batchRestart">재실행</v-btn>
  </div>

  <CommonComAgGridBasic
    ref="agGrid"
    :columnDefs="columnDefs"
    :showOptions="showOptions"
    :defaultColDef="defaultColDef"
    :pageSize="pageSize"
    @clickPagingNumber="clickPagingNumber"
    @setPageSize="setPageSize"
    @cellWasClicked="cellWasClicked"
  />
</template>

<style scoped></style>

<script setup>
import { batApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/
/* 검색 변수 파라미터  */
const searchParams = ref({
  stdt: '', //실행일자
  eddt: '', //실행일자
  operId: '', //배치ID
  operName: '', //배치명
  execSeq: '', //실행 SEQ
  execResult: '', //상태
})

searchParams.value.stdt = $utils.getDateYYYYMMDD(0, 0, 0)
searchParams.value.eddt = $utils.getDateYYYYMMDD(0, 0, 0)

const nameRules = [
  (v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]
/* 콤보 박스 */
const execResult = ref([
  { title: 'ALL', value: '' },
  { title: 'BEGINNING', value: 'BEGINNING' },
  { title: 'STOPPED', value: 'STOPPED' },
  { title: 'COMPLETED', value: 'COMPLETED' },
  { title: 'DUPLICATION', value: 'DUPLICATION' },
  { title: 'FAILED', value: 'FAILED' },
])

const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(1) //현재페이지
const pageSize = ref(100)
const COMPLETED = ref('COMPLETED')
const columnDefs = ref([
  {
    headerName: '선택',
    field: 'chk',
    width: 80,
    cellRenderer: 'agCheckboxCellRenderer',
    editable: false,
    valueGetter: 'node.data.execResult',
    cellRendererParams: (params) => {
      if (params.data.execResult === 'COMPLETED') {
        return { disabled: true }
      } else {
        return { disabled: false }
      }
    },
  },
  {
    headerName: '실행순번',
    field: 'execSeq',
    width: '100px',
  },
  { headerName: '배치명', field: 'operName', width: '200px' },
  { headerName: '배치ID', field: 'operId', width: '100px' },
  {
    headerName: '프로그램URL',
    field: 'programUrl',
    width: '270px',
    cellClass: 'ellipsis  cell_left  ',
  },
  { headerName: 'JOB인스턴스ID', field: 'jobInstanceId', width: '150px' },
  { headerName: 'JOB실행ID', field: 'jobExecutionId', width: '170px' },
  { headerName: '상태', field: 'execResult', width: '150px' },
  { headerName: '실행시작일시', field: 'execStartDt', width: '180px' },
  { headerName: '실행종료일시', field: 'execEndDt', width: '180px' },
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
  searchParams.value.operId = '' //배치ID
  searchParams.value.operName = '' //배치명
  searchParams.value.stdt = $utils.getDateYYYYMMDD(0, 0, 0) //실행일자
  searchParams.value.eddt = $utils.getDateYYYYMMDD(0, 0, 0) //실행일자
  searchParams.value.execResult = '' //상태

  searchData()
}
//검색
const searchData = () => {
  if ($utils.isEmpty(searchParams.value.stdt) || $utils.isEmpty(searchParams.value.eddt)) {
    $fx.throwAlert('실행일자 선택해주세요', '알림')
    return
  }

  //미래날짜는 없는 데이타 당일로 수정.
  if (searchParams.value.stdt > $utils.getDateYYYYMMDD(0, 0, 0)) {
    searchParams.value.stdt = $utils.getDateYYYYMMDD(0, 0, 0)
  }
  if (searchParams.value.eddt > $utils.getDateYYYYMMDD(0, 0, 0)) {
    searchParams.value.eddt = $utils.getDateYYYYMMDD(0, 0, 0)
  }

  if (searchParams.value.stdt > searchParams.value.eddt) {
    const dt = searchParams.value.stdt
    searchParams.value.stdt = searchParams.value.eddt
    searchParams.value.eddt = dt
  }
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
    .BAT0301S01(params)
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

//팝업 상세.
const cellWasClicked = (params) => {
  if (params.column.colId != 'chk') {
    //배치명 클릭시

    const operId = params.data.operId
    const execSeq = params.data.execSeq
    $fx
      .throwDialog('BATBAT102P01', {
        data: { operId: operId, execSeq: execSeq },
        close: false,
        title: '작업이력 상세',
        //closeLabel: '확인',
      })
      .then((result) => {
        if (result) {
          console.log('throwDialog result', result)
        }
      })
  }
}

//재실행
const batchRestart = () => {
  if (agGrid.value.getCheckData().length == 0) {
    $fx.throwAlert('재실행할 배치의 체크박스를 선택해주세요.', '알람')
    return
  }
  if (agGrid.value.getCheckData().length > 1) {
    $fx.throwAlert('재실행은 한 건씩 할 수 있습니다. 한 건의 체크박스를 선택해주세요.', '알람')
    return
  }

  const rchk = ref(0)
  const jobExecutionId = agGrid.value.getCheckData().map((item) => {
    if (item.execResult === 'COMPLETED') {
      $fx.throwAlert('재실행은 상태 COMPLETED는 할수 없습니다.', '알람')
      rchk = 1
      return ''
    }
    searchParams.value.jobExecutionId = item.jobExecutionId
    searchParams.value.jobInstanceId = item.jobInstanceId
    searchParams.value.execSeq = item.execSeq
    searchParams.value.operId = item.operId
    return item.jobExecutionId
  })

  if (rchk.value === 1) {
    return
  }

  const params = searchParams.value //파라미터 셋팅
  $fx.startLoadingbar()
  batApi
    .BAT0301S03(params)
    .then((response) => {
      const resultData = response.result

      if (resultData.resultCd === 'Y') {
        $fx.throwAlert('배치 재실행 요청 하였습니다. 배치작업에는 일정시간이 소요됩니다.', '알람')
        searchData()
      } else {
        $fx.throwAlert('배치 재실행 실패하였습니다("+resultData.execResult+")', '알람')
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
