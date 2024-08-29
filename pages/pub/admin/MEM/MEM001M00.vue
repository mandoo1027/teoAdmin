<template>

  <div class="title_box">
    <h2>일반 회원 조회</h2>
    <ul class="loc">
      <li>홈</li>
      <li>회원관리</li>
      <li>일반 회원 조회</li>
    </ul>
  </div>

  <h3 class="tit">회원 목록</h3>
  <v-table>
    <tbody>
      <tr>
        <th>구분</th>
        <td><ComSelectBox groupCode="01" v-model="classification" :items="items" :isDefault="false" class="s_basics w_150" /></td>
        <th>회원가입상태</th>
        <td><ComSelectBox groupCode="02" v-model="state" :items="items2" :isDefault="false" class="s_basics w_150" /></td>
      </tr>
      <tr>
        <th>검색어</th>
        <td colspan="3">
          <div class="d_flex">
            <ComRadioButton :options="radioOptions" v-model="selectedValue" :isInline="true" class="mt_10 w_auto" />
            <v-text-field label="Your Name" v-model="name" :rules="nameRules" required placeholder="검색어를 입력해주세요." class="i_basics w_300 ml_27"></v-text-field>
            <v-btn class="vbtn ml_10" size="small">검색</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <p class="tit_cnt">총 <b>100</b>건</p>
  <div class="grid">
    <ComAgGrid
      ref="agrid"
      :columnDefs="columnDefs"
      style="height: 400px"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
    />
    <pagination pages="100" :length="100" :total-visible="10" class=""></pagination>
  </div>
  
</template>

<style scoped>
  
</style>

<script setup >

import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComRadioButton from '@/components/common/ComRadioButton.vue'
import ComAgGrid from '~/components/common/ComAgGrid.vue'
import pagination from '@/components/common/pdf/pagination.vue'

/* 콤보 박스 */
const classification = ref('001')

const items = ref([
  { title: '전체', value: '001' },
  { title: '발주/책임자', value: '002' },
  { title: '발주/일반', value: '003' },
  { title: '수행/책임자', value: '004' },
  { title: '수행/일반', value: '005' },
])

const state = ref('001')

const items2 = ref([
  { title: '전체', value: '001' },
  { title: '정상', value: '002' },
  { title: '탈퇴 진행 전', value: '003' },
  { title: '승인 진행 전', value: '004' },
])

const selectedValue = ref(null)

const radioOptions = [
  { label: '전체', value: 'value1' },
  { label: '기관 명', value: 'value2' },
  { label: '성명', value: 'value3' },
]

const name = ref('')

const nameRules = [
  (v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const numOfPages = ref(5)
const columnDefs = ref([
  { headerName: 'NO.', field: 'no' },
  { headerName: '구분.', field: 'class' },
  { headerName: '기관명', field: 'org' },
  { headerName: '성명', field: 'name' },
  { headerName: '생년월일', field: 'birthday' },
  { headerName: '휴대전화번호', field: 'mobile' },
  { headerName: '이메일주소', field: 'email' },
  { headerName: '회원가입상태', field: 'state' },
])
const rowData = [
  { no: 10, class: '발주/책임자', org: 'Xxx발주사', name: '김기관', birthday: '99.09.09', mobile: '010-9999-5555', email: 'aaa@test.com', state: '승인 진행 전' },
  { no: 9, class: '발주/책임자', org: 'Xxx발주사', name: '이기관', birthday: '99.09.09', mobile: '010-9999-5555', email: 'aaa@test.com', state: '승인 진행 전' },
  { no: 8, class: '발주/책임자', org: 'Xxx발주사', name: '저기관', birthday: '99.09.09', mobile: '010-9999-5555', email: 'aaa@test.com', state: '승인 진행 전' },
]
const defaultColDef = {
  sortable: true,
  filter: true,
  editable: true,
  resizable: true,
  cellStyle: { textAlign: 'center' },
}
const agrid = ref(null)
const paginationPageSize = ref(10)


</script> 