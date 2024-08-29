<template>
  <v-form ref="form">
    <h3 class="tit">회원 정보입력</h3>
    <v-table class="vtable_view">
      <tbody>
        <tr>
          <th>기관선택</th>
          <td>
            <div class="d_flex">
              <v-text-field
                label="기관명"
                @click="searchOrgan"
                v-model="dataParams.instNm"
                :rules="instNmRules"
                :readonly="true"
                placeholder="기관 버튼을 클릭하세요"
                class="i_basics w_300"
              ></v-text-field>
              <v-btn class="vbtn ml_10 black" size="small" @click="searchOrgan"
                >발주기관 찾기</v-btn
              >
            </div>
          </td>
        </tr>
        <tr>
          <th>소속기관직무</th>
          <td>
            <CommonComRadioButton
              groupCode="INST_DTY_CD"
              v-model="instDtyCd"
              :isInline="true"
              :isDefault="true"
            />
          </td>
        </tr>
        <tr>
          <th>회원구분</th>
          <td>
            <CommonComRadioButton
              groupCode="MEM_DIV_CD"
              v-model="memDivCd"
              :delItems="[{ code: 'E' }, { code: 'M' }]"
              :isInline="true"
              :isDefault="true"
            />
          </td>
        </tr>
        <tr>
          <th>회원인증방법</th>
          <td>
            <CommonComRadioButton
              groupCode="MEM_CERT_DIV_CD"
              v-model="memCertDivCd"
              :delItems="[{ code: '0' }, { code: 'S1' }, { code: 'S2' }]"
              :isInline="true"
            />
          </td>
        </tr>
        <tr>
          <th>아이디</th>
          <td>
            <div class="d_flex">
              <v-text-field
                label="책임자 아이디"
                ref="memIdField"
                v-model="memId"
                :rules="$utils.getRules(['id', 'minLength|6', 'maxLength|16'])"
                :maxlength="16"
                @input="idChange"
                placeholder="영문 대문자, 숫자 6~16 자리"
                class="i_basics w_300"
              ></v-text-field>
              <v-btn
                v-if="!memberIdData.isValidate"
                class="vbtn ml_10 black"
                size="small"
                @click="idDuplicateChk"
                >중복확인</v-btn
              >
              <span class="confirm_txt" v-if="memberIdData.isValidate"
                >사용 가능한 아이디입니다.</span
              >
            </div>
          </td>
        </tr>
        <tr v-if="!isLocal">
          <td colspan="2" class="pd_0">
            <div class="ifm_keysec">
              <iframe id="passwordFrame" src="/admin/multiPassword.html" />
            </div>
          </td>
        </tr>
        <tr v-if="isLocal">
          <th>비밀번호</th>
          <td>
            <div class="input_keypad w_300">
              <v-text-field
                label="비밀번호"
                v-model="memPw"
                :maxlength="16"
                :rules="$utils.getRules(['password'])"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                class="i_basics w_300"
              ></v-text-field>
            </div>
          </td>
        </tr>
        <tr v-if="isLocal">
          <th>비밀번호확인</th>
          <td>
            <div class="input_keypad w_300">
              <v-text-field
                label="비밀번호"
                v-model="memPwOk"
                :maxlength="16"
                :rules="memPwOkRules"
                placeholder="비밀번호를 확인해 주세요."
                type="password"
                class="i_basics w_300"
              ></v-text-field>
            </div>
          </td>
        </tr>
        <tr>
          <th>성명/내외국인</th>
          <td>
            <div class="d_flex">
              <v-text-field
                label="성명을 입력해주세요."
                v-model="memNm"
                :maxlength="30"
                :rules="$utils.getRules(['required|성명이 입력되지 않았습니다.', 'maxLength|30'])"
                placeholder="성명을 입력해주세요."
                class="i_basics w_300"
              ></v-text-field>
              <CommonComRadioButton
                groupCode="NLTY_DIV_CD"
                v-model="nltyDivCd"
                :isInline="true"
                class="ml_5 mt_5"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>생년월일/성별</th>
          <td>
            <div class="d_flex">
              <v-text-field
                label="생년월일 8자리 입력"
                type="number"
                v-model="memBrth"
                :rules="$utils.getRules(['required|생년월일이 입력되지 않았습니다.', 'birth'])"
                :maxlength="8"
                @input="replaceNumber"
                placeholder="생년월일 8자리 입력"
                class="i_basics w_300"
              ></v-text-field>
              <CommonComRadioButton
                groupCode="MEM_SE_CD"
                v-model="memSeCd"
                :options="memSeRules"
                :isInline="true"
                class="ml_5 mt_5"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>안내채널</th>
          <td>
            <CommonComRadioButton
              groupCode="NTCN_CHNL_DIV_CD"
              v-model="ntcnChnlDivCd"
              @changeData="changeNtcnChnlDivCd"
              :isInline="true"
            />
          </td>
        </tr>
        <tr>
          <th>휴대전화번호</th>
          <td>
            <!-- <div class="d_flex">
              <v-text-field
                v-model="mobileData.moblTelno1"
                type="number"
                @input="replaceMoNumber('1')"
                :rules="
                  $utils.getRules([
                    'required|휴대번호를 입력해주세요.',
                    'minLength|3',
                    'maxLength|3',
                  ])
                "
                :maxlength="3"
                class="i_basics w_100"
              ></v-text-field>
              <v-text-field
                label="휴대전화번호 중간 자리"
                type="number"
                v-model="mobileData.moblTelno2"
                :rules="
                  $utils.getRules([
                    'required|휴대번호를 입력해주세요.',
                    'minLength|4',
                    'maxLength|4',
                  ])
                "
                :maxlength="4"
                @input="replaceMoNumber('2')"
                class="i_basics w_100 ml_5"
              ></v-text-field>
              <v-text-field
                label="휴대전화번호 마지막 자리"
                type="number"
                v-model="mobileData.moblTelno3"
                :rules="
                  $utils.getRules([
                    'required|휴대번호를 입력해주세요.',
                    'minLength|4',
                    'maxLength|4',
                  ])
                "
                :maxlength="4"
                @input="replaceMoNumber('3')"
                class="i_basics w_100 ml_5"
              ></v-text-field>
            </div> -->
            <COMCOM001C01
              ref="mobileCom"
              :validateData="validateData"
              :useCert="isUsePhoneCert"
              @resetStatus="resetStatus"
            />
          </td>
        </tr>
        <tr>
          <th>이메일</th>
          <td>
            <!-- <div class="d_flex">
              <v-text-field
                label="code"
                v-model="emailData.emailText"
                :maxlength="20"
                class="i_basics w_200"
              ></v-text-field>
              <span class="mt_8 ml_5">@</span>
              <CommonComSelectBox
                groupCode="EMAIL_DOMAIN_CD"
                v-model="emailData.emailType"
                :isShowEtc="true"
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
            </div> -->
            <COMCOM001C02
              ref="emailCom"
              :validateData="validateData"
              :useCert="isUseEmailCert"
              @resetStatus="resetStatus"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-form>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn black" size="small" @click="goCenl">취소</v-btn>
    <v-btn class="vbtn" size="small" @click="goSignUp">회원 가입 완료</v-btn>
  </div>
</template>

<script setup>
// api ts
import { memApi, commonApi } from '@/api/index.ts'

// import { utils } from 'xlsx'
const MEM001P01 = 'MEMMEM001P01' //기관 검색 팝업창

const mobileCom = ref(null) //휴대전화번호 컴포넌트
const emailCom = ref(null) //이메일 컴포넌트
const memIdField = ref(null) //아이디 컴포넌트
const instNmField = ref(null) //기관명 엘리먼트

const isLocal = computed(() => $fx.isLocal())

const isShowEtcField = computed(() => emailData.emailType === 'etc')
const isUseEmailCert = computed(() => ntcnChnlDivCd.value === '2')
const isUsePhoneCert = computed(() => ntcnChnlDivCd.value === '1' || ntcnChnlDivCd.value === '9')

// 파라미터 셋팅
const dataParams = ref({
  instId: '',
  instNm: '',
  instId: '',
})

// 모바일
// const mobileData = reactive({
//   moblTelno: '',
//   moblTelno1: '010',
//   moblTelno2: '',
//   moblTelno3: '',
// })

// 이메일 데이터
// const emailData = reactive({
//   email: '',
//   emailText: '',
//   emailEtc: '',
//   emailType: '',
// })

// 유효성 체크 관련 변수 선언
const valid = ref(false)
const form = ref(null)
const formRef = ref(null) // new

/************* 기관 정보 관련 변수********/
const instId = ref('') // 기관ID
const instNm = ref('') // 기관선택

const instDtyCd = ref('100') // 소속기관직무
const memDivCd = ref('A') // 회원구분 == A: 결제자
const memDivCdItems = ref('')
const memCertDivCd = ref('AA') // 회원인증방법 : 관리자인증
const memId = ref('') // 아이디
const memPw = ref('') // 비밀번호
const memPwOk = ref('') // 비밀번호 확인
const memNm = ref('') // 성명

const nltyDivCd = ref('0') // 내외국인구분
const instEmailDomain = ref('') // 기관 회사 이메일용 도메인
const memBrth = ref('') // 생년월일
const memSeCd = ref('M') // 성별
const ntcnChnlDivCd = ref('9') // 안내 채널

// 휴대폰 첫번째 자리
const itemsMobile = ref([
  { title: '010', value: '010' },
  { title: '011', value: '011' },
  { title: '016', value: '016' },
  { title: '017', value: '017' },
  { title: '018', value: '018' },
  { title: '019', value: '019' },
])

const isSuccess = ref(false)

//이메일 타입 변경시 etc 초기화
const changeEmailType = () => {
  emailData.emailEtc = ''
}

//데이터 셋팅
const setData = (data) => {
  emailData.emailText = data.emailText
  emailData.emailEtc = data.emailEtc
  emailData.emailType = data.emailType
}

// 안내 채널 변경시
const changeNtcnChnlDivCd = (value) => {
  // 2: email, 1: sms, 9: 미사용
  emailCom?.value?.init()
  mobileCom?.value?.init()
  $utils.validate(form)
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

/********************************* 벨리데이션 정의 *************************/
const memIdRules = [(v) => (v && /^[A-Z0-9]{6,16}$/.test(v)) || '영문 대문자, 숫자 6~16 자리']
const memPwRules = [
  (v) =>
    (v && v.length <= 20 && v.length >= 8) ||
    '비밀번호 설정 방법이 맞지 않습니다. 다시 입력해주세요.',
  (v) =>
    (v &&
      /^(?=.*[a-zA-Z])(?=.*[0-9!@#\$%\^\&*\)\(+=._-])(?=.*[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]).{8,}$/.test(
        v,
      )) ||
    '영문/숫자/특수문자 2가지 이상 조합해주세요.',
  (v) =>
    (v && /^(?!.*(.)\1\1)[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/.test(v)) ||
    '동일한 문자/숫자 3가지 이상 연속 사용 불가합니다.',
]
const memPwOkRules = [
  (v) => !!v || '비밀번호 확인이 입력되지 않았습니다.',
  (v) => memPw.value === v || '비밀번호와 비밀번호 확인이 맞지 않습니다. 다시 입력해주세요.',
]
const memNmRules = [(v) => !!v || '이름이 입력되지 않았습니다.']
const memSeRules = [(v) => !!v || '성별이 선택되지 않았습니다.']
const instDivCdRules = [(v) => !!v || '기업구분코드가 선택되지 않았습니다.']
const memBrthRules = [
  (v) => {
    return !!v || '생년월일이 입력되지 않았습니다.'
  },
]
const instNmRules = [(v) => !!v || '기관이 선택되지 않았습니다.']
const validateData = computed(() => {
  return {
    isChkValdate: true, //유효성 체크 대상 (false면 안함)
    // apiUrl: {
    //   req: 'LOG0101S11', //인증 요청
    //   confirm: 'LOG0101S12', //인증 확인
    // },
    data: {
      ntcnChnlDivCd: ntcnChnlDivCd.value,
      // agree: agreeListChk.value,
      // memNm: memNm.value,
      // memBrth: memBrth.value,
      // memSeCd: memSeCd.value,
    },
  }
})

/********************************* 변수 선언 및 정의 *************************/
// 아이디 관련 정보 검증
const memberIdData = reactive({
  isValidate: false, //유효성 검증 여부
  isCheck: false, //중복 확인 버튼 클릭
})

// 기관 이름 검증 정보
const ogranChkData = reactive({
  isValidate: false, // 유효성 검증 여부
  isCheck: false, //중복 확인 버튼 클릭
})

/********************************* methods 선언 및 정의 *************************/
onMounted(() => {
  passwordFormInit()
}) // 최초 로드

let intervalNumber
let nubmerCnt = 0
const passwordFormInit = () => {
  if (!isLocal.value) {
    $fx.startLoadingbar()
    setTimeout(async () => {
      try {
        const nonce = await commonApi.rndVal()
        let TNK_SR = nonce.RES_DAT.sessionId.replaceAll(/(?:\r\n|\r|\n)/g, '')
        document.getElementById('passwordFrame').contentWindow.initKey(TNK_SR)
        clearInterval(intervalNumber)
        $fx.finishLoadingbar()
      } catch (e) {
        intervalNumber = setInterval(() => {
          passwordFormInit()
        }, 2000)
      }
    }, 1000)
  }
}

// 아이디 변경시 중복 체크 초기화
const idChange = () => {
  memId.value = memId.value.toUpperCase()
  memId.value = memId.value.replace(/[^a-zA-Z0-9]/g, '')

  memberIdData.isValidate = false
}

// ID 중복 확인
const idDuplicateChk = () => {
  $utils.validate(memIdField).then((result) => {
    if (result) {
      if ($utils.isEmpty(memId.value)) {
        $fx.throwAlert('아이디를 입력해주세요.', '알림')
      } else {
        memberIdData.isCheck = true //중복확인요청

        callIdDupuChkApi() // 기관중복 체크 호출
      }
    }
  })
}

// 기관 검색
const searchOrgan = () => {
  $fx
    .throwDialog(MEM001P01, { data: { instFlag: 'O' }, close: false, title: '기관 검색' })
    .then((result) => {
      if (result) {
        dataParams.value.instNm = result.value?.title
        dataParams.value.instId = result.value?.value
      }
    })
}

// 숫자만 입력 받도록
const replaceNumber = (e) => {
  memBrth.value = e.target.value.substring(0, 8)
}

// 숫자만 입력
const replaceNum = (e) => {
  instBrno.value = e.target.value.substring(0, 8)
}

// 핸드폰 숫자만 입력
const replaceMoNumber = (type) => {
  if (type === '1') {
    mobileData.moblTelno1 = mobileData.moblTelno1.substring(0, 3)
  } else if (type === '2') {
    mobileData.moblTelno2 = mobileData.moblTelno2.substring(0, 4)
  } else if (type === '3') {
    mobileData.moblTelno3 = mobileData.moblTelno3.substring(0, 4)
  }
}
//인증 초기화
const resetStatus = () => {
  isSuccess.value = false
}
// 날짜 포멧형
const dateformatter = (params) => {
  const param = params.value
  if (!$utils.isEmpty(param)) {
    return $utils.formatDate(param, '-')
  }
  return null
}

// 회원가입
const goSignUp = async () => {
  // if (emailData.emailText) {
  //   console.log(emailData.emailText, 'emailData.emailText')
  //   if (!emailData.emailType && emailData.emailType !== 'etc') {
  //     $fx.throwAlert('이메일형식이 선택되지 않았습니다.', '알림')
  //     return false
  //   } else if (!emailData.emailEtc && emailData.emailType === 'etc') {
  //     $fx.throwAlert('이메일형식이 입력되지 않았습니다.', '알림')
  //     return false
  //   }
  // }

  let chkPwValue
  if (!isLocal.value) {
    chkPwValue = await document.getElementById('passwordFrame').contentWindow.validationPwChk()
    if (!chkPwValue) {
      return
    }
  }

  const data = $utils.validateForm(form)
  if (data.isValid) {
    const isIdDup = memberIdData.isValidate
    // 성공
    if (!isIdDup) {
      $fx.throwAlert('아이디 중복체크가 되지 않았습니다.', '알림')
    } else {
      callApi()
    }
  }
}

// 회원 가입 완료
const memSignUpOk = () => {
  let contentsMsg = '회원가입이 완료되었습니다.'
  $fx.throwAlert(contentsMsg, '알림').then((result) => {
    $fx.move('AMEM101')
  })
}

/********************************* 링크 이동 선언 및 정의 *************************/

// 취소 : 회원목록으로 이동
const goCenl = () => {
  $fx.move('AMEM101')
}

/********************************* api 선언 및 정의 *************************/

// 회원 회원가입 API
const callApi = () => {

  const emailData = emailCom?.value?.getEmailData()
  const mobileData = mobileCom?.value?.getMobileData()

  let hid_key_data_frm
  let hid_enc_data_frm
  let memPwStr
  let memPwOkStr
  if (!isLocal.value) {
    document.getElementById('passwordFrame').contentWindow.user_TK_makeEncData()
    hid_key_data_frm = encodeURI(
      document.getElementById('passwordFrame').contentWindow.getHidKeyDataFrm(),
    )
    hid_enc_data_frm = document.getElementById('passwordFrame').contentWindow.getEncDataFrm()
    memPwStr = document.getElementById('passwordFrame').contentWindow.getE2E_memPw()
    memPwOkStr = document.getElementById('passwordFrame').contentWindow.getE2E_memPwOk()
  } else {
    memPwStr = memPw.value
    memPwOkStr = memPwOk.value
    hid_key_data_frm = 'local'
    hid_enc_data_frm = 'local'
  }

  const params = {
    hidKeyData: hid_key_data_frm,
    hidEncData: hid_enc_data_frm,
    instId: dataParams.value.instId,
    memId: memId.value,
    instDtyCd: instDtyCd.value,
    memDivCd: memDivCd.value,
    nltyDivCd: nltyDivCd.value,
    memNm: memNm.value,
    memPw: memPwStr,
    memPwOk: memPwOkStr,
    memBrth: memBrth.value,
    memSeCd: memSeCd.value,
    ntcnChnlDivCd: ntcnChnlDivCd.value,
    memCertDivCd: memCertDivCd.value,
    email: emailData.email,
    moblTelno1: mobileData.moblTelno1,
    moblTelno2: mobileData.moblTelno2,
    moblTelno3: mobileData.moblTelno3,
  }
  console.log(params, 'params')
  $fx.startLoadingbar()
  memApi
    .MEM0202I05(params)
    .then((response) => {
      memSignUpOk()
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 아이디 중복 조회
const callIdDupuChkApi = () => {
  const params = {
    memId: memId.value,
  }

  $fx.startLoadingbar()
  memApi
    .MEM0201S02(params)
    .then((response) => {
      if (!response.result.result) {
        $fx.throwAlert('이미 사용하고있는 아이디 입니다. 다시 시도해주세요.', '알림')
      } else {
        memberIdData.isValidate = true // 검증
      }
    })
    .catch((error) => {})
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
