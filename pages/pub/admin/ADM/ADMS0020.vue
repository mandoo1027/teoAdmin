<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <v-table>
    <colgroup>
      <col style="width:110px;" />
      <col style="width:*;" />
    </colgroup>
    <tbody>
      <tr>
        <th class="">발주기관 명</th>
        <td>
          <span>전체</span>
          <v-btn class="vbtn line ml_10" size="small">발주기관 찾기</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="tit_cnt_btn">
    <p class="tit_cnt">조회 건 수 <b>100</b>건</p>
    <div>
      <ComSelectBox
        groupCode="01"
        v-model="accNum"
        :items="itemsAccNum"
        class="s_basics none_details w_140 mr_5"
      />
      <ComSelectBox
        groupCode="01"
        v-model="comboCnt"
        :items="itemsCnt"
        class="s_basics none_details w_120"
      />
    </div>
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

  <!-- <div class="btm_btn_wrap">
    <v-btn class="vbtn" size="small">가상계좌 현황</v-btn>
  </div> -->


</template>

<style scoped>
</style>

<script setup >
import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComAgGridBasic from '~/components/common/ComAgGridBasic.vue'

const accNum = ref('001')
const itemsAccNum = ref([
  { title: '모계좌번호', value: '001' },
  { title: '집금계좌번호', value: '002' },
])

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
  { headerName: '모계좌번호:잔액', field: 'accNum', width: 200 },
  { headerName: '집금계좌번호:잔액', field: 'acc2Num', width: 200 },
  { headerName: '잔액조회', field: 'balance', width: 200, cellRenderer: CustomCellRendererBtn },
])
const rowData = [
  {
    number: 1,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    acc2Num: '2311234567890',
    balance: '',
  },
  {
    number: 2,
    orgName: '한마정보통신01',
    accNum: '1234568741 : 1,000,000 원',
    acc2Num: '1234568741 : 1,000,000 원',
    balance: '',
  },
  {
    number: 3,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    acc2Num: '2311234567890',
    balance: '',
  },
  {
    number: 4,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    acc2Num: '2311234567890',
    balance: '',
  },
  {
    number: 5,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    acc2Num: '2311234567890',
    balance: '',
  },
  {
    number: 6,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    acc2Num: '2311234567890',
    balance: '',
  },
  {
    number: 7,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    acc2Num: '2311234567890',
    balance: '',
  },
  {
    number: 8,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    acc2Num: '2311234567890',
    balance: '',
  },
  {
    number: 9,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    acc2Num: '2311234567890',
    balance: '',
  },
  {
    number: 10,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    acc2Num: '2311234567890',
    balance: '',
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