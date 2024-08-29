<template>

  <div class="admin_login_wrap">
    <div class="admin_login_box">
      <div class="admin_login_left">
        <div class="adming_login_logo">
          <h1><img src="@/assets/images/aicms.svg" alt="AICMS"></h1>
          <p>지능형 대금관리 시스템</p>
        </div>
      </div>
      <div class="admin_login_con">
        <div class="admin_login_input">
          <p class="admin_login_title">Login</p>
          <p class="admin_login_tip">
            AICMS는 <span>크롬,</span> <span>엣지,</span> <span>사파리</span><br>
            <span>브라우저에 최적화</span>되어 있습니다.
          </p>

          <div>
            <v-form ref="form" v-model="valid">
              <v-text-field
                placeholder="아이디"
                v-model="userId"
                :rules="nameRules"
                required
                class="i_basics i_id"
              ></v-text-field>

              <v-text-field
                append-inner-icon="mdi-eye"
                type="password"
                density="compact"
                placeholder="비밀번호"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                v-model="password"
                :rules="passwordRules"
                class="i_basics i_pwd"
                v-if="false"
              ></v-text-field>
              <div class="ifm_keysec login">                
                <iframe src="/admin/keyboard_security2.html" frameborder="0" width="100%" height="100%"></iframe>
              </div>
            </v-form>
            <v-btn block class="vbtn" color="blue" size="large" variant="tonal">
              로그인
            </v-btn>
            <v-checkbox label="아이디 저장" />

            <p class="admin_txt_error" v-if="true">아이디/패스워드가 일치하지 않습니다.<br>다시 입력해주세요.</p>
            
          </div>
        </div>

        <p class="admin_copyright">@SHINHAN BANK, All rights reserved.</p>
      </div>
    </div>
  </div>

</template>

<style scoped>
  
</style>

<script setup >

const valid = ref(false)
const userId = ref('')
const password = ref('')

const nameRules = [
  (v) => !!v || '아이디를 입력하세요',
  (v) => (v && v.length >= 3) || '3자리 수 이상 입력하세요',
]
const passwordRules = [
  (v) => !!v || '비밀번호를 입력하세요',
  (v) => (v && v.length >= 3) || '3자리 수 이상 입력하세요',
]


</script> 