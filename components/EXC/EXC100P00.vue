<template>
  <!-- popup size width:500 height:300 -->
  <div class="popup_body">
    <div class="tit_btn">
      <h3 class="tit">&nbsp;</h3>
      <div>
        <v-btn class="vbtn black" size="small" @click="clearData">초기화</v-btn>
      </div>
    </div>
    <v-table class="vtable_view th_140">
      <tbody>
        <tr>
          <th>공문 도착일</th>
          <td>
            <div class="i_calender">
              <CommonComDatePicker
                v-model="params.ofldcRcptnDate"
                class="i_date w_145"
                placeholder="날짜선택"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>비고</th>
          <td>
            <v-textarea
              class="h_150"
              v-model="params.ofldcRcptnCtn"
              placeholder="공문수신내용을 입력해주세요."
            ></v-textarea>
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="btm_btn_wrap">
      <v-btn class="vbtn" size="small" @click="confirm">확인</v-btn>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { excApi } from '@/api/index.ts'
const emits = defineEmits()

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
})

const params = ref({
  implMngNo: '',
  bizNo: '',
  taskNo: '',
  ordrInstId: '',
  ordrInstNm: '',
  ofldcRcptnDate: $utils.getDateYYYYMMDD(0, 0, 0), //공문도착일
  ofldcRcptnCtn: '', //비고
})
/********************************* 초기화  *************************/
// 최초 실행
onMounted(() => {
  params.value.implMngNo = props.data.implMngNo
  params.value.bizNo = props.data.bizNo
  params.value.taskNo = props.data.taskNo
  params.value.ordrInstId = props.data.ordrInstId
  params.value.ordrInstNm = props.data.instNm
})
/********************************* methods *************************/

const clearData = () => {
  params.value.ofldcRcptnDate = ''
  params.value.ofldcRcptnCtn = ''
}

const confirm = () => {
  if ($utils.isEmpty(params.value.ofldcRcptnDate)) {
    $fx.throwAlert('공문 도착일을 선택해 주세요.', '알림')
    return
  }
  if ($utils.isEmpty(params.value.ofldcRcptnCtn)) {
    $fx.throwAlert('공문 수신내용을 입력해 주세요.', '알림')
    return
  }
  if ($utils.getDateYYYYMMDD(0, 0, 0) > params.value.ofldcRcptnDate) {
    $fx.throwAlert('공문 도착일을 다시 선택해 주세요.', '알림')
    return
  }
  callApi()
}
/*********************************** API ***************************/
const callApi = () => {
  console.log('callApi params :::::', params.value)
  $fx.startLoadingbar()
  excApi
    .EXC0202U01(params.value)
    .then((response) => {
      const resultData = response.result
      if (resultData.result) {
        $fx.throwAlert('이체 승인이 완료되었습니다.', '알림').then(() => {
          emits('close-dialog', resultData?.result)
        })
      } else {
        $fx.throwAlert('이체 승인 중 오류가 발생했습니다.', '알림')
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
