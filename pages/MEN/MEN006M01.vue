<template>
  <div class="main_wrap">
    <div class="main_left w_600">
      <!-- w_100 ~ w_900  -->
      <div class="tit_btn">
        <h3 class="tit">FIRM 개시 실패 발주기관</h3>
        <div>
          <label class="">{{ toDate }} </label>
        </div>
      </div>
      <CommonComAgGridBasic
        ref="agrid"
        :columnDefs="columnDefsReceive"
        style="height: 288px"
        :showOptions="showOptions"
        :defaultColDef="defaultColDefReceive"
        @cellWasClicked="cellWasClicked0"
        :rowHeight="49"
      />

      <div class="tit_btn mt_40">
        <h3 class="tit">입금 취소&관리자 문의</h3>
        <div>
          <a @click="goList" class="vlink">더보기</a>
        </div>
      </div>
      <CommonComAgGridBasic
        ref="agrid1"
        :columnDefs="columnDefsReceive1"
        style="height: 485px"
        :showOptions="showOptions"
        :defaultColDef="defaultColDefReceive1"
        @cellWasClicked="cellWasClicked"
        :rowHeight="49"
      />
    </div>
    <div class="main_right">
      <div class="tit_btn">
        <h3 class="tit">가상계좌 발급 요청대상</h3>
      </div>
      <CommonComAgGridBasic
        ref="agrid2"
        :columnDefs="columnDefsReceive2"
        style="height: 288px"
        :showOptions="showOptions"
        :defaultColDef="defaultColDefReceive2"
        @cellWasClicked="cellWasClicked2"
        :rowHeight="49"
      />

      <div class="tit_btn mt_40">
        <h3 class="tit">이체모니터링</h3>
        <div>
          <a @click="goList2" class="vlink">더보기</a>
        </div>
      </div>
      <CommonComAgGridBasic
        ref="agrid3"
        :columnDefs="columnDefsReceive3"
        style="height: 485px"
        :showOptions="showOptions"
        :defaultColDef="defaultColDefReceive3"
        @cellWasClicked="cellWasClicked3"
        :rowHeight="49"
      />
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { menuApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/
const MEM003P01 = 'MEMMEM003P01' // 쪽지 상세 팝업
/* 검색 변수 파라미터  */
const searchParams = ref({
  trsDate: '', //이체일자
  implMngNo: '', //집행관리번호
  acntTrsAmt: '', //이체금액
})
const toDate = $utils.formatDate($utils.getDateYYYYMMDD(0, 0, 0))

//입금 취소&관리자 문의
class btnBegin {
  eGui
  init(params) {
    this.eGui = document.createElement('div')
    this.eGui.classList.add('my-custom-cell-renderer')
    this.eGui.innerHTML = `<button type="button" class="btn_vbtn">개시</button>`
  }

  getGui() {
    return this.eGui
  }

  refresh(params) {
    return false
  }
}

//FIRM 개시 실패 발주기관
const columnDefsReceive = ref([
  { headerName: 'NO.', field: 'no', width: 60, valueGetter: 'node.rowIndex + 1' },
  { headerName: '발주기관', field: 'ordrInstNm', width: 370 },
  // {
  //   headerName: '게시 일자',
  //   field: 'tiD',
  //   width: 150,
  //   valueFormatter: (params) => $utils.formatDate(params?.value),
  // },
  { headerName: '개시', field: 'begin', width: 120, cellRenderer: btnBegin },
])
const defaultColDefReceive = {
  sortable: true,
  filter: true,
  editable: false,
  resizable: true,
  cellStyle: { textAlign: 'center' },
}
const agrid = ref(null)
const showOptions = ref({
  isChangeSearchData: false, //검색 조건 변경시 더보기 노출 여부
  isShowMoreBtn: false, // 더보기 버튼
})

//입금 취소&관리자 문의
const columnDefsReceive1 = ref([
  { headerName: 'NO.', field: 'no', width: 60, valueGetter: 'node.rowIndex + 1' },
  { headerName: '종류', field: 'infrmJobDivNm', width: 100 },
  {
    headerName: '쪽지 내용',
    field: 'infrmCtn',
    width: 210,
    cellClass: ' ellipsis  cell_left  ',
    valueFormatter: (params) => $utils.convertRegexToText(params?.value),
  },
  {
    headerName: '보낸 날짜',
    field: 'sndngDate',
    width: 110,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  { headerName: '보낸 분', field: 'sndngNm', width: 100, cellClass: ' ellipsis  ' },
])
const defaultColDefReceive1 = {
  sortable: true,
  filter: true,
  editable: false,
  resizable: true,
  cellStyle: { textAlign: 'center' },
}
const agrid1 = ref(null)

//가상계좌 발급 요청대상
class btnSms {
  eGui

  init(params) {
    this.eGui = document.createElement('div')
    this.eGui.classList.add('my-custom-cell-renderer')
    this.eGui.innerHTML = `<button type="button" class="btn_vbtn">발송</button>`
  }

  getGui() {
    return this.eGui
  }

  refresh(params) {
    return false
  }
}
//가상계좌 발급 요청대상
const columnDefsReceive2 = ref([
  { headerName: 'NO.', field: 'no', width: 60, valueGetter: 'node.rowIndex + 1' },
  { headerName: '발주기관', field: 'ordrInstNm', width: 270 },
  {
    headerName: '잔여 개수',
    field: 'vraNoCnt',
    width: 105,
    valueFormatter: (params) =>
      params?.value === 0 ? 0 + '건' : $utils.addComma(params?.value) + '건',
  },
  { headerName: '책임자 이름', field: 'memNm', width: 150 },
  { headerName: '휴대전화번호', field: 'moblTelno', width: 150 },
  { headerName: 'SMS', field: 'sms', width: 110, cellRenderer: btnSms },
])
const defaultColDefReceive2 = {
  sortable: true,
  filter: true,
  editable: false,
  resizable: true,
  cellStyle: { textAlign: 'center' },
}
const agrid2 = ref(null)

//이체모니터링
const columnDefsReceive3 = ref([
  { headerName: 'NO', field: 'no', width: 60, valueGetter: 'node.rowIndex + 1' },
  {
    headerName: '이체일자',
    field: 'tiD',
    width: 100,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  {
    headerName: '이체시간',
    field: 'tiTm',
    width: 90,
  },

  {
    headerName: '이체구분',
    field: 'acntTrsNm',
    width: 100,
  },

  // { headerName: '발주기관', field: 'ordrInstNm', width: 150, cellClass: 'ellipsis  ' },
  // {
  //   headerName: 'TASK명',
  //   field: 'taskNm',
  //   width: 170,
  //   cellClass: 'ellipsis  cell_left  ',
  //   valueFormatter: (params) => $utils.convertRegexToText(params?.value),
  // },
  // { headerName: '집행번호', field: 'implMngNo', width: 150, cellClass: 'ellipsis ' },
  { headerName: '결과메시지', field: 'errTrsMsg', width: 140, cellClass: 'ellipsis ' },
  {
    headerName: '이체금액',
    field: 'acntTrsAmt',
    width: 120,
    cellClass: 'cell_right',
    valueFormatter: (params) => $utils.addComma(params?.value) + '원',
  },
  { headerName: '입금은행', field: 'dpstBankNm', width: 130 },
  { headerName: '입금계좌번호', field: 'dpstAcntNo', width: 150, cellClass: 'ellipsis cell_left' },
  { headerName: '결과코드', field: 'trsRcd', width: 100 },
  // { headerName: '응답결과', field: 'errTrsMsg', width: 140, cellClass: 'ellipsis ' },
  { headerName: '발주기관', field: 'ordrInstNm', width: 160, cellClass: 'ellipsis  cell_left' },
])
const defaultColDefReceive3 = {
  sortable: true,
  filter: true,
  editable: false,
  resizable: true,
  cellStyle: { textAlign: 'center' },
}
const agrid3 = ref(null)

const currentPage = ref(0) //현재페이지
const pageSize = ref(100)
/********************************* 초기 *************************/
// 최초 로드
onMounted(() => {
  callApi()
})

/********************************* methods *************************/
// 쪽지 목록으로 이동
const goList = () => {
  $fx.move('ANOT004')
}
// 이체거래내역 목록으로 이동
const goList2 = () => {
  $fx.move('AMEN006')
}

// 개시
const cellWasClicked0 = (params) => {
  if (params.column.colId === 'begin') {
    $fx.throwAlert('작업중입니다. ', '알림')
    return
  }
}

// 쪽지상세, 보내기 팝업
const cellWasClicked = (params) => {
  if (params.column.colId === 'infrmCtn') {
    $fx
      .throwDialog(MEM003P01, {
        data: {
          sndngSeq: params.data.sndngSeq,
          infrmCtn: params.data.infrmCtn,
          infrmJobDivCd: params.data.infrmJobDivCd, // 쪽지종류
          sndngRcvrFlag: 'R', // 발신수신구분  S:발신 , R:수신
        },
        close: false,
        title: '나의 쪽지',
        dialogClasses: 'large',
      })
      .then((result) => {
        if (result) {
          searchData()
        }
      })
    return
  }
}
// 가상계좌 발급 요청대상 SMS
const cellWasClicked2 = (params) => {
  if (params.column.colId === 'sms') {
    const sms = {
      ordrInstId: params.data.ordrInstId, // 수신기관ID
      memId: params.data.memId, // 수신자ID
      memNm: params.data.memNm, // 책임자이름
      moblTelno: params.data.moblTelno, // 핸드폰번호
      vraNoCnt: params.data.vraNoCnt, // 가상계좌잔여개수
    }
    //sms발송요청
    callSmsApi(sms)
  }
}
// 이체 모니터링 상세.
const cellWasClicked3 = (params) => {
  const implMngNo = params.data.implMngNo //집행관리번호
  const trsExcDiv = params.data.trsExcDiv //이체실행구분
  const acntTrsSeq = params.data.acntTrsSeq //이체순번
  $fx.move('AMEN007', { implMngNo: implMngNo, trsExcDiv: trsExcDiv, acntTrsSeq: acntTrsSeq })
}

/************************************* API ***************************/
// 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  params.viewSeq = currentPage.value //페이지 넘버
  params.viewCount = pageSize.value //페이지 사이즈
  $fx.startLoadingbar()
  menuApi
    .MEN0601S01(params)
    .then((response) => {
      const resultData = response.result.batSvcList
      const resultData1 = response.result.infrmList
      const resultData2 = response.result.vraNoList
      const resultData3 = response.result.actrsfList
      agrid.value.addData(resultData) //FIRM 개시 실패 발주기관
      agrid1.value.addData(resultData1) //입금 취소&관리자 문의
      agrid2.value.addData(resultData2) //가상계좌 발급 요청대상
      agrid3.value.addData(resultData3) //이체 모니터링
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// SMS
const callSmsApi = (sms) => {
  const params = sms //파라미터 셋팅
  $fx.startLoadingbar()
  menuApi
    .MEN0601I01(params)
    .then((response) => {
      const result = response.result.result
      if (result) {
        $fx.throwAlert('SMS 발송되었습니다.', '알람')
      } else {
        $fx.throwAlert('SMS 발송실패했습니다. 관리자에게 문의해주세요.', '알람')
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
