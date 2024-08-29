<template>
  <div class="admin_login_wrap">
    <div class="admin_login_box">
      <div class="admin_login_left">
        <div class="adming_login_logo">
          <h1><img src="@/assets/images/aicms.svg" alt="AICMS" /></h1>
          <p>지능형 대금관리 시스템</p>
        </div>
      </div>
      <div class="admin_login_con">
        <div class="admin_login_input">
          <p class="admin_login_title">Login</p>
          <div>
            <v-form ref="form" v-model="valid">
              <v-text-field
                placeholder="아이디"
                ref="memIdRef"
                v-focus
                v-model="userId"
                :rules="nameRules"
                required
                class="i_basics i_id"
              ></v-text-field>

              <v-text-field
                v-if="isLocal"
                append-inner-icon="mdi-eye"
                type="password"
                density="compact"
                ref="memPwRef"
                placeholder="비밀번호"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                v-model="password"
                :rules="passwordRules"
                class="i_basics i_pwd"
                @keydown.enter="submit"
              ></v-text-field>
              <!-- <div class="ifm_keysec login" v-else>
                <iframe id="passwordFrame" src="/admin/password.html" />
              </div> -->
            </v-form>
            <v-btn block class="vbtn" color="blue" size="large" variant="tonal" @click="submit">
              로그인
            </v-btn>
            <v-checkbox label="아이디 저장" v-model="rememeberChk" />

            <p class="admin_txt_error" v-if="compuLoginFail">
              아이디/패스워드가 일치하지 않습니다.<br />다시 입력해주세요.
            </p>
          </div>
        </div>

        <p class="admin_copyright">@SHINHAN BANK, All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDialogStore } from '@/store/dialogStore'
import { userInfoStore } from '@/store/userInfoStore'
import { loginApi, commonApi } from '@/api/index'

const isLocal = computed(() => $fx.isLocal())

const dialogStore = useDialogStore()

const memIdRef = ref(null)
const memPwRef = ref(null)
const valid = ref(false)
const userId = ref('')
const umsCertNum = ref('')
const password = ref('')
const form = ref(null)
const rememeberChk = ref(false)
const isPasswordFiveFail = ref(false) //비밀번호 5회 이상 실패 여부
const loginData = reactive({
  isSend: false, //로그인 시도
  isFail: false, // 로그인 실패
})
//로그인 실패 여부
const compuLoginFail = computed(() => loginData.isSend && loginData.isFail)
const nameRules = [
  (v) => !!v || '아이디를 입력하세요',
  (v) => (v && v.length >= 3) || '3자리 수 이상 입력하세요',
]
const passwordRules = [
  (v) => !!v || '비밀번호를 입력하세요',
  (v) => (v && v.length >= 3) || '3자리 수 이상 입력하세요',
]
const submit = async () => {
  if (isLocal.value) {
    if (valid.value) {
      callApi()
    } else {
      form.value.validate()
    }
  } else {
    if (await validateChk()) {
      callApi()
    }
  }
}

// 아이디를 쿠키에 저장
const setUserIdCookie = () => {
  let userIdStr = userId.value
  if (!rememeberChk.value) {
    userIdStr = ''
  }

  document.cookie = `adminUserId=${userIdStr}; expires=${new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000,
  ).toUTCString()}; path=/`
}

// 쿠키에서 아이디 가져오기
const getUserIdFromCookie = () => {
  const name = 'adminUserId='
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }
  return ''
}

let intervalNumber
let nubmerCnt = 0
const passwordFormInit = () => {
  if (!isLocal.value) {
    $fx.startLoadingbar()
    setTimeout(async () => {
      try {
        const nonce = await commonApi.rndVal()
        let TNK_SR = nonce.RES_DAT.sessionId.replaceAll(/(?:\r\n|\r|\n)/g, '')
        document.getElementById('passwordFrame').contentWindow.initKey(TNK_SR)
        clearInterval(intervalNumber)
        $fx.finishLoadingbar()
      } catch (e) {
        intervalNumber = setInterval(() => {
          passwordFormInit()
        }, 2000)
      }
    }, 1000)
  }
}

onMounted(() => {
  const getUserId = getUserIdFromCookie() //쿠키에 저장된 아이디 가져오기
  userId.value = getUserId
  if (userId.value) {
    rememeberChk.value = true
  }

  passwordFormInit()
})

//로그인 성공
const successLogin = (userInfo) => {
  userInfoStore().setUserData(userInfo) //유저정보
  setUserIdCookie()
  const redirectUrl = $fx.getRedirectUrl()
  //로그인 시간 실시간 체크
  const inervalNumber = setInterval(() => {
    $fx.checkLoginTime()
  }, 10000)
  dialogStore.setInterval(inervalNumber)
  $fx.move(redirectUrl)
  // $fx.move('/sample/menu_list')
}

const validateChk = async () => {
  let isMemId = await $utils.validate(memIdRef)
  let isMemPw
  if (isLocal.value) {
    isMemPw = await $utils.validate(memPwRef)
  } else {
    isMemPw = await document.getElementById('passwordFrame').contentWindow.validationPwChk()
  }
  return isMemId && isMemPw
}

const dupliLoginChk = (resultCode) => {
  if (resultCode === 'S1') {
    $fx.throwAlert(
      '회원님과 동일 아이디가 다른 환경에서 로그인이 되어었습니다.<br>계정 보호를 위해 이전에 로그인한 기기는 자동로그아웃됩니다.',
    )
  }
}

/*********************************** API ***************************/

//로그인하기
const callApi = () => {
  let hid_key_data_frm = 'local'
  let hid_enc_data_frm = 'local'
  let memPwStr = password.value
  if (!isLocal.value) {
    document.getElementById('passwordFrame').contentWindow.user_TK_makeEncData()
    hid_key_data_frm = encodeURI(
      document.getElementById('passwordFrame').contentWindow.getHidKeyDataFrm(),
    )
    hid_enc_data_frm = document.getElementById('passwordFrame').contentWindow.getEncDataFrm()
    memPwStr = document.getElementById('passwordFrame').contentWindow.getE2E_memPw()
  }

  const params = {
    hidKeyData: hid_key_data_frm,
    hidEncData: hid_enc_data_frm,
    id: userId.value,
    pwd: memPwStr,
    type: 'LOGIN',
    umsCertNum: umsCertNum.value,
    serialNo: '',
  }
  $fx.startLoadingbar()
  loginData.isSend = true
  loginApi
    .LOG0101S01(params)
    .then((response) => {
      //ECM3103 이미 로그인된 경우
      // if (response?.RES_ERR?.errorCode === 'ECM3101') {
      //   $fx
      //     .throwAlert(
      //       '다른 아이디로 로그인된 상태이므로 강제 로그아웃 처리하겠습니다.<br>재 로그인 하시기 바랍니다.',
      //     )
      //     .then(() => {
      //       $fx.logout('AHOM001')
      //     })
      //   return
      // }
      //로그인 성공
      if (response.result) {
        if (response.resultCode === 'CERT') {
          params.serialNo = response.result.serialNo
          //추가인증
          $fx
            .throwDialog('LOGLOG001P01', {
              data: params,
              close: false,
              title: '',
            })
            .then((result) => {
              if (result.isPass) {
                dupliLoginChk(result?.response?.resultCode)

                successLogin(result.response.result.member)
              }
            })
        } else {
          dupliLoginChk(response?.resultCode)
          //로그인 처리
          successLogin(response.data)
        }
      } else {
        loginData.isFail = true
        // if (response.result.resultCode === 'R1') {
        //   //회원정보가 없거나 탈퇴한 경우
        //   loginData.isFail = true
        //   isPasswordFiveFail.value = false //비밀번호 5회 실패 초기화
        // } else if (response.result.resultCode === 'R2') {
        //   //비밀번호 5회 실패시
        //   isPasswordFiveFail.value = true //비밀번호 5회 실패
        // } else {
        //   loginData.isFail = true
        // }
      }
    })
    .catch((error) => {})
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
