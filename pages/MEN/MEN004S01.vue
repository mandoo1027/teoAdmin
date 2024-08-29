<template>
  <!-- 전자서명 상세-->

  <v-table class="vtable_view">
    <colgroup>
      <col style="width:" />
      <col style="width:" />
      <col style="width:" />
      <col style="width:" />
    </colgroup>
    <tbody>
      <tr>
        <th>전자서명일련번호</th>
        <td>{{ fincertVerify.certDocSeq }}</td>
        <th>인증서구분</th>
        <td>{{ fincertVerify.certJobDivNm }}</td>
      </tr>
      <tr>
        <th>인증서업무관리번호</th>
        <td>{{ fincertVerify.certJobMngNo }}</td>
        <th>서명일자</th>
        <td>{{ $utils.formatDate(fincertVerify.certDate) }}</td>
      </tr>
      <tr>
        <th>서명시간</th>
        <td>{{ fincertVerify.certTime }}</td>
        <th>서명기관ID</th>
        <td>{{ fincertVerify.certInstId }}</td>
      </tr>
      <tr>
        <th>서명회원ID</th>
        <td>{{ fincertVerify.certMemId }}</td>
        <th>식별번호</th>
        <td>{{ fincertVerify.certData }}</td>
      </tr>
      <tr>
        <th>인증서구분</th>
        <td>{{ fincertVerify.fincertDivNm }}</td>
        <th>거래고유ID</th>
        <td>{{ fincertVerify.apiTranId }}</td>
      </tr>
      <tr>
        <th>SIGNED_TXT</th>
        <td colspan="3" v-html="fincertVerify.signedTxt"></td>
      </tr>
      <tr>
        <th>signedValue</th>
        <td colspan="3" v-html="fincertVerify.signedVal"></td>
      </tr>
      <tr>
        <th>hashedValue</th>
        <td colspan="3" v-html="fincertVerify.hashedVal"></td>
      </tr>
      <tr>
        <th>certificate</th>
        <td colspan="3" v-html="fincertVerify.certificateVal"></td>
      </tr>
      <tr>
        <th>VID_MSG</th>
        <td colspan="3" v-html="fincertVerify.vidMsg"></td>
      </tr>
      <tr>
        <th>verify Msg</th>
        <td colspan="3" v-html="fincertVerify.verifyMsg"></td>
      </tr>
      <tr v-for="(item, index) in implMngNoList" :key="index">
        <th>집행관리번호 {{ index + 1 }}</th>
        <td colspan="3">{{ item }}</td>
      </tr>
    </tbody>
  </v-table>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn" size="small" @click="goBack">목록</v-btn>
  </div>
</template>
<style scoped></style>
<script setup>
// api ts
import { menuApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/
const fincertVerify = ref({
  certDocSeq: '',
  certJobDivCd: '',
  certJobDivNm: '' /* 인증서업무구분명 */,
  certJobMngNo: '' /* 인증서업무관리번호 : 공고번호, TASK번호, 집행관리번호 */,
  certDate: '' /* 서명일자 */,
  certTime: '' /* 서명시간 */,
  certInstId: '' /* 서명기관ID */,
  certMemId: '' /* 서명 회원ID */,
  certData: '' /* 본인확인 식별번호 */,
  fincertDivCd: '' /* 인증서구분 */,
  fincertDivNm: '' /* 인증서구분명 */,
  certificate: '' /* 금결원 API 검증결과 verify.certificate */,
  apiTranId: '',
  signedTxt: '',
  signedVal: '',
  hashedVal: '',
  certificateVal: '',
  vidMsg: '',
  verifyMsg: '',
  rgtrUserId: '',
  rgtrDt: '',
  implMngNoList: '',
})
//IMPL_MNG_NO_LIST		/* 집금관리번호 LIST */
const implMngNoList = ref([])

/* 검색 변수 파라미터  */
const searchParams = ref({
  certDate: '', //서명일자
  certJobDivCd: '', //인증업무구분
  certInstId: '', //서명기관ID
})

/********************************* 초기 *************************/
// 최초 로드
onMounted(() => {
  if ($fx.getParams().certDocSeq) {
    fincertVerify.value.certDocSeq = $fx.getParams().certDocSeq
    searchParams.value.certJobDivCd = $fx.getParams().certJobDivCd
    searchParams.value.certInstId = $fx.getParams().certInstId
    searchParams.value.certDate = $fx.getParams().certDate
    callApi()
  } else {
    $fx.historyBack()
  }
})

/********************************* methods *************************/
// 목록으로 이동
const goBack = () => {
  $fx.move('AMEN004', {certDate:searchParams.value.certDate, certJobDivCd:  searchParams.value.certJobDivCd, certInstId:searchParams.value.certInstId})
}

/********************************* api  *************************/
// 상세조회
const callApi = () => {
  const params = fincertVerify.value

  // console.log(params, 'params')
  $fx.startLoadingbar()
  menuApi
    .MEN0401S02(params)
    .then((response) => {
      const resultData = response.result.fincertVerify
      fincertVerify.value = resultData
      if (fincertVerify.value.implMngNoList) {
        implMngNoList.value = fincertVerify.value.implMngNoList.split(',')
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
