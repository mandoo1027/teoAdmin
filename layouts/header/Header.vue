<template>
  <div class="header">
    <ul class="top_box">
      <!-- <li>최종 로그인 시간 : {{ lastLoginTime }}</li>
      <li>
        유효 로그인 시간 : 10:00
        <v-btn class="vbtn">연장</v-btn>
      </li>
      <li>최종접속 IP : 10.11..000.32</li>
      <li>현재 접속 IP : {{ userIp }}</li> -->
      <!-- <li class="btn_logout">
        <v-btn class="vbtn" v-if="isLogin" @click="logout">로그아웃</v-btn>
      </li> -->
    </ul>
  </div>
</template>

<script setup>
import { loginApi } from '@/api/index.ts'

import { userInfoStore } from '@/store/userInfoStore'
const isLogin = computed(() => $fx.isLogin())

const userData = computed(() => $fx.userData())
const userIp = computed(() => userData.value.ip)
const lastLoginTime = computed(() => {
  let strTime = userData.value.lastChgDt
  return strTime?.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1.$2.$3 $4:$5:$6')
})

</script>

<style>
</style>