<template>
  <div class="d_flex" v-if="!mobileData.isValidate">
    <v-text-field
      label="휴대전화번호 첫번째 자리"
      v-model="mobileData.moblTelno1"
      :rules="moblTelno1Rules"
      type="number"
      class="i_basics w_100"
      @input="replaceNumber('1')"
      :maxlength="3"
    ></v-text-field>
    <v-text-field
      label="휴대전화번호 중간 자리"
      v-model="mobileData.moblTelno2"
      :rules="moblTelnoRules"
      :maxlegnth="4"
      type="number"
      @input="replaceNumber('2')"
      class="i_basics w_100 ml_5"
    ></v-text-field>
    <v-text-field
      label="휴대전화번호 마지막 자리"
      v-model="mobileData.moblTelno3"
      :rules="moblTelnoRules"
      type="number"
      :maxlegnth="4"
      @input="replaceNumber('3')"
      class="i_basics w_100 ml_5"
    ></v-text-field>
  </div>
</template>

<script setup>
import { comApi } from '@/api/index.ts'
/********************************* 변수 선언 및 정의 *************************/
const checkCodeFiled = ref(null) //체크코드 필드
const emits = defineEmits(['setCertType', 'resetStatus'])
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

// 검증 완료 여부
const computedIsValidate = computed(() => mobileData.isSend && mobileData.isValidate)
const compuPhoneNumber = computed(() => $utils.formatMaskPhoneNumber(props?.phoneNumber))
const compuReset = computed(() => mobileData.isReset)
const moblTelno1Rules = [
  (v) => !!v || !props.useCert || '휴대전화번호가 입력되지않았습니다.',
  (v) => !props.useCert || (v && v.length > 2) || '최소 3글자를 입력해주세요.',
]
const moblTelnoRules = [
  (v) => !!v || !props.useCert || '휴대전화번호가 입력되지않았습니다.',
  (v) => !props.useCert || (v && v.length > 3) || '최소 4글자를 입력해주세요.',
]
const isUsePhoneCert = computed(() => ntcnChnlDivCd.value === '1' || ntcnChnlDivCd.value === '9')
//핸드폰 데이터
const mobileData = reactive({
  moblTelno: '',
  moblTelno1: '',
  moblTelno2: '',
  moblTelno3: '',
  isValidate: false, //유효성 검증
  isReset: false,
  chkCode: '', //발송 코드
  serialNo: '',
  isSend: false,
})

/********************************* METHODS *************************/
// onMounted(() => {
//   console.log(props, '안내채널')
// })
//검증값이 바뀌면 인증 초기화
// watch(
//   () => props?.validateData,
//   // () => {
//   //   parentsDataChangeInit()
//   // },
//   // { deep: true },
// )

// const paramsValidationChk = () => {
//   const keyList = Object.keys(props?.validateData?.data)
//   if (keyList.length === 0) {
//     $fx.throwAlert('인증 파라미터를 체크해주세요.', '알림')
//     return false
//   }

//   const emptyList = [] //빈값 체크
//   keyList.map((code) => {
//     if (!props?.validateData?.data[code]) {
//       emptyList.push(code)
//     }
//   })
//   if (emptyList.length > 0) {
//     // 빈값이 있을 경우
//     emits('failCallBack', emptyList)
//     return false
//   }
//   return true
// }

// 인증번호 발송
// const sendCode = () => {
//   if (props.validateData.isChkValdate) {
//     if (!paramsValidationChk()) {
//       return
//     }
//   }
//   if (!props.phoneNumber) {
//     if (!mobileData.moblTelno1 || !mobileData.moblTelno2 || !mobileData.moblTelno3) {
//       $fx.throwAlert('휴대번호를 확인해주세요.', '알림')
//       return
//     }
//   }
//   sendCodeApi()
// }

// 타이머 업데이트 함수
// const updateTimer = () => {
//   const minutes = Math.floor(countdown / 60)
//   const seconds = countdown % 60
//   timerText.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
//   if (countdown === 0) {
//     // 시간 초과
//     reset()
//     $fx.throwAlert('인증 번호 입력 시간이 초과 되었습니다.')
//   } else {
//     countdown--
//   }
// }

// 인증번호관련 로직 초기화
const parentsDataChangeInit = () => {
  mobileData.isSend = false

  mobileData.isValidate = false
  mobileData.isReset = false
  mobileData.chkCode = ''
  emits('resetStatus') // 인증 초기화
}

// 인증번호관련 로직 초기화
const init = () => {
  parentsDataChangeInit()
  emits('setCertType', '1')
}

// 인증 리셋
const reset = () => {
  mobileData.isReset = true
}

// 숫자만 입력 받도록
const replaceNumber = (type) => {
  if (type === '1') {
    mobileData.moblTelno1 = mobileData.moblTelno1.substring(0, 3)
  } else if (type === '2') {
    mobileData.moblTelno2 = mobileData.moblTelno2.substring(0, 4)
  } else if (type === '3') {
    mobileData.moblTelno3 = mobileData.moblTelno3.substring(0, 4)
  }
}

// 유효성 체크
const validation = () => {
  if (!mobileData.moblTelno1 && !mobileData.moblTelno2 && !mobileData.moblTelno3) {
    return true
  } else if (mobileData.moblTelno1 && mobileData.moblTelno2 && mobileData.moblTelno3) {
    return true
  } else {
    let result = $fx.throwAlert('핸드폰 번호를 입력해주세요.')
    return false
  }
}

// 핸드폰 번호 들어감
const getMobileData = () => {
  mobileData.moblTelno = mobileData.moblTelno1 + mobileData.moblTelno2 + mobileData.moblTelno3
  return mobileData
}

// 휴대폰 입력
const setData = (data) => {
  mobileData.moblTelno1 = data.moblTelno1
  mobileData.moblTelno2 = data.moblTelno2
  mobileData.moblTelno3 = data.moblTelno3
}

onUnmounted(() => {})
defineExpose({ init, getMobileData, validation, setData })

/*********************************** API ***************************/
</script>
