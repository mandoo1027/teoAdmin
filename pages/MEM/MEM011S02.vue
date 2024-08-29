<template>
  <div class="tit_btn">
    <h3 class="tit">기관 상세정보 조회</h3>
    <div>
      <!-- <v-btn class="vbtn black" size="small" @click="goInsertUp">사업자 등록 변경 이력</v-btn> -->
      <v-btn class="vbtn" size="small" @click="goRegChange">사업자 등록 변경이력</v-btn>
    </div>
  </div>
  <v-table class="vtable_view">
    <colgroup>
      <col style="width:" />
      <col style="width:" />
      <col style="width:" />
      <col style="width:" />
    </colgroup>
    <tbody>
      <tr>
        <th>발주기관코드</th>
        <td>{{ memberInfo.ordrInstCode }}</td>
        <th>기관ID</th>
        <td>{{ memberInfo.instId }}</td>
      </tr>
      <tr>
        <th>기업구분</th>
        <td>
          {{ $utils.getCodeValue(instDivCdCode, memberInfo.instDivCd) }}
        </td>
        <th>기관명</th>
        <td>{{ memberInfo?.instNm }}</td>
      </tr>
      <tr>
        <th>사업자등록번호</th>
        <td>{{ $utils.bizNumberformatter(memberInfo.instBrno) }}</td>
        <th>사업자명</th>
        <td>{{ memberInfo.instBrnoNm }}</td>
      </tr>
      <tr>
        <th>대표자 명</th>
        <td>{{ memberInfo.rprsvNm }}</td>
        <th>사업장 주소</th>
        <td>{{ memberInfo.bplcAddr }}</td>
        <!-- <td>{{memberInfo.officeAdd}}</td> -->
      </tr>
      <tr>
        <th>회사 이메일 용 도메인</th>
        <td>{{ memberInfo.instEmailDomain }}</td>
        <th>가입 시작일 ~ 종료일</th>
        <td>
          {{ $utils.formatDate(memberInfo.shbJoinDate) }}~{{
            $utils.formatDate(memberInfo.shbCnclDate)
          }}
        </td>
      </tr>
      <tr>
        <th>접속 url</th>
        <td>{{ memberInfo.conectUrl }}</td>
        <th>발주기관 협약기능</th>
        <td>
          {{ shbCovFnctNm }}
        </td>
      </tr>
      <tr>
        <th>스킨 용 CSS</th>
        <td>{{ memberInfo.ordrInstCss }}</td>
        <th>로고 용 CSS</th>
        <td>{{ memberInfo.logoCss }}</td>
      </tr>
      <tr>
        <th>비고</th>
        <td>{{ memberInfo.remark }}</td>
      </tr>
    </tbody>
  </v-table>

  <div class="tit_btn">
    <h3 class="tit">책임자 정보</h3>
    <div>
      <v-btn class="vbtn" size="small" @click="goList">일반회원 정보변경</v-btn>
      <!-- <v-btn class="vbtn" size="small">회원정보 변경 이력</v-btn> -->
    </div>
  </div>
  <v-table class="vtable_view">
    <colgroup>
      <col style="width:" />
      <col style="width:" />
      <col style="width:" />
      <col style="width:" />
    </colgroup>
    <tbody>
      <tr>
        <th>소속기관직무</th>
        <td>
          {{ $utils.getCodeValue(instDtyCdCode, memberInfo.instDtyCd) }}
        </td>
        <th>아이디</th>
        <td>{{ memberInfo.memId }}</td>
      </tr>
      <tr>
        <th>성명/내외국인</th>
        <td>
          {{ memberInfo.memNm }}/{{ $utils.getCodeValue(nltyDivCdCode, memberInfo.nltyDivCd) }}
        </td>
        <th>생년월일/성별</th>
        <td>
          {{ $utils.formatDate(memberInfo.memBrth) }}/{{
            $utils.getCodeValue(memSeCdCode, memberInfo.memSeCd)
          }}
        </td>
      </tr>
      <tr>
        <th>휴대전화번호</th>
        <td>{{ memberInfo.moblTelno1 }}-{{ memberInfo.moblTelno2 }}-{{ memberInfo.moblTelno3 }}</td>
        <th>이메일</th>
        <td>{{ memberInfo.email }}</td>
      </tr>
      <tr>
        <th>안내채널</th>
        <td>
          {{ $utils.getCodeValue(ntcnChnlDivCdCode, memberInfo.ntcnChnlDivCd) }}
        </td>
        <th>회원가입상태</th>
        <td>
          {{ $utils.getCodeValue(memJoinStatCdCode, memberInfo.memJoinStatCd) }}
        </td>
      </tr>
      <tr>
        <th>가입일자</th>
        <td>{{ $utils.formatDate(memberInfo.memJoinDate) }}</td>
        <th>회원인증방법</th>
        <td>{{ $utils.getCodeValue(memCertDivCdCode, memberInfo?.memCertDivCd) }}</td>
      </tr>
      <tr>
        <th>최종접속일</th>
        <td>{{ $utils.formatDate(memberInfo.lastLoginDt) }}</td>
      </tr>
    </tbody>
  </v-table>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn black" size="small" @click="goCharge" v-if="!ordrCodeBtn">책임자변경</v-btn>
    <v-btn class="vbtn black" size="small" @click="goInstChange" v-if="!ordrCodeBtn"
      >기관정보변경</v-btn
    >
    <v-btn class="vbtn" size="small" @click="goBack">목록</v-btn>
  </div>
</template>
<style scoped></style>
<script setup>
// api ts
import { memApi } from '@/api/index.ts'

const MEM010P01 = 'MEMMEM010P01' // 책임자 변경 팝업창
const MEM011P01 = 'MEMMEM011P01' // 사업자 등록 변경이력 팝업창

// 발주기관여부 버튼
const ordrCodeBtn = ref(false)
const memberOrdrInstCode = ref(false) // 발주기관 여부

/********************************* 변수 선언 및 정의 *************************/
// 상세정보 담는 변수
const memberInfo = ref([])
const memIdFild = ref('')
const memId = ref('')
const shbJoinDate = ref('')
const shbCnclDate = ref('')
const editType = ref('N') // N 기본 , E 수정모드
const shbCovFnctNm = ref('')
// const memberData = ref({})

/********************************* methods 선언 및 정의 *************************/
const memDivCdCode = ref([])
const instDivCdCode = ref([])
const nltyDivCdCode = ref([])
const memSeCdCode = ref([])
const instDtyCdCode = ref([])
const ntcnChnlDivCdCode = ref([])
const instJoinStatCdCode = ref([])
const memJoinStatCdCode = ref([])
const memCertDivCdCode = ref([])
const shbCovFnctCode = ref([])

/********************************* methods 선언 및 정의 *************************/
// 최초 로드
onMounted(async () => {
  $fx.startLoadingbar()
  memDivCdCode.value = await $fx.getCommonCodeList('MEM_DIV_CD')
  instDivCdCode.value = await $fx.getCommonCodeList('INST_DIV_CD')
  nltyDivCdCode.value = await $fx.getCommonCodeList('NLTY_DIV_CD')
  memSeCdCode.value = await $fx.getCommonCodeList('MEM_SE_CD')
  instDtyCdCode.value = await $fx.getCommonCodeList('INST_DTY_CD')
  ntcnChnlDivCdCode.value = await $fx.getCommonCodeList('NTCN_CHNL_DIV_CD')
  instJoinStatCdCode.value = await $fx.getCommonCodeList('INST_JOIN_STAT_CD')
  memJoinStatCdCode.value = await $fx.getCommonCodeList('MEM_JOIN_STAT_CD')
  memCertDivCdCode.value = await $fx.getCommonCodeList('MEM_CERT_DIV_CD')
  shbCovFnctCode.value = await $fx.getCommonCodeList('SHB_COV_FNCT')
  $fx.finishLoadingbar()

  if ($fx.getParams().memId) {
    memIdFild.value = $fx.getParams().memId
    callApi()
  } else {
    $fx.historyBack()
  }
})

// 기관정보 변경
const goInstChange = () => {
  let memId = $fx.getParams().memId
  $fx.move('AMEM111', { memId: memId })
}

// 책임자 변경
const goCharge = () => {
  $fx
    .throwDialog(MEM010P01, {
      data: { memberInfo: memberInfo.value },
      close: false,
      title: '책임자 권한 변경',
    })
    .then((result) => {
      if (result) {
      }
    })
}

// 사업자 등록 변경이력
const goRegChange = () => {
  $fx
    .throwDialog(MEM011P01, {
      data: { memberInfo: memberInfo.value },
      close: false,
      title: '사업자 등록 변경이력',
      dialogClasses: 'large',
    })
    .then((result) => {
      if (result) {
      }
    })
}

// 목록으로 이동
const goBack = () => {
  $fx.move('AMEM109')
}

// 일반 회원 정보 변경
const goList = () => {
  const memId = $fx.getParams().memId
  $fx.move('AMEM108', { memId: memId, type: 'instMem' })
}

// 발주기관 협약기능
const getShbCovFnctNm = () => {
  if ($utils.isEmpty(memberInfo.value.shbCovFnct)) {
    return ''
  }

  let shbCovFnctStr = ''
  let cnt = 0
  if (memberInfo.value.shbCovFnct === 'A') {
    for (let str of memberInfo.value.shbCovFnct) {
      if (cnt === 0) {
        shbCovFnctStr += $utils.getCodeValue(shbCovFnctCode.value, str)
        shbCovFnctNm.value = shbCovFnctStr
      }
    }
  } else if (memberInfo.value.shbCovFnct === 'B') {
    if (!memberInfo.value.shbCovFnct) {
    }
    for (let str of memberInfo.value.shbCovFnct) {
      if (memberInfo.value.covBCode == null) {
        shbCovFnctStr += $utils.getCodeValue(shbCovFnctCode.value, str)
      } else {
        shbCovFnctStr +=
          $utils.getCodeValue(shbCovFnctCode.value, str) + '(' + memberInfo.value.covBCode + ')'
      }
      shbCovFnctNm.value = shbCovFnctStr
    }
  } else if (memberInfo.value.shbCovFnct === 'AB') {
    for (let str of memberInfo.value.shbCovFnct) {
      if (cnt === 0) {
        shbCovFnctStr += $utils.getCodeValue(shbCovFnctCode.value, str)
      } else {
        if (memberInfo.value.covBCode == null) {
          shbCovFnctStr += ', ' + $utils.getCodeValue(shbCovFnctCode.value, str)
        } else {
          shbCovFnctStr +=
            ', ' +
            $utils.getCodeValue(shbCovFnctCode.value, str) +
            '(' +
            memberInfo.value.covBCode +
            ')'
        }
      }
      cnt++
    }
    shbCovFnctNm.value = shbCovFnctStr
  } else {
    for (let str of memberInfo.value.shbCovFnct) {
      if (memberInfo.value.covBCode == null) {
        shbCovFnctStr += $utils.getCodeValue(shbCovFnctCode.value, str)
      } else {
        shbCovFnctStr +=
          $utils.getCodeValue(shbCovFnctCode.value, str) + '(' + memberInfo.value.covCCode + ')'
      }

      shbCovFnctNm.value = shbCovFnctStr
    }
  }
}

/********************************* api 선언 및 정의 *************************/
// 상세조회
const callApi = () => {
  const params = {
    memId: '',
  }
  params.memId = memIdFild.value
  $fx.startLoadingbar()
  memApi
    .MEM0202S02(params)
    .then((response) => {
      const resultData = response.result.result
      memberInfo.value = resultData
      memberOrdrInstCode.value = resultData.ordrInstCode

      // console.log(resultData, 'resultData')

      // 발주 수행 나눠짐
      if (memberOrdrInstCode.value == null) {
        ordrCodeBtn.value = true
      } else {
        // console.log('발주기관일떄')
        ordrCodeBtn.value = false
      }

      shbJoinDate.value = resultData.shbJoinDate
      shbCnclDate.value = resultData.shbCnclDate

      getShbCovFnctNm() // 발주기관협약기능
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
