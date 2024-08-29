<template>
  <div class="tit_btn">
    <h3 class="tit">일반 회원 상세 조회</h3>
    <div>
      <v-btn class="vbtn" size="small" @click="goMemList">회원정보 변경이력</v-btn>
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
        <th>기관명</th>
        <td>{{ memberInfo?.instNm }}</td>
        <th>소속기관직무</th>
        <td>
          {{ $utils.getCodeValue(instDivCdCode, memberInfo?.instDivCd) }}
        </td>
      </tr>
      <tr>
        <th>회원구분</th>
        <td>
          {{ $utils.getCodeValue(memDivCdCode, memberInfo?.memDivCd) }}
        </td>
        <th>성명/내외국인</th>
        <td>
          {{ memberInfo?.memNm }}/{{ $utils.getCodeValue(nltyDivCdCode, memberInfo?.nltyDivCd) }}
        </td>
      </tr>
      <tr>
        <th>생년월일/성별</th>
        <td>
          {{ $utils.formatDate(memberInfo?.memBrth) }}/{{
            $utils.getCodeValue(memSeCdCode, memberInfo?.memSeCd)
          }}
        </td>
        <th>안내채널</th>
        <td>
          {{ $utils.getCodeValue(ntcnChnlDivCdCode, memberInfo?.ntcnChnlDivCd) }}
        </td>
      </tr>
      <tr>
        <th>휴대전화번호</th>
        <td>
          {{ memberInfo?.moblTelno1 }}-{{ memberInfo?.moblTelno2 }}-{{ memberInfo?.moblTelno3 }}
        </td>
        <th>이메일 주소</th>
        <td>{{ memberInfo?.email }}</td>
      </tr>
      <tr>
        <th>회원가입 상태</th>
        <td>
          {{ $utils.getCodeValue(memJoinStatCdCode, memberInfo?.memJoinStatCd) }}
        </td>
        <th>가입일시</th>
        <td>{{ $utils.formatDate(memberInfo?.memJoinDate) }}</td>
      </tr>
      <tr>
        <th>회원인증방법</th>
        <td>{{ $utils.getCodeValue(memCertDivCdCode, memberInfo?.memCertDivCd) }}</td>
        <!-- <td>{{memberInfo.memCertDivCd === 'AA' && '책임자인증' }}</td> -->
        <th v-if="!isModeDel">가입등록승인자</th>
        <td v-if="!isModeDel">{{ memberInfo?.rgtrUserId }}</td>
      </tr>
      <tr>
        <th v-if="!isModeDel">최종접속일시</th>
        <td v-if="!isModeDel">{{ $utils.formatDate(memberInfo?.lastLoginDt) }}</td>
        <th v-if="!isModeDel && isModeDel">정보변경일시</th>
        <td v-if="!isModeDel && isModeDel">{{ $utils.formatDate(memberInfo?.lastChgDt) }}</td>
      </tr>
      <tr>
        <th v-if="!isModeDel && isModeDel">정보변경승인자</th>
        <td v-if="!isModeDel && isModeDel">{{ memberInfo?.lastUserId }}</td>
      </tr>
    </tbody>
  </v-table>

  <div class="tit_btn">
    <h3 class="tit">회원 소속기관 정보</h3>
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
        <th>기관코드</th>
        <td>{{ memberInfo?.ordrInstCode }}</td>
        <th>기관ID</th>
        <td>{{ memberInfo?.instId }}</td>
      </tr>
      <tr>
        <th>기관명</th>
        <td>{{ memberInfo?.instNm }}</td>
        <th>사업자등록번호</th>
        <td>{{ $utils.bizNumberformatter(memberInfo?.instBrno) }}</td>
      </tr>
      <tr>
        <th>사업자명</th>
        <td>{{ memberInfo?.instBrnoNm }}</td>
        <th>대표자명</th>
        <td>{{ memberInfo?.rprsvNm }}</td>
      </tr>
      <tr>
        <th>사업장주소</th>
        <td>
          {{ memberInfo?.bplcAddr }}
        </td>
        <th>가입시작일</th>
        <td>
          {{ $utils.formatDate(memberInfo?.memJoinDate) }}
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn black" size="small" @click="memberOut" v-if="!isModeFlag && !isFlag"
      >회원 탈퇴</v-btn
    >
    <v-btn class="vbtn black" size="small" @click="goCharge" v-if="!isFlag">회원정보변경</v-btn>
    <v-btn class="vbtn black" size="small" @click="goErrorCnt" v-if="!btnType && !isFlag"
      >오류횟수초기화</v-btn
    >
    <v-btn class="vbtn" size="small" @click="goBack">목록</v-btn>
  </div>
</template>

<script setup>
// api ts
import { memApi } from '@/api/index.ts'

const MEM002P02 = 'MEMMEM002P02' // 회원탈퇴
const MEM010P03 = 'MEMMEM010P03' // 회원정보 변경이력

/********************************* 변수 선언 및 정의 *************************/
const memberInfo = ref({}) // 상세정보 담는 변수
const memIdFild = ref('')
const memId = ref('')
const shbJoinDate = ref('')
const shbCnclDate = ref('')
const lastLoginDtDate = ref('')
const editType = ref('N') // N 기본 , E 수정모드
const btnType = ref(false)
const contents = ref('')
const isModeFlag = ref(false) // 책임자 여부
const isFlag = ref(true)

const isModeAcc = $fx.getParams().memJoinStatCd === '0' // 승인대기
const isModeSecc = $fx.getParams().memJoinStatCd === '1' // 정상
const isModeDel = computed(() => $fx.getParams().memJoinStatCd === '9') // 탈퇴

// 회원정보 변경이력 변수
const paramsChgMember = ref({
  memId: '', // 회원ID
})

/********************************* 공통코드 선언 및 정의 *************************/
const memDivCdCode = ref([])
const memJoinStatCdCode = ref([])
const ntcnChnlDivCdCode = ref([])
const instDivCdCode = ref([])
const memSeCdCode = ref([])
const nltyDivCdCode = ref([])
const memCertDivCdCode = ref([]) // 관리자인증

/********************************* methods 선언 및 정의 *************************/
onMounted(async () => {
  // ------------------- 공통코드 영역 -------------------
  $fx.startLoadingbar()
  memDivCdCode.value = await $fx.getCommonCodeList('MEM_DIV_CD')
  memJoinStatCdCode.value = await $fx.getCommonCodeList('MEM_JOIN_STAT_CD')
  ntcnChnlDivCdCode.value = await $fx.getCommonCodeList('NTCN_CHNL_DIV_CD')
  instDivCdCode.value = await $fx.getCommonCodeList('INST_DIV_CD')
  memSeCdCode.value = await $fx.getCommonCodeList('MEM_SE_CD')
  nltyDivCdCode.value = await $fx.getCommonCodeList('NLTY_DIV_CD')
  memCertDivCdCode.value = await $fx.getCommonCodeList('MEM_CERT_DIV_CD')
  $fx.finishLoadingbar()
  // ------------------- 공통코드 영역 -------------------

  if ($fx.getParams().memId) {
    let memJoinState = $fx.getParams().memJoinStatCd === '9'
    if (memJoinState) {
      isFlag.value = true
    } else {
      isFlag.value = false
    }
    memIdFild.value = $fx.getParams().memId
    callApi() // callApi

    // 책임자 여부 memDivCd || isModeDel
    if ($fx.getParams().memDivCd === 'M') {
      isModeFlag.value = true
    } else {
      isModeFlag.value = false
    }
  } else {
    $fx.historyBack()
  }
})

// 일반회원정보 변경
const goCharge = () => {
  const memId = $fx.getParams().memId
  $fx.move('AMEM108', { memId: memId })
}

// 목록으로 이동
const goBack = () => {
  $fx.move('AMEM101')
}

// 회원정보 변경이력
const goMemList = () => {
  $fx
    .throwDialog(MEM010P03, {
      data: paramsChgMember.value,
      close: false,
      title: '회원정보 변경 이력',
      dialogClasses: 'large',
    })
    .then((result) => {})
}

// 회원 탈퇴
const memberOut = () => {
  $fx.throwDialog(MEM002P02, { data: {}, close: false, title: '회원탈퇴' }).then((result) => {
    if (result) {
      contents.value = result
      delApi()
    }
  })
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
      // console.log(resultData, '회원상세조회 resultData')
      memberInfo.value = resultData

      // 회원정보 변경이력에 넣기위한 데이터
      paramsChgMember.value.memId = resultData.memId // 회원이름
      // 회원정보 변경이력에 넣기위한 데이터

      shbJoinDate.value = resultData.shbJoinDate
      shbCnclDate.value = resultData.shbCnclDate
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 회원탈퇴
const delApi = () => {
  const params = {
    type: 'D', // 타입
    memId: '', // 회원이름
    instId: memberInfo.value.instId,
    memCnclResn: contents.value, // 회원탈퇴 사유
  }
  params.memId = memIdFild.value
  $fx.startLoadingbar()
  memApi
    .MEM0202U05(params)
    .then((response) => {
      $fx.throwAlert('회원탈퇴가 완료되었습니다.', '알림').then((result) => {
        $fx.move('AMEM101')
      })
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 오류횟수 초기화
const goErrorCnt = () => {
  const params = {
    memId: '',
  }
  params.memId = memIdFild.value
  $fx.startLoadingbar()
  memApi
    .MEM0202U07(params)
    .then((response) => {
      if (response) {
        $fx.throwAlert('오류횟수 변경이 완료되었습니다.', '알림').then((result) => {
          $fx.move('AMEM101')
        })
        btnType.value = true
      } else {
        btnType.value = false
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
