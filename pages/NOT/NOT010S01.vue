<template>
  <!-- 공지사항 상세 -->

  <div class="conbody">
    <v-table class="vtable_view">
      <tbody>
        <tr>
          <th>제목</th>
          <td>
            <div class="pt_10 pb_10" v-html="searchParams.infrmTtl.replaceAll('\n', '<br\>')"></div>
            <!-- {{ searchParams.infrmTtl }} -->
          </td>
        </tr>
        <tr>
          <th>첨부파일</th>
          <td>
            <nuxt-link class="vlink file" @click="fileDownload" v-if="atchDocNm">{{
              atchDocNm
            }}</nuxt-link>
          </td>
        </tr>
        <tr>
          <th>게시기간</th>
          <td>
            {{ $utils.formatDate(searchParams.pstgStrtDate) }}~{{
              $utils.formatDate(searchParams.pstgEndDate)
            }}
          </td>
        </tr>
        <tr>
          <th>기관명</th>
          <td>{{ searchParams.instNm }}</td>
        </tr>
        <tr>
          <td colspan="2">
            <div
              class="pt_10 pb_10"
              style="min-height: 200px"
              v-html="searchParams.infrmCtn.replaceAll('\n', '<br\>')"
            ></div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="btm_btn_wrap">
      <v-btn class="vbtn blue" size="small" @click="goBack">목록</v-btn>
      <v-btn class="vbtn blue" size="small" @click="goDel" v-if="isEmptyId">삭제</v-btn>
      <v-btn class="vbtn" size="small" @click="goUpdate" v-if="isEmptyId">수정</v-btn>
    </div>
  </div>
</template>

<style scoped></style>
<script setup>
import { notApi, commonApi } from '@/api/index.ts'

const isEmptyId = ref(false) // 존재 여부: 버튼 적용

/* 검색 변수 파라미터  */
const searchParams = ref({
  instId: '', // 기관ID
  instNm: '',
  infrmSeq: '', // 번호
  infrmTtl: '', // 제목
  infrmCtn: '', // 내용
  pstgStrtDate: '', // 게시시작일자
  pstgEndDate: '', // 게시종료일자
  atchDocId: '',
  atchDocNm: '',
  procFlag: '',
  viewSeq: '',
})

const atchDocNo = ref('') // 문서번호
const atchDocNm = ref('') // 문서이름

/************************************* API ***************************/
onMounted(() => {
  if ($fx.getParams().infrmSeq) {
    searchParams.value.instId = $fx.getParams().instId
    searchParams.value.instNm = $fx.getParams().instNm
    searchParams.value.infrmSeq = $fx.getParams().infrmSeq
    // console.log(searchParams.value.instId)
    if (searchParams.value.instId === 'ADMIN') {
      isEmptyId.value = true
    } else {
      isEmptyId.value = false
    }

    callApi() // 조회
  } else {
    $fx.historyBack()
  }
})

// 목록으로 이동
const goBack = () => {
  $fx.move('ANOT001', {})
}

// 수정 화면이동
const goUpdate = () => {
  const instId = searchParams.value.instId
  const infrmSeq = searchParams.value.infrmSeq
  $fx.move('ANOT003', { instId: instId, infrmSeq: infrmSeq })
}

// 파일다운로드
const fileDownload = () => {
  const params = {
    atchDocNo: atchDocNo.value, // 첨부문서번호
    atchDocSeq: '001', // 첨부문서순번
  }
  // console.log('params', params)
  $fx.startLoadingbar()
  commonApi
    .fileDownload(params)
    .then((response) => {
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', atchDocNm.value)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

const goDel = () => {
  $fx
    .throwConfirm('삭제를 진행하시겠습니까?', '알림', {
      confirmLabel: '확인',
      closeLabel: '취소',
    })
    .then((result) => {
      if (result) {
        delCall()
      }
    })
}

// 삭제 API이동
const delCall = () => {
  // procFlag=D: 삭제 N: 신규 U : 수정
  const params = searchParams.value // 파라미터 셋팅
  searchParams.value.procFlag = 'D'
  params.infrmSeq = $fx.getParams().infrmSeq //
  $fx.startLoadingbar()
  notApi
    .NOT0101U04(params)
    .then((response) => {
      if (response) {
        $fx.throwAlert('삭제가 완료되었습니다').then((result) => {
          $fx.move('ANOT001')
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 상세 조회
const callApi = () => {
  const params = searchParams.value // 파라미터 셋팅
  // console.log(params)
  $fx.startLoadingbar()
  notApi
    .NOT0101S02(params)
    .then((response) => {
      const resultData = response.result.result
      searchParams.value.infrmTtl = resultData.infrmTtl
      searchParams.value.infrmCtn = resultData.infrmCtn
      searchParams.value.pstgStrtDate = resultData.pstgStrtDate
      searchParams.value.pstgEndDate = resultData.pstgEndDate
      atchDocNo.value = resultData.atchDocNo
      atchDocNm.value = resultData.atchDocNm // 첨부파일명
      // console.log(resultData, 'resultData')
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
