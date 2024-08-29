<template>
  <!-- <h3 class="tit">배치관리</h3> -->

  <v-table>
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
              placeholder="기관 버튼을 클릭하세요"
              class="i_basics w_200"
            ></v-text-field>
            <v-btn class="vbtn ml_10 black" size="small" @click="searchOrgan">발주기관 찾기</v-btn>
          </div>
        </td>
        <th class="">사용여부</th>
        <td>
          <ComSelectBox
            groupCode="01"
            v-model="use"
            :items="itemsUse"
            :isDefault="false"
            class="s_basics"
          />
        </td>
        <th class="">계좌번호</th>
        <td>
          <div class="d_flex a_center">
            <ComSelectBox
              groupCode="01"
              v-model="accNum"
              :items="itemsAccNum"
              :isDefault="false"
              class="s_basics w_150"
            />
            <v-text-field
              label="계좌번호 입력칸"
              v-model="vraNo"
              :rules="vraNoRules"
              required
              placeholder="전체 계좌번호를 입력하세요."
              class="i_basics flex1 ml_10"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
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
      @callSave="callSave"
      :showOptions="showOptions"
    />
  </div>
  <div class="btm_btn_wrap">
    <v-btn class="vbtn" size="small" @click="goList">가상계좌 현황</v-btn>
  </div>
</template>

<style scoped></style>

<script setup>
import ComSelectBox from '@/components/common/ComSelectBox.vue'
import ComAgGrid from '~/components/common/ComAgGrid.vue'
const MEM001P01 = 'MEMMEM001P01' //기관 검색 팝업창
import { covApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/

const vraNo = ref('')
const vraNoRules = [
  //(v) => !!v || '다시 입력해주세요.',
]
const instNmRules = [(v) => !!v || '기관이 선택되지 않았습니다.']

const use = ref('all')
const itemsUse = ref([
  { title: '전체', value: 'all' },
  { title: '사용', value: 'use' },
  { title: '미사용', value: 'unused' },
])

const accNum = ref('part')
const itemsAccNum = ref([
  { title: '모 계좌번호', value: 'part' },
  { title: '가상계좌번호', value: 'vra' },
])

const showOptions = {
  isShowCnt: true, //건수 보여주기
  isShowDel: true, //삭제 버튼
  isShowSave: true, //저장 버튼
  isShowPageSize: true, //페이지 사이즈 콤보박스
  isShowMoreBtn: true, // 더보기 버튼
  isChangeSearchData: true, //검색 조건 변경시 더보기 노출 여부
  isRadio: false, //라디오 이벤트(체크박스 1건 선택) 여부
}

const searchParams = ref({
  vraStatParam: '', // 가상계좌 사용여부 옵션 (all: 전체, use: 사용, unused: 미사용)
  vraParam: '', // 계좌번호 옵션 (vra: 가상계좌번호, part: 모 계좌번호)
  accNum: '', // 계좌번호
  instId: '',
})

const columnDefs = ref([
  {
    headerName: '',
    field: 'chk',
    width: 80,
    cellRenderer: 'agCheckboxCellRenderer',
    cellRendererParams: {
      disabled: false,
    },
    cellClass: ['custom-center-align ag_radio'],
    cellStyle: (params) => {
      if (params.data.use === '사용') {
        return { display: 'none' }
      } else {
        return ''
      }
    },
  },
  { headerName: 'No', field: 'number', width: 80 },
  { headerName: '상태', field: 'rowStatus', width: '80px' },
  { headerName: '발주기관 명', field: 'orgName', width: 200 },
  { headerName: '모 계좌번호', field: 'accNum', width: 200 },
  {
    headerName: '가상계좌번호',
    field: 'vaccNum',
    width: 200,
  },
  { headerName: '사용여부', field: 'use', width: 200 },
  {
    headerName: '등록일자',
    field: 'regDate',
    width: 140,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  {
    headerName: '해지일자',
    field: 'closeDate',
    width: 140,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
])

const defaultColDef = {
  sortable: true,
  filter: true,
  editable: false,
  resizable: true,
  cellStyle: { textAlign: 'center' },
  flex: 1, // width auto
}
const agrid = ref(null)
const currentPage = ref(0)

// 파라미터 셋팅
const dataParams = ref({
  instId: '',
  instNm: '',
})

/********************************* methods 선언 및 정의 *************************/
const searchData = () => {
  currentPage.value = 0
  agrid.value.removeData()

  callApi()
}

// 초기화 버튼
const searchRset = () => {
  dataParams.value.instId = ''
  dataParams.value.instNm = ''
  searchParams.value.vraStatParam = ''
  searchParams.value.vraParam = ''
  searchParams.value.accNum = ''
  searchParams.value.instId = ''
  vraNo.value = ''
}

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
}

const callSave = (saveData) => {
  // TODO: soft delete로 변경할지
  // 삭제 시 체크된 데이터만 삭제할지는 고민 필요
  console.log(saveData)
  covApi.COV1002D01(saveData).then(() => {
    searchData()
  })
}

/********************************* api 선언 및 정의 *************************/
// 조회
const callApi = () => {
  const params = searchParams.value

  // // vraNo null check 추가 > 메시지팝업으로 변경
  // if (!vraNo.value) {
  //   $fx.throwAlert('계좌번호가 입력되지 않았습니다.')
  //   return
  // }

  $fx.startLoadingbar()

  params.vraStatParam = use.value
  params.vraParam = accNum.value
  params.accNum = vraNo.value
  params.instId = dataParams.value.instId

  console.log(params)

  covApi
    .COV1001S02(params)
    .then((response) => {
      const vraList = response.result.vraList

      const resultData = []

      for (let i = 0; i < vraList.length; i++) {
        const vra = vraList[i]

        const convertedData = {
          number: i + 1,
          orgName: vra.instNm,
          accNum: vra.partVraNo,
          vaccNum: vra.vraNo,
          use: vra.vraStat,
          regDate: vra.rgtrDate,
          closeDate: vra.cnclDt,
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
