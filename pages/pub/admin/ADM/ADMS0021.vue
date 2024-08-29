<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <v-table>
    <colgroup>
      <col style="width:110px;" />
      <col style="width:*;" />
    </colgroup>
    <tbody>
      <tr>
        <th class="">기간 검색</th>
        <td>
          <div class="d_flex">
            <div class="i_calender">
              <ComDatePicker v-model="startDate" class="i_date w_140" placeholder="날짜선택" />
              <span>~</span>
              <ComDatePicker v-model="endDate" class="i_date w_140" placeholder="날짜선택" />
            </div>
            <v-btn class="vbtn ml_10" size="small">검색</v-btn>
          </div>          
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="tit_cnt_btn">
    <p class="tit_cnt">조회 건 수 <b>100</b>건</p>
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
    <ComAgGridBasic
      ref="agrid"
      :columnDefs="columnDefs"
      style="height: 400px"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
    />
  </div>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn" size="small">입금취소 이체 승인</v-btn>
  </div>


</template>

<style scoped>
</style>

<script setup >
import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComDatePicker from '@/components/common/ComDatePicker.vue'
import ComAgGridBasic from '~/components/common/ComAgGridBasic.vue'

/* 달력 */
const today = new Date() // 현재 날짜와 시간을 포함하는 Date 객체 생성
const year = today.getFullYear() // 년도 가져오기
const month = today.getMonth() + 1 // 월 가져오기 (0부터 시작하므로 1 더하기)
const day = today.getDate() // 일 가져오기
const formattedToday = new Date(
  `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
)
const startDate = ref(formattedToday)
const endDate = ref(formattedToday)

const comboCnt = ref('001')
const itemsCnt = ref([
  { title: '10개씩', value: '001' },
  { title: '50개씩', value: '002' },
  { title: '100개씩', value: '003' },
])

class CustomCellRendererBtn {
  eGui;

  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.classList.add('my-custom-cell-renderer');
    this.eGui.innerHTML =
      /* html */
      `<button type="button" class="btn_vbtn">잔액</button>`;
    //var rowDragger = document.createElement('i');
    //rowDragger.classList.add('fas', 'fa-arrows-alt-v');
    //this.eGui.appendChild(rowDragger);

    // registers as a row dragger
    //params.registerRowDragger(rowDragger, 0);
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}

const columnDefs = ref([
  { headerName: 'No', field: 'number', width: 80 },
  { headerName: '발주기관 명', field: 'orgName', width: 200 },
  { headerName: '사업명', field: 'title', width: 200 },
  { headerName: 'TASK명', field: 'taskName', width: 200 },
  { headerName: '수행 기관 명', field: 'orgName', width: 200 },
  { headerName: '사업자 번호', field: 'instBrno', width: 160 },
  { headerName: '책임자', field: 'memNm', width: 160 },
  { headerName: '입금 계좌번호', field: 'depositAcc', width: 260 },
  { headerName: '입금 된 일자', field: 'depositDate', width: 130 },
  { headerName: '사업비 취소 금액', field: 'cancelAmount', width: 160, cellClass: 'cell_right' },
  { headerName: '출금 계좌번호', field: 'withdrawAcc', width: 260 },
  { headerName: '입금 계좌번호', field: 'depositAcc2', width: 260 },
  { headerName: '입금 금액', field: 'deposit', width: 160, cellClass: 'cell_right' },
  { headerName: '입금 취소 사유', field: 'depositCancel', width: 200 },
  { headerName: '신청 일자', field: 'appDate', width: 130 },
  { headerName: '신청인', field: 'appUser', width: 160 },
  { headerName: '공문일자', field: 'officialDate', width: 130 },
])
const rowData = [
  {
    number: 1,
    orgName: '한마정보통신01',
    title: '이관사업',
    taskName: 'TASK01',
    orgName: '한마정보통신',
    instBrno: '123-45-67890',
    memNm: '김수행수행',
    depositAcc: '56291835234701',
    depositDate: '2023-10-10',
    cancelAmount: '10,000,000',
    withdrawAcc: '56291835234701',
    depositAcc2: '56291835234701',
    deposit: '10,000,000',
    depositCancel: '취소 사유 보기',
    appDate: '2023-10-10',
    appUser: '김수행수행',
    officialDate: '2023-10-10',
  },
  {
    number: 2,
    orgName: '한마정보통신01',
    title: '이관사업',
    taskName: 'TASK01',
    orgName: '한마정보통신',
    instBrno: '123-45-67890',
    memNm: '김수행수행',
    depositAcc: '56291835234701',
    depositDate: '2023-10-10',
    cancelAmount: '10,000,000',
    withdrawAcc: '56291835234701',
    depositAcc2: '56291835234701',
    deposit: '10,000,000',
    depositCancel: '취소 사유 보기',
    appDate: '2023-10-10',
    appUser: '김수행수행',
    officialDate: '2023-10-10',
  },
  {
    number: 3,
    orgName: '한마정보통신01',
    title: '이관사업',
    taskName: 'TASK01',
    orgName: '한마정보통신',
    instBrno: '123-45-67890',
    memNm: '김수행수행',
    depositAcc: '56291835234701',
    depositDate: '2023-10-10',
    cancelAmount: '10,000,000',
    withdrawAcc: '56291835234701',
    depositAcc2: '56291835234701',
    deposit: '10,000,000',
    depositCancel: '취소 사유 보기',
    appDate: '2023-10-10',
    appUser: '김수행수행',
    officialDate: '2023-10-10',
  },
  {
    number: 4,
    orgName: '한마정보통신01',
    title: '이관사업',
    taskName: 'TASK01',
    orgName: '한마정보통신',
    instBrno: '123-45-67890',
    memNm: '김수행수행',
    depositAcc: '56291835234701',
    depositDate: '2023-10-10',
    cancelAmount: '10,000,000',
    withdrawAcc: '56291835234701',
    depositAcc2: '56291835234701',
    deposit: '10,000,000',
    depositCancel: '취소 사유 보기',
    appDate: '2023-10-10',
    appUser: '김수행수행',
    officialDate: '2023-10-10',
  },
  {
    number: 5,
    orgName: '한마정보통신01',
    title: '이관사업',
    taskName: 'TASK01',
    orgName: '한마정보통신',
    instBrno: '123-45-67890',
    memNm: '김수행수행',
    depositAcc: '56291835234701',
    depositDate: '2023-10-10',
    cancelAmount: '10,000,000',
    withdrawAcc: '56291835234701',
    depositAcc2: '56291835234701',
    deposit: '10,000,000',
    depositCancel: '취소 사유 보기',
    appDate: '2023-10-10',
    appUser: '김수행수행',
    officialDate: '2023-10-10',
  },
  {
    number: 6,
    orgName: '한마정보통신01',
    title: '이관사업',
    taskName: 'TASK01',
    orgName: '한마정보통신',
    instBrno: '123-45-67890',
    memNm: '김수행수행',
    depositAcc: '56291835234701',
    depositDate: '2023-10-10',
    cancelAmount: '10,000,000',
    withdrawAcc: '56291835234701',
    depositAcc2: '56291835234701',
    deposit: '10,000,000',
    depositCancel: '취소 사유 보기',
    appDate: '2023-10-10',
    appUser: '김수행수행',
    officialDate: '2023-10-10',
  },
  {
    number: 7,
    orgName: '한마정보통신01',
    title: '이관사업',
    taskName: 'TASK01',
    orgName: '한마정보통신',
    instBrno: '123-45-67890',
    memNm: '김수행수행',
    depositAcc: '56291835234701',
    depositDate: '2023-10-10',
    cancelAmount: '10,000,000',
    withdrawAcc: '56291835234701',
    depositAcc2: '56291835234701',
    deposit: '10,000,000',
    depositCancel: '취소 사유 보기',
    appDate: '2023-10-10',
    appUser: '김수행수행',
    officialDate: '2023-10-10',
  },
  {
    number: 8,
    orgName: '한마정보통신01',
    title: '이관사업',
    taskName: 'TASK01',
    orgName: '한마정보통신',
    instBrno: '123-45-67890',
    memNm: '김수행수행',
    depositAcc: '56291835234701',
    depositDate: '2023-10-10',
    cancelAmount: '10,000,000',
    withdrawAcc: '56291835234701',
    depositAcc2: '56291835234701',
    deposit: '10,000,000',
    depositCancel: '취소 사유 보기',
    appDate: '2023-10-10',
    appUser: '김수행수행',
    officialDate: '2023-10-10',
  },
  {
    number: 9,
    orgName: '한마정보통신01',
    title: '이관사업',
    taskName: 'TASK01',
    orgName: '한마정보통신',
    instBrno: '123-45-67890',
    memNm: '김수행수행',
    depositAcc: '56291835234701',
    depositDate: '2023-10-10',
    cancelAmount: '10,000,000',
    withdrawAcc: '56291835234701',
    depositAcc2: '56291835234701',
    deposit: '10,000,000',
    depositCancel: '취소 사유 보기',
    appDate: '2023-10-10',
    appUser: '김수행수행',
    officialDate: '2023-10-10',
  },
  {
    number: 10,
    orgName: '한마정보통신01',
    title: '이관사업',
    taskName: 'TASK01',
    orgName: '한마정보통신',
    instBrno: '123-45-67890',
    memNm: '김수행수행',
    depositAcc: '56291835234701',
    depositDate: '2023-10-10',
    cancelAmount: '10,000,000',
    withdrawAcc: '56291835234701',
    depositAcc2: '56291835234701',
    deposit: '10,000,000',
    depositCancel: '취소 사유 보기',
    appDate: '2023-10-10',
    appUser: '김수행수행',
    officialDate: '2023-10-10',
  },
]
const defaultColDef = {
  sortable: true,
  filter: true,
  editable: true,
  resizable: true,
  cellStyle: { textAlign: 'center' },
  flex: 1, // width auto
}
const agrid = ref(null)
</script> 