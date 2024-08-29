<template>
  <div class="d_flex" v-if="!emailData.isValidate">
    <v-text-field
      label="Your Email"
      v-model="emailData.emailText"
      :rules="emailRules"
      :maxlength="20"
      class="i_basics w_200 mr_5"
    ></v-text-field>
    <span class="mt_8">@</span>
    <CommonComSelectBox
      ref="emailTypeCom"
      groupCode="EMAIL_DOMAIN_CD"
      :rules="emailSelectRules"
      v-model="emailData.emailType"
      :isShowEtc="true"
      :isDefault="true"
      @changeValue="changeEmailType"
      class="s_basics w_200 ml_5 none_details"
    />
    <v-text-field
      label="Your Email"
      v-if="isShowEtcField"
      v-model="emailData.emailEtc"
      :rules="emailRules"
      :maxlength="20"
      class="i_basics w_200 ml_5"
    ></v-text-field>
  </div>
</template>

<script setup>
/********************************* 변수 선언 및 정의 *************************/

//인증번호 활성화 여부
// const compuIsDisabledAuthBtn = computed(() => {
//   return (
//     props.email ||
//     (emailData.emailText && emailData.emailType === 'etc' && emailData.emailEtc) ||
//     (emailData.emailText && emailData.emailType !== 'etc' && emailData.emailType)
//   )
// })

import { comApi } from '@/api/index.ts'

const emailTypeCom = ref(null) //이메일 타입 컴포넌트
const checkCodeFiled = ref(null) //체크코드 필드
const emits = defineEmits(['setCertType', 'resetStatus'])
const props = defineProps({
  //인증번호 사용여부
  useCert: {
    type: Boolean,
    default: false,
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
      apiUrl: {
        req: '',
        confirm: '',
      },
      data: {},
    },
  },
})

// const computedIsSendText = computed(() => (emailData.isSend ? '재전송' : ''))

// 검증 완료 여부
const computedIsValidate = computed(() => emailData.isSend && emailData.isValidate)
const compuReset = computed(() => emailData.isReset)

const emailRules = [(v) => !!v || !props.useCert || '이메일이 입력되지 않았습니다.']
const emailSelectRules = [(v) => !!v || !props.useCert || '타입이 선택되지 않았습니다.']

const isUseEmailCert = computed(() => ntcnChnlDivCd.value === '2')
const isShowEtcField = computed(() => emailData.emailType === 'etc')
const chkCodeRules = [
  (v) => {
    let returnData = typeof v === 'object' ? v[0] : v
    return returnData.length >= 6 || '인증번호를 다시 입력해주세요.'
  },
]
const emailData = reactive({
  email: '',
  emailText: '',
  emailEtc: '',
  emailType: '',
  serialNo: '',
  isValidate: false, //유효성 검증
  isReset: false,
  chkCode: '', //발송 코드
  isSend: false,
})

/********************************* METHODS *************************/
// 이메일 타입 변경시 etc 초기화
const changeEmailType = () => {
  emailData.emailEtc = ''
}

// 부모 페이지에서 데이터 변경시 초기화
const parentsDataChangeInit = () => {
  emailData.isSend = false
  emailData.isValidate = false

  emailData.isReset = false
  emailData.chkCode = ''

  emits('resetStatus') //인증 초기화
}

// 인증번호관련 로직 초기화
const init = () => {
  parentsDataChangeInit() //초기화 로직이 동일해서 활용
  emits('setCertType', '2')
}

// 인증 리셋
const reset = () => {
  emailData.isReset = true
}

const getEmailData = () => {
  if (emailData.emailText && emailData.emailType === 'etc' && emailData.emailEtc) {
    emailData.email = emailData.emailText + '@' + emailData.emailEtc
  } else {
    if (emailData.emailText && emailData.emailType) {
      emailData.email = emailData.emailText + '@' + emailData.emailType
    } else {
      emailData.email = ''
    }
  }
  return emailData
}

onUnmounted(() => {})

// 데이터 셋팅
const setData = (data) => {
  emailData.emailText = data.emailText
  emailData.emailEtc = data.emailEtc
  emailData.emailType = data.emailType
}

// 유효성 체크
const validation = () => {
  if (emailData.emailText) {
    if (!emailData.emailType && emailData.emailType !== 'etc') {
      $fx.throwAlert('이메일형식이 선택되지 않았습니다.', '알림')
      return false
    } else if (!emailData.emailEtc && emailData.emailType === 'etc') {
      $fx.throwAlert('이메일형식이 입력되지 않았습니다.', '알림')
      return false
    } else if (validationEmail()) {
      $fx.throwAlert('이메일형식이 맞지 않습니다.', '알림')
      return false
    }
  }
  return true
}

// 이메일 유효성 검증
const validationEmail = (email) => {
  const regex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/
  return regex.test(email)
}

defineExpose({ init, getEmailData, validation, setData })
</script>
