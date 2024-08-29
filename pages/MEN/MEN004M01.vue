<template>
  <!-- 전자서명조회 -->
  <v-table>
    <tbody>
      <tr>
        <th class="">인증서 업무 구분</th>
        <td>
          <CommonComSelectBox
            groupCode="CERT_JOB_DIV_CD"
            v-model="searchParams.certJobDivCd"
            :isDefault="true"
            class="s_basics w_150"
          />
        </td>
        <th class="">서명 기관ID</th>
        <td>
          <v-text-field
            label="기관ID"
            v-model="searchParams.certInstId"
            class="i_basics"
            maxlength="6"
          ></v-text-field>
        </td>
        <th class="">서명 일자</th>
        <td>
          <div class="d_flex">
            <CommonComDatePicker v-model="searchParams.certDate" class="w_200" />
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
  certDate: '', //서명일자
  certJobDivCd: '', //인증업무구분
  certInstId: '', //서명기관ID
})

const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(0) //현재페이지
const pageSize = ref(100)

const columnDefs = ref([
  { headerName: 'NO.', field: 'no', width: '80px', valueGetter: 'node.rowIndex + 1' },
  { headerName: '전자서명일련번호', field: 'certDocSeq', width: '300px' },
  { headerName: '인증서업무구분', field: 'certJobDivNm', width: '200px' },
  { headerName: '인증서업무 관리번호', field: 'certJobMngNo', width: '200px' },
  {
    headerName: '서명일자',
    field: 'certDate',
    width: '150px',
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  { headerName: '서명시간', field: 'certTime', width: '150px' },
  { headerName: '서명기관ID', field: 'certInstId', width: '160px' },
  { headerName: '서명회원ID', field: 'certMemId', width: '160px' },
  { headerName: '식별번호', field: 'certData', width: '200px' },
  { headerName: '인증서구분', field: 'fincertDivNm', width: '200px' },
  {
    headerName: '거래고유ID',
    field: 'apiTranId',
    width: '200px',
    cellClass: 'ellipsis  cell_left  ',
  },
  { headerName: '등록자ID', field: 'rgtrUserId', width: '160px' },
  {
    headerName: '등록일시',
    field: 'rgtrDt',
    width: '160px',

    valueFormatter: (params) => $utils.formatDate(params?.value),
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
  if ($fx.getParams().certDate) {
    searchParams.value.certJobDivCd = $fx.getParams().certJobDivCd
    searchParams.value.certInstId = $fx.getParams().certInstId
    searchParams.value.certDate = $fx.getParams().certDate
  } else {
    searchParams.value.certDate = $utils.getDateYYYYMMDD(0, 0, 0)
  }
  // 조회
  searchData()
})

/********************************* methods *************************/

//검색
const searchData = () => {
  if ($utils.isEmpty(searchParams.value.certDate)) {
    $fx.throwAlert('서명일자를 선택해주세요', '알림')
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
  const certDocSeq = params.data.certDocSeq
  $fx.move('AMEN005', {
    certDocSeq: certDocSeq,
    certDate: searchParams.value.certDate,
    certJobDivCd: searchParams.value.certJobDivCd,
    certInstId: searchParams.value.certInstId,
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
    .MEN0401S01(params)
    .then((response) => {
      const resultData = response.result.fincertVerify
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
