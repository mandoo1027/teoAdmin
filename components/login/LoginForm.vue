<template>
  <div>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">아이디</div>

      <v-form ref="form" v-model="valid">
        <v-text-field
          placeholder="아이디를 입력하세요"
          v-model="name"
          :rules="nameRules"
          required
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          비밀번호

          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            비밀번호를 잊으셨나요?</a
          >
        </div>

        <v-text-field
          append-inner-icon="mdi-eye"
          type="password"
          density="compact"
          placeholder="비밀번호를 입력하세요."
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="password"
          :rules="passwordRules"
        ></v-text-field>
      </v-form>
      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="submit">
        로그인
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
const valid = ref(false)
const name = ref('')
const password = ref('')
const form = ref(null)
const nameRules = [
  (v) => !!v || '아이디를 입력하세요',
  (v) => (v && v.length >= 3) || '3자리 수 이상 입력하세요',
]
const passwordRules = [
  (v) => !!v || '비밀번호를 입력하세요',
  (v) => (v && v.length >= 3) || '3자리 수 이상 입력하세요',
]
const submit = () => {
  if (valid.value) {
    $fx.setSessionStorageItem('sessionKey', name.value)
    const redirectUrl = $fx.getRedirectUrl()
    $fx.move(redirectUrl)
  } else {
    form.value.validate()
  }
}
</script>