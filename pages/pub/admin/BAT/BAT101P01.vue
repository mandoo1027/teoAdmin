<template>
  <!-- popup size width:500 height:300 -->
  <div class="popup_body">
    <div class="tit_btn">
      <h3 class="tit">배치등록</h3>
      <div>
        <v-btn class="vbtn black" size="small">초기화</v-btn>
      </div>
    </div>
    <v-table class="vtable_view th_140">
      <tbody>
        <tr>
          <th>배치ID</th>
          <td>
            <v-text-field
              label="배치ID"
              v-model="batchId"
              :rules="batchIdRules"
              class="i_basics"
              disabled
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>배치명</th>
          <td>
            <v-text-field
              label="배치명"
              v-model="batchName"
              :rules="batchNameRules"
              class="i_basics"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>프로그램URL</th>
          <td>
            <v-text-field
              label="프로그램URL"
              v-model="program"
              :rules="programRules"
              class="i_basics"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>파라미터</th>
          <td>
            <v-text-field
              label="파라미터"
              v-model="parameter"
              :rules="parameterRules"
              class="i_basics"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>학교코드</th>
          <td>
            <ComSelectBox
              groupCode="01"
              v-model="schoolCode"
              :items="itemsSchoolCode"
              :isDefault="false"
              class="s_basics"
            />
          </td>
        </tr>
        <tr>
          <th>사용여부</th>
          <td>
            <ComSelectBox
              groupCode="01"
              v-model="useAcc"
              :items="itemsUseAcc"
              :isDefault="false"
              class="s_basics"
            />
          </td>
        </tr>
        <tr>
          <th>배치설명</th>
          <td><v-textarea></v-textarea></td>
        </tr>
        <tr>
          <th>후행처리</th>
          <td>
            <!-- <p>후행처리할 배치를 입력/선택해주세요.</p> -->
            <v-combobox
              label="후행처리할 배치를 입력/선택해주세요."
              :items="[
                '숙명여대 학적배치[00001]',
                '숙명여대 사진배치[00002]',
                '한양대 사진배치[00009]',
              ]"
              v-model="afterProcess"
              :rules="afterProcessRules"
              class="v_combo none_details"
              placeholder="후행처리할 배치를 입력/선택해주세요."
            ></v-combobox>
          </td>
        </tr>
        <tr>
          <th>스케줄링 타입</th>
          <td>
            <ComSelectBox
              groupCode="01"
              v-model="scheduleType"
              :items="itemsScheduleType"
              :isDefault="false"
              class="s_basics"
            />
          </td>
        </tr>
        <tr>
          <th>담당자</th>
          <td>
            <ComSelectBox
              groupCode="01"
              v-model="person"
              :items="itemsPerson"
              :isDefault="false"
              class="s_basics"
            />
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="btm_btn_wrap">
      <v-btn class="vbtn black" size="small">수정</v-btn>
      <v-btn class="vbtn" size="small">등록</v-btn>
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup >
import ComSelectBox from '@/components/common/ComSelectBox.vue'

const batchId = ref('')
const batchIdRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]

const batchName = ref('')
const batchNameRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]

const program = ref('')
const programRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]

const parameter = ref('')
const parameterRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]

const schoolCode = ref('001')
const itemsSchoolCode = ref([
  { title: 'MNwise', value: '001' },
  { title: 'ZZ', value: '002' },
  { title: '강서대학교', value: '003' },
])

const useAcc = ref('001')
const itemsUseAcc = ref([
  { title: '예', value: '001' },
  { title: '아니오', value: '002' },
])

const afterProcess = ref(null)
const afterProcessRules = [
  //(v) => !!v || '후행처리할 배치가 없습니다. 다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '2자 이상 입력 후 검색하세요.',
]

const scheduleType = ref('001')
const itemsScheduleType = ref([
  { title: '매 영업일', value: '001' },
  { title: '매일', value: '002' },
  { title: '매월 1일', value: '003' },
])

const person = ref('001')
const itemsPerson = ref([
  { title: '담당자를 선택해주세요', value: '001' },
  { title: '홍길동', value: '002' },
  { title: '고길동', value: '003' },
  { title: '아무개', value: '004' },
])
</script> 