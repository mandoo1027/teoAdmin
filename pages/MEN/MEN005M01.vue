<template>
  <!-- 이체거래 내역 목록 조회 -->
  <v-table>
    <tbody>
      <tr>
        <th class="">이체 일자</th>
        <td>
          <div class="d_flex">
            <CommonComDatePicker v-model="searchParams.trsDate" class="w_200" />
          </div>
        </td>
        <th class="">입금계좌번호</th>
        <td>
          <v-text-field
            label="입금계좌번호"
            v-model="searchParams.dpstAcntNo"
            class="i_basics"
            maxlength="20"
          ></v-text-field>
        </td>
        <th class="">이체 금액</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="집행관리 번호"
              v-model="searchParams.acntTrsAmt"
              class="i_basics"
              maxlength="20"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <CommonComAgGrid
    ref="agGrid"
    :columnDefs="columnDefs"
    :defaultColDef="defaultColDef"
    :pageSize="pageSize"
    :showOptions="showOptions"
    @clickPagingNumber="clickPagingNumber"
    @setPageSize="setPageSize"
    @cellWasClicked="cellWasClicked"
  />
</template>

<style scoped></style>

<script setup>
import { menuApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/
/* 검색 변수 파라미터  */
const searchParams = ref({
  trsDate: '', //이체일자
  dpstAcntNo: '', //입금계좌번호
  acntTrsAmt: '', //이체금액
})

const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(0) //현재페이지
const pageSize = ref(100)

const columnDefs = ref([
  { headerName: 'NO.', field: 'no', width: '80px', valueGetter: 'node.rowIndex + 1' },
  { headerName: '집행관리번호', field: 'implMngNo', width: '230px' },
  { headerName: '이체실행구분', field: 'trsExcDivNm', width: '130px' },
  {
    headerName: '발주기관',
    field: 'ordrInstNm',
    width: '150px',
    cellClass: 'ellipsis  cell_left  ',
  },
  { headerName: '이체거래구분', field: 'acntTrsNm', width: '130px' },

  { headerName: '입금은행', field: 'dpstBankNm', width: '120px' },
  { headerName: '입금계좌번호', field: 'dpstAcntNo', width: '130px' },

  {
    headerName: '입금예금주명',
    field: 'dpstAcntNm',
    width: '170px',
    cellClass: 'ellipsis    ',
  },
  {
    headerName: '이체금액',
    field: 'acntTrsAmt',
    width: '140px',
    cellClass: ' cell_right  ',
    valueFormatter: (params) => $utils.addComma(params?.value) + '원',
  },
  {
    headerName: '이체 일자',
    field: 'tiD',
    width: '130px',
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  { headerName: '이체결과 코드', field: 'trsRcd', width: '120px' },
  { headerName: '이체결과 메시지', field: 'errTrsMsg', width: '160px', cellClass: ' cell_left  ' },
  {
    headerName: '사업명',
    field: 'bizNm',
    width: '170px',
    cellClass: 'ellipsis  cell_left  ',
    valueFormatter: (params) => $utils.convertRegexToText(params?.value),
  },
  {
    headerName: 'TASK명',
    field: 'taskNm',
    width: '170px',
    cellClass: 'ellipsis  cell_left  ',
    valueFormatter: (params) => $utils.convertRegexToText(params?.value),
  },
])

//그리드 기본 셋팅
const defaultColDef = {
  editable: false, // 편집 여부
  cellStyle: { textAlign: 'center' }, //전체 컬럼 정렬
}
const showOptions = ref({
  isChangeSearchData: true, //검색 조건 변경시 더보기 노출 여부
})

/********************************* 초기화 *************************/
onMounted(() => {
  if ($fx.getParams().trsDate) {
    searchParams.value.trsDate = $fx.getParams().trsDate
    searchParams.value.dpstAcntNo = $fx.getParams().dpstAcntNo
    searchParams.value.acntTrsAmt = $fx.getParams().acntTrsAmt
  } else {
    searchParams.value.trsDate = $utils.getDateYYYYMMDD(0, 0, 0)
  }
  // 조회
  searchData()
})

/********************************* methods *************************/

//검색
const searchData = () => {
  if ($utils.isEmpty(searchParams.value.trsDate)) {
    $fx.throwAlert('이체일자를 선택해주세요', '알림')
    return
  }
  currentPage.value = 0
  agGrid.value.removeData()
  callApi()
}
//페이지 클릭
const clickPagingNumber = (number) => {
  currentPage.value = number
  callApi()
}

const setPageSize = (number) => {
  pageSize.value = number
  searchData()
}

//상세.
const cellWasClicked = (params) => {
  const implMngNo = params.data.implMngNo //집행관리번호
  const trsExcDiv = params.data.trsExcDiv //이체실행구분
  const acntTrsSeq = params.data.acntTrsSeq //이체순번
  $fx.move('AMEN007', {
    implMngNo: implMngNo,
    trsExcDiv: trsExcDiv,
    acntTrsSeq: acntTrsSeq,
    trsDate: searchParams.value.trsDate,
    dpstAcntNo: searchParams.value.dpstAcntNo,
    acntTrsAmt: searchParams.value.acntTrsAmt,
  })
}

/************************************* API ***************************/
// 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  params.viewSeq = currentPage.value //페이지 넘버
  params.viewCount = pageSize.value //페이지 사이즈

  $fx.startLoadingbar()
  menuApi
    .MEN0501S01(params)
    .then((response) => {
      const resultData = response.result.taskActrsf
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
