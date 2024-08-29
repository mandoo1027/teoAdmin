<template>

  <!-- popup size width:500 height:466 -->
    <div class="popup_body">

      <div class="sms_confirm">
        <p class="tit">OTP 인증</p>
        
        <v-text-field label="인증번호" type="number" v-model="smsNum" :rules="smsNumRules" placeholder="인증번호를 입력하세요." class="i_basics mt_20"></v-text-field>
        <p class="t_right"><span class="time">05:00</span></p>

        <div class="btm">
          <div class="t_right">
            <v-btn class="vbtn line" size="small">인증번호 재전송</v-btn>
          </div>
        </div>
      </div>

      <div class="btm_btn_wrap">
        <v-btn class="vbtn" size="">확인</v-btn>
      </div>
    </div>

</template>

<style scoped>
  
</style>

<script setup >

const smsNum = ref('')
const smsNumRules = [
    (v) => !!v || '인증번호를 다시 입력해주세요.'
]

</script> 