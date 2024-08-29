<template>
  <v-table>
    <tbody>
      <tr>
        <th class="">코드그룹</th>
        <td>
          <v-text-field
            label="코드그룹"
            class="i_basics"
            v-model="searchParams.codeGrp"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">코드</th>
        <td>
          <v-text-field
            label="코드"
            class="i_basics"
            v-model="searchParams.code"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">코드설명</th>
        <td>
          <v-text-field
            label="코드설명"
            class="i_basics"
            v-model="searchParams.name"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">코드(2~5)</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="코드(2~5)"
              class="i_basics flex1"
              v-model="searchParams.etcCodeOrName"
              @keydown.enter="searchData"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small" @click.prevent="searchData">검색</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-btn class="bg-primary" @click="excelDown"> 엑셀 양식 다운로드 </v-btn>
  <v-btn class="bg-primary" @click="fileClick"> 엑셀 업로드 </v-btn>
  <v-btn class="bg-primary" @click="agGridTest"> AGGridTEst </v-btn>
  <v-file-input
    v-show="false"
    id="fileElement"
    accept=".csv"
    label="파일 업로드하기"
    @change="handleExcelRead"
  ></v-file-input>

  <CommonComAgGrid
    ref="agGrid"
    :columnDefs="columnDefs"
    :currentPage="currentPage"
    :gridOptions="gridOptions"
    :showOptions="showOptions"
    @clickPagingNumber="clickPagingNumber"
    @cellWasClicked="cellWasClicked"
    @setPageSize="setPageSize"
    @callSave="callSave"
  />
</template>

<script setup>
import { commonApi, admApi } from '@/api/index.ts' 

/********************************* 변수 선언 및 정의 *************************/

//검색 파라미터
const searchParams = ref({
  codeGrp: '', //코드그룹
  codeGrpName: '', //코드설명
  code: '', //코드
  name: '',
  etcCodeOrName: '', //코드(2~5)
  pageNum: 1,
  pageSize: 100,
})

//버튼 노출 옵션
const showOptions = {
  isShowAdd: false, //추가 버튼
  isShowDel: false, //삭제 버튼
  isShowSave: true, //저장 버튼
}

const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(1) //현재페이지
const pageSize = ref(100)

//그리드 기본 셋팅
const defaultColDef = {
  sortable: true, // 정렬 기능
  filter: true, // 필터 기능
  editable: true, // 편집 여부
  resizable: true, // 모르겠다
  cellStyle: { textAlign: 'center' }, //전체 컬럼 정렬
}
const gridOptions = {
  rowSelection: 'multiple',
  supressRowClickSelection: true,
}

//노출 컬럼 정의
const columnDefs = [
  {
    headerName: '',
    width: 15,
    cellClass: 'myClass',
    headerClass: 'myHeaderClass',
    rowDrag: true,
  },
  {
    headerName: '선택',
    field: 'chk',
    width: 80,
    headerComponent: $agGridUtils.CellRenderer.CheckboxCellererer,
    headerComponentParams: {
      change: (gridOption, isCheck) => {
        const resultData = agGrid.value.getData()
        const setData = resultData.map((item) => {
          item.chk = !isCheck ? false : item.validYn === 'Y' ? true : false
          return item
        })
        agGrid.value.removeData()
        gridOption.api?.applyTransaction({ add: setData })
      },
    },
    editable: (params) => params.data.validYn === 'Y',
  },
  {
    headerName: '상태',
    field: 'rowStatus',
    width: 80,
    editable: false,
  },
  {
    headerName: '코드그룹',
    field: 'codeGrp',
    width: 160,
    editable: (params) => params.data.rowStatus === 'C',
  },
  {
    headerName: '코드그룹명',
    field: 'codeGrpName',
    width: 160,
    editable: (params) => params.data.rowStatus === 'C',
  },
  { headerName: '코드', field: 'code', width: 110 },
  { headerName: '코드명', field: 'name', width: 110 },
  { headerName: '코드2', field: 'code2', width: 120 },
  { headerName: '코드명2', field: 'name2', width: 110 },
  {
    headerName: '순번',
    field: 'seq',
    width: 120,
    cellRenderer: agGrdUtil.CellRenderer.moveCellRenderer,
  },
  { headerName: '유효여부', field: 'validYn', width: 110 },
]

/********************************* 초기화 *************************/
onMounted(() => {
  //공통코드 조회
  searchData()
})

/********************************* methods *************************/
//검색
const searchData = () => {
  currentPage.value = 1
  agGrid.value.removeData()
  callApi()
}
//페이지 클릭
const clickPagingNumber = (number) => {
  currentPage.value = number
  callApi()
}

const setPageSize = (number) => {
  pageSize.value = number
}
//클릭시 이벤트
const cellWasClicked = (e) => {
  console.log('cellWasClicked:::', e)
}

const excelDown = () => {
  agGrid.value.gridOption.api.exportDataAsCsv()
}

const excelReadData = ref({})
const setRowData = (setData) => {
  agGrid.value.gridOption.api.setRowData(setData)
}
watch(excelReadData, (newValue, oldValue) => {
  setRowData(newValue)
  console.log('excelReadData has changed!', newValue)
})
const handleExcelRead = async (event) => {
  const file = event.target.files[0]
  $utils.excelRead(file, excelReadData)
}

const fileClick = () => {
  document.getElementById('fileElement').click()
}
const agGridTest = () => {
  console.log(agGrid.value.getData())
}
/************************************* API ***************************/
//공통코드 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  params.pageNum = currentPage.value //페이지 넘버
  params.pageSize = pageSize.value //페이지 사이즈
  $fx.startLoadingbar()
  commonApi
    .searchCommonCode(params)
    .then((response) => {
      const resultData = response.result.result
      console.log('::::', resultData)
      agGrid.value.addData(resultData)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
//공통코드 저장(추가,수정,삭제)
const callSave = (saveData) => {
  console.log(saveData)
  // $fx.startLoadingbar()
  // admApi.ADM0202I01(saveData).then(() => {
  //   fx.finishLoadingbar()
  //   searchData() //재검색
  // })
}
</script>
