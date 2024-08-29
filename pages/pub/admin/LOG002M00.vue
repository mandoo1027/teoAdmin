<template>

  <div class="main_wrap">
    <div class="main_left">
      <div class="tit_btn">
        <h3 class="tit">FIRM 개시 실패 발주기관</h3>
        <div>
          <ComSelectBox groupCode="01" v-model="comboCnt" :items="itemsCnt" class="s_basics none_details w_120" />
        </div>
      </div>
      <ComAgGridBasic
        ref="agrid"
        :columnDefs="columnDefsReceive"
        style="height: 1023px"
        class="grid"
        :rowData="rowDataReceive"
        :defaultColDef="defaultColDefReceive"
        :rowHeight="49"
      />
      <div class="btn_grid_more">
        <v-btn class="vbtn" size="small">더보기</v-btn>
      </div>
    </div>
    <div class="main_right">
      <div class="tit_btn">
        <h3 class="tit">가상계좌 발급 요청대상</h3>
        <div>
          <ComSelectBox groupCode="01" v-model="comboCnt" :items="itemsCnt" class="s_basics none_details w_120" />
        </div>
      </div>
      <ComAgGridBasic
        ref="agrid2"
        :columnDefs="columnDefsReceive2"
        style="height: 288px"
        class="grid"
        :rowData="rowDataReceive2"
        :defaultColDef="defaultColDefReceive2"
        :rowHeight="49"
      />
      <div class="btn_grid_more">
        <v-btn class="vbtn" size="small">더보기</v-btn>
      </div>

      <div class="tit_btn mt_40">
        <h3 class="tit">이체모니터링</h3>
        <!-- <div>
          <ComSelectBox groupCode="01" v-model="comboCnt" :items="itemsCnt" class="s_basics none_details w_120" />
        </div> -->
      </div>
      <ComAgGridBasic
        ref="agrid3"
        :columnDefs="columnDefsReceive3"
        style="height: 305px"
        class="grid"
        :rowData="rowDataReceive3"
        :defaultColDef="defaultColDefReceive3"
        :rowHeight="49"
      />
      <!-- <div class="btn_grid_more">
        <v-btn class="vbtn" size="small">더보기</v-btn>
      </div> -->

      <div class="tit_btn mt_40">
        <h3 class="tit">입금 취소&관리자 문의</h3>
        <div>
          <nuxt-link to="/pub/admin/LOG002M00" class="vlink">더보기</nuxt-link>
        </div>
      </div>
      <ComAgGridBasic
        ref="agrid4"
        :columnDefs="columnDefsReceive4"
        style="height: 289px"
        class="grid"
        :rowData="rowDataReceive4"
        :defaultColDef="defaultColDefReceive4"
        :rowHeight="49"
      />
      <!-- <div class="btn_grid_more">
        <v-btn class="vbtn" size="small">더보기</v-btn>
      </div> -->
    </div>
  </div>

</template>

<style scoped>
  
</style>

<script setup >

import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComAgGridBasic from '~/components/common/ComAgGridBasic.vue'

const comboCnt = ref('001')
const itemsCnt = ref([
  { title: '10개씩', value: '001' },
  { title: '50개씩', value: '002' },
  { title: '100개씩', value: '003' },
])

class btnBegin {
  eGui;

  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.classList.add('my-custom-cell-renderer');
    this.eGui.innerHTML =
      `<button type="button" class="btn_vbtn">개시</button>`;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}

const columnDefsReceive = ref([
  { headerName: 'NO.', field: 'no', width: 60 },
  { headerName: '발주기관', field: 'org', width: 179 },
  { headerName: '게시 일자', field: 'date', width: 179 },
  { headerName: '개시', field: 'begin', width: 165, cellRenderer: btnBegin },
])
const rowDataReceive = [
  {
    no: '20',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '19',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '18',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '17',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '16',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '15',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '14',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '13',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '12',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '11',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '10',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '9',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '8',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '7',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '6',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '5',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '4',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '3',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '2',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '1',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
  {
    no: '1',
    org: '연구진흥훤',
    date: '2023-12-01',
    begin: '',
  },
]
const defaultColDefReceive = {
  sortable: true,
  filter: true,
  editable: false,
  resizable: true,
  cellStyle: { textAlign: 'center' },
  // flex:1, // width auto
}
const agrid = ref(null)

class btnSms {
  eGui;

  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.classList.add('my-custom-cell-renderer');
    this.eGui.innerHTML =
      `<button type="button" class="btn_vbtn">발송</button>`;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}

const columnDefsReceive2 = ref([
  { headerName: 'NO.', field: 'no', width: 60 },
  { headerName: '발주기관', field: 'org', width: 160 },
  { headerName: '잔여 개수', field: 'cnt', width: 160 },
  { headerName: '책임자 이름', field: 'name', width: 160 },
  { headerName: '휴대전화번호', field: 'mobile', width: 160 },
  { headerName: 'SMS', field: 'sms', width: 158, cellRenderer: btnSms },
])
const rowDataReceive2 = [
  {
    no: '5',
    org: '한마정보',
    cnt: '30건',
    name: '김한마',
    mobile: '010-1111-2222',
    btnSms: '',
  },
  {
    no: '4',
    org: '한마정보',
    cnt: '30건',
    name: '김한마',
    mobile: '010-1111-2222',
    btnSms: '',
  },
  {
    no: '3',
    org: '한마정보',
    cnt: '30건',
    name: '김한마',
    mobile: '010-1111-2222',
    btnSms: '',
  },
  {
    no: '2',
    org: '한마정보',
    cnt: '30건',
    name: '김한마',
    mobile: '010-1111-2222',
    btnSms: '',
  },
  {
    no: '1',
    org: '한마정보',
    cnt: '30건',
    name: '김한마',
    mobile: '010-1111-2222',
    btnSms: '',
  },
  {
    no: '1',
    org: '한마정보',
    cnt: '30건',
    name: '김한마',
    mobile: '010-1111-2222',
    btnSms: '',
  },
]
const defaultColDefReceive2 = {
  sortable: true,
  filter: true,
  editable: false,
  resizable: true,
  cellStyle: { textAlign: 'center' },
  // flex:1, // width auto
}
const agrid2 = ref(null)

const columnDefsReceive3 = ref([
  { headerName: 'NO.', field: 'no', width: 60 },
  { headerName: '이체일자', field: 'date', width: 160 },
  { headerName: '발주기관', field: 'org', width: 160 },
  { headerName: '사업명', field: 'title', width: 200 },
  { headerName: 'TASK명', field: 'taskName', width: 200 },
  { headerName: '집행번호', field: 'num', width: 160 },
  { headerName: '입금은행', field: 'bank', width: 160 },  
  { headerName: '입금금액', field: 'deposit', width: 160, cellClass: 'cell_right' },
  { headerName: '입금계좌번호', field: 'depositAcc', width: 200 },
  { headerName: '응답코드', field: 'code', width: 120 },
  { headerName: '응답결과', field: 'result', width: 200 },
])
const rowDataReceive3 = [
  {
    no: '5',
    date: '2023-12-01',
    org: '한마정보',
    title: '신규사업',
    taskName: 'TASK1 TASK1 TASK1 TASK1 TASK1 TASK1',
    num: '1111123',
    bank: '신한은행',
    depositAcc: '110-12345-677890',
    deposit: '10,000',
    code: 'U123',
    result: '응답코드 에러메세지1 에러메세지1',
  },
  {
    no: '4',
    date: '2023-12-01',
    org: '한마정보',
    title: '신규사업',
    taskName: 'TASK1',
    num: '1111123',
    bank: '신한은행',
    depositAcc: '110-12345-677890',
    deposit: '10,000',
    code: 'U123',
    result: '응답코드 에러메세지1',
  },
  {
    no: '3',
    date: '2023-12-01',
    org: '한마정보',
    title: '신규사업',
    taskName: 'TASK1',
    num: '1111123',
    bank: '신한은행',
    depositAcc: '110-12345-677890',
    deposit: '10,000',
    code: 'U123',
    result: '응답코드 에러메세지1',
  },
  {
    no: '2',
    date: '2023-12-01',
    org: '한마정보',
    title: '신규사업',
    taskName: 'TASK1',
    num: '1111123',
    bank: '신한은행',
    depositAcc: '110-12345-677890',
    deposit: '10,000',
    code: 'U123',
    result: '응답코드 에러메세지1',
  },
  {
    no: '1',
    date: '2023-12-01',
    org: '한마정보',
    title: '신규사업',
    taskName: 'TASK1',
    num: '1111123',
    bank: '신한은행',
    depositAcc: '110-12345-677890',
    deposit: '10,000',
    code: 'U123',
    result: '응답코드 에러메세지1',
  },
  {
    no: '1',
    date: '2023-12-01',
    org: '한마정보',
    title: '신규사업',
    taskName: 'TASK1',
    num: '1111123',
    bank: '신한은행',
    depositAcc: '110-12345-677890',
    deposit: '10,000',
    code: 'U123',
    result: '응답코드 에러메세지1',
  },
]
const defaultColDefReceive3 = {
  sortable: true,
  filter: true,
  editable: false,
  resizable: true,
  cellStyle: { textAlign: 'center' },
  // flex:1, // width auto
}
const agrid3 = ref(null)

const columnDefsReceive4 = ref([
  { headerName: 'NO.', field: 'no', width: 60 },
  { headerName: '종류', field: 'class', width: 120 },
  { headerName: '쪽지 내용', field: 'memo', width: 435 },
  { headerName: '보낸 날짜', field: 'date', width: 120 },
  { headerName: '보낸사람', field: 'user', width: 120 },
])
const rowDataReceive4 = [
  {
    no: '5',
    class: '관리자 문의',
    memo: 'xxx기관명 입금취소 요청되었습니다.',
    date: '2023-12-01',
    user: '김김김이이',
  },
  {
    no: '4',
    class: '관리자 문의',
    memo: 'xxx기관명 입금취소 요청되었습니다.',
    date: '2023-12-01',
    user: '김김김이이',
  },
  {
    no: '3',
    class: '관리자 문의',
    memo: 'xxx기관명 입금취소 요청되었습니다.',
    date: '2023-12-01',
    user: '김김김이이',
  },
  {
    no: '2',
    class: '관리자 문의',
    memo: 'xxx기관명 입금취소 요청되었습니다.',
    date: '2023-12-01',
    user: '김김김이이',
  },
  {
    no: '1',
    class: '관리자 문의',
    memo: 'xxx기관명 입금취소 요청되었습니다.',
    date: '2023-12-01',
    user: '김김김이이',
  },
  {
    no: '1',
    class: '관리자 문의',
    memo: 'xxx기관명 입금취소 요청되었습니다.',
    date: '2023-12-01',
    user: '김김김이이',
  },
]
const defaultColDefReceive4 = {
  sortable: true,
  filter: true,
  editable: false,
  resizable: true,
  cellStyle: { textAlign: 'center' },
  // flex:1, // width auto
}
const agrid4 = ref(null)

</script> 