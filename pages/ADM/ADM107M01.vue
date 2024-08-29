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
        <th class="">그룹코드명</th>
        <td>
          <div>
            <v-text-field
              label="코드(2~5)"
              class="i_basics"
              v-model="searchParams.etcCodeOrName"
              @keydown.enter="searchData"
            ></v-text-field>
          </div>
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
        <th class="">코드명</th>
        <td class="d_flex">
          <v-text-field
            label="코드명"
            class="i_basics flex1"
            v-model="searchParams.name"
            @keydown.enter="searchData"
          ></v-text-field>
          <v-btn class="vbtn ml_10" size="small" @click.prevent="searchData">검색</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

  <CommonComAgGrid
    ref="agGrid"
    :columnDefs="columnDefs"
    :currentPage="currentPage"
    :defaultColDef="defaultColDef"
    @clickPagingNumber="clickPagingNumber"
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
/**
 * 객체에서 key로 value을 반환하는 함수, 콤보박스에서 사용
 */
function lookupValue(mappings, key) {
  for (var i = 0; i < mappings.length; i++) {
    if (mappings[i].name == key) {
      return mappings[i].value
    }
  }
  return ''
}

/**
 * 객체에서 vaue로 key를 반환하는 함수, 콤보박스에서 사용
 */
function lookupKey(mappings, name) {
  for (var i = 0; i < mappings.length; i++) {
    if (mappings[i].value == name) {
      return mappings[i].name
    }
  }
  return ''
}
function extractValues(mappings) {
  var params = new Array()
  for (var i = 0; i < mappings.length; i++) {
    params.push(mappings[i].name)
  }
  return params
}
var NameValue = function (pname, pvalue) {
  this.name = pname
  this.value = pvalue
}
const useYNCodes = () => {
  var codes = []
  codes[0] = new NameValue('Y', 'Y')
  codes[1] = new NameValue('N', 'N')
  return codes
}
const getCodeValue = (codes, nodeData) => {
  if (!codes) return ' - '
  for (var i = 0; i < codes.length; i++) {
    if (nodeData.value == codes[i].name) {
      return codes[i].value
    }
  }
  return ' - '
}
const convertUseYn = (node) => {
  return getCodeValue(useYNCodes(), node)
}
//노출 컬럼 정의
const columnDefs = [
  {
    headerName: '선택',
    field: 'chk',
    width: 80,
    headerComponent: $agGridUtils.CellRenderer.CheckboxCellererer,
    headerComponentParams: $agGridUtils.changeChkData,
    editable: false,
    cellRendererParams: {
      disabled: false,
    },
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
  },
  {
    headerName: '유효여부',
    field: 'validYn',
    width: 110,

    cellEditor: 'agSelectCellEditor',
    cellEditorParams: { values: extractValues(useYNCodes()) },
    valueFormatter: function (params) {
      return lookupValue(useYNCodes(), params.value)
    },
    valueParser: function (params) {
      return lookupKey(useYNCodes(), params.newValue)
    },
    cellRenderer: convertUseYn,
  },
]

/********************************* 초기화 *************************/
onMounted(() => {
  //공통코드 조회
  searchData()
})

/********************************* methods *************************/
const setPageSize = (number) => {
  pageSize.value = number
  callApi()
}
//검색
const searchData = () => {
  currentPage.value = 1
  agGrid.value.removeData()
  callApi()
}
//페이지 클릭
const clickPagingNumber = (number) => {
  currentPage.value = Number(currentPage.value) + 1
  callApi()
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
  const chkList = agGrid.value.getData()
  chkList.map((item) => {
    if (item.rowStatus === 'C' && !item.validYn) {
      item.validYn = 'Y'
    }
  })
  const findIdx = chkList.findIndex((item) => !item.seq || !item.validYn || !item.validYn)

  if (findIdx > -1) {
    $fx.throwAlert('메뉴명, 순번 값이 입력되지 않았습니다.')
    return
  }

  $fx.startLoadingbar()
  admApi
    .ADM0202I01(saveData)
    .then(() => {
      searchData() //재검색
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
