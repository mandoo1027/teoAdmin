<template>
  <div class="mb_30">
    <nuxt-link to="/sample/Template">디자인 가이드 템플릿</nuxt-link>
  </div>
  <div class="mb_30">
    <nuxt-link to="/sample/Admin_list">메뉴작업들</nuxt-link>
  </div>
  <label>
    <li>
      <nuxt-link to="/sample/EmptyLayout">레이아웃 비 활성화</nuxt-link>
    </li>
  </label>
  <h4>PDF</h4>

  <h4>유효성 체크</h4>
  <label>
    <li>
      <nuxt-link to="/sample/Validation">유효성 체크 샘플</nuxt-link>
    </li>
  </label>
  <label>
    <li>
      <nuxt-link to="/sample/ComponentLayout">컴포넌트 레이아웃</nuxt-link>
    </li>
  </label>
  <label>
    <li>
      <!-- <nuxt-link to="/sample/PdfViewer">PDF 뷰어</nuxt-link> -->
    </li>
    <li>
      <nuxt-link to="/sample/PdfMakeViewer">PDF 생성(HTMl->PDF)</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/sample/PdfMakeViewerType2">PDF 생성(HTMl -> IMAGE -> PDF)</nuxt-link>
    </li>
  </label>

  <h4>DOC 뷰어</h4>
  <li>
    <nuxt-link to="/sample/DocViewer">DOC 뷰어</nuxt-link>
  </li>

  <h4>그리드</h4>
  <label>
    <li>
      <nuxt-link to="/sample/GridViewer">그리드 샘플(베이직)</nuxt-link>
    </li>
    <li>
      <a @click="movePage">그리드 샘플</a>
    </li>
  </label>
  <h4>비로그인 비허용 페이지 접근</h4>
  <label>
    <li>
      <nuxt-link to="/sample/LoginNoEnterPage">회원 정보 수정하기</nuxt-link>
    </li>
  </label>

  <h4>API 테스트</h4>
  <label>
    <li>
      <v-button @click="callApi">공통코드 호출하기</v-button>
    </li>
  </label>
</template>

<script setup lang="ts">
import { commonApi } from '@/api/index.ts'
function callApi() {
  commonApi
    .searchCommonCode({ groupCode: 'ACNT_DIV_CD', pageNum: 0 })
    .then((response) => {
      console.log('result', response.result.result)
    })
    .catch((error) => {
      console.log(error)
    })
}
const movePage = () => {
  $fx.move('/sample/GridViewer', { userId: 222 })
}
</script>
