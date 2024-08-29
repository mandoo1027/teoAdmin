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
        <th>인증서 업무 구분</th>
        <td>
            <ComSelectBox
              groupCode="01"
              v-model="type"
              :items="itemsType"
              class="s_basics none_details w_140"
            />
        </td>
        <th>서명 기관ID</th>
        <td><v-text-field label="서명 기관ID" v-model="orgId" :rules="orgIdRules" placeholder="" class="i_basics flex1"></v-text-field></td>
        <th>서명 회원ID</th>
        <td><v-text-field label="서명 회원ID" v-model="memId" :rules="memIdRules" placeholder="" class="i_basics flex1"></v-text-field></td>
        <th>서명 일자</th>
        <td>
          <div class="d_flex">
            <div class="i_calender">
              <ComDatePicker v-model="startDate" class="i_date w_140" placeholder="날짜선택" />
            </div>
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

  <!-- <div class="btm_btn_wrap">
    <v-btn class="vbtn black" size="small">가상계좌 관리</v-btn>
    <v-btn class="vbtn" size="small">가상계좌 등록</v-btn>
  </div> -->

</template>

<style scoped>
</style>

<script setup >

import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComDatePicker from '@/components/common/ComDatePicker.vue'
import ComAgGrid from '~/components/common/ComAgGrid.vue'

const type = ref('001')
const itemsType = ref([
  { title: '전체', value: '001' },
  { title: '회원 관리', value: '002' },
  { title: '계약 관리', value: '003' },
  { title: '협약 관리', value: '004' },
  { title: 'TRS', value: '005' },
])

const orgId = ref('')
const orgIdRules = [
  //(v) => !!v || '다시 입력해주세요.',
]

const memId = ref('')
const memIdRules = [
  //(v) => !!v || '다시 입력해주세요.',
]

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

const columnDefs = ref([
  { headerName: 'No', field: 'number', width: 80 },
  { headerName: '전자서명일련번호', field: 'enum', width: 200 },
  { headerName: '인증서업무구분', field: 'type', width: 160 },
  { headerName: '인증서업무관리번호', field: 'typeNum', width: 160 },
  { headerName: '서명일자', field: 'date', width: 120 },
  { headerName: '서명시간', field: 'time', width: 120 },
  { headerName: '서명기관ID', field: 'orgId', width: 120 },
  { headerName: '서명회원ID', field: 'memId', width: 120 },
  { headerName: '식별번호', field: 'discernNum', width: 140 },
  { headerName: '인증서구분', field: 'certType', width: 160 },
  { headerName: '거래고유ID', field: 'dealId', width: 120 },
])
const rowData = [
  {
    number: 1,
    enum: '231101CERTTEST1224121212',
    type: '회원 관리',
    typeNum: '집행관리번호',
    date: '2023-10-10',
    time: '12:00:00',
    orgId: 'TESST01',
    memId: 'POP12',
    discernNum: '1234567890',
    certType: '금융인증서법인',
    dealId: 'ID',
  },
  {
    number: 2,
    enum: '231101CERTTEST1224121212',
    type: '회원 관리',
    typeNum: '집행관리번호',
    date: '2023-10-10',
    time: '12:00:00',
    orgId: 'TESST01',
    memId: 'POP12',
    discernNum: '1234567890',
    certType: '금융인증서법인',
    dealId: 'ID',
  },
  {
    number: 3,
    enum: '231101CERTTEST1224121212',
    type: '회원 관리',
    typeNum: '집행관리번호',
    date: '2023-10-10',
    time: '12:00:00',
    orgId: 'TESST01',
    memId: 'POP12',
    discernNum: '1234567890',
    certType: '금융인증서법인',
    dealId: 'ID',
  },
  {
    number: 4,
    enum: '231101CERTTEST1224121212',
    type: '회원 관리',
    typeNum: '집행관리번호',
    date: '2023-10-10',
    time: '12:00:00',
    orgId: 'TESST01',
    memId: 'POP12',
    discernNum: '1234567890',
    certType: '금융인증서법인',
    dealId: 'ID',
  },
  {
    number: 5,
    enum: '231101CERTTEST1224121212',
    type: '회원 관리',
    typeNum: '집행관리번호',
    date: '2023-10-10',
    time: '12:00:00',
    orgId: 'TESST01',
    memId: 'POP12',
    discernNum: '1234567890',
    certType: '금융인증서법인',
    dealId: 'ID',
  },
  {
    number: 6,
    enum: '231101CERTTEST1224121212',
    type: '회원 관리',
    typeNum: '집행관리번호',
    date: '2023-10-10',
    time: '12:00:00',
    orgId: 'TESST01',
    memId: 'POP12',
    discernNum: '1234567890',
    certType: '금융인증서법인',
    dealId: 'ID',
  },
  {
    number: 7,
    enum: '231101CERTTEST1224121212',
    type: '회원 관리',
    typeNum: '집행관리번호',
    date: '2023-10-10',
    time: '12:00:00',
    orgId: 'TESST01',
    memId: 'POP12',
    discernNum: '1234567890',
    certType: '금융인증서법인',
    dealId: 'ID',
  },
  {
    number: 8,
    enum: '231101CERTTEST1224121212',
    type: '회원 관리',
    typeNum: '집행관리번호',
    date: '2023-10-10',
    time: '12:00:00',
    orgId: 'TESST01',
    memId: 'POP12',
    discernNum: '1234567890',
    certType: '금융인증서법인',
    dealId: 'ID',
  },
  {
    number: 9,
    enum: '231101CERTTEST1224121212',
    type: '회원 관리',
    typeNum: '집행관리번호',
    date: '2023-10-10',
    time: '12:00:00',
    orgId: 'TESST01',
    memId: 'POP12',
    discernNum: '1234567890',
    certType: '금융인증서법인',
    dealId: 'ID',
  },
  {
    number: 10,
    enum: '231101CERTTEST1224121212',
    type: '회원 관리',
    typeNum: '집행관리번호',
    date: '2023-10-10',
    time: '12:00:00',
    orgId: 'TESST01',
    memId: 'POP12',
    discernNum: '1234567890',
    certType: '금융인증서법인',
    dealId: 'ID',
  },
  {
    number: 11,
    enum: '231101CERTTEST1224121212',
    type: '회원 관리',
    typeNum: '집행관리번호',
    date: '2023-10-10',
    time: '12:00:00',
    orgId: 'TESST01',
    memId: 'POP12',
    discernNum: '1234567890',
    certType: '금융인증서법인',
    dealId: 'ID',
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