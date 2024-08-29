<template>
  <v-form ref="form">
    <h3 class="tit">일반 회원 정보 수정</h3>
    <v-table class="vtable_view">
      <tbody>
        <tr>
          <th>기관명</th>
          <td>{{ memberInfo.instNm }}</td>
        </tr>
        <tr>
          <th>소속기관직무</th>
          <td>
            {{ $utils.getCodeValue(instDivCdCode, memberInfo.instDivCd) }}
          </td>
        </tr>
        <tr>
          <th>회원구분</th>
          <td>
            {{ $utils.getCodeValue(memDivCdCode, memberInfo.memDivCd) }}
          </td>
        </tr>
        <tr>
          <th>성명/내외국인</th>
          <td>
            {{ memberInfo.memNm }} /
            {{ $utils.getCodeValue(nltyDivCdCode, memberInfo.nltyDivCd) }}
          </td>
        </tr>
        <tr>
          <th>생년월일/성별</th>
          <td>
            {{ $utils.formatDate(memberInfo.memBrth) }} /
            {{ $utils.getCodeValue(memSeCdCode, memberInfo.memSeCd) }}
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
                :rules="$utils.getRules(['required|휴대번호를 입력해주세요.', 'minLength|3'])"
                :maxlength="3"
                type="number"
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
                @changeValue="changeEmailType"
                :isShowEtc="true"
                class="s_basics w_200 ml_5"
              />
              <v-text-field
                label="Your Email"
                v-if="isShowEtcField"
                v-model="emailData.emailEtc"
                :maxlength="20"
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
    <v-btn class="vbtn black" size="small" @click="goBack">취소</v-btn>
    <v-btn class="vbtn" size="small" @click="goUpdate">회원정보수정</v-btn>
  </div>
</template>
<script setup>
// api ts
import { memApi } from '@/api/index.ts'

const computedOrdrInstCode = computed(() => $fx.ordrInstCode()) // 발주기관 여부
const isShowEtcField = computed(() => emailData.value.emailType === 'etc')
const isUseEmailCert = computed(() => ntcnChnlDivCd.value === '2')
const isUsePhoneCert = computed(() => ntcnChnlDivCd.value === '1' || ntcnChnlDivCd.value === '9')

const isSuccess = ref(false)

/********************************* 변수 선언 및 정의 *************************/
const dataParams = ref({
  ntcnChnlDivCd: '', // 안내채널
})


// 상세정보 담는 변수
const memberInfo = ref({})
const memIdFild = ref('')
const memId = ref('')
const instNm = ref('') // 기관명
const instDivCd = ref('') // 소속기관직무
const memSeCd = ref('') // 성별
const memNm = ref('') // 성명
const nltyDivCd = ref('') // 내외국인
const memBrth = ref('') // 생일
const ntcnChnlDivCd = ref('') // [책임자] 안내 채널

const valid = ref(false)
const form = ref(null)
const formRef = ref(null)
const mobileCom = ref(null) // 핸드폰
const emailCom = ref(null) // 이메일

// 안내 채널 변경시
const changeNtcnChnlDivCd = (value) => {
  // 2: email, 1: sms, 9: 미사용
  emailCom?.value?.init()
  mobileCom?.value?.init()
  $utils.validate(form)
}

// 인증 초기화
const resetStatus = () => {
  isSuccess.value = false
}

const memDivCdCode = ref([])
const instDivCdCode = ref([])
const nltyDivCdCode = ref([])
const memSeCdCode = ref([])

/********************************* methods 선언 및 정의 *************************/
// 최초 로드
onMounted(async () => {
  $fx.startLoadingbar()
  memDivCdCode.value = await $fx.getCommonCodeList('MEM_DIV_CD')
  instDivCdCode.value = await $fx.getCommonCodeList('INST_DIV_CD')
  nltyDivCdCode.value = await $fx.getCommonCodeList('NLTY_DIV_CD')
  memSeCdCode.value = await $fx.getCommonCodeList('MEM_SE_CD')
  $fx.finishLoadingbar()

  if ($fx.getParams().memId) {
    memIdFild.value = $fx.getParams().memId
    callApi()
  } else {
    $fx.move('AMEM101')
  }
})

// 벨리데이션 체크
const validateData = computed(() => {
  return {
    isChkValdate: true, // 유효성 체크 대상 (false면 안함)
    data: {
      ntcnChnlDivCd: ntcnChnlDivCd.value,
    },
  }
})

// 회원정보 수정
const goUpdate = async () => {
  const data = $utils.validateForm(form)
  if (data.isValid) {
    if (!mobileCom?.value?.validation()) {
      return
    } else if (!emailCom?.value?.validation()) {
      return
    } else {
      updateApi()
    }
  }
}

// 목록으로 이동
const goBack = () => {
  $fx.move('AMEM101')
}

// 수정 완료
const updateOk = () => {
  let contentsMsg = '회원 정보가 변경되었습니다.'
  $fx.throwAlert(contentsMsg, '알림').then((result) => {
    if ($fx.getParams().type === 'instMem') {
      // 기관 회원목록에서 변경했을때
      $fx.move('AMEM109')
    } else {
      // 일반 회원목록에서 변경했을때
      $fx.move('AMEM101')
    }
  })
}

/********************************* api 선언 및 정의 *************************/
// 상세조회
const callApi = () => {
  const params = {
    memId: memIdFild.value,
  }
  $fx.startLoadingbar()
  memApi
    .MEM0202S02(params)
    .then((response) => {
      const resultData = response.result.result
      memberInfo.value = resultData

      ntcnChnlDivCd.value = memberInfo.value.ntcnChnlDivCd
      // mobileData.value.moblTelno1 = memberInfo.value.moblTelno1 // 핸드폰번호1
      // mobileData.value.moblTelno2 = memberInfo.value.moblTelno2 // 핸드폰번호2
      // mobileData.value.moblTelno3 = memberInfo.value.moblTelno3 // 핸드폰번호3

      // 휴대전화번호 강제셋팅
      if (memberInfo.value.moblTelno1) {
        let data = {
          moblTelno1: memberInfo?.value?.moblTelno1,
          moblTelno2: memberInfo?.value?.moblTelno2,
          moblTelno3: memberInfo?.value?.moblTelno3,
        }

        mobileCom?.value?.setData(data)
      }

      // 이메일 강제셋팅
      if (memberInfo?.value?.email) {
        let emailText = memberInfo?.value?.email.split('@')[0]
        let emailType = memberInfo?.value?.email.split('@')[1]
        let data = { emailText: emailText, emailType: emailType }
        emailCom?.value?.setData(data)
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 정보변경
const updateApi = () => {
  const emailData = emailCom?.value?.getEmailData()
  const mobileData = mobileCom?.value?.getMobileData()
  const params = {
    type: 'U',
    memId: memIdFild.value,
    instNm: memberInfo.instNm, // 기관명
    instDivCd: memberInfo.instDivCd, // 소속기관직무
    memSeCd: memberInfo.memSeCd, // 회원구분
    memNm: memberInfo.memNm, // 성명
    nltyDivCd: memberInfo.nltyDivCd, // 내외국인
    memBrth: memberInfo.memBrth, // 생일
    ntcnChnlDivCd: ntcnChnlDivCd.value, // 안내채널
    moblTelno1: mobileData?.moblTelno1, // 핸드폰번호1
    moblTelno2: mobileData?.moblTelno2, // 핸드폰번호2
    moblTelno3: mobileData?.moblTelno3, // 핸드폰번호3
    email: emailData?.email, // 이메일
  }
  // console.log(params, '<<<params 회원정보 변경>>')
  $fx.startLoadingbar()
  memApi
    .MEM0202U05(params)
    .then((response) => {
      updateOk()
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
