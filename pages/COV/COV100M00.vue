<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <v-table>
    <colgroup>
      <col style="width:" />
      <col style="width:" />
      <col style="width:" />
      <col style="width:" />
    </colgroup>
    <tbody>
      <tr>
        <th class="">발주기관 명</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="기관명"
              @click="searchOrgan"
              v-model="dataParams.instNm"
              :rules="instNmRules"
              :readonly="true"
              placeholder="전체"
              class="i_basics w_300"
            ></v-text-field>
            <v-btn class="vbtn ml_10 black" size="small" @click="searchOrgan">발주기관 찾기</v-btn>
          </div>
        </td>
        <th class="">모 계좌번호</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="계좌번호 입력칸"
              v-model="accNum"
              :rules="accNumRules"
              required
              placeholder="계좌번호를 입력해주세요."
              class="i_basics flex1"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small" @click="searchData">조회</v-btn>
            <v-btn class="vbtn ml_10" size="small" @click="searchRset">초기화</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="grid">
    <ComAgGrid
      ref="agrid"
      :columnDefs="columnDefs"
      style="height: 400px"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :showOptions="showOptions"
    />
  </div>

  <div class="btm_btn_wrap">
    <v-btn class="vbtn black" size="small" @click="goManage">가상계좌 관리</v-btn>
    <v-btn class="vbtn" size="small" @click="goInsert">가상계좌 등록</v-btn>
  </div>
</template>

<style scoped></style>

<script setup>
import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComAgGrid from '~/components/common/ComAgGrid.vue'
import { covApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/

const MEM001P01 = 'MEMMEM001P01' //기관 검색 팝업창

const agrid = ref(null)
const currentPage = ref(0)
const pageSize = ref(10)
const checkBtn = ref(true)

const accNum = ref('')
const instNmRules = [(v) => !!v || '기관이 선택되지 않았습니다.']
const accNumRules = [
  //(v) => !!v || '다시 입력해주세요.',
]

// 검색 변수 파라미터
const searchParams = ref({
  ordrInstId: '', // 발주기관ID
  accNum: '', //  가상계좌번호
})

// 그리드 컬럼 정의
const columnDefs = ref([
  { headerName: 'No', field: 'number', width: 80 },
  { headerName: '발주기관 명', field: 'orgName', width: 200 },
  { headerName: '모 계좌번호', field: 'accNum', width: 200 },
  { headerName: '가상계좌 총 건 수', field: 'vaccNumTot', width: 200 },
  { headerName: '가상계좌 사용 건 수', field: 'vaccNumuse', width: 200 },
  { headerName: '가상계좌 잔여 건 수', field: 'vaccNumRemanet', width: 200 },
])

// 그리드 설정
const defaultColDef = {
  sortable: true,
  filter: true,
  editable: false,
  resizable: true,
  cellStyle: { textAlign: 'center' },
  flex: 1, // width auto
}

// 그리드 주변부 설정
const showOptions = {
  isShowSave: false,
}

// api 호출 파라미터 세팅
const dataParams = ref({
  instId: '',
  instNm: '',
})

/********************************* methods 선언 및 정의 *************************/
// 최초 로드
onMounted(async () => {
  $fx.startLoadingbar()
  $fx.finishLoadingbar()
})

// 조회 버튼 클릭 이벤트
const searchData = () => {
  currentPage.value = 0
  agrid.value.removeData()

  callApi()
}

// 초기화 버튼
const searchRset = () => {
  dataParams.value.instId = ''
  dataParams.value.instNm = ''
  accNum.value = ''
  searchParams.value.ordrInstId = ''
  searchParams.value.accNum = ''
}

//가상계좌 등록 버튼 클릭 이벤트
const goInsert = () => {
  $fx.move('ACOV002', {})
}

//가상계좌 관리 버튼 클릭 이벤트
const goManage = () => {
  $fx.move('ACOV003', {})
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
}

/********************************* api 선언 및 정의 *************************/
// 조회
const callApi = () => {
  const params = searchParams.value

  $fx.startLoadingbar()

  // 검색 파라미터 세팅
  params.accNum = accNum.value
  params.ordrInstId = dataParams.value.instId

  covApi
    .COV1001S01(params)
    .then((response) => {
      const vraList = response.result.vraList

      const resultData = []

      // api 응답 표에 세팅
      for (let i = 0; i < vraList.length; i++) {
        const vra = vraList[i]
        const convertedData = {
          number: i + 1,
          orgName: vra.instNm,
          accNum: vra.partVraNo,
          vaccNumTot: vra.totalCnt,
          vaccNumuse: vra.useCnt,
          vaccNumRemanet: vra.leftCnt,
        }

        resultData.push(convertedData)
      }

      agrid.value.addData(resultData)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
