<template>
  <!-- popup size width:500 height:300 -->
  <div class="popup_body">
    <h3 class="tit">작업이력상세</h3>
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
              readonly
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
              readonly
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>JOB인스턴스ID</th>
          <td>
            <v-text-field
              label="JOB인스턴스ID"
              v-model="jobInstanceId"
              :rules="jobInstanceIdRules"
              class="i_basics"
              readonly
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>JOB실행ID</th>
          <td>
            <v-text-field
              label="JOB실행ID"
              v-model="jobExeId"
              :rules="jobExeIdRules"
              class="i_basics"
              readonly
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>상태</th>
          <td>
            <v-text-field
              label="상태"
              v-model="status"
              :rules="statusRules"
              class="i_basics"
              readonly
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
              readonly
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>실행시작일시</th>
          <td>
            <v-text-field
              label="실행시작일시"
              v-model="startDateTime"
              :rules="startDateTimeRules"
              class="i_basics"
              readonly
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>실행종료일시</th>
          <td>
            <v-text-field
              label="실행시작일시"
              v-model="endDateTime"
              :rules="endDateTimeRules"
              class="i_basics"
              readonly
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>에러내용</th>
          <td><v-textarea readonly></v-textarea></td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped>
</style>

<script setup >
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

const jobInstanceId = ref('')
const jobInstanceIdRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]

const jobExeId = ref('')
const jobExeIdRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]

const status = ref('')
const statusRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]

const parameter = ref('')
const parameterRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]

const startDateTime = ref('')
const startDateTimeRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]

const endDateTime = ref('')
const endDateTimeRules = [
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '메세지',
]
</script>