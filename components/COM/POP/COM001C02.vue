<template>
  <div class="input_flex">
    <span class="mt_8 mr_5" v-if="email">{{ emailData.email }}</span>
    <template v-else>
      <v-text-field
        label="Your Email"
        v-model="emailData.emailText"
        :rules="emailRules"
        :maxlength="20"
        :disabled="isSend"
        class="i_basics w_200"
      ></v-text-field>
      <CommonComSelectBox
        ref="emailTypeCom"
        groupCode="EMAIL_DOMAIN_CD"
        v-model="emailData.emailType"
        :isShowEtc="true"
        :disabled="isSend"
        @changeValue="changeEmailType"
        class="s_basics w_200 ml_5"
      />
      <v-text-field
        label="Your Email"
        v-if="isShowEtcField"
        v-model="emailData.emailEtc"
        :rules="emailRules"
        :maxlength="20"
        :disabled="isSend"
        class="i_basics w_200 ml_5"
      ></v-text-field>
    </template>
    <v-btn
      v-if="useCert && !emailData.isValidate"
      :disabled="!!!compuIsDisabledAuthBtn"
      class="vbtn line ml_5"
      size="small"
      @click="sendCode"
      >인증번호 {{ computedIsSendText }}</v-btn
    >
    <span class="time" v-html="timerText" v-if="isSend && !emailData.isValidate" />
  </div>
  <div class="input_flex mt_10" v-if="isSend">
    <v-text-field
      label="code"
      v-model="emailData.chkCode"
      ref="checkCodeFiled"
      :rules="chkCodeRules"
      placeholder="인증번호 6자리"
      type="number"
      @input="replaceNumber('4')"
      :disabled="!isSend || computedIsValidate"
      class="i_basics w_310"
    ></v-text-field>
    <v-btn
      v-if="!computedIsValidate"
      class="vbtn line ml_5"
      size="small"
      :disabled="!isSend"
      @click="confirm"
      >확인</v-btn
    >
    <span class="confirm_txt" v-if="computedIsValidate">인증번호가 확인되었습니다.</span>
  </div>
</template>
 
<script setup>
/********************************* 변수 선언 및 정의 *************************/

const emailTypeCom = ref(null) //이메일 타입 컴포넌트

//인증번호 활성화 여부
const compuIsDisabledAuthBtn = computed(() => {
  return (
    props.email ||
    (emailData.emailText && emailData.emailType === 'etc' && emailData.emailEtc) ||
    (emailData.emailText && emailData.emailType !== 'etc' && emailData.emailType)
  )
})

import { comApi } from '@/api/index.ts'
const checkCodeFiled = ref(null) //체크코드 필드
const emits = defineEmits(['setCertType', 'successCallBack', 'failCallBack'])
const props = defineProps({
  //인증번호 사용여부
  useCert: {
    type: Boolean,
    default: true,
  },
  //이메일
  email: {
    type: String,
    default: '',
  },
  validateData: {
    type: Object,
    default: {
      isChkValdate: false, //유효성 체크 대상 (false면 안함)
      apiUrl: '',
      data: {},
    },
  },
})

const emailData = reactive({
  email: '',
  emailText: '',
  emailEtc: '',
  emailType: '',
  isValidate: false, //유효성 검증
  chkCode: '', //발송 코드
  isSend: false,
})

let countdown = 300 //5분 (300초) 설정
let timerInterval = '' //인터벌 넘버
const timerText = ref('05:00') // 노출 타이머
const isSend = computed(() => emailData.isSend)
const computedIsSendText = computed(() => (emailData.isSend ? '재전송' : ''))
// 검증 완료 여부
const computedIsValidate = computed(() => emailData.isSend && emailData.isValidate)
const emailRules = [(v) => !!v || !props.useCert || '이메일이 입력되지 않았습니다.']

const emailTypeRules = []
const emailEtcRules = []

const isShowEtcField = computed(() => emailData.emailType === 'etc')
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
  //파라미터로 값이 넘어오지않으면
  if (!props.email) {
    //현재 입력되어있는지 체크
    if (
      !emailData.emailText ||
      (emailData.emailType === 'etc' && !emailData.emailEtc) ||
      !emailData.emailType
    ) {
      $fx.throwAlert('이메일 정보를 입력해주세요.', '알림')
      return
    }
  }
  //sendCodeApi()
  emailData.chkCode = ''
  init()
  emailData.isSend = true
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
//이메일 타입 변경시 etc 초기화
const changeEmailType = () => {
  emailData.emailEtc = ''
}

//인증번호관련 로직 초기화
const init = () => {
  emailData.isSend = false
  clearInterval(timerInterval)
  timerText.value = '05:00'
  countdown = 300
  emailData.isValidate = false
  emits('setCertType', '2')
}

const getEmailData = () => {
  if (emailData.emailType === 'etc') {
    emailData.email = emailData.emailText + '@' + emailData.emailEtc
  } else {
    if (emailData.emailText) {
      emailData.email = emailData.emailText + '@' + emailData.emailType
    } else {
      emailData.email = ''
    }
  }
  return emailData
}
//숫자만 입력 받도록
const replaceNumber = (type) => {
  emailData.chkCode = emailData.chkCode.substring(0, 6)
}

//인증번호 확인
const confirm = () => {
  $utils.validate(checkCodeFiled).then((data) => {
    if (data) {
      sendCodeConfirmApi()
    }
  })
}
onMounted(() => {
  emailData.email = props.email //값으로 던진 이메일 적용
})

onUnmounted(() => {
  //화면 전환시 타이머 제거
  clearInterval(timerInterval)
})

//기관 이메일 셋팅
const setEmailType = (emailType) => {
  emailTypeCom.value.setEmailType(emailType)
}

defineExpose({ init, getEmailData, setEmailType })

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
      emailData.chkCode = ''
      init()
      emailData.isSend = true
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
  emailData.isValidate = true
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
