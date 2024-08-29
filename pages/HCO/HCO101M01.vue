<template>
  <v-table>
    <tbody>
      <tr>
        <th>탈퇴여부</th>
        <td>
          <ComSelectBox
            groupCode="01"
            v-model="classification"
            :items="items"
            :isDefault="false"
            class="s_basics w_150"
          />
        </td>
        <th>날짜</th>
        <td>
          <ComDatePicker v-model="startDate" />
          ~
          <ComDatePicker v-model="endDate" />
        </td>
        <th>검색어</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="Your Name"
              v-model="name"
              :rules="nameRules"
              required
              placeholder="검색어를 입력해주세요."
              class="i_basics w_300 ml_27"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small">검색</v-btn>
            <v-btn class="vbtn line" size="small">엑셀</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="tit_cnt_btn">
    <p class="tit_cnt">(단위: 명)</p>
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
</template>

<style scoped></style>

<script setup>
import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComRadioButton from '@/components/common/ComRadioButton.vue'
import ComAgGrid from '~/components/common/ComAgGrid.vue'
import pagination from '@/components/common/pdf/pagination.vue'
import ComDatePicker from '@/components/common/ComDatePicker.vue'

const today = new Date() // 현재 날짜와 시간을 포함하는 Date 객체 생성
const year = today.getFullYear() // 년도 가져오기
const month = today.getMonth() + 1 // 월 가져오기 (0부터 시작하므로 1 더하기)
const day = today.getDate() // 일 가져오기
const formattedToday = new Date(
  `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
)
const startDate = ref(formattedToday)
const endtDate = ref(formattedToday)

/* 콤보 박스 */
const classification = ref('001')

const items = ref([
  { title: '앱삭제포함', value: '001' },
  { title: '앱삭제 미포함', value: '002' },
])

const state = ref('001')

const selectedValue = ref(null)

const name = ref('')

const nameRules = [
  (v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const numOfPages = ref(5)
const columnDefs = ref([
  { headerName: '기관명', field: 'org' },
  { headerName: '전체설치', field: 'name' },
  { headerName: '책임자', field: 'birthday' },
  { headerName: '일반회원', field: 'mobile' },
  { headerName: '...', field: 'email' },
])
const rowData = [
  {
    org: 'Xxx발주사',
    name: '김기관',
    birthday: '99.09.09',
    mobile: '010-9999-5555',
    email: 'aaa@test.com',
    state: '승인 진행 전',
  },
  {
    org: 'Xxx발주사',
    name: '이기관',
    birthday: '99.09.09',
    mobile: '010-9999-5555',
    email: 'aaa@test.com',
    state: '승인 진행 전',
  },
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
