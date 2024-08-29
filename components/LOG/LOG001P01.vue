<template>
  <!-- popup size width:500 height:466 -->
  <div class="popup_body">
    <div class="sms_confirm">
      <p class="tit">OTP 추가인증</p>

      <v-text-field
        label="인증번호"
        type="number"
        ref="smsNumRef"
        v-focus
        v-model="umsCertNum"
        :rules="smsNumRules"
        @input="replaceNumber"
        :disabled="!certData.isSend"
        @keydown.enter="confirm"
        placeholder="인증번호를 입력하세요."
        class="i_basics mt_20"
      ></v-text-field>
      <p class="t_right"><span class="time" v-html="timerText"></span></p>

      <div class="btm">
        <div class="t_right">
          <v-btn class="vbtn line" size="small" @click="callCertApi('LOGIN')"
            >인증번호 {{ certData.isSend ? '재' : '' }}전송</v-btn
          >
        </div>
      </div>
    </div>

    <div class="btm_btn_wrap">
      <v-btn class="vbtn" size="" @click="confirm" :disabled="!certData.isSend && certData.isReset">
        확인</v-btn
      >
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup >
import { loginApi, commonApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
})

const emits = defineEmits()

const timerText = ref('05:00') // 노출 타이머
const smsNumRef = ref(null)
const umsCertNum = ref('')
const smsNumRules = [(v) => !!v || '인증번호를 다시 입력해주세요.']

const serialNo = ref(null)
let countdown = 300 //5분 (300초) 설정
let timerInterval = '' //인터벌 넘버

//인증 데이터
const certData = reactive({
  isReset: false,
  chkCode: '', //발송 코드
  umsCertNum: '',
  isSend: false,
})

/********************************* INIT ****************************/
onMounted(() => {
  timerInterval = setInterval(updateTimer, 1000)
  certData.isSend = true
})

/********************************* METHODS *************************/

const replaceNumber = () => {
  umsCertNum.value = umsCertNum.value.substring(0, 6)
}

//인증번호관련 로직 초기화
const init = () => {
  clearInterval(timerInterval)
  timerText.value = '05:00'
  countdown = 300
}

//타이머 업데이트 함수
const updateTimer = () => {
  const minutes = Math.floor(countdown / 60)
  const seconds = countdown % 60
  timerText.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  if (countdown === 0) {
    //시간 초과
    reset()
    $fx.throwAlert('인증 번호 입력 시간이 초과 되었습니다.')
  } else {
    countdown--
  }
}

//인증 리셋
const reset = () => {
  timerText.value = '00:00'
  countdown = 300
  certData.isReset = true
  certData.isSend = false
  umsCertNum.value = ''
  clearInterval(timerInterval)
}

const confirm = async () => {
  const isPass = await $utils.validate(smsNumRef)
  if (isPass) {
    $fx.startLoadingbar()
    callCertApi()
  }
}

onUnmounted(() => {
  clearInterval(timerInterval)
})

/*********************************** API ***************************/
const callCertApi = (type = 'CERT') => {
  const params = props.data
  params.type = type
  if (serialNo.value) {
    params.serialNo = serialNo.value
  }
  params.umsCertNum = umsCertNum.value

  loginApi.LOG0101S01(params).then((response) => {
    //로그인 성공
    if (response.result.result) {
      $fx.finishLoadingbar()
      if (response.result.resultCode === 'CERT') {
        serialNo.value = response.result.serialNo
        init()
        timerInterval = setInterval(updateTimer, 1000)
        certData.isSend = true
        umsCertNum.value = ''
      } else {
        //callCertApi()
        emits('close-dialog', { isPass: true, response: response })
      }
    } else {
      if (response?.resultCode === 'R1') {
        $fx.throwAlert('인증번호를 다시 입력해주세요.', '알림')
      } else if (response?.resultCode === 'R2') {
        $fx.throwAlert('인증 번호 입력 시간이 초과 되었습니다.').then(() => {
          reset()
        })
      } else if (response?.resultCode === 'R3') {
        $fx
          .throwAlert(
            '인증 번호 5회 이상 잘못 입력 되었습니다.<br>인증번호 재전송 버튼을 선택하세요.',
          )
          .then(() => {
            reset()
          })
      } else if (response?.resultCode === 'R4') {
        $fx.throwAlert('잘못된 요청입니다.<br>인증번호 재전송 버튼을 선택하세요.').then(() => {
          reset()
        })
      }
    }
  })
}
</script> 