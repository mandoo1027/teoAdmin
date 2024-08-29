<template>
  <v-form ref="form">
    <h3 class="tit">기관 정보변경</h3>
    <v-table class="vtable_view">
      <tbody>
        <tr>
          <th>발주기관코드</th>
          <td>{{ ordrInstCode }}</td>
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
              placeholder="기관명을 입력해주세요."
              :maxlength="30"
              class="i_basics w_300"
            ></v-text-field>
            <!-- :rules="instNmRules" -->
          </td>
        </tr>
        <tr>
          <th>사업자등록번호</th>
          <td>{{ instBrno }}</td>
        </tr>
        <tr>
          <!-- 필수 -->
          <th>사업자명</th>
          <td>
            <v-text-field
              label="사업자명을 등록해주세요."
              v-model="instBrnoNm"
              :rules="$utils.getRules(['required|사업자명을 입력해주세요.', 'maxLength|30'])"
              placeholder="사업자명을 입력해주세요."
              :maxlength="30"
              class="i_basics w_300"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>대표자명</th>
          <td>
            <v-text-field
              label="대표자명을 입력해주세요."
              v-model="rprsvNm"
              :maxlength="30"
              placeholder="대표자명을 입력해주세요."
              class="i_basics w_300"
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
              placeholder="사업장 주소를 입력해주세요."
              class="i_basics w_300"
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
              class="i_basics w_300"
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
                  v-model="instJoinDate"
                  :rules="$utils.getRules(['required|날짜를 입력해주세요.'])"
                  :maxlength="10"
                  class="i_date w_180"
                  placeholder="날짜선택"
                />
                <span>~</span>
                <CommonComDatePicker
                  v-model="instCnclDate"
                  :rules="$utils.getRules(['required|날짜를 입력해주세요.'])"
                  :maxlength="10"
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
                  class="ico_aiocr"
                />
              </div>
              <!-- <v-btn class="vbtn black" size="small" @click="onView">문서목록</v-btn> -->
            </div>
            <div class="d_flex a_start mt_5">
              <div class="w_192 mt_8">
                <v-checkbox
                  v-model="shbCovFnctAcc"
                  :label="`계좌이체`"
                  @input="chkboxChk('B')"
                  true-value="B"
                  false-value=""
                  :maxlength="10"
                  class="ico_acc"
                />
              </div>
              <v-text-field
                label="펌 서비스 업체코드"
                v-model="covBCode"
                placeholder="펌 서비스 업체코드"
                :disabled="!isChkedPum"
                @input="pumCodeChange"
                :maxlength="10"
                class="i_basics w_300"
              ></v-text-field>
            </div>
            <div class="d_flex a_start mt_5">
              <div class="w_192 mt_8">
                <v-checkbox
                  v-model="shbCovFnctEz"
                  :label="`계정이체(EasyPlus)`"
                  @input="ocrChkbox"
                  true-value="C"
                  false-value=""
                  class="ico_acc2"
                />
              </div>
              <v-text-field
                label="EZ+업체코드"
                v-model="covCCode"
                :disabled="!isChkedEz"
                @input="ezCodeChange"
                :maxlength="10"
                placeholder="EZ+업체코드"
                class="i_basics w_300"
              ></v-text-field>
            </div>
          </td>
        </tr>
        <tr>
          <th>기관접속 URL</th>
          <td>
            <!-- {{ conectUrl }} -->
            <v-text-field
              label="기관접속 URL"
              v-model="conectUrl"
              :maxlength="40"
              placeholder="기관접속 URL를 입력해주세요."
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
              class="i_basics w_300"
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
              class="i_basics w_300"
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
  </v-form>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn black" size="small" @click="goCenl">취소</v-btn>
    <v-btn class="vbtn" size="small" @click="goUpdate">발주 기관 변경</v-btn>
  </div>
</template>

<script setup>
// api ts
import { memApi } from '@/api/index.ts'
// import { utils } from 'xlsx'

// 파라미터 셋팅
const dataParams = ref({
  startDate: '',
  endDate: '',
})

// 유효성 체크 관련 변수 선언
const valid = ref(false)
const form = ref(null)
const formRef = ref(null) // new

/************* 기관 정보 관련 변수********/
// 바뀔수없는 값
const ordrInstCode = ref('') // 발주기관코드
const ordrInstId = ref('') // 발주기관 아이디
const conectUrl = ref('') // 기관접속 URL

const instDivCd = ref('A') // 기업구분
const ordrInstNm = ref('') // 기관명
const instBrno = ref('') // 사업자번호등록번호
const instBrnoNm = ref('') // 사업자명
const rprsvNm = ref('') // 대표자명
const bplcAddr = ref('') // 사업장 주소
const instEmailDomain = ref('') // 회사 이메일 용 도메인
const instJoinDate = ref('') // 가입시작일
const instCnclDate = ref('') // 가입종료일
const ordrInstCss = ref('skin_blue') // 스킨용 CSS
const logoCss = ref('') // 로고용 CSS
const remark = ref('') // 비고

// 발주기관 협약기능
const shbCovFnct = ref('')
const shbCovFnctOcr = ref('')
const shbCovFnctAcc = ref('')
const shbCovFnctEz = ref('')

const covBCode = ref('') // [기관정보] 계좌이체
const covCCode = ref('') // [기관정보] 계정이체

const covBCodeData = ref('') // [기관정보] 계좌이체 Params
const covCCodeData = ref('') // [기관정보] 계정이체 Params

// ----- 디세이블 -----
const isChkedPum = ref(false) // 계좌이체
const isChkedEz = ref(false) // 계정이체
// ----- 디세이블 -----

const memIdFild = ref('')
const isSuccess = ref(false) // 인증 여부
const isModeFlag = ref(true) // 버튼관련 변수

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
const rprsvNmItems = [
  (v) => !!v || '대표자명을 입력해주세요.',
  (v) => (v && v.length <= 30) || '최대 30글자까지 입력 가능합니다.',
]
const bplcAddrItems = [
  (v) => !!v || '사업자명을 입력해주세요.',
  (v) => (v && v.length <= 30) || '최대 30글자까지 입력 가능합니다.',
]

const instEmailDomainItems = [
  (v) => !!v || '회사이메일용 도메인을 입력해주세요.',
  (v) => (v && v.length <= 50) || '최대 50글자까지 입력 가능합니다.',
]

const ordrInstCssItems = [
  (v) => !!v || '스킨용 CSS를 입력해주세요.',
  (v) => (v && v.length <= 100) || '최대 100글자까지 입력 가능합니다.',
]

const logoCssItems = [
  (v) => !!v || '로고용 CSS를 입력해주세요.',
  (v) => (v && v.length <= 100) || '최대 100글자까지 입력 가능합니다.',
]

const remarkItems = [(v) => (v && v.length <= 30) || '최대 30글자까지 입력 가능합니다.']
const validateData = computed(() => {
  return {
    isChkValdate: false, //유효성 체크 대상 (false면 안함)
    apiUrl: {
      req: 'LOG0101S11', //인증 요청
      confirm: 'LOG0101S12', //인증 확인
    },
    data: {
      agree: agreeListChk.value,
      memNm: memNm.value,
      memBrth: memBrth.value,
      memSeCd: memSeCd.value,
    },
  }
})

/********************************* 변수 선언 및 정의 *************************/

/********************************* methods 선언 및 정의 *************************/
// 최초 로드
onMounted(() => {
  if ($fx.getParams().memId) {
    memIdFild.value = $fx.getParams().memId
    callApi()
  } else {
    $fx.move('AMEM109') // 목록으로 보내기
  }
})

// 숫자만 입력 받도록
const replaceNumber = (e) => {
  memBrth.value = e.target.value.substring(0, 8)
}

// 숫자만 입력
const replaceNum = (e) => {
  instBrno.value = e.target.value.substring(0, 8)
}

// 펌 서비스 업체코드 한글빼기
const pumCodeChange = () => {
  ordrInstCode.value = ordrInstCode.value.toUpperCase()
  instEmailDomain.value = instEmailDomain.value.replace(/[^a-zA-Z0-9.]/g, '')
  covBCode.value = covBCode.value.toUpperCase()
  covBCode.value = covBCode.value.replace(/[^a-zA-Z0-9]/g, '') // 펌뱅킹 ruels추가 : 한글빼고 숫자, 영어만 들어갈수있게.
}

// EZ+업체코드 한글빼기
const ezCodeChange = () => {
  covCCode.value = covCCode.value.toUpperCase()
  covCCode.value = covCCode.value.replace(/[^a-zA-Z0-9]/g, '')

  // memberIdData.isValidate = false // 중복체크 없어짐
}

// 발주기관 협약기능 체크박스 : AI-OCR, 계좌이체
const chkboxChk = (type) => {
  if (type === 'B') {
    if ($utils.isEmpty(shbCovFnctAcc.value)) {
      isChkedPum.value = false
    } else {
      isChkedPum.value = true
    }
  }

  // ------ 초기화 ------
  shbCovFnctEz.value = '' // 체크박스 초기화
  isChkedEz.value = false // disabled
  covCCode.value = '' // input 초기화
  // ------ 초기화 ------
}

// 발주기관 협약 기능 체크박스 : 계정이체
const ocrChkbox = () => {
  if ($utils.isEmpty(shbCovFnctEz.value)) {
    isChkedEz.value = false
  } else {
    isChkedEz.value = true
  }

  // ------ 초기화 ------
  isChkedPum.value = false
  shbCovFnctOcr.value = '' // AI-OCR 체크박스 초기화
  shbCovFnctAcc.value = '' // 계좌이체 체크박스 초기화
  covBCode.value = '' // input 초기화
  // ------ 초기화 ------
}

// 수정 체크
const goUpdate = () => {
  // 체크하고 값안넣었을때
  // if (covBCode.value === '' && covCCode.value === '') {
  //   $fx.throwAlert('업체코드를 입력해주세요.', '알림')
  //   return
  // }
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

    // 날짜 벨리데이션 체크
    if (instJoinDate.value > instCnclDate.value) {
      $fx.throwAlert('지정한 날짜를 다시 확인하세요. 종료일이 시작일보다 클수없습니다.', '알림')

      return
    }

    if (!instJoinDate.value && !instCnclDate.value) {
      $fx.throwAlert('날짜가 선택되지 않았습니다.', '알림')
      document
        .getElementsByClassName(
          'dp__pointer dp__input_readonly dp__input dp__input_icon_pad dp__input_reg',
        )[0]
        .focus()
      return
    }

    // 수정하기전에 초기화
    updateApi()
    //성공
  }
}

// 수정 완료
const memUpdateOk = () => {
  let contentsMsg = '발주기관 정보가 변경되었습니다.'
  $fx.throwAlert(contentsMsg, '알림').then((result) => {
    $fx.historyBack()
  })
}

/********************************* 링크 이동 선언 및 정의 *************************/

// 취소 : 회원목록으로 이동
const goCenl = () => {
  $fx.move('AMEM109')
}

/********************************* api 선언 및 정의 *************************/

// 상세조회
const callApi = () => {
  const params = {
    memId: '',
  }
  params.memId = memIdFild.value
  // console.log('callApi들어옴')
  $fx.startLoadingbar()
  memApi
    .MEM0202S02(params)
    .then((response) => {
      const resultData = response.result.result
      // console.log(resultData, 'resultData >>> 변경')
      ordrInstCode.value = resultData.ordrInstCode // 발주기관코드
      ordrInstId.value = resultData.instId // 발주기관 아이디
      instBrno.value = resultData.instBrno // 사업자등록 번호
      conectUrl.value = resultData.conectUrl // 기관접속 URL
      instDivCd.value = resultData.instDivCd // 기업구분
      ordrInstNm.value = resultData.instNm // 기관명
      instBrnoNm.value = resultData.instBrnoNm // 사업자명
      rprsvNm.value = resultData.rprsvNm // 대표자명
      bplcAddr.value = resultData.bplcAddr // 사업장 주소
      instEmailDomain.value = resultData.instEmailDomain // 회사 이메일용 도메인
      instJoinDate.value = resultData.shbJoinDate // 가입시작일
      instCnclDate.value = resultData.shbCnclDate // 종료일자
      ordrInstCss.value = resultData.ordrInstCss // 스킨용 CSS
      logoCss.value = resultData.logoCss // 로고용 CSS
      remark.value = resultData.remark // 비고

      // 발주기관 협약기능 checkbox 조회에서 가져옴
      if (resultData.shbCovFnct === 'A') {
        shbCovFnctOcr.value = resultData.shbCovFnct
      } else if (resultData.shbCovFnct === 'B') {
        shbCovFnctAcc.value = resultData.shbCovFnct
        if (shbCovFnctAcc.value) {
          if ($utils.isEmpty(covBCode.value)) {
            isChkedPum.value = true
            covBCode.value = resultData.covBCode
          } else {
            isChkedPum.value = false
          }
        }
      } else if (resultData.shbCovFnct === 'AB') {
        if (resultData.shbCovFnct) {
          let shbCovFnctOcrType = resultData.shbCovFnct.split('')[0]
          let shbCovFnctAccType = resultData.shbCovFnct.split('')[1]
          shbCovFnctOcr.value = shbCovFnctOcrType
          shbCovFnctAcc.value = shbCovFnctAccType

          if (shbCovFnctAcc.value) {
            // console.log(shbCovFnctAcc.value, 'AB타입')
            if ($utils.isEmpty(covBCode.value)) {
              isChkedPum.value = true
              covBCode.value = resultData.covBCode
            } else {
              isChkedPum.value = false
            }
          }
        }
      } else if (resultData.shbCovFnct === 'C') {
        if ($utils.isEmpty(covCCode.value)) {
          isChkedEz.value = true
          covCCode.value = resultData.covCCode
        } else {
          isChkedEz.value = false
        }
        shbCovFnctEz.value = resultData.shbCovFnct
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 수정
const updateApi = () => {
  let Ocr = shbCovFnctOcr.value
  let Acc = shbCovFnctAcc.value
  let ez = shbCovFnctEz.value
  shbCovFnct.value = Ocr + Acc + ez

  const params = {
    ordrInstCode: ordrInstCode.value, // 발주기관코드
    instId: ordrInstId.value, // 발주기관 아이디
    // instBrno: instBrno.value, // 사업자등록번호
    instBrno: instBrno.value, // 사업자등록번호
    conectUrl: conectUrl.value, // 기관접속URL
    instDivCd: instDivCd.value, // 기업구분
    instNm: ordrInstNm.value, // 기관명
    instBrnoNm: instBrnoNm.value, // 사업자명
    rprsvNm: rprsvNm.value, // 대표자명
    bplcAddr: bplcAddr.value, // 사업장주소
    instEmailDomain: instEmailDomain.value, // 회사이메일용 도메인

    instJoinDate: instJoinDate.value, // 회원가입일
    instCnclDate: instCnclDate.value, // 회원종료일
    shbCovFnct: shbCovFnct.value,
    covBCode: covBCode.value, // 계좌이체 체크됬을때만 값넣기
    covCCode: covCCode.value, // 계정이체 체크됬을때만 값넣기
    ordrInstCss: ordrInstCss.value, // 스킨css
    logoCss: logoCss.value, // 로고css
    remark: remark.value, // 비고
  }
  // console.log(params, '수정관련api')
  $fx.startLoadingbar()
  memApi
    .MEM0202U04(params)
    .then((response) => {
      // console.log(response, '수정관련api')
      // 수정정보 input에 넣을데이터

      memUpdateOk() // 수정완료 체크
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
