<template>
  <div class="caution_box mb_20">
    <ul>
      <li v-if="isEmptyId">관리자 등록입니다.</li>
      <li v-if="!isEmptyId">관리자 수정입니다.</li>
    </ul>
  </div>

  <!-- v-form form으로 보내야한다. -->
  <v-form ref="form" v-model="valid">
    <v-table class="vtable_view">
      <tbody>
        <tr>
          <!-- 아이디 값 골드윙으로 만들어야 되는지 여부 확인해야함 -->
          <th>아이디</th>
          <td>
            <div class="d_flex">
              <v-text-field
                label="아이디"
                v-model="saveParams.id"
                :rules="userIdRules"
                required
                placeholder=""
                class="i_basics w_200"
                maxlength="20"
                :readonly="!isEmptyId"
              ></v-text-field>
              <v-btn
                class="vbtn ml_10 black"
                size="small"
                @click="duplicateCheckId"
                v-if="isEmptyId"
                >중복체크</v-btn
              >
            </div>
          </td>
        </tr>
        <tr v-if="!isLocal">
          <td colspan="2" class="pd_0">
            <div class="ifm_keysec">
              <iframe id="passwordFrame" src="/admin/multiPassword.html" />
            </div>
          </td>
        </tr>
        <tr v-if="isLocal">
          <th>비밀번호</th>
          <td>
            <v-text-field
              label="비밀번호"
              v-model="saveParams.pwd"
              :rules="passwordRules"
              type="password"
              placeholder=""
              class="i_basics pwd_chk w_300"
              maxlength="50"
            ></v-text-field>
          </td>
        </tr>
        <tr v-if="isLocal">
          <th>비밀번호 확인</th>
          <td>
            <v-text-field
              label="비밀번호 확인"
              v-model="saveParams.pwdOk"
              :rules="passwordOkRules"
              type="password"
              placeholder=""
              class="i_basics pwd_chk w_300"
              maxlength="50"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>이름</th>
          <td>
            <v-text-field
              label="이름"
              v-model="saveParams.name"
              :rules="userNameRules"
              required
              placeholder=""
              class="i_basics w_200"
              maxlength="50"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>골드윙사번</th>
          <td>
            <v-text-field
              label="골드윙사번"
              v-model="saveParams.idno"
              :rules="idnoRules"
              required
              placeholder=""
              class="i_basics w_200"
              maxlength="11"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>소속</th>
          <td>
            <v-text-field
              label="소속"
              v-model="saveParams.deptNm"
              :rules="deptNmRules"
              required
              placeholder=""
              class="i_basics w_300"
              maxlength="50"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>IP</th>
          <td>
            <div class="d_flex">
              <v-text-field
                label="IP"
                v-model="saveParams.ip"
                :rules="ipRules"
                required
                placeholder=""
                class="i_basics w_200"
                maxlength="20"
              ></v-text-field>
              <!-- :readonly="true" -->
              <!-- <v-btn class="vbtn ml_10 black" size="small" @click="find_ip">IP확인</v-btn> -->
            </div>
          </td>
        </tr>
        <tr>
          <th>권한</th>
          <td>
            <CommonComSelectBox
              groupCode="MENU_AUTH"
              v-model="saveParams.menuAuth"
              :isDefault="true"
              class="s_basics w_150"
            />
          </td>
        </tr>
        <!-- <tr>
          <th>이메일</th>
          <td>
            <div class="d_flex">
              <v-text-field
                label="이메일"
                v-model="saveParams.email"
                required
                placeholder=""
                class="i_basics w_150 mr_5"
                maxlength="50"                
              ></v-text-field>
             -->
        <tr>
          <th>연락처</th>
          <td>
            <div class="d_flex">
              <v-text-field
                label="전화1"
                v-model="saveParams.moblTelno1"
                required
                placeholder=""
                class="i_basics w_100"
                maxlength="3"
              ></v-text-field>
              <!-- :rules="moblTelno1Rules" -->
              -
              <v-text-field
                label="전화2"
                v-model="saveParams.moblTelno2"
                :rules="moblTelno2Rules"
                required
                placeholder=""
                class="i_basics w_100"
                maxlength="4"
              ></v-text-field>
              -
              <v-text-field
                label="전화3"
                v-model="saveParams.moblTelno3"
                :rules="moblTelno3Rules"
                required
                placeholder=""
                class="i_basics w_100"
                maxlength="4"
              ></v-text-field>
            </div>
          </td>
        </tr>
        <tr>
          <th>비고</th>
          <td><v-textarea v-model="saveParams.memo" class="h_100"></v-textarea></td>
        </tr>
      </tbody>
    </v-table>

    <div class="btm_btn_wrap">
      <v-btn class="vbtn black" size="small" @click="moveADM100M01">이전화면</v-btn>
      <v-btn class="vbtn" size="small" v-if="isEmptyId" @click="saveSubmit">저장</v-btn>
      <v-btn class="vbtn" size="small" v-if="!isEmptyId" @click="saveSubmit">수정</v-btn>
      <v-btn class="vbtn black" size="small" v-if="!isEmptyId" @click="delMaster">삭제</v-btn>
    </div>
  </v-form>
</template>

<style scoped></style>

<script setup>
import { hcoApi, commonApi } from '@/api/index.ts'
/********************************* 변수 선언 및 정의 *************************/
const isLocal = computed(() => $fx.isLocal())

const hid_key_data_frm = ref('')
const hid_enc_data_frm = ref('')
// 유효성 검증관련 변수
const valid = ref(false) // 벨리데이션 전체 확인
const form = ref(null)

// 아이디 존재 여부 : 버튼 중복확인에 적용
const isEmptyId = ref(false)

/* 검색 변수 파라미터  */
const searchParams = ref({
  id: '',
})

/* 검색 변수 파라미터  */
const saveParams = ref({
  id: '',
  pwd: '',
  pwdOk: '',
  name: '',
  idno: '',
  ip: '',
  moblTelno1: '010',
  moblTelno2: '',
  moblTelno3: '',
  email: '',

  menuAuth: '',
  deptCd: '',
  deptNm: '',
  memo: '',
  otpSkey: '',
  duplicateCheckApi: 'N',
})

const userId = ref('')
const userIdRules = [
  (v) => (v && /^[a-zA-Z0-9]{6,16}$/.test(v)) || '두 자리 이상 영문 입력해주세요.',
  //(v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

// const password = ref('')
const passwordRules = [
  (v) =>
    (v && v.length <= 20 && v.length >= 8) ||
    '비밀번호 설정 방법이 맞지 않습니다. 영문, 숫자 대소문자 구분없이 8~20 자리',
  // (v) => (v && v.length >= 16) || '영문, 숫자 대소문자 구분없이 6~16 자리',
]

const passwordOk = ref('')
const passwordOkRules = [
  (v) => !!v || '비밀번호 확인이 입력되지 않았습니다.',
  (v) =>
    saveParams.value.pwd === v || '비밀번호와 비밀번호 확인이 맞지 않습니다. 다시 입력해주세요.',
]

const userName = ref('')
const userNameRules = [
  (v) => !!v || '이름을 입력해주세요.',
  //(v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const ip = ref('')
const ipRules = [
  (v) => !!v || 'IP정보를 확인해주세요.',
  //(v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const emailRules = [
  (v) => /.+@.+\..+/.test(v) || '이메일 형식에 맞게 입력해주세요.',
  //(v) => !!v || '다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const idnoRules = [
  (v) => !!v || '골드윙 사번을 입력해주세요.',
  //(v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const deptNmRules = [
  (v) => !!v || '소속을 입력해주세요.',
  //(v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const moblTelno1Rules = [
  // (v) => !!v || '권한을 입력해주세요.',
  (v) => (v && v.length >= 2) || '값을 확인해주세요.',
]
const moblTelno2Rules = [
  //(v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 2) || '값을 확인해주세요.',
]
const moblTelno3Rules = [
  //(v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 2) || '값을 확인해주세요.',
]

/************************************* API ***************************/

onMounted(() => {
  const operId = $fx.getParams().operId
  if (operId) {
    // 조회
    searchParams.value.id = operId
    callApi()
  } else {
    isEmptyId.value = !saveParams.value.id
  }

  passwordFormInit()
})
/************************************* meothod ***************************/

//이전화면.
const moveADM100M01 = () => {
  $fx.move('AADM001', {})
}

// Validation 전체 검증
const saveSubmit = async () => {
  let chkPwValue
  if (!isLocal.value) {
    chkPwValue = await document.getElementById('passwordFrame').contentWindow.validationPwChk()
    if (!chkPwValue) {
      return
    }
  }

  $utils.validate(form).then((result) => {
    if (!result) {
      $fx.throwAlert('필수값을 확인해주세요.', '알람')
      // result = ''
    } else {
      if (!isLocal.value) {
        document.getElementById('passwordFrame').contentWindow.user_TK_makeEncData()
        saveParams.value.hidKeyData = encodeURI(
          document.getElementById('passwordFrame').contentWindow.getHidKeyDataFrm(),
        )
        saveParams.value.hidEncData = document
          .getElementById('passwordFrame')
          .contentWindow.getEncDataFrm()
        saveParams.value.pwd = document.getElementById('passwordFrame').contentWindow.getE2E_memPw()
        saveParams.value.pwdOk = document
          .getElementById('passwordFrame')
          .contentWindow.getE2E_memPwOk()
      } else {
        saveParams.value.hidKeyData = 'local'
        saveParams.value.hidEncData = 'local'
      }

      if ($utils.isEmpty($fx.getParams().operId)) {
        if (saveParams.value.duplicateCheckApi === 'N') {
          $fx.throwAlert('아이디 중복체크 해주세요.', '알람')
          return
        }
        saveMaster()
      } else {
        upMaster()
      }
    }
  })
}

// ID 중복조회 빈값 체크
const duplicateCheckId = () => {
  if (saveParams.value.id) {
    duplicateCheckApi()
  } else {
    $fx.throwAlert('한글자 이상 입력해주세요.', '알람')
  }
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

// ID 중복조회
const duplicateCheckApi = () => {
  const params = saveParams.value // 파라미터 셋팅
  $fx.startLoadingbar()
  hcoApi
    .HCO0603S03(params)
    .then((response) => {
      const resultData = response.result.msg
      if (resultData === 'Y') {
        $fx.throwAlert('사용 가능한 아이디입니다.', '알람')
        saveParams.value.duplicateCheckApi = 'Y'
      } else {
        saveParams.value.id = ''
        $fx.throwAlert('이미 사용중인 아이디입니다.', '알람')
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// IP 확인 체크
const find_ip = () => {
  const params = saveParams.value // 파라미터 셋팅
  $fx.startLoadingbar()
  hcoApi
    .HCO0604S02(params)
    .then((response) => {
      const resultData = response.result.ip
      saveParams.value.ip = resultData
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
  $fx.startLoadingbar()
  hcoApi
    .HCO0603S02(params)
    .then((response) => {
      const resultData = response.result.resultInfo
      saveParams.value.id = resultData.id
      saveParams.value.name = resultData.name
      saveParams.value.pwd = resultData.pwd
      saveParams.value.ip = resultData.ip
      saveParams.value.idno = resultData.idno
      saveParams.value.moblTelno1 = resultData.moblTelno1
      saveParams.value.moblTelno2 = resultData.moblTelno2
      saveParams.value.moblTelno3 = resultData.moblTelno3
      saveParams.value.email = resultData.email

      saveParams.value.menuAuth = resultData.menuAuth
      saveParams.value.deptCd = resultData.deptCd
      saveParams.value.deptNm = resultData.deptNm
      saveParams.value.memo = resultData.memo
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 등록
const saveMaster = () => {
  const params = saveParams.value //파라미터 셋팅
  $fx.startLoadingbar()
  hcoApi
    .HCO0603I01(params)
    .then((response) => {
      const resultData = response.result.msg
      if (resultData === 'Y') {
        $fx.throwAlert('등록완료 했습니다').then((result) => {
          $fx.move('AADM001', {})
        })
      } else if (resultData === 'F') {
        $fx.throwAlert('이미 존재합니다.').then((result) => {
          $fx.move('AADM002', {})
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

// 수정
const upMaster = () => {
  const params = saveParams.value //파라미터 셋팅
  $fx.startLoadingbar()
  hcoApi
    .HCO0603U01(params)
    .then((response) => {
      const resultData = response.result.msg
      if (resultData === 'Y') {
        $fx.throwAlert('수정완료 했습니다').then((result) => {
          $fx.move('AADM001', {})
        })
      }
    })
    .catch((error) => {
      $fx.move('AADM001', {})
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 삭제
const delMaster = () => {
  $fx
    .throwConfirm('삭제 하십니까?', '알림', {
      confirmLabel: '예',
      closeLabel: '아니요',
    })
    .then((result) => {
      if (result) {
        const params = saveParams.value //파라미터 셋팅
        $fx.startLoadingbar()
        hcoApi
          .HCO0603D01(params)
          .then((response) => {
            const resultData = response.result.msg
            if (resultData === 'Y') {
              $fx.throwAlert('삭제완료 했습니다').then((result) => {
                $fx.move('AADM001', {})
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
    })
}
</script>
