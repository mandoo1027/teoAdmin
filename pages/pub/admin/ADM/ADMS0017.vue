<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <v-table>
    <colgroup>
      <col style="width:;" />
      <col style="width:;" />
      <col style="width:;" />
      <col style="width:;" />
    </colgroup>
    <tbody>
      <tr>
        <th class="">발주기관 명</th>
        <td>
          <span>전체</span>
          <v-btn class="vbtn line ml_10" size="small">발주기관 찾기</v-btn>
        </td>
        <th class="">모 계좌번호</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="Your Name"
              v-model="accNum"
              :rules="accNumRules"
              required
              placeholder=""
              class="i_basics flex1"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small">조회</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="grid">
    <ComAgGrid
      ref="agrid"
      :columnDefs="columnDefs"
      style="height: 400px"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
    />
  </div>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn black" size="small">가상계좌 관리</v-btn>
    <v-btn class="vbtn" size="small">가상계좌 등록</v-btn>
  </div>

</template>

<style scoped>
</style>

<script setup >

import ComAgGrid from '~/components/common/ComAgGrid.vue'

const accNum = ref('')
const accNumRules = [
  //(v) => !!v || '다시 입력해주세요.',
]

const columnDefs = ref([
  { headerName: 'No', field: 'number', width: 80 },
  { headerName: '발주기관 명', field: 'orgName', width: 200 },
  { headerName: '모 계좌번호', field: 'accNum', width: 200 },
  { headerName: '가상계좌 총 건 수', field: 'vaccNumTot', width: 200 },
  { headerName: '가상계좌 사용 건 수', field: 'vaccNumuse', width: 200 },
  { headerName: '가상계좌 잔여 건 수', field: 'vaccNumRemanet', width: 200 },
])
const rowData = [
  {
    number: 1,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNumTot: '1,000',
    vaccNumuse: '800',
    vaccNumRemanet: '200',
  },
  {
    number: 2,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNumTot: '1,000',
    vaccNumuse: '800',
    vaccNumRemanet: '200',
  },
  {
    number: 3,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNumTot: '1,000',
    vaccNumuse: '800',
    vaccNumRemanet: '200',
  },
  {
    number: 4,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNumTot: '1,000',
    vaccNumuse: '800',
    vaccNumRemanet: '200',
  },
  {
    number: 5,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNumTot: '1,000',
    vaccNumuse: '800',
    vaccNumRemanet: '200',
  },
  {
    number: 6,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNumTot: '1,000',
    vaccNumuse: '800',
    vaccNumRemanet: '200',
  },
  {
    number: 7,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNumTot: '1,000',
    vaccNumuse: '800',
    vaccNumRemanet: '200',
  },
  {
    number: 8,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNumTot: '1,000',
    vaccNumuse: '800',
    vaccNumRemanet: '200',
  },
  {
    number: 9,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNumTot: '1,000',
    vaccNumuse: '800',
    vaccNumRemanet: '200',
  },
  {
    number: 10,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNumTot: '1,000',
    vaccNumuse: '800',
    vaccNumRemanet: '200',
  },
  {
    number: 11,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNumTot: '1,000',
    vaccNumuse: '800',
    vaccNumRemanet: '200',
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