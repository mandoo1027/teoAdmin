<template>
  <!--  이체거래 내역 상세-->

  <v-table class="vtable_view">
    <colgroup>
      <col style="width:" />
      <col style="width:" />
      <col style="width:" />
      <col style="width:" />
    </colgroup>
    <tbody>
      <tr>
        <th>집행관리번호</th>
        <td>{{ taskActrsf.implMngNo }}</td>
        <th>이체실행구분</th>
        <td>{{ taskActrsf.trsExcDivNm }} ( {{ taskActrsf.trsExcDiv }} )</td>
      </tr>
      <tr>
        <th>이체순번</th>
        <td>{{ taskActrsf.acntTrsSeq }}</td>
        <th>발주기관</th>
        <td>{{ taskActrsf.ordrInstNm }} ( {{ taskActrsf.ordrInstId }} )</td>
      </tr>
      <tr>
        <th>사업번호</th>
        <td>{{ taskActrsf.bizNo }}</td>
        <th>TASK번호</th>
        <td>{{ taskActrsf.taskNo }}</td>
      </tr>
      <tr>
        <th>사업명</th>
        <td>{{ $utils.convertRegexToText(taskActrsf.bizNm) }}</td>
        <th>TASK명</th>
        <td>{{ $utils.convertRegexToText(taskActrsf.taskNm) }}</td>
      </tr>

      <tr>
        <th>이체거래코드</th>
        <td>{{ taskActrsf.acntTrsNm }}</td>
        <th>이체거래금액</th>
        <td>
          {{ $utils.addComma(taskActrsf.acntTrsAmt) }}<label v-if="taskActrsf.acntTrsAmt">원</label>
        </td>
      </tr>
      <tr>
        <th>출금계좌구분</th>
        <td>{{ taskActrsf.wdrwAcntDivNm }}</td>
        <th>출금계좌번호</th>
        <td>{{ taskActrsf.wdrwAcntNo }}</td>
      </tr>
      <tr>
        <th>모계좌번호</th>
        <td>{{ taskActrsf.partVraNo }}</td>
        <th>경유계좌번호</th>
        <td>{{ taskActrsf.thrghAcntNo }}</td>
      </tr>
      <tr>
        <th>입금은행</th>
        <td>{{ taskActrsf.dpstBankNm }} ( {{ taskActrsf.dpstBankCd }} )</td>
        <th>입금계좌번호</th>
        <td>{{ taskActrsf.dpstAcntNo }}</td>
      </tr>
      <tr>
        <th>입금예금주명</th>
        <td>{{ taskActrsf.dpstAcntNm }}</td>
        <th>입금통장메모</th>
        <td>{{ taskActrsf.dpstAcntMemo }}</td>
      </tr>
      <tr>
        <th>이전_출금예정금액</th>
        <td>
          {{ $utils.addComma(taskActrsf.trsBefWdrwRsvt)
          }}<label v-if="taskActrsf.trsBefWdrwRsvt">원</label>
        </td>
        <th>이전_계좌잔액</th>
        <td>
          {{ $utils.addComma(taskActrsf.trsBefBlce) }}<label v-if="taskActrsf.trsBefBlce">원</label>
        </td>
      </tr>
      <tr>
        <th>출금계좌잔액비율</th>
        <td colspan="3">
          {{ taskActrsf.wacntBlceRate ?? '' }}<label v-if="taskActrsf.wacntBlceRate">%</label>
        </td>
      </tr>
      <tr>
        <th>이체실행기관</th>
        <td>{{ taskActrsf.trsInstNm }} ( {{ taskActrsf.trsInstId }} )</td>
        <th>이체실행자</th>
        <td>{{ taskActrsf.trsUserNm }} ( {{ taskActrsf.trsUserId }} )</td>
      </tr>
      <tr>
        <th>전문일련번호</th>
        <td colspan="3">{{ taskActrsf.tgSeqnum }}</td>
      </tr>
      <tr>
        <th>이체 일자</th>
        <td>{{ $utils.formatDate(taskActrsf.tiD) }}</td>
        <th>이체 시간</th>
        <td>{{ taskActrsf.tiTm }}</td>
      </tr>
      <tr>
        <th>이체결과코드</th>
        <td>{{ taskActrsf.trsRcd }}</td>
        <th>이체결과메시지</th>
        <td class="color_red">{{ taskActrsf.errTrsMsg }}</td>
      </tr>
      <tr>
        <th>등록자ID</th>
        <td>{{ taskActrsf.rgtrUserId }}</td>
        <th>등록일시</th>
        <td>
          {{
            `${taskActrsf.rgtrDt.substr(0, 4)}-${taskActrsf.rgtrDt.substr(
              4,
              2,
            )}-${taskActrsf.rgtrDt.substr(6, 2)} ${taskActrsf.rgtrDt.substr(8)}`
          }}
        </td>
      </tr>
      <tr>
        <th>변경자ID</th>
        <td>{{ taskActrsf.lastUserId }}</td>
        <th>변경일시</th>
        <td>
          {{
            `${taskActrsf.lastChgDt.substr(0, 4)}-${taskActrsf.lastChgDt.substr(
              4,
              2,
            )}-${taskActrsf.lastChgDt.substr(6, 2)} ${taskActrsf.lastChgDt.substr(8)}`
          }}
          <!-- ( {{ taskActrsf.lastChgDt }}) -->
        </td>
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
const taskActrsf = ref({
  implMngNo: '',
  trsExcDiv: '',
  acntTrsSeq: '',
  ordrInstId: '',
  bizNo: '',
  taskNo: '',
  acntTrsCd: '',
  acntTrsAmt: '',
  wdrwAcntDivCd: '',
  wdrwAcntNo: '',
  partVraNo: '',
  thrghAcntNo: '',
  dpstBankCd: '',
  dpstAcntNo: '',
  dpstAcntNm: '',
  dpstAcntMemo: '',
  trsBefWdrwRsvt: '',
  trsBefBlce: '',
  wacntBlceRate: '',
  trsInstId: '',
  trsUserId: '',
  tgSeqnum: '',
  tiD: '',
  tiTm: '',
  trsRcd: '',
  errTrsMsg: '',
  rgtrUserId: '',
  rgtrDt: '',
  lastUserId: '',
  lastChgDt: '',
  acntTrsNm: '' /* 이체거래명*/,
  wdrwAcntDivNm: '' /* 출금계좌구분명 */,
  trsExcDivNm: '' /* 이체실행구분명 */,
})
/* 검색 변수 파라미터  */
const searchParams = ref({
  trsDate: '', //이체일자
  dpstAcntNo: '', //입금계좌번호
  acntTrsAmt: '', //이체금액
})
/********************************* 초기 *************************/
// 최초 로드
onMounted(() => {
  if ($fx.getParams().implMngNo) {
    taskActrsf.value.implMngNo = $fx.getParams().implMngNo //집행관리번호
    taskActrsf.value.trsExcDiv = $fx.getParams().trsExcDiv //이체실행구분
    taskActrsf.value.acntTrsSeq = $fx.getParams().acntTrsSeq //이체순번
    searchParams.value.trsDate = $fx.getParams().trsDate
    searchParams.value.dpstAcntNo = $fx.getParams().dpstAcntNo
    searchParams.value.acntTrsAmt = $fx.getParams().acntTrsAmt
    callApi()
  } else {
    $fx.historyBack()
  }
})

/********************************* methods *************************/
// 목록으로 이동
const goBack = () => {
  $fx.move('AMEN006', {
    trsDate: searchParams.value.trsDate,
    dpstAcntNo: searchParams.value.dpstAcntNo,
    acntTrsAmt: searchParams.value.acntTrsAmt,
  })
}

/********************************* api  *************************/
// 상세조회
const callApi = () => {
  const params = taskActrsf.value
  $fx.startLoadingbar()
  menuApi
    .MEN0501S02(params)
    .then((response) => {
      const resultData = response.result.taskActrsf
      taskActrsf.value = resultData
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
