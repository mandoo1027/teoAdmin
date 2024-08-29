<template>
  <v-form ref="form">
    <!-- 기관 정보 -->
    <h3 class="tit">기관 정보 입력</h3>
    <v-table class="vtable_view">
      <tbody>
        <tr>
          <th>기관코드</th>
          <td>
            <div class="d_flex">
              <v-text-field
                label="기관코드"
                ref="instCodeField"
                v-model="ordrInstCode"
                :rules="$utils.getRules(['code', 'maxLength|4'])"
                :maxlength="4"
                @input="changeInstCode"
                placeholder="기관코드 입력후 중복확인."
                class="i_basics w_200"
              ></v-text-field>
              <v-btn
                v-if="!ogranChkData.isValidate"
                size="small"
                @click.prevent="checkDuplData"
                class="vbtn ml_10 black"
                >중복확인
              </v-btn>
              <span class="confirm_txt" v-if="ogranChkData.isValidate"
                >사용 가능한 코드입니다.
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th>기관ID</th>
          <td>{{ ordrInstId }}</td>
        </tr>
        <tr>
          <th>기업구분</th>
          <td>
            <CommonComRadioButton
              groupCode="INST_DIV_CD"
              v-model="instDivCd"
              :rules="instDivCdRules"
              :isInline="true"
            />
          </td>
        </tr>
        <tr>
          <th>기관명</th>
          <td>
            <!-- 필수 -->
            <v-text-field
              label="기관명"
              v-model="ordrInstNm"
              :rules="$utils.getRules(['required|기관명을 입력해주세요.', 'maxLength|30'])"
              :maxlength="30"
              placeholder="기관명을 입력해주세요."
              class="i_basics w_320"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>사업자등록번호</th>
          <td>
            <v-text-field
              label="사업자등록번호"
              v-model="instBrno"
              :rules="
                $utils.getRules(['required|숫자만 입력해주세요.', 'minLength|10', 'maxLength|10'])
              "
              :maxlength="10"
              @input="replaceNum"
              type="number"
              placeholder="사업자등록번호를 입력해주세요."
              class="i_basics w_320"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <!-- 필수 -->
          <th>사업자명</th>
          <td>
            <v-text-field
              label="사업자명"
              v-model="instBrnoNm"
              :rules="$utils.getRules(['required|사업자명을 등록해주세요.', 'maxLength|30'])"
              :maxlength="30"
              placeholder="사업자명을 입력해주세요."
              class="i_basics w_320"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>대표자명</th>
          <td>
            <v-text-field
              label="대표자명"
              v-model="rprsvNm"
              :maxlength="30"
              placeholder="대표자명을 입력해주세요."
              class="i_basics w_320"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>사업장 주소</th>
          <td>
            <v-text-field
              label="사업장 주소"
              v-model="bplcAddr"
              :maxlength="60"
              placeholder="사업장주소를 입력해주세요."
              class="i_basics w_320"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>회사 이메일용 도메인</th>
          <td>
            <v-text-field
              label="회사 이메일 용 도메인"
              v-model="instEmailDomain"
              @input="pumCodeChange"
              :maxlength="50"
              placeholder="회사 이메일 용 도메인"
              class="i_basics w_320"
            ></v-text-field>
            <p class="tip_txt mt_10">
              회원가입 시 회사 이메일 정보로 추가 하시려면 일반회원 가입 시 이메일 정보 가입(예시.
              Shinhan.com)
            </p>
          </td>
        </tr>
        <tr>
          <th>가입 시작일 ~ 종료일</th>
          <td>
            <div class="d_flex">
              <div class="i_calender">
                <CommonComDatePicker
                  v-model="dataParams.startDate"
                  :rules="$utils.getRules(['required|날짜를 입력해주세요.'])"
                  class="i_date w_180"
                  placeholder="날짜선택"
                />
                <span id="startDate">~</span>
                <CommonComDatePicker
                  v-model="dataParams.endDate"
                  :rules="$utils.getRules(['required|날짜를 입력해주세요.'])"
                  class="i_date w_180"
                  placeholder="날짜선택"
                />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>발주기관 협약 기능</th>
          <td>
            <div class="d_flex a_center">
              <div class="w_192">
                <v-checkbox
                  v-model="shbCovFnctOcr"
                  @input="chkboxChk('A')"
                  :label="`AI-OCR`"
                  true-value="A"
                  false-value=""
                  class="ico_aiocr mt_3"
                />
              </div>
              <!-- <v-btn class="vbtn black" size="small" :disabled="isChkedAi" @click="goAiOcr">
                문서목록
              </v-btn> -->
            </div>
            <div class="d_flex a_start mt_5">
              <div class="w_192 mt_3">
                <v-checkbox
                  v-model="shbCovFnctAcc"
                  @input="chkboxChk('B')"
                  :label="`계좌이체`"
                  true-value="B"
                  false-value=""
                  class="ico_acc mt_10"
                />
              </div>
              <v-text-field
                label="펌 서비스 업체코드"
                id="pumText"
                v-model="covBCode"
                :disabled="isChkedPum"
                @input="pumCodeChange"
                :maxlength="10"
                placeholder="펌 서비스 업체코드를 입력해주세요"
                class="i_basics w_300"
              ></v-text-field>
              <!-- <v-btn class="vbtn black ml_5" size="small" @click="goPumCode">중복확인</v-btn> -->
            </div>
            <div class="d_flex a_start mt_5">
              <div class="w_192 mt_8">
                <v-checkbox
                  v-model="shbCovFnctEz"
                  @input="ocrChkbox"
                  :label="`계정이체(EasyPlus)`"
                  true-value="C"
                  false-value=""
                  class="ico_acc2"
                />
              </div>
              <v-text-field
                label="EZ+업체코드"
                id="ezText"
                v-model="covCCode"
                :disabled="isChkedEz"
                @input="ezCodeChange"
                :maxlength="10"
                placeholder="EZ+업체코드를 입력해주세요"
                class="i_basics w_300"
              ></v-text-field>
              <!-- <v-btn class="vbtn black ml_5" size="small" @click="goEzCode">중복확인</v-btn> -->
            </div>
          </td>
        </tr>
        <tr>
          <th>기관접속 URL</th>
          <td>
            <v-text-field
              label="기관접속 URL"
              v-model="conectUrl"
              :maxlength="40"
              placeholder="기관접속 URL을 입력해주세요."
              class="i_basics w_320"
            ></v-text-field>
            <p class="tip_txt mt_10">(예시. https://aicms.shinhan.com/idx?z=메뉴코드)</p>
          </td>
        </tr>
        <tr>
          <th>스킨용 CSS</th>
          <td>
            <v-text-field
              label="스킨용 CSS"
              v-model="ordrInstCss"
              :maxlength="30"
              placeholder="스킨용 CSS를 입력해주세요."
              class="i_basics w_320"
            ></v-text-field>
            <p class="tip_txt mt_10">(예시. skin_blue, skin_green, skin_violet)</p>
          </td>
        </tr>
        <tr>
          <th>로고용 CSS</th>
          <td>
            <v-text-field
              label="로고용 CSS"
              v-model="logoCss"
              :maxlength="30"
              placeholder="로고용 CSS를 입력해주세요."
              class="i_basics w_320"
            ></v-text-field>
            <p class="tip_txt mt_10">(예시. logo_기관코드(4))</p>
          </td>
        </tr>
        <tr>
          <th>비고</th>
          <td>
            <v-textarea
              v-model="remark"
              :maxlength="30"
              placeholder="비고를 입력해주세요."
              class="h_100"
            ></v-textarea>
          </td>
        </tr>
      </tbody>
    </v-table>

    <h3 class="tit">책임자 정보</h3>
    <v-table class="vtable_view">
      <tbody>
        <tr>
          <th>소속기관직무</th>
          <td>
            <CommonComRadioButton groupCode="INST_DTY_CD" v-model="instDtyCd" :isInline="true" />
          </td>
        </tr>
        <tr>
          <th>회원구분</th>
          <td>
            <CommonComRadioButton
              groupCode="MEM_DIV_CD"
              :delItems="[{ code: 'A' }, { code: 'E' }]"
              v-model="memDivCd"
              :isInline="true"
            />
          </td>
        </tr>
        <tr>
          <th>회원인증방법</th>
          <td>
            <CommonComRadioButton
              groupCode="MEM_CERT_DIV_CD"
              :delItems="[{ code: 'S1' }, { code: 'S2' }, { code: '0' }]"
              v-model="memCertDivCd"
              :isInline="true"
            />
          </td>
        </tr>
        <tr>
          <th>책임자 아이디</th>
          <td>
            <div class="d_flex">
              <v-text-field
                label="책임자 아이디"
                ref="memIdField"
                v-model="memId"
                :rules="$utils.getRules(['id', 'minLength|6', 'maxLength|16'])"
                @input="idChange"
                :maxlength="16"
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
            <p class="tip_txt mt_10">
              영문/숫자/특수문자 2가지 이상 조합, 동일한 문자/숫자 3가지 이상 연속 사용 불가합니다.
            </p>
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
                :rules="$utils.getRules(['required|성명이 입력되지 않았습니다.', 'maxLength|30'])"
                placeholder="성명을 입력해주세요."
                :maxlength="30"
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
                v-model="memBrth"
                :rules="$utils.getRules(['required|생년월일이 입력되지 않았습니다.', 'birth'])"
                :maxlength="8"
                @input="replaceNumber"
                placeholder="생년월일 8자리 입력"
                type="number"
                class="i_basics w_300"
              ></v-text-field>
              <CommonComRadioButton
                groupCode="MEM_SE_CD"
                v-model="memSeCd"
                :rules="$utils.getRules(['required|성별이 선택되지 않았습니다.'])"
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
    <v-btn class="vbtn" size="small" @click="goSignUp">기관 가입 완료</v-btn>
  </div>
</template>

<script setup>
// api ts
import { memApi, commonApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *********************************/
//const emailTypeCom = ref(null) // 이메일 타입 컴포넌트

// 파라미터 셋팅
const dataParams = ref({
  startDate: '',
  endDate: '',
})

// 모바일 데이터셋팅
// const mobileData = reactive({
//   moblTelno: '',
//   moblTelno1: '',
//   moblTelno2: '',
//   moblTelno3: '',
//   isValidate: false, // 유효성 검증
//   isReset: false,
//   // chkCode: '', //발송 코드
//   // serialNo: '',
//   isSend: false,
//   isCheck: false,
// })

// 이메일 데이타
// const emailData = reactive({
//   email: '',
//   emailText: '',
//   emailEtc: '',
//   emailType: '',
//   // serialNo: '',
//   isValidate: false, //유효성 검증
//   isReset: false,
//   // chkCode: '', //발송 코드
//   isSend: false,
//   isCheck: false,
// })

// 유효성 체크 관련 변수 선언
const valid = ref(false)
const form = ref(null)
const formRef = ref(null) // new

// 버튼관련 변수
const isModeFlag = ref(true)
const isSend = computed(() => dataParams.value.isSend)
const isShowEtcField = computed(() => emailData.emailType === 'etc')
const isUseEmailCert = computed(() => ntcnChnlDivCd.value === '2')
const isUsePhoneCert = computed(() => ntcnChnlDivCd.value === '1' || ntcnChnlDivCd.value === '9')

const mobileCom = ref(null) //휴대전화번호 컴포넌트
const emailCom = ref(null) //이메일 컴포넌트

const isChkedAi = ref(true) // AI-OCR
const isChkedPum = ref(true) // 계좌이체
const isChkedEz = ref(true) // 계정이체

/************* 기관 정보 관련 변수********/
const isDuplOrg = ref(false) // [기관정보] 기관명 중복 확인 여부
const instCodeField = ref('') // [기관정보] 기관명 엘리먼트
const instId = ref('') // [기관정보] 기관코드
const ordrInstCode = ref('') // [기관정보] 기관코드
const ordrInstId = ref('') // [기관정보] 기관ID
const instDivCd = ref('A') // [기관정보] 기업구분
const ordrInstNm = ref('') // [기관정보] 기관명
const instBrno = ref('') // [기관정보] 사업자번호등록번호
const instBrnoNm = ref('') // [기관정보] 사업자명
const rprsvNm = ref('') // [기관정보] 대표자명
const bplcAddr = ref('') // [기관정보] 사업장 주소
const instEmailDomain = ref('') // [기관정보] 회사 이메일 용 도메인
const instJoinDate = ref('') // [기관정보] 가입시작일
const instCnclDate = ref('') // [기관정보] 가입종료일
const conectUrl = ref('https://aicms.shinhan.com/idx?z=') // [기관정보] 접속 URL https://aicms.shinhan.com/idx?z=' 뒤에 기관코드 넣어주기
const ordrInstCss = ref('skin_blue') // [기관정보] 스킨용 CSS
const logoCss = ref('') // [기관정보] 로고용 CSS
const remark = ref('') // [기관정보] 비고

const shbCovFnct = ref('') // [기관정보] 발주기관협약기능 코드조합 : A AI-OCR, B 계좌이체, C 계정이체
const shbCovFnctOcr = ref('') // [기관정보] AI-OCR
const shbCovFnctAcc = ref('') // [기관정보] 계좌이체
const shbCovFnctEz = ref('') // [기관정보] 계정이체

const covBCode = ref('') // [기관정보] 계좌이체
const covCCode = ref('') // [기관정보] 계정이체

/************* 책임자 정보 관련 변수********/
const instDtyCd = ref('100') // [책임자] 소속기관직무
const memIdField = ref('') // 아이디 엘리먼트
const memId = ref('') // [책임자] 아이디
const memCertDivCd = ref('AA') // [책임자] 회원인증방법
const memPw = ref('') // [책임자] 비밀번호
const memPwOk = ref('') // [책임자] 비밀번호 확인
const memNm = ref('') // [책임자] 이름
const nltyDivCd = ref('0') // [책임자] 내외국인구분

const memDivCd = ref('M') // [책임자] 회원구분 == M: 책임자 기관가입은 무조건 책임자로 보낸다.
// const memDivCdItems = [{ label: '책임자', value: 'M' }]
const memBrth = ref('') // [책임자] 생년월일
const memSeCd = ref('M') // [책임자] 성별 (공통코드)
const ntcnChnlDivCd = ref('9') // [책임자] 안내 채널

/********************************* 벨리데이션 정의 *************************/
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

// pumCodeChangeItems ==>
const pumCodeChangeItems = [(v) => (v && v.length <= 10) || '최대 10글자까지 입력 가능합니다.']
const emailRules = [(v) => !!v || '이메일이 입력되지 않았습니다.']
const instEmailDomainItems = [
  (v) => !!v || '회사이메일용 도메인을 입력해주세요.',
  (v) => (v && v.length <= 50) || '최대 50글자까지 입력 가능합니다.',
]

const logoCssItems = [
  (v) => !!v || '로고용 CSS를 입력해주세요.',
  (v) => (v && v.length <= 50) || '최대 50글자까지 입력 가능합니다.',
]
const remarkItems = [(v) => (v && v.length <= 30) || '최대 30글자까지 입력 가능합니다.']
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

// 벨리데이션 체크
const validateData = computed(() => {
  return {
    isChkValdate: true, // 유효성 체크 대상 (false면 안함)
    data: {
      ntcnChnlDivCd: ntcnChnlDivCd.value, // 미사용, SMS, email인지 체크하기!
      // agree: agreeListChk.value, // 발주기관은 약관이 없다.
      // memNm: memNm.value, // 회원이름
      // memBrth: memBrth.value, // 회원생일
      // memSeCd: memSeCd.value, //
    },
  }
})
const isSuccess = ref(false)
const isLocal = computed(() => $fx.isLocal())

/********************************* methods 선언 및 정의 *************************/
// 최초 로드
onMounted(() => {
  passwordFormInit()
})

/******************************** */

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

//인증 초기화
const resetStatus = () => {
  isSuccess.value = false
}

// 이메일 형식 넣기
// const getEmailData = () => {
//   if (emailData.emailText && emailData.emailType === 'etc' && emailData.emailEtc) {
//     emailData.email = emailData.emailText + '@' + emailData.emailEtc
//   } else {
//     if (emailData.emailText && emailData.emailType) {
//       emailData.email = emailData.emailText + '@' + emailData.emailType
//     } else {
//       emailData.email = ''
//     }
//   }
//   return emailData
// }

// 안내 채널 변경시
const changeNtcnChnlDivCd = (value) => {
  // 2: email, 1: sms, 9: 미사용
  emailCom?.value?.init()
  mobileCom?.value?.init()
  $utils.validate(form)
}

// 아이디 관련 정보
const memberIdData = reactive({
  isValidate: false, //유효성 검증 여부
  isCheck: false, //중복 확인 버튼 클릭
})

// 기관 이름 검증 정보
const ogranChkData = reactive({
  isValidate: false, // 유효성 검증 여부
  isCheck: false, //중복 확인 버튼 클릭
})

// 아이디 변경시 중복 체크 초기화 + 정규식
const idChange = () => {
  memId.value = memId.value.toUpperCase()
  memId.value = memId.value.replace(/[^a-zA-Z0-9]/g, '')

  memberIdData.isValidate = false
}

// 기관코드 변경시 중복 체크 + 정규식
const changeInstCode = () => {
  ordrInstCode.value = ordrInstCode.value.toUpperCase()
  ordrInstCode.value = ordrInstCode.value.replace(/[^a-zA-Z]/g, '')

  ogranChkData.isValidate = false
}

// 펌 서비스 업체코드 한글빼기
const pumCodeChange = () => {
  ordrInstCode.value = ordrInstCode.value.toUpperCase()
  instEmailDomain.value = instEmailDomain.value.replace(/[^a-zA-Z0-9.]/g, '')
  covBCode.value = covBCode.value.replace(/[^a-zA-Z0-9]/g, '') // 펌뱅킹 ruels추가 : 한글빼고 숫자, 영어만 들어갈수있게.

  // memberIdData.isValidate = false // 중복체크 없어짐
}

// EZ+업체코드 한글빼기
const ezCodeChange = () => {
  covCCode.value = covCCode.value.toUpperCase()
  covCCode.value = covCCode.value.replace(/[^a-zA-Z0-9]/g, '')

  // memberIdData.isValidate = false // 중복체크 없어짐
}

// 이메일 타입 변경시 etc 초기화
// const changeEmailType = () => {
//   emailData.emailEtc = ''
// }

// ID 중복 확인
const idDuplicateChk = () => {
  $utils.validate(memIdField).then((result) => {
    if (result) {
      if ($utils.isEmpty(memId.value)) {
        $fx.throwAlert('아이디를 입력해주세요.', '알림')
      } else {
        memberIdData.isCheck = true // 중복확인요청

        callIdDupuChkApi() // 기관중복 체크 호출
      }
    }
  })
}

// 기관 중복 체크
const checkDuplData = () => {
  $utils.validate(instCodeField).then((result) => {
    if (result) {
      if ($utils.isEmpty(ordrInstCode.value)) {
        $fx.throwAlert('기관코드를 입력해주세요.', '알림')
      } else {
        ogranChkData.isCheck = true //중복확인요청

        callOrganDupuChkApi() // 기관중복 체크 호출
      }
    }
  })
}

// 발주기관 협약기능 체크박스 : AI-OCR, 계좌이체
const chkboxChk = (type) => {
  if (type === 'A') {
    // [기관정보] AI-OCR || [기관정보] 계좌이체
    if ($utils.isEmpty(shbCovFnctOcr.value)) {
      isChkedAi.value = true
    } else {
      isChkedAi.value = false
    }
  } else if (type === 'B') {
    if ($utils.isEmpty(shbCovFnctAcc.value)) {
      isChkedPum.value = true
    } else {
      isChkedPum.value = false
    }
  }

  // ------ 초기화 ------
  shbCovFnctEz.value = '' // 체크박스 초기화
  isChkedEz.value = true // disabled
  covCCode.value = '' // input 초기화
  // ------ 초기화 ------
}

// 발주기관 협약 기능 체크박스 : 계정이체
const ocrChkbox = () => {
  if ($utils.isEmpty(shbCovFnctEz.value)) {
    isChkedEz.value = true
  } else {
    isChkedEz.value = false
  }

  // ------ 초기화 ------
  isChkedAi.value = true
  isChkedPum.value = true
  shbCovFnctOcr.value = '' // AI-OCR 체크박스 초기화
  shbCovFnctAcc.value = '' // 계좌이체 체크박스 초기화
  covBCode.value = '' // input 초기화
  // ------ 초기화 ------
}

// 숫자만 입력 받도록 : 생일
const replaceNumber = (e) => {
  memBrth.value = e.target.value.substring(0, 8)
}

// 숫자만 입력 받도록 : 사업자번호
const replaceNum = (e) => {
  instBrno.value = e.target.value.substring(0, 10)
}

// 숫자만 입력 받도록 : 핸드폰
// const replaceMoNumber = (type) => {
//   // string으로 넣어야함
//   if (type === '1') {
//     mobileData.moblTelno1 = mobileData.moblTelno1.substring(0, 3)
//   } else if (type === '2') {
//     mobileData.moblTelno2 = mobileData.moblTelno2.substring(0, 4)
//   } else if (type === '3') {
//     mobileData.moblTelno3 = mobileData.moblTelno3.substring(0, 4)
//   }
// }

// 회원가입
const goSignUp = async () => {
  // 날짜 벨리데이션 체크
  if (dataParams.value.startDate > dataParams.value.endDate) {
    $fx.throwAlert('지정한 날짜를 다시 확인하세요. 종료일이 시작일보다 클수없습니다.', '알림')

    return
  }

  // 이메일 벨리데이션 형식 검증
  // if (emailData.emailText) {
  //   if (!emailData.emailType && emailData.emailType !== 'etc') {
  //     $fx.throwAlert('이메일 형식이 선택되지 않았습니다.', '알림')
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
    // console.log(data.isValid, 'data.isValid')
    if (!shbCovFnctOcr.value && !shbCovFnctAcc.value && !shbCovFnctEz.value) {
      $fx.throwAlert('발주기관 협약기능이 선택되지않았습니다.', '알림')
      document.getElementsByClassName('v-label v-label--clickable')[0].focus()

      return
    }

    // 업체코드 필수값체크: 임시로 빼놈
    // if (shbCovFnctAcc.value) {
    //   if (!covBCode.value) {
    //     $fx.throwAlert('업체코드를 입력해주세요.', '알림')
    //     document.getElementById('pumText').focus()
    //     return
    //   }
    // } else if (shbCovFnctEz.value) {
    //   if (!covCCode.value) {
    //     $fx.throwAlert('업체코드를 입력해주세요.', '알림')
    //     document.getElementById('ezText').focus()
    //     return
    //   }
    // }

    if (!dataParams.value.startDate && !dataParams.value.endDate) {
      $fx.throwAlert('날짜가 선택되지 않았습니다.', '알림')
      document
        .getElementsByClassName(
          'dp__pointer dp__input_readonly dp__input dp__input_icon_pad dp__input_reg',
        )[0]
        .focus()
      return
    }
    const isIdDup = memberIdData.isValidate
    const isCodeDup = ogranChkData.isValidate
    if (!isIdDup) {
      $fx.throwAlert('아이디 중복체크가 되지 않았습니다.', '알림')
    } else if (!isCodeDup) {
      $fx.throwAlert('기관코드 중복체크가 되지 않았습니다.', '알림')
    } else {
      callApi()
    }
  }
}

// 회원 가입 완료
const memSignUpOk = () => {
  let contentsMsg = '발주기관 회원가입이 완료되었습니다.'
  $fx.throwAlert(contentsMsg, '알림').then((result) => {
    $fx.move('AMEM109')
  })
}

/********************************* 링크 이동 선언 및 정의 *************************/
// 취소 : 회원목록으로 이동
const goCenl = () => {
  $fx.move('AMEM109')
}

/********************************* api 선언 및 정의 *************************/
// 발주기관 회원가입 API
const callApi = () => {
  let Ocr = shbCovFnctOcr.value
  let Acc = shbCovFnctAcc.value
  let ez = shbCovFnctEz.value
  shbCovFnct.value = Ocr + Acc + ez

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
    instMember: {
      instId: ordrInstId.value, // 기관ID
      instNm: ordrInstNm.value, // 기관명
      instDivCd: instDivCd.value, // 기업구분
      // instJoinStatCd: instJoinStatCd.value, // 기관회원가입상태 :  1 정상
      instJoinDate: dataParams.value.startDate, // 회원가입시작일
      instCnclDate: dataParams.value.endDate, // 회원가입종료일
      instEmailDomain: instEmailDomain.value, // 회사이메일주소
      // instCertDivCd: memCertDivCd.value, // 회원인증방법
    },
    // 사업자등록번호 정보
    bizReg: {
      instBrno: instBrno.value, // 사업자등록번호
      instBrnoNm: instBrnoNm.value, // 사업자명
      rprsvNm: rprsvNm.value, // 대표자명
      bplcAddr: bplcAddr.value, // 사업장 주소
    },
    // 책임자정보
    member: {
      instId: ordrInstId.value,
      memId: memId.value, // [책임자] 아이디
      memDivCd: memDivCd.value, // [책임자] 회원구분
      nltyDivCd: nltyDivCd.value, // [책임자] 내외국인
      memNm: memNm.value, // [책임자] 책임자성명
      memPw: memPwStr,
      memPwOk: memPwOkStr,
      // instDtyCd: instDtyCd.value, // [책임자] 패스워드
      memBrth: memBrth.value, // [책임자] 생일
      memSeCd: memSeCd.value, // [책임자] 성별
      ntcnChnlDivCd: ntcnChnlDivCd.value, // [책임자] 알림채널구분
      instDtyCd: instDtyCd.value, // [책임자] 소속기관직무
      memCertDivCd: memCertDivCd.value, // [책임자] 회원인증방법
      email: emailData?.email, // [책임자] 이메일 관련
      moblTelno1: mobileData?.moblTelno1,
      moblTelno2: mobileData?.moblTelno2,
      moblTelno3: mobileData?.moblTelno3,
    },
    ordrInst: {
      // 발주코드로 임시로
      instId: ordrInstId.value, // 발주기관ID : 발주기관코드(4)+"00"
      ordrInstCode: ordrInstCode.value, // 발주기관코드
      ordrInstNm: ordrInstNm.value, // 발주기관명

      shbJoinDate: dataParams.value.startDate, // 은행협약시작일자
      shbCnclDate: dataParams.value.endDate, // 은행협약종료일자
      shbCovStatCd: '1', // 은행협약상태
      shbCovFnct: shbCovFnct.value, // 발주기관협약기능 : SHB_COV_FNCT_CD 코드 조합

      covBCode: covBCode.value, // 계좌이체
      covCCode: covCCode.value, // 계정이체

      conectUrl: conectUrl.value, // 접속URL
      logoCss: logoCss.value, // 기관로고CSS
      ordrInstCss: ordrInstCss.value, // 기관정보CSS
      remark: remark.value, // 비고
    },
  }
  console.log(params, 'params???>>>')
  $fx.startLoadingbar()
  memApi
    .MEM0201I01(params)
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
    instId: ordrInstCode.value,
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
        // console.log(response, 'response')
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 기관코드 중복 조회
const callOrganDupuChkApi = () => {
  const params = {
    ordrInstCode: ordrInstCode.value, // 발주기관 코드
  }
  // console.log(params, '기관코드중복조회 체크')
  $fx.startLoadingbar()
  memApi
    .MEM0201S01(params)
    .then((response) => {
      if (response.result.result) {
        ordrInstId.value = ordrInstCode.value + '00'

        ogranChkData.isValidate = true // 검증 완료
      } else {
        $fx.throwAlert('이미 사용하고 있는 기관코드입니다. 다시 시도해주세요.', '알림')
      }
    })
    .catch((error) => {})
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
