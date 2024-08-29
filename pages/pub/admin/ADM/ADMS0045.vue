<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <v-table>
    <colgroup>
      <col style="width:;" />
      <col style="width:;" />
      <col style="width:;" />
      <col style="width:;" />
      <col style="width:;" />
      <col style="width:;" />
      <col style="width:;" />
      <col style="width:;" />
    </colgroup>
    <tbody>
      <tr>
        <th>회계연도</th>
        <td>
            <ComSelectBox
              groupCode="01"
              v-model="year"
              :items="itemsYear"
              class="s_basics none_details w_140"
            />
        </td>
        <th>사업 상태</th>
        <td>
            <ComSelectBox
              groupCode="01"
              v-model="state"
              :items="itemsState"
              class="s_basics none_details w_140"
            />
        </td>
        <th>TASK 상태</th>
        <td>
          <div class="d_flex">
            <ComSelectBox
              groupCode="01"
              v-model="taskState"
              :items="itemsTaskState"
              class="s_basics none_details w_140"
            />
            <v-btn class="vbtn ml_10" size="small">조회</v-btn>
            <v-btn class="vbtn ml_10 black" size="small">초기화</v-btn>
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

  <!-- <div class="btm_btn_wrap">
    <v-btn class="vbtn black" size="small">가상계좌 관리</v-btn>
    <v-btn class="vbtn" size="small">가상계좌 등록</v-btn>
  </div> -->

</template>

<style scoped>
</style>

<script setup >

import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComAgGrid from '~/components/common/ComAgGrid.vue'

const year = ref('001')
const itemsYear = ref([
  { title: '2023', value: '001' },
  { title: '2024', value: '002' },
])

const state = ref('001')
const itemsState = ref([
  { title: '전체', value: '001' },
  { title: '사업등록', value: '002' },
  { title: '사업진행', value: '003' },
  { title: '사업완료', value: '004' },
  { title: '사업종료', value: '005' },
])

const taskState = ref('001')
const itemsTaskState = ref([
  { title: '전체', value: '001' },
  { title: 'TASK 신청', value: '002' },
  { title: 'TASK 진행', value: '003' },
  { title: 'TASK 완료', value: '004' },
  { title: '정산신청', value: '005' },
  { title: '정산중', value: '006' },
  { title: '정산완료', value: '007' },
  { title: '정산확정', value: '008' },
  { title: '반납금요청', value: '009' },
  { title: 'TASK 종료', value: '010' },
])

const columnDefs = ref([
  { headerName: 'No', field: 'number', width: 80 },
  { headerName: '발주기관', field: 'org', width: 200 },
  { headerName: '사업 건수', field: 'cnt', width: 120 },
  { headerName: 'TASK건수', field: 'taskCnt', width: 120 },
  { headerName: '총 예산', field: 'totBudget', width: 200, cellClass: 'cell_right' },
  { headerName: '총 지급액', field: 'totPay', width: 200, cellClass: 'cell_right' },
])
const rowData = [
  {
    number: 1,
    org: '한마정보',
    cnt: '10건',
    taskCnt: '110건',
    totBudget: '1,123,100,000 원',
    totPay: '1,000,000,000 원',
  },
  {
    number: 2,
    org: '한마정보',
    cnt: '10건',
    taskCnt: '110건',
    totBudget: '1,123,100,000 원',
    totPay: '1,000,000,000 원',
  },
  {
    number: 3,
    org: '한마정보',
    cnt: '10건',
    taskCnt: '110건',
    totBudget: '1,123,100,000 원',
    totPay: '1,000,000,000 원',
  },
  {
    number: 4,
    org: '한마정보',
    cnt: '10건',
    taskCnt: '110건',
    totBudget: '1,123,100,000 원',
    totPay: '1,000,000,000 원',
  },
  {
    number: 5,
    org: '한마정보',
    cnt: '10건',
    taskCnt: '110건',
    totBudget: '1,123,100,000 원',
    totPay: '1,000,000,000 원',
  },
  {
    number: 6,
    org: '한마정보',
    cnt: '10건',
    taskCnt: '110건',
    totBudget: '1,123,100,000 원',
    totPay: '1,000,000,000 원',
  },
  {
    number: 7,
    org: '한마정보',
    cnt: '10건',
    taskCnt: '110건',
    totBudget: '1,123,100,000 원',
    totPay: '1,000,000,000 원',
  },
  {
    number: 8,
    org: '한마정보',
    cnt: '10건',
    taskCnt: '110건',
    totBudget: '1,123,100,000 원',
    totPay: '1,000,000,000 원',
  },
  {
    number: 9,
    org: '한마정보',
    cnt: '10건',
    taskCnt: '110건',
    totBudget: '1,123,100,000 원',
    totPay: '1,000,000,000 원',
  },
  {
    number: 10,
    org: '한마정보',
    cnt: '10건',
    taskCnt: '110건',
    totBudget: '1,123,100,000 원',
    totPay: '1,000,000,000 원',
  },
  {
    number: 11,
    org: '한마정보',
    cnt: '10건',
    taskCnt: '110건',
    totBudget: '1,123,100,000 원',
    totPay: '1,000,000,000 원',
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