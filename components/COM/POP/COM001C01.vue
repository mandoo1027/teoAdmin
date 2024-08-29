<template>
  <div class="input_flex">
    <span class="mt_8 mr_5" v-if="phoneNumber">{{ compuPhoneNumber }}</span>
    <template v-else>
      <v-text-field
        label="휴대전화번호 첫번째 자리"
        v-model="mobileData.moblTelno1"
        :rules="moblTelno2Rules"
        type="number"
        class="i_basics w_100 ml_5"
        @input="replaceNumber('1')"
        :maxlength="3"
        :disabled="isSend"
      ></v-text-field>
      <v-text-field
        label="휴대전화번호 중간 자리"
        v-model="mobileData.moblTelno2"
        :rules="moblTelno2Rules"
        type="number"
        @input="replaceNumber('2')"
        class="i_basics w_100 ml_5"
        :disabled="isSend"
      ></v-text-field>
      <v-text-field
        label="휴대전화번호 마지막 자리"
        v-model="mobileData.moblTelno3"
        :rules="moblTelno2Rules"
        type="number"
        @input="replaceNumber('3')"
        class="i_basics w_100 ml_5"
        :disabled="isSend"
      ></v-text-field>
    </template>
    <v-btn
      v-if="useCert && !mobileData.isValidate"
      class="vbtn line ml_5"
      size="small"
      type="number"
      :disabled="!!!compuIsDisabledAuthBtn"
      @click.prevent="sendCode"
      >인증번호 {{ computedIsSendText }}</v-btn
    >
    <span class="time" v-html="timerText" v-if="isSend && !mobileData.isValidate" />
  </div>
  <div class="input_flex mt_10" v-if="isSend">
    <v-text-field
      label="code"
      ref="checkCodeFiled"
      v-model="mobileData.chkCode"
      :rules="chkCodeRules"
      placeholder="인증번호 6자리"
      @input="replaceNumber('4')"
      class="i_basics w_310"
      :disabled="!isSend || computedIsValidate"
    ></v-text-field>
    <v-btn
      v-if="!computedIsValidate"
      class="vbtn line ml_5"
      size="small"
      :disabled="!isSend"
      @click.prevent="confirm"
      >확인</v-btn
    >
    <span class="confirm_txt" v-if="computedIsValidate">인증번호가 확인되었습니다.</span>
  </div>
</template>
 
<script setup>
import { comApi } from '@/api/index.ts'
/********************************* 변수 선언 및 정의 *************************/
const checkCodeFiled = ref(null) //체크코드 필드
const emits = defineEmits(['setCertType', 'successCallBack', 'failCallBack'])
const props = defineProps({
  //인증번호 사용여부
  useCert: {
    type: Boolean,
    default: true,
  },
  //핸드폰번호
  phoneNumber: {
    type: String,
    default: '',
  },
  validateData: {
    type: Object,
    default: {
      isChkValdate: false, //유효성 체크 대상 (false면 안함)
      apiUrl: {
        req: '',
        confirm: '',
      },
      data: {},
    },
  },
})
//인증 버튼 비활성화
const compuIsDisabledAuthBtn = computed(() => {
  return (
    props?.phoneNumber || (mobileData.moblTelno1 && mobileData.moblTelno2 && mobileData.moblTelno3)
  )
})
// 검증 완료 여부
const computedIsValidate = computed(() => mobileData.isSend && mobileData.isValidate)
const compuPhoneNumber = computed(() => $utils.formatMaskPhoneNumber(props?.phoneNumber))
//핸드폰 데이터
const mobileData = reactive({
  moblTelno: '',
  moblTelno1: '010',
  moblTelno2: '',
  moblTelno3: '',
  isValidate: false, //유효성 검증
  chkCode: '', //발송 코드
  isSend: false,
})

//휴대폰 첫번째 자리
const itemsMobile = ref([
  { title: '010', value: '010' },
  { title: '011', value: '011' },
  { title: '016', value: '016' },
  { title: '017', value: '017' },
  { title: '018', value: '018' },
  { title: '019', value: '019' },
])
let countdown = 300 //5분 (300초) 설정
let timerInterval = '' //인터벌 넘버
const timerText = ref('05:00') // 노출 타이머
const isSend = computed(() => mobileData.isSend)
const computedIsSendText = computed(() => (mobileData.isSend ? '재전송' : ''))
const moblTelno2Rules = [(v) => !!v || !props.useCert || '값을 확인해주세요.']

const chkCodeRules = [
  (v) => {
    let returnData = typeof v === 'object' ? v[0] : v
    return returnData.length >= 6 || '인증번호를 다시 입력해주세요.'
  },
]

/********************************* METHODS *************************/
const paramsValidationChk = () => {
  const keyList = Object.keys(props?.validateData?.data)
  if (keyList.length === 0) {
    $fx.throwAlert('인증 파라미터를 체크해주세요.', '알림')
    return false
  }

  const emptyList = [] //빈값 체크
  keyList.map((code) => {
    if (!props?.validateData?.data[code]) {
      emptyList.push(code)
    }
  })
  if (emptyList.length > 0) {
    // 빈값이 있을 경우
    emits('failCallBack', emptyList)
    return false
  }
  return true
}
//인증번호 발송
const sendCode = () => {
  if (props.validateData.isChkValdate) {
    if (!paramsValidationChk()) {
      return
    }
  }
  if (!props.phoneNumber) {
    if (!mobileData.moblTelno1 || !mobileData.moblTelno2 || !mobileData.moblTelno3) {
      $fx.throwAlert('휴대번호를 확인해주세요.', '알림')
      return
    }
  }
  //sendCodeApi()
  mobileData.chkCode = ''
  init()
  mobileData.isSend = true
  timerInterval = setInterval(updateTimer, 1000)
}

//타이머 업데이트 함수
const updateTimer = () => {
  const minutes = Math.floor(countdown / 60)
  const seconds = countdown % 60
  timerText.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  if (countdown === 0) {
    //시간 초과
    init()
  } else {
    countdown--
  }
}
//인증번호관련 로직 초기화
const init = () => {
  mobileData.isSend = false
  clearInterval(timerInterval)
  timerText.value = '05:00'
  countdown = 300
  mobileData.isValidate = false
  emits('setCertType', '1')
}

//숫자만 입력 받도록
const replaceNumber = (type) => {
  if (type === '1') {
    mobileData.moblTelno1 = mobileData.moblTelno1.substring(0, 3)
  } else if (type === '2') {
    mobileData.moblTelno2 = mobileData.moblTelno2.substring(0, 4)
  } else if (type === '3') {
    mobileData.moblTelno3 = mobileData.moblTelno3.substring(0, 4)
  } else if (type === '4') {
    mobileData.chkCode = mobileData.chkCode.substring(0, 6)
  }
}
//인증번호 확인
const confirm = () => {
  console.log('confirm::')
  $utils.validate(checkCodeFiled).then((data) => {
    if (data) {
      sendCodeConfirmApi()
    }
  })
}

const getMobileData = () => {
  mobileData.moblTelno = mobileData.moblTelno1 + mobileData.moblTelno2 + mobileData.moblTelno3
  return mobileData
}

onUnmounted(() => {
  //화면 전환시 타이머 제거
  clearInterval(timerInterval)
})
defineExpose({ init, getMobileData })

/*********************************** API ***************************/

//인증 요청
const sendCodeApi = () => {
  $fx.startLoadingbar()
  const apiUrl = props.validateData.apiUrl.confirm
  const params = props.validateData.data
  params.email = getEmailData().email
  $fx.startLoadingbar()
  $fx
    .axios()
    .post(apiUrl, params)
    .then((response) => {
      mobileData.chkCode = ''
      init()
      mobileData.isSend = true
      timerInterval = setInterval(updateTimer, 1000)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

//인증 확인
const sendCodeConfirmApi = () => {
  mobileData.isValidate = true
  emits('successCallBack', true)
  return
  const apiUrl = props.validateData.apiUrl.confirm
  const params = {
    chkCode: emailData.chkCode,
  }
  $fx.startLoadingbar()
  $fx
    .axios()
    .post(apiUrl, params)
    .then((response) => {
      //인증코드 확인
      if (response.data) {
        mobileData.isValidate = response.data
        emits('successCallBack', response.data)
      } else {
        $fx.throwAlert('인증번호가 맞지 않습니다.', '알림')
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
