<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <v-table>
    <tbody>
      <tr>
        <th class="">발주기관 명</th>
        <td>
          <span>전체</span>
          <v-btn class="vbtn line ml_10" size="small">발주기관 찾기</v-btn>
        </td>
        <th class="">사용여부</th>
        <td>
          <ComSelectBox
            groupCode="01"
            v-model="use"
            :items="itemsUse"
            :isDefault="false"
            class="s_basics"
          />
        </td>
        <th class="">계좌번호</th>
        <td>
          <div class="d_flex a_center">
            <ComSelectBox
              groupCode="01"
              v-model="accNum"
              :items="itemsAccNum"
              :isDefault="false"
              class="s_basics w_150"
            />
            <v-text-field
              label="Your Name"
              v-model="name"
              :rules="nameRules"
              required
              placeholder="전체 계좌번호를 입력하세요."
              class="i_basics flex1 ml_10"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small">검색</v-btn>
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
  <div>
      <v-btn class="vbtn black mt_10" size="small">삭제</v-btn>
  </div>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn" size="small">가상계좌 현황</v-btn>
  </div>


</template>

<style scoped>
</style>

<script setup >
import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComAgGrid from '~/components/common/ComAgGrid.vue'

const use = ref('001')
const itemsUse = ref([
  { title: '전체', value: '001' },
  { title: '사용', value: '002' },
  { title: '미사용', value: '003' },
])

const accNum = ref('001')
const itemsAccNum = ref([
  { title: '모 계좌번호', value: '001' },
  { title: '가상계좌번호', value: '002' },
])

const columnDefs = ref([
  {
    headerName: '',
    field: 'chk',
    width: 80,
    cellRenderer: 'agCheckboxCellRenderer',
    editable: false,
    cellRendererParams: {
      disabled: false,
    },
    cellClass: ['custom-center-align ag_radio'],
  },
  { headerName: 'No', field: 'number', width: 80 },
  { headerName: '발주기관 명', field: 'orgName', width: 200 },
  { headerName: '모 계좌번호', field: 'accNum', width: 200 },
  { headerName: '가상계좌번호', field: 'vaccNum', width: 200 },
  { headerName: '사용여부', field: 'use', width: 200 },
  { headerName: '등록일자', field: 'regDate', width: 140 },
  { headerName: '해지일자', field: 'closeDate', width: 140 },
])
const rowData = [
  {
    chk: false,
    number: 1,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNum: '2311234567890',
    use: '사용',
    regDate: '2023-10-10',
    closeDate: '2023-10-10',
  },
  {
    chk: false,
    number: 2,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNum: '2311234567890',
    use: '미사용',
    regDate: '2023-10-10',
    closeDate: '2023-10-10',
  },
  {
    chk: false,
    number: 3,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNum: '2311234567890',
    use: '미사용',
    regDate: '2023-10-10',
    closeDate: '2023-10-10',
  },
  {
    chk: false,
    number: 4,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNum: '2311234567890',
    use: '미사용',
    regDate: '2023-10-10',
    closeDate: '2023-10-10',
  },
  {
    chk: false,
    number: 5,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNum: '2311234567890',
    use: '미사용',
    regDate: '2023-10-10',
    closeDate: '2023-10-10',
  },
  {
    chk: false,
    number: 6,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNum: '2311234567890',
    use: '미사용',
    regDate: '2023-10-10',
    closeDate: '2023-10-10',
  },
  {
    chk: false,
    number: 7,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNum: '2311234567890',
    use: '미사용',
    regDate: '2023-10-10',
    closeDate: '2023-10-10',
  },
  {
    chk: false,
    number: 8,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNum: '2311234567890',
    use: '미사용',
    regDate: '2023-10-10',
    closeDate: '2023-10-10',
  },
  {
    chk: false,
    number: 9,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNum: '2311234567890',
    use: '미사용',
    regDate: '2023-10-10',
    closeDate: '2023-10-10',
  },
  {
    chk: false,
    number: 10,
    orgName: '한마정보통신01',
    accNum: '1001234567890',
    vaccNum: '2311234567890',
    use: '미사용',
    regDate: '2023-10-10',
    closeDate: '2023-10-10',
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