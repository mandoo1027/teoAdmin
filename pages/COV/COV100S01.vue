<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <v-table class="vtable_view">
    <colgroup>
      <col style="width: 180px" />
      <col style="width: 35%" />
      <col style="width: 180px" />
      <col style="width: 35%" />
    </colgroup>
    <tbody>
      <tr>
        <th>발주기관 정보</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="기관명"
              @click="searchOrgan"
              v-model="dataParams.instNm"
              :rules="instNmRules"
              :readonly="true"
              placeholder="기관 버튼을 클릭하세요"
              class="i_basics w_300"
            ></v-text-field>
            <v-btn class="vbtn ml_10 black" size="small" @click="searchOrgan">발주기관 찾기</v-btn>
          </div>
        </td>
        <th>발주기관 사업자 번호</th>
        <td>{{ instBrno }}</td>
      </tr>
      <tr>
        <th>모 계좌번호</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="발주기관 사업자 번호"
              v-model="orgNum"
              :rules="orgNumRules"
              required
              placeholder=""
              class="i_basics flex1"
            ></v-text-field>
            <v-btn class="vbtn line ml_10" size="small" @click="doPartVraBrnoSearch">조회</v-btn>
          </div>
        </td>
        <th>모 계좌 사업자 번호</th>
        <td>{{ partVraBrno }}</td>
      </tr>
      <tr>
        <th>가상계좌번호 등록</th>
        <td colspan="3">
          <v-textarea v-model="vraList" @input="changeVraList"></v-textarea>
          <p class="mt_10 t_right">총 {{ lineNo }} 건</p>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn black" size="small" @click="goList">가상계좌 현황</v-btn>
    <v-btn class="vbtn" size="small" @click="doSave">저장</v-btn>
  </div>
</template>

<style scoped></style>

<script setup>
import ComSelectBox from '@/components/common/ComSelectBox.vue'
import { covApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/

const MEM001P01 = 'MEMMEM001P01' //기관 검색 팝업창

const orgNum = ref('')
const orgNumRules = [
  //(v) => !!v || '다시 입력해주세요.',
]
const instNmRules = [(v) => !!v || '기관이 선택되지 않았습니다.']

// 파라미터 셋팅
const dataParams = ref({
  instId: '',
  instNm: '',
})

const instBrno = ref('') // 발주기관 사업자번호
const partVraBrno = ref('') // 모계좌번호 사업자번호
const vraList = ref('') // 가상계좌 입력칸
const lineNo = ref('') // 가상계좌 입력칸 줄 수

const insertParams = ref({
  partVraNo: '', // 모계좌번호
  ordrInstId: '', // 발주기관ID
  asgnDt: '', // TASK 할당일시
  cnclDt: '', // TASK해지일시
  userId: '', // 등록자 ID
  varNoList: [], // 가상계좌 번호 리스트
})

const instIdBrnoSearchParams = ref({
  instId: '',
})

/********************************* methods 선언 및 정의 *************************/
const goList = () => {
  $fx.move('ACOV001', {})
}

// 기관 검색
const searchOrgan = () => {
  $fx
    .throwDialog(MEM001P01, { data: { instFlag: 'O' }, close: false, title: '기관 검색' })
    .then((result) => {
      if (result) {
        dataParams.value.instNm = result.value?.title
        dataParams.value.instId = result.value?.value
      }
    })
    .finally(() => {
      getInstBrnoByInstId()
    })
}

// 발주기관 id로 사업자번호 가져오기
const getInstBrnoByInstId = () => {
  getBrnoApi()
}

// 모계좌번호 입력 이벤트
const doPartVraBrnoSearch = () => {
  // todo: 유효성검사

  if (!instBrno.value) {
    $fx.throwAlert('발주기관 찾기를 먼저 수행해주세요.')
    return
  }

  if (!/^\d{12}$/.test(orgNum.value)) {
    $fx.throwAlert('계좌번호를 숫자 12자리로 입력해주세요.')
    return false
  }

  getInstBrnoByVraNo()
}

// 모계좌번호로 사업자번호 가져오기
const getInstBrnoByVraNo = () => {
  // TODO: EAI 호출 추가, 발주기관 사업자번호와 비교 로직 추가필요
  partVraBrno.value = '1234-56-7890'
}

// 가상계좌번호 등록 input keyup 이벤트
const changeVraList = () => {
  lineNo.value = vraList.value.substr(0, vraList.value.selectionStart).split('\n').length
}

// 건 수 업데이트
const updateLineNo = () => {
  lineNo.value = vraList.value.substr(0, vraList.value.selectionStart).split('\n').length
}

// 줄 별 유효성 검사
const lineValidCheck = () => {
  if (!vraList.value) {
    $fx.throwAlert('계좌번호가 입력되지 않았습니다.')
    return false
  }

  const lines = vraList.value.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // XXX-XXX-XXXXXX 양식
    /*
    if (!/^\d{3}-\d{3}-\d{6}$/.test(line)) {
      $fx.throwAlert(
        i + 1 +
          '번째 줄 계좌번호 형태를 확인해주세요.<br>[입력] ' +
          line +
          '<br>[형식]XXX-XXX-XXXXXX',
      )
      break
    }
    */

    if (!/^\d{12}$/.test(line)) {
      $fx.throwAlert(
        i +
          1 +
          '번째 줄 계좌번호 형태를 확인해주세요.<br>[입력] ' +
          line +
          '<br>[형식] 숫자 12자리',
      )
      return false
    }
  }

  const uniquelines = new Set(lines)
  if (lines.length !== uniquelines.size) {
    $fx.throwAlert('중복된 계좌번호가 존재합니다.')
    return false
  }

  return true
}

const doSave = () => {
  //발주기관 사업자번호 확인

  // 모계좌 사업자번호 확인

  if (lineValidCheck()) {
    callApi()
  }
}

/********************************* api 선언 및 정의 *************************/

const getBrnoApi = () => {
  const params = instIdBrnoSearchParams.value
  params.instId = dataParams.value.instId

  $fx.startLoadingbar()
  covApi
    .COV1001S03(params)
    .then((response) => {
      instBrno.value = response.result.instBrno
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

const callApi = () => {
  const params = insertParams.value

  $fx.startLoadingbar()

  // 모계좌번호 실제코드로 대체 필요
  params.partVraNo = '123456135135'

  // 세션에서 userId 가져오기
  params.userId = '22101942'

  // 할당 및 해지일자는 null
  params.asgnDt = ''
  params.cnclDt = ''

  // 발주기관id
  params.ordrInstId = dataParams.value.instId

  // 가상계좌번호
  const lines = vraList.value.split('\n')
  params.vraNoList = lines

  covApi
    .COV1001I01(params)
    .then((response) => {
      $fx.throwAlert('등록이 완료되었습니다.')
      $fx.move('ACOV001', {})
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
