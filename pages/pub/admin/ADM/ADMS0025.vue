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
        <th>이체 일자</th>
        <td>
          <div class="i_calender">
            <ComDatePicker v-model="startDate" class="i_date w_140" placeholder="날짜선택" />
          </div>
        </td>
        <th>집행관리번호</th>
        <td><v-text-field label="집행관리번호" v-model="orgNum" :rules="orgNumRules" placeholder="" class="i_basics flex1"></v-text-field></td>
        <th>이체 금액</th>
        <td>
          <div class="d_flex">
            <v-text-field label="이체 금액" v-model="price" :rules="priceRules" placeholder="" class="i_basics flex1"></v-text-field>
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

import ComDatePicker from '@/components/common/ComDatePicker.vue'
import ComAgGrid from '~/components/common/ComAgGrid.vue'


const orgNum = ref('')
const orgNumRules = [
  //(v) => !!v || '다시 입력해주세요.',
]

const price = ref('')
const priceRules = [
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
  { headerName: '집행관리번호', field: 'orgNum', width: 200 },
  { headerName: '이체실행구분', field: 'type', width: 160 },
  { headerName: '발주기관ID', field: 'orgId', width: 160 },
  { headerName: '사업번호', field: 'bizNo', width: 120 },
  { headerName: 'TASK번호', field: 'taskNum', width: 120 },
  { headerName: '입금은행코드', field: 'bankCode', width: 120 },
  { headerName: '입금계좌번호', field: 'depositAcc', width: 160 },
  { headerName: '입금예금주명', field: 'depositName', width: 140 },
  { headerName: '이체 금액', field: 'transferPrice', width: 160, cellClass: 'cell_right' },
  { headerName: '이체 일자', field: 'transferDate', width: 120 },
  { headerName: '이체결과코드', field: 'transferCode', width: 160 },
  { headerName: '이체 결과메시지', field: 'transferMsg', width: 200 },
])
const rowData = [
  {
    number: 1,
    orgNum: '231101CERTTEST1224121212',
    type: '회원 관리',
    orgId: 'TESST01',
    bizNo: '1234567',
    taskNum: '1234567',
    bankCode: '신한은행',
    depositAcc: '1234567789',
    depositName: '홍길동길동',
    transferPrice: '10,000',
    transferDate: '2023-10-10',
    transferCode: '2자이체',
    transferMsg: '타임아웃',
  },
  {
    number: 2,
    orgNum: '231101CERTTEST1224121212',
    type: '회원 관리',
    orgId: 'TESST01',
    bizNo: '1234567',
    taskNum: '1234567',
    bankCode: '신한은행',
    depositAcc: '1234567789',
    depositName: '홍길동길동',
    transferPrice: '10,000',
    transferDate: '2023-10-10',
    transferCode: '2자이체',
    transferMsg: '타임아웃',
  },
  {
    number: 3,
    orgNum: '231101CERTTEST1224121212',
    type: '회원 관리',
    orgId: 'TESST01',
    bizNo: '1234567',
    taskNum: '1234567',
    bankCode: '신한은행',
    depositAcc: '1234567789',
    depositName: '홍길동길동',
    transferPrice: '10,000',
    transferDate: '2023-10-10',
    transferCode: '2자이체',
    transferMsg: '타임아웃',
  },
  {
    number: 4,
    orgNum: '231101CERTTEST1224121212',
    type: '회원 관리',
    orgId: 'TESST01',
    bizNo: '1234567',
    taskNum: '1234567',
    bankCode: '신한은행',
    depositAcc: '1234567789',
    depositName: '홍길동길동',
    transferPrice: '10,000',
    transferDate: '2023-10-10',
    transferCode: '2자이체',
    transferMsg: '타임아웃',
  },
  {
    number: 5,
    orgNum: '231101CERTTEST1224121212',
    type: '회원 관리',
    orgId: 'TESST01',
    bizNo: '1234567',
    taskNum: '1234567',
    bankCode: '신한은행',
    depositAcc: '1234567789',
    depositName: '홍길동길동',
    transferPrice: '10,000',
    transferDate: '2023-10-10',
    transferCode: '2자이체',
    transferMsg: '타임아웃',
  },
  {
    number: 6,
    orgNum: '231101CERTTEST1224121212',
    type: '회원 관리',
    orgId: 'TESST01',
    bizNo: '1234567',
    taskNum: '1234567',
    bankCode: '신한은행',
    depositAcc: '1234567789',
    depositName: '홍길동길동',
    transferPrice: '10,000',
    transferDate: '2023-10-10',
    transferCode: '2자이체',
    transferMsg: '타임아웃',
  },
  {
    number: 7,
    orgNum: '231101CERTTEST1224121212',
    type: '회원 관리',
    orgId: 'TESST01',
    bizNo: '1234567',
    taskNum: '1234567',
    bankCode: '신한은행',
    depositAcc: '1234567789',
    depositName: '홍길동길동',
    transferPrice: '10,000',
    transferDate: '2023-10-10',
    transferCode: '2자이체',
    transferMsg: '타임아웃',
  },
  {
    number: 8,
    orgNum: '231101CERTTEST1224121212',
    type: '회원 관리',
    orgId: 'TESST01',
    bizNo: '1234567',
    taskNum: '1234567',
    bankCode: '신한은행',
    depositAcc: '1234567789',
    depositName: '홍길동길동',
    transferPrice: '10,000',
    transferDate: '2023-10-10',
    transferCode: '2자이체',
    transferMsg: '타임아웃',
  },
  {
    number: 9,
    orgNum: '231101CERTTEST1224121212',
    type: '회원 관리',
    orgId: 'TESST01',
    bizNo: '1234567',
    taskNum: '1234567',
    bankCode: '신한은행',
    depositAcc: '1234567789',
    depositName: '홍길동길동',
    transferPrice: '10,000',
    transferDate: '2023-10-10',
    transferCode: '2자이체',
    transferMsg: '타임아웃',
  },
  {
    number: 10,
    orgNum: '231101CERTTEST1224121212',
    type: '회원 관리',
    orgId: 'TESST01',
    bizNo: '1234567',
    taskNum: '1234567',
    bankCode: '신한은행',
    depositAcc: '1234567789',
    depositName: '홍길동길동',
    transferPrice: '10,000',
    transferDate: '2023-10-10',
    transferCode: '2자이체',
    transferMsg: '타임아웃',
  },
  {
    number: 11,
    orgNum: '231101CERTTEST1224121212',
    type: '회원 관리',
    orgId: 'TESST01',
    bizNo: '1234567',
    taskNum: '1234567',
    bankCode: '신한은행',
    depositAcc: '1234567789',
    depositName: '홍길동길동',
    transferPrice: '10,000',
    transferDate: '2023-10-10',
    transferCode: '2자이체',
    transferMsg: '타임아웃',
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