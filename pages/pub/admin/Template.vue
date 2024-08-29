<template>
  <div class="title_box">
    <h2>일반 회원 조회</h2>
    <ul class="loc">
      <li>홈</li>
      <li>회원관리</li>
      <li>일반 회원 조회</li>
    </ul>
  </div>

  <div class="tit_btn">
    <h3 class="tit">회원 목록</h3>
    <div>
      <v-btn class="vbtn black" size="small">타이틀 버튼영역</v-btn>
      <v-btn class="vbtn black" size="small">삭제</v-btn>
      <v-btn class="vbtn" size="small">저장</v-btn>
    </div>
  </div>
  <v-table>
    <tbody>      
      <tr>
        <th>구분</th>
        <td>
          <ComSelectBox 
            v-model="classification"
            :items="items"
            :isDefault="false"
            class="s_basics w_150"
          />
        </td>
        <th>회원가입상태</th>
        <td>
          <ComSelectBox 
            v-model="state"
            :items="items2"
            :isDefault="false"
            class="s_basics w_150"
          />
        </td>
      </tr>
      <tr>
        <th>검색어</th>
        <td colspan="3">
          <div class="d_flex">
            <ComRadioButton
              :options="radioOptions"
              v-model="selectedValue"
              :isInline="true"
              class="mt_10"
            />
            <v-text-field
              label="Your Name"
              v-model="name"
              :rules="nameRules"
              required
              placeholder="검색어를 입력해주세요."
              class="i_basics w_300 ml_27"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small">검색</v-btn>
          </div>
        </td>
      </tr>
      <tr>
        <th>구분</th>
        <td>
          <div class="i_calender">
            <ComDatePicker v-model="startDate" class="i_date w_200" />
          </div>
        </td>
        <th>제목</th>
        <td>내용</td>
      </tr>
    </tbody>
  </v-table>

  <div class="tit_btn">
    <h3 class="tit">회원 정보</h3>
    <div>
      <v-btn class="vbtn black" size="small">타이틀 버튼영역</v-btn>
      <v-btn class="vbtn" size="small">회원정보 변경 이력</v-btn>
    </div>
  </div>
  <v-table class="vtable_view">
    <tbody>
      <tr>
        <th>구분</th>
        <td>내용</td>
      </tr>
      <tr>
        <th>ComSelectBox</th>
        <td>
          <ComSelectBox 
            v-model="classification"
            :items="items"
            :isDefault="false"
            class="s_basics w_150"
          />
        </td>
      </tr>
      <tr>
        <th>input</th>
        <td>
          <v-text-field
            label="Your Name"
            v-model="name"
            :rules="nameRules"
            required
            placeholder="input"
            class="i_basics w_300"
          ></v-text-field>
        </td>
      </tr>
      <tr>
        <th>input</th>
        <td>
          <v-text-field
            label="Your Name"
            v-model="name"
            :rules="nameRules"
            required
            placeholder="input"
            class="i_basics"
          ></v-text-field>
        </td>
      </tr>
      <tr>
        <th>ComRadioButton</th>
        <td><ComRadioButton :options="radioOptions" v-model="selectedValue" :isInline="true" /></td>
      </tr>
      <tr>
        <th>checkbox</th>
        <td>
          <div class="vchk_box">
            <v-checkbox v-model="checkbox1" :label="`체크체크체크: ${checkbox1.toString()}`" />
            <v-checkbox v-model="checkbox2" :label="`체크체크체크: ${checkbox2.toString()}`" />
          </div>

          <v-checkbox v-model="checkbox1" :label="`체크체크체크: ${checkbox1.toString()}`" />
          <v-checkbox v-model="checkbox2" :label="`체크체크체크: ${checkbox2.toString()}`" />
        </td>
      </tr>
      <tr>
        <th>검색</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="Your Name"
              v-model="name"
              :rules="nameRules"
              required
              placeholder="검색어를 입력해주세요."
              class="i_basics w_300"
            ></v-text-field>
            <v-btn class="vbtn ml_10 black" size="small">주소검색</v-btn>
          </div>
        </td>
      </tr>
      <tr>
        <th>textarea</th>
        <td><v-textarea></v-textarea></td>
      </tr>
    </tbody>
  </v-table>

  <div class="tit_btn">
    <h3 class="tit">회원 정보</h3>
    <div>
      <v-btn class="vbtn black" size="small">타이틀 버튼영역</v-btn>
      <v-btn class="vbtn" size="small">회원정보 변경 이력</v-btn>
    </div>
  </div>
  <v-table class="vtable_view">
    <colgroup>
      <col style="width:;" />
      <col style="width:;" />
      <col style="width:;" />
      <col style="width:;" />
    </colgroup>
    <tbody>
      <tr>
        <th>구분</th>
        <td>내용</td>
        <th>구분</th>
        <td>내용</td>
      </tr>
      <tr>
        <th>구분</th>
        <td>내용</td>
        <th>구분</th>
        <td>내용</td>
      </tr>
      <tr>
        <th>구분</th>
        <td>내용</td>
        <th>구분</th>
        <td>내용</td>
      </tr>
    </tbody>
  </v-table>

  <div class="tit_cnt_btn">
    <p class="tit_cnt">총 <b>100</b>건</p>
    <div>
      <v-btn class="vbtn black" size="small">그리드 버튼영역</v-btn>
      <v-btn class="vbtn black" size="small">추가</v-btn>
      <v-btn class="vbtn black" size="small">삭제</v-btn>
      <v-btn class="vbtn" size="small">저장</v-btn>
      <ComSelectBox 
        v-model="comboSelected"
        :items="sltitems"
        class="s_basics more"
      />
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

  <div class="btm_btn_wrap">
    <v-btn class="vbtn black" size="small">하단 버튼영역</v-btn>
    <v-btn class="vbtn black" size="small">책임자 변경</v-btn>
    <v-btn class="vbtn black" size="small">회원 탈퇴</v-btn>
    <v-btn class="vbtn black" size="small">회원정보수정</v-btn>
    <v-btn class="vbtn" size="small">목록</v-btn>
  </div>
</template>

<style scoped>
</style>

<script setup >
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
  `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`,
)
const startDate = ref(formattedToday)

/* 콤보 박스 */
const comboSelected = ref('001')

const sltitems = ref([
  { title: '10개', value: '001' },
  { title: '50개', value: '002' },
  { title: '100개', value: '003' },
])

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
  {
    no: 10,
    class: '발주/책임자',
    org: 'Xxx발주사',
    name: '김기관',
    birthday: '99.09.09',
    mobile: '010-9999-5555',
    email: 'aaa@test.com',
    state: '승인 진행 전',
  },
  {
    no: 9,
    class: '발주/책임자',
    org: 'Xxx발주사',
    name: '이기관',
    birthday: '99.09.09',
    mobile: '010-9999-5555',
    email: 'aaa@test.com',
    state: '승인 진행 전',
  },
  {
    no: 8,
    class: '발주/책임자',
    org: 'Xxx발주사',
    name: '저기관',
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

/* 체크박스 */
const checkbox1 = ref(true)
const checkbox2 = ref(false)
</script> 