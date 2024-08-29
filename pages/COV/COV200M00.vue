<template>
  <!-- 발주기관 계좌잔액조회 -->
  <v-table>
    <tbody>
      <tr>
        <th class="">발주기관</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="기관명"
              @click="searchOrgan"
              v-model="searchParams.instNm"
              :readonly="true"
              placeholder="기관 버튼을 클릭하세요"
              class="i_basics w_300"
            ></v-text-field>
            <v-btn class="vbtn ml_10 black" size="small" @click="searchOrgan">발주기관 찾기</v-btn>
          </div>
        </td>
        <th class="">계좌구분</th>
        <td>
          <div class="d_flex">
            <CommonComSelectBox
              v-model="searchParams.vraNoGubun"
              :items="items"
              :isDefault="false"
              :isAll="true"
              class="s_basics w_180"
            />
            <!-- @changeValue="searchData" -->
            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <CommonComAgGrid
    ref="agGrid"
    :columnDefs="columnDefs"
    :defaultColDef="defaultColDef"
    :showOptions="showOptions"
    style="height: 600px"
    @cellWasClicked="cellWasClicked"
  />
</template>

<style scoped></style>

<script setup>
import { covApi } from '@/api/index.ts'
const MEM001P01 = 'MEMMEM001P01' //기관 검색 팝업창
/********************************* 변수 선언 및 정의 *************************/
/* 검색 변수 파라미터  */

const searchParams = ref({
  instId: '',
  instNm: '',
  vraNoGubun: '',
})

const items = ref([
  { title: '모계좌번호', value: 'A' },
  { title: '집금계좌번호', value: 'B' },
])

const agGrid = ref(null) //ag-grid 객체

class CustomCellRendererBtn {
  eGui

  init(params) {
    this.eGui = document.createElement('div')
    this.eGui.classList.add('my-custom-cell-renderer')
    this.eGui.innerHTML =
      /* html */
      `<button type="button" class="btn_vbtn">잔액조회</button>`
  }

  getGui() {
    return this.eGui
  }

  refresh(params) {
    return false
  }
}

const columnDefs = ref([
  { headerName: 'NO.', field: 'no', width: '80px', valueGetter: 'node.rowIndex + 1' },
  {
    headerName: '발주기관명',
    field: 'ordrInstNm',
    width: '400px',
    cellClass: 'ellipsis ',
  },
  { headerName: '계좌구분', field: 'acntDivCd', width: '200px' },

  {
    headerName: '계좌번호',
    field: 'acntNo',
    width: '250px',
  },
  {
    headerName: '잔액',
    field: 'amt',
    width: '250px',
    cellClass: ' cell_right  ',
    valueFormatter: (params) => (params?.value ? $utils.addComma(params?.value) + '원' : ''),
  },
  {
    headerName: '잔액조회',
    field: 'wonSearch',
    width: '110px',
    cellRenderer: CustomCellRendererBtn,
  },
])

//그리드 기본 셋팅
const defaultColDef = {
  editable: false, // 편집 여부
  cellStyle: { textAlign: 'center' }, //전체 컬럼 정렬
}
const showOptions = ref({
  isChangeSearchData: true, //검색 조건 변경시 더보기 노출 여부
  isShowPageSize: false, //
  //isShowCnt: false, //조회건수
})

/********************************* 초기화 *************************/
onMounted(() => {
  // 조회
  searchData()
})

/********************************* methods *************************/
// 기관 검색
const searchOrgan = () => {
  searchParams.value.instNm = ''
  searchParams.value.instId = ''
  $fx
    .throwDialog(MEM001P01, { data: { instFlag: 'O' }, close: false, title: '기관 검색' })
    .then((result) => {
      if (result) {
        searchParams.value.instNm = result.value?.title
        searchParams.value.instId = result.value?.value
        searchData() //조회
      }
    })
}

//검색
const searchData = () => {
  agGrid.value.removeData()
  callApi()
}

//필드클릭
const cellWasClicked = (params) => {
  //잔액 필드 클릭
  if (params.column.colId === 'wonSearch') {
    $fx.throwAlert('작업중 입니다. ', '알림')
    // ordrInstId: params.data.ordrInstId,
    // acntNo: params.data.acntNo,
  }
}

/************************************* API ***************************/
// 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅

  $fx.startLoadingbar()

  covApi
    .COV2001S01(params)
    .then((response) => {
      const vraList = response.result.vraList
      agGrid.value.addData(vraList)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
