<template>
  <v-table>
    <colgroup>
      <col style="width: 110px" />
      <col style="width: *" />
    </colgroup>
    <tbody>
      <tr>
        <th class="">기간 검색</th>
        <td>
          <div class="d_flex">
            <div class="i_calender">
              <CommonComDatePicker
                v-model="searchParams.inqStrtDate"
                class="i_date w_145"
                placeholder="날짜선택"
              />
              <span>~</span>
              <CommonComDatePicker
                v-model="searchParams.inqEndDate"
                class="i_date w_145"
                placeholder="날짜선택"
              />
            </div>
            <v-btn class="vbtn ml_10" size="small" @click="searchData()">검색</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="tit_cnt_btn">
    <p class="tit_cnt">
      조회 건 수 <b>{{ totalCnt }}</b
      >건
    </p>
    <div class="a_center">
      <span class="">(단위:원)</span>
    </div>
    <!-- <div>
      <ComSelectBox
        groupCode="01"
        v-model="comboCnt"
        :items="itemsCnt"
        class="s_basics none_details w_120"
      />
    </div> -->
  </div>
  <div class="grid">
    <CommonComAgGridBasic
      ref="agGrid"
      :columnDefs="columnDefs"
      style="height: 520px"
      :defaultColDef="defaultColDef"
      :showOptions="showOptions"
      @cellWasClicked="cellWasClicked"
    />
  </div>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn" size="small" @click="dpstCncrAprv">입금취소 이체 승인</v-btn>
  </div>
</template>

<style scoped></style>

<script setup>
import { excApi } from '@/api/index.ts'
const EXC100P00 = 'EXCEXC100P00' //입금취소이체승인 팝업창
const EXC100P01 = 'EXCEXC100P01' //취소사유보기 팝업창

const columnDefs = ref([
  {
    headerName: '선택',
    field: 'chk',
    editable: false,
    cellRendererParams: {
      disabled: false,
    },
    cellClass: ['custom-center-align ag_radio'],
    //cellClass: (params) => $utils.isEmpty(params.data.ofldcRcptnDate) ? ['custom-center-align ag_radio'] : '',
    width: 70,
    cellStyle: (params) => {
      if (!$utils.isEmpty(params.data.ofldcRcptnDate)) {
        return { display: 'none' }
      }
    },
  },
  { headerName: 'NO.', field: 'number', width: 80, valueGetter: 'node.rowIndex + 1' },
  { headerName: '발주기관 명', field: 'instNm', width: 200 },
  { headerName: '사업명', field: 'bizNm', width: 200, cellClass: 'cell_left' },
  { headerName: 'TASK명', field: 'taskNm', width: 200, cellClass: 'cell_left' },
  {
    headerName: '입금 된 일자',
    field: 'dpstDate',
    width: 130,
    valueFormatter: (params) => $utils.formatDate(params.value),
  },
  {
    headerName: '사업비 취소 금액',
    field: 'wdrwReqAmt',
    width: 160,
    cellClass: 'cell_right',
    valueFormatter: (params) => $utils.addComma(params.value),
  },
  { headerName: '출금 계좌번호', field: 'wdrwAcntNo', width: 260 },
  { headerName: '입금 계좌번호', field: 'dpstAcntNo', width: 260 },
  {
    headerName: '입금 금액',
    field: 'dpstCnclAmt',
    width: 160,
    cellClass: 'cell_right',
    valueFormatter: (params) => $utils.addComma(params.value),
  },
  {
    headerName: '입금 취소 사유',
    field: 'dpstCnclResn',
    width: 200,
    cellClass: 'link',
    valueFormatter: (params) => '취소 사유 보기',
  },
  {
    headerName: '신청 일자',
    field: 'dsptCnclReqDate',
    width: 130,
    valueFormatter: (params) => $utils.formatDate(params.value),
  },
  { headerName: '신청인', field: 'dsptCnclReqNm', width: 160 },
  {
    headerName: '공문일자',
    field: 'ofldcRcptnDate',
    width: 130,
    valueFormatter: (params) => $utils.formatDate(params.value),
  },
  {
    headerName: '최종승인일',
    field: 'lastAprvDt',
    width: 130,
    valueFormatter: (params) => $utils.formatDate(params.value),
  },
  {
    headerName: '이체일자',
    field: 'caclTrsDt',
    width: 130,
    valueFormatter: (params) => $utils.formatDate(params.value),
  },
])
const defaultColDef = {
  sortable: true,
  filter: true,
  editable: true,
  resizable: true,
  cellStyle: { textAlign: 'center' },
  editable: false,
  flex: 1, // width auto
}
const showOptions = ref({
  isShowMoreBtn: false,
  isRadio: true,
})
const agGrid = ref(null)
const totalCnt = ref(0)

/* Send 변수 파라미터  */
const searchParams = ref({
  inqStrtDate: $utils.getDateYYYYMMDD(0, -3, 0), // 조회시작일
  inqEndDate: $utils.getDateYYYYMMDD(0, 0, 0), // 조회종료일
  //viewSeq: '0', // 조회순번
  //viewCount: '10', // 조회건수
})

const dpstCncrList = ref([])
const dpstCncr = ref({})

/********************************* 초기화  *************************/
// 최초 실행
onMounted(() => {
  searchData()
})
/********************************* methods *************************/
const searchData = () => {
  agGrid?.value?.removeData()
  callApi()
}

const cellWasClicked = (params) => {
  const dataP = {}
  dataP.dpstCnclResn = params.data.dpstCnclResn
  if (params.column.colId === 'dpstCnclResn') {
    $fx
      .throwDialog(EXC100P01, {
        data: dataP,
        close: false,
        title: '입금 취소 사유',
      })
      .then((result) => {})
  }
}

const dpstCncrAprv = () => {
  if (agGrid.value.getCheckData().length === 0) {
    $fx.throwAlert('입금취소 이체 승인건을 선택해 주세요.', '알림')
    return
  }
  $fx
    .throwDialog(EXC100P00, {
      data: agGrid.value.getCheckData()[0],
      close: false,
      title: '입금 취소 이체 승인',
      // dialogClasses: 'large',
    })
    .then((result) => {
      searchData()
    })
}
/*********************************** API ***************************/
//조회
const callApi = () => {
  $fx.startLoadingbar()
  excApi
    .EXC0202S01(searchParams.value)
    .then((response) => {
      const resultData = response.result
      console.log('resultData', resultData)
      agGrid.value.addData(resultData.dpstCncrList)
      totalCnt.value = agGrid?.value?.getTotalCount()
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
