<template>

  <div class="title_box">
    <h2>공통코드관리</h2>
    <ul class="loc">
      <li>홈</li>
      <li>시스템관리</li>
      <li>프레임워크관리</li>
      <li>공통코드관리</li>
    </ul>
  </div>

  <v-table>
    <tbody>
      <tr>
        <th class="">코드그룹</th>
        <td><v-text-field label="코드그룹" class="i_basics "></v-text-field></td>
        <th class="">코드</th>
        <td><v-text-field label="코드" class="i_basics "></v-text-field></td>
        <th class="">코드설명</th>
        <td><v-text-field label="코드설명" class="i_basics "></v-text-field></td>
        <th class="">코드(2~5)</th>
        <td>
          <div class="d_flex">
            <v-text-field label="코드(2~5)" class="i_basics flex1"></v-text-field>
            <v-btn class="vbtn ml_10" size="small">검색</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="tit_cnt_btn">
    <p class="tit_cnt">총 <b>100</b>건</p>
    <div>
      <v-btn class="vbtn black" size="small">추가</v-btn>
      <v-btn class="vbtn black" size="small">삭제</v-btn>
      <v-btn class="vbtn" size="small">저장</v-btn>
    </div>
  </div>
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

  <div class="btn_grid_more">
    <v-btn class="vbtn" size="small">더보기</v-btn>
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
  { headerName: '선택', field: 'col1', width:"80px" },
  { headerName: '상태', field: 'col2', width:"80px" },
  { headerName: '코드그룹', field: 'col3' , width:"160px" },
  { headerName: '코드값', field: 'col4', width:"160px" },
  { headerName: '코드설명', field: 'col5', width:"110px" },
  { headerName: '코드값2', field: 'col6', width:"110px" },
  { headerName: '코드설명2', field: 'col7', width:"120px" },
  { headerName: '코드값3', field: 'col8', width:"110px" },
  { headerName: '코드설명3', field: 'col9', width:"120px" },
  { headerName: '코드값4', field: 'col10', width:"110px" },
  { headerName: '코드설명4', field: 'col11', width:"120px" },
  { headerName: '코드값5', field: 'col12', width:"110px" },
  { headerName: '코드설명5', field: 'col12', width:"120px" },
  { headerName: '순번', field: 'col13', width:"110px" },
  { headerName: '유효여부', field: 'col14', width:"110px" },
])
const rowData = [
  { col1: '', col2: '', col3: 'ACNO_POP_PERIOD', col4: 'CMMN', col5: '공통', col6: '20230211', col7: '팝업제외시작일', col8: '20230430', col9: '팝업제외종료일', col10: '', col11: '', col12: '', col13: '1', col14: 'Y' },
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