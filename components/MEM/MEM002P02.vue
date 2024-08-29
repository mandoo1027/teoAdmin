<template>
  <!-- popup size width:500 height:300 -->
  <div class="popup_body">
    <p class="pop_top_txt">정말로 회원을 탈퇴 하시겠습니까?</p>

    <v-textarea
      class="h_100 mt_10"
      placeholder="30자 이내로 사유를 직접 입력해주세요."
      v-model="contents"
    ></v-textarea>

    <div class="btm_btn_wrap">
      <v-btn class="vbtn black" size="small" @click="closePop">취소</v-btn>
      <v-btn class="vbtn" size="small" @click="memberOut">확인</v-btn>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { memApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/

const emits = defineEmits('')
const contents = ref('')
const memberOut = () => {
  if (!contents.value) {
    $fx.throwAlert('탈퇴 사유가 입력되지 않았습니다.')
    return
  }
  emits('close-dialog', contents.value)
}

const closePop = () => {
  emits('close-dialog')
}

/*********************************** API ***************************/
</script>
