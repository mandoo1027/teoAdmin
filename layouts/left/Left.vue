<template>
  <div class="left" :class="{ left_hide: leftHide }">
    <h1>
      <a @click="movePage('/')" class=""><img src="@/assets/images/logo.svg" alt="AICMS" /></a>
    </h1>

    <div class="user_info">
      <div class="img_user"><img src="@/assets/images/img_user.svg" alt="사용자 이미지" /></div>
      <p class="user_name">
        {{ userName }}<v-btn class="vbtn btn_logout" v-if="isLogin" @click="logout">로그아웃</v-btn>
      </p>
      <p class="user_org"><span>소속 : </span>{{ deptNm }}</p>

      <v-btn class="vbtn btn_left_view" @click="leftView">left 메뉴 접기</v-btn>
    </div>

    <ul class="user_info_util">
      <li>최종 로그인 : {{ lastLoginTime }}</li>
      <li>접속 IP : {{ userIp }}</li>
    </ul>

    <div class="left_menu">
      <v-expansion-panels variant="accordion">
        <template v-for="(menuInfo, index) in menuList" v-bind:key="index">
          <v-expansion-panel
            :class="menuInfo?.menuCss"
            v-if="menuAuth === 'M' || menuAuth === 'S'"
          >
            <v-expansion-panel-title>
              {{ menuInfo?.menuName }}
            </v-expansion-panel-title>

            <v-expansion-panel-text v-if="menuInfo?.children">
              <a
                v-for="(subMenu, subIndex) in menuInfo?.children"
                v-bind:key="subIndex"
                @click="movePage(subMenu?.menuCode)"
                :class="subMenu?.menuCss"
                >{{ subMenu?.menuName }}</a
              >
            </v-expansion-panel-text>
          </v-expansion-panel>
        </template>
      </v-expansion-panels>
    </div>
  </div>
</template>


<script setup>
import { loginApi } from '@/api/index.ts'
import { menuStore } from '@/store/menuStore'
//유저정보
const userData = computed(() => $fx.userData())
const userName = computed(() => userData.value.name)
const userIp = computed(() => userData.value.ip)
const deptNm = computed(() => userData.value.deptNm) //부서명
const menuAuth = computed(() => userData.value.menuAuth) //시스템 권한(S : 전체, M : 업무)

const isLogin = computed(() => $fx.isLogin())
const lastLoginTime = computed(() => {
  let strTime = userData.value.lastChgDt
  return strTime?.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1.$2.$3 $4:$5:$6')
})
//메뉴 리스트
let menuList = ref([])

//페이지 이동

const movePage = (url) => {
  $fx.move(url)
}

/********************************* INIT ****************************/
onMounted(() => {
  setMenuList()
})

/********************************* METHODS *************************/

const setMenuList = () => {
  let findMenu = menuStore()?.menuListAll
  menuList.value = findMenu?.filter((item) => item?.menuScrDev === 'M')
}

/*********************************** API ***************************/
//로그아웃
const logout = () => {
  $fx.startLoadingbar()
  loginApi
    .LOG0101S03()
    .then((response) => {
      if (response?.result) {
        $fx.logout()
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

//left 접기 펴기
const leftHide = ref(false)
const leftView = () => {
  leftHide.value = !leftHide.value
}
</script>
