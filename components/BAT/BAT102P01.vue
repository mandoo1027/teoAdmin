<template>
  <!-- popup size width:500 height:300 -->
  <div class="popup_body">
    <!-- <h3 class="tit">작업이력상세</h3> -->
    <v-table class="vtable_view th_140">
      <tbody>
        <tr>
          <th>배치ID</th>
          <td>
            <v-text-field
              label="배치ID"
              v-model="viewParams.operId"
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
              v-model="viewParams.operName"
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
              v-model="viewParams.jobInstanceId"
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
              v-model="viewParams.jobExecutionId"
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
              v-model="viewParams.execResult"
              class="i_basics"
              readonly
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>프로그램URL</th>
          <td>
            <v-text-field
              label="프로그램URL"
              v-model="viewParams.programUrl"
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
              v-model="viewParams.paramList"
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
              v-model="viewParams.execStartDt"
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
              v-model="viewParams.execEndDt"
              class="i_basics"
              readonly
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>에러내용</th>
          <td><v-textarea v-model="viewParams.errDsc" readonly></v-textarea></td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped></style>

<script setup>
import { batApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/

/* 검색 변수 파라미터  */
const searchParams = ref({
  operId: '', //배치ID
  execSeq: '',
})
const viewParams = reactive({
  execSeq: '',
  operId: '', //배치ID
  operName: '',
  programUrl: '',
  execType: '',
  jobInstanceId: '',
  jobExecutionId: '',
  paramList: '',
  execStartDt: '',
  execEndDt: '',
  execResult: '',
  errDsc: '',
})

const emit = defineEmits()

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  isDefault: {
    type: Boolean,
    default: true,
  },
})

/********************************* methods *************************/
onBeforeMount(async () => {
  
  if (props.data) {
    searchParams.value.operId = props.data.operId
    searchParams.value.execSeq = props.data.execSeq
  }
  await callApi()
})
/************************************* API ***************************/
// 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  
  $fx.startLoadingbar()
  batApi
    .BAT0301S02(params)
    .then((response) => {
  
      const resultInfo = response.result.resultInfo
      viewParams.execSeq = resultInfo.execSeq
      viewParams.operId = resultInfo.operId //배치ID
      viewParams.operName = resultInfo.operName
      viewParams.programUrl = resultInfo.programUrl
      viewParams.execType = resultInfo.execType
      viewParams.jobInstanceId = resultInfo.jobInstanceId
      viewParams.jobExecutionId = resultInfo.jobExecutionId
      viewParams.paramList = resultInfo.paramList
      viewParams.execStartDt = resultInfo.execStartDt
      viewParams.execEndDt = resultInfo.execEndDt
      viewParams.execResult = resultInfo.execResult
      viewParams.errDsc = resultInfo.errDsc
      
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
