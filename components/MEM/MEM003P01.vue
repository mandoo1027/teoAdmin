<template>
  <div class="popup_body">
    <v-form ref="form">
      <v-table class="vtable_view">
        <colgroup>
          <col style="width: " />
          <col style="width: " />
        </colgroup>
        <tbody>
          <tr>
            <th>
              <span class="memotype">쪽지종류<b></b></span>
            </th>
            <td>{{ infrmResult.infrmJobDivNm }}</td>
          </tr>

          <tr>
            <th>
              <span class="date">작성일자<b></b></span>
            </th>
            <td>
              {{ infrmResult.sndngDate }}
            </td>
          </tr>
          <tr>
            <th>
              <span class="sender">보낸분<b></b> </span>
            </th>
            <td>{{ infrmResult.sndngIdNm }}</td>
          </tr>
          <tr>
            <th>쪽지내용</th>
            <td>
              <div style="overflow-y: auto; max-height: 200px">
                {{ $utils.convertRegexToText(infrmResult.infrmCtn) }}
              </div>
            </td>
          </tr>
          <tr v-if="!btnFlag && !btnAdmin">
            <th>답변</th>
            <td>
              <v-textarea
                id="infrmCtnTxt"
                v-model="paramtResult.infrmCtn"
                :rules="$utils.getRules(['maxLength|1000', 'required|쪽지 내용을 입력해주세요.'])"
                placeholder="내용을 입력해주세요."
                :maxlength="1000"
                @keyup="chkSmsCtn"
                class="h_300"
              ></v-textarea>
              <p class="txt_limit">{{ lenCtn }}/1,000 자</p>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-form>
  </div>
  <div class="btm_btn_wrap mt_20">
    <v-btn class="vbtn blue" size="small" @click="msgList">확인</v-btn>
    <v-btn class="vbtn" size="small" @click="goSave" v-if="!btnFlag && !btnAdmin"
      >쪽지 보내기</v-btn
    >
  </div>
</template>

<style scoped></style>

<script setup>
import { notApi } from '@/api/index.ts'

/********************************* 변수 정의 *************************/
const valid = ref(false)
const form = ref(null)

const emits = defineEmits(['close-dialog'])
const lenCtn = ref('0')
const rcvrId = reactive([]) // 수신자ID

const sendRcvrIdNm = ref('')
const sndngIdNm = ref('')

const btnFlag = ref(false)
const btnAdmin = ref(false)

//* 조회 변수 파라미터  */
const paramtResult = ref({
  infrmJobDivCd: '', // 알림업무구분
  infrmCtn: '', // 쪽지내용
  rcvrInstId: '', // 수신기관ID
  rcvrId: '', // 수신자ID
  // rcvrNm: '', // 수신자
  infrmJobMgnNo: '',
})

//* 조회 결과 */
const infrmResult = ref({
  sndngDate: '', // 받은 날짜
  sndptyInstId: '', // 보낸 기관ID
  sndptyInstNm: '', // 보낸 기관명
  sndngIdNm: '', // 보낸 분
  sndngId: '', // 보낸 분ID
  rcvrId: '', // 받는 분ID
  infrmCtn: '', // 쪽지내용
  infrmJobDivCd: '', // 쪽지종류코드
  infrmJobDivNm: '', // 쪽지종류명
  sndngSeq: '', // 발신일련번호
  infrmJobMgnNo: '',
})

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

/********************************* 초기화 *************************/
onBeforeMount(async () => {
  console.log('==props==', props)
  paramtResult.value.sndngSeq = props.data.sndngSeq
  paramtResult.value.sndngRcvrFlag = props.data.sndngRcvrFlag
  paramtResult.value.infrmJobDivCd = props.data.infrmJobDivCd ?? '900'
  sendRcvrIdNm.value = props.data.rcvrIdNm ?? 'ADMIN'
  sndngIdNm.value = props.data.sndngIdNm
  // props로 확인해야함
})

onMounted(() => {
  if (paramtResult.value.infrmJobDivCd === '900') {
    btnFlag.value = false
    if (sendRcvrIdNm.value === 'ADMIN') {
      // 받는분이 어드민이 아닐때
      console.log(sendRcvrIdNm.value, 'sendRcvrIdNm.value')
      console.log(sendRcvrIdNm.value, 'true?')
      btnAdmin.value = false
    } else {
      btnAdmin.value = true
    }
  } else {
    btnFlag.value = true
  }
  callApi()
})

/********************************* methods *************************/
// 글자표시 하단.
const chkSmsCtn = () => {
  lenCtn.value = paramtResult.value.infrmCtn.length
}

// 목록으로
const msgList = () => {
  emits('close-dialog')
}

const goSave = () => {
  // 답변이 입력되지않았을때
  if (!paramtResult.value.infrmCtn) {
    $fx.throwAlert('답변이 입력되지 않았습니다.')
    return
  }

  saveApi()
}

/*********************************** API ***************************/
// 쪽지보내기
const saveApi = () => {
  paramtResult.value.rcvrInstId = infrmResult.value.sndptyInstId
  paramtResult.value.rcvrId = infrmResult.value.sndngId
  paramtResult.value.infrmJobMgnNo = infrmResult.value.infrmJobMgnNo
  const params = paramtResult.value
  // params.sndngIdNm = sendResult.value.sndngIdNm // 보내는 사람 ADMIN고정
  // params.sndngId = sendResult.value.sndngId // 보내는 ID ADMIN고정
  console.log(params, 'params쪽지보내기 API')
  $fx.startLoadingbar()
  notApi
    .NOT0201I02(params)
    .then((response) => {
      console.log('response===', response)
      if (response.result.result) {
        $fx.throwAlert('정상적으로 쪽지 발송되었습니다.', '확인').then((result) => {
          //등록 처리
          msgList()
        })
      } else {
        $fx.throwAlert('쪽지 발송 되지 않았습니다. /' + response.result.result, '알림')
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 쪽지 상세 조회
const callApi = () => {
  const params = paramtResult.value //파라미터 셋팅
  console.log(params, 'params')
  $fx.startLoadingbar()
  notApi
    .NOT0201S03(params)
    .then((response) => {
      const resultData = response.result.result
      infrmResult.value.infrmCtn = resultData.infrmCtn
      infrmResult.value.infrmJobDivCd = resultData.infrmJobDivCd
      infrmResult.value.infrmJobDivNm = resultData.infrmJobDivNm
      infrmResult.value.sndngDate = $utils.formatDate(resultData.sndngDate)
      infrmResult.value.sndptyInstId = resultData.sndptyInstId
      infrmResult.value.sndptyInstNm = resultData.sndptyInstNm
      infrmResult.value.sndngId = resultData.sndngId
      infrmResult.value.sndngIdNm = resultData.sndngIdNm
      infrmResult.value.rcvrInstNm = resultData.rcvrInstNm
      infrmResult.value.rcvrInstId = resultData.rcvrInstId
      infrmResult.value.rcvrId = resultData.rcvrId
      infrmResult.value.rcvrIdNm = resultData.rcvrIdNm
      infrmResult.value.sndngSeq = resultData.sndngSeq
      infrmResult.value.infrmJobMgnNo = resultData.sndngSeq
      console.log('response===', infrmResult.value.rcvrIdNm)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
