<template>
  <!-- <h3 class="tit">서비스속성관리</h3> -->
  <div class="caution_box mb_20">
    <ul>
      <li>AICMS 서비스 권한은 M, E, A 또는 "*" (전체) 입니다.</li>
      <li>관리자 서비스 권한은 M, S 또는 "*" (전체) 입니다.</li>
    </ul>
  </div>
  <v-table>
    <tbody>
      <tr>
        <th class="">서비스채널</th>
        <td>
          <CommonComSelectBox
            v-model="searchParams.serviceChnl"
            :items="serviceChnl"
            :isDefault="false"
            class="s_basics w_150"
          />
        </td>
        <th class="">서비스코드</th>
        <td>
          <v-text-field
            label="서비스코드"
            v-model="searchParams.serviceCode"
            class="i_basics"
            maxlength="10"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">서비스명</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="서비스명"
              v-model="searchParams.serviceName"
              class="i_basics"
              @keydown.enter="searchData"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <CommonComAgGrid
    ref="agGrid"
    :columnDefs="columnDefs"
    :currentPage="currentPage"
    :defaultColDef="defaultColDef"
    :pageSize="pageSize"
    @clickPagingNumber="clickPagingNumber"
    @setPageSize="setPageSize"
    @callSave="callSave"
  />
</template>

<style scoped></style>

<script setup>
import { admApi } from '@/api/index.ts'

/** 변수 선언 및 정의 */

const searchParams = ref({
  serviceChnl: '', //서비스채널
  serviceCode: '', //메시지코드
  serviceName: '', //메시지명
  pageNum: 1,
  pageSize: 100,
})

const nameRules = [
  (v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

/* 콤보 박스 */

const serviceChnl = ref([
  { title: '전체', value: '' },
  { title: 'AICMS', value: 'W' },
  { title: '관리자', value: 'A' },
])

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

const needLoginYnCode = () => {
  var codes = []
  codes[0] = new NameValue('Y', '필요')
  codes[1] = new NameValue('N', '필요없음')
  return codes
}

const serviceChnlCode = () => {
  var codes = []
  codes[0] = new NameValue('W', 'AICMS')
  codes[1] = new NameValue('A', '관리자')
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
  return getCodeValue(needLoginYnCode(), node)
}
const convertserviceChnl = (node) => {
  return getCodeValue(serviceChnlCode(), node)
}

const agGrid = ref(null) //ag-grid 객체
const selectedValue = ref(null) //선택된 로우행
const currentPage = ref(1) //현재페이지
const pageSize = ref(100)

const columnDefs = ref([
  {
    headerName: '선택',
    field: 'chk',
    width: 80,
    cellRenderer: 'agCheckboxCellRenderer',
    editable: false,
    cellRendererParams: {
      disabled: false,
    },
  },
  { headerName: '상태', field: 'rowStatus', width: '80px', editable: false },
  {
    headerName: '서비스채널',
    field: 'serviceChnl',
    width: '200px',
    editable: (params) => params.data.rowStatus === 'C',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: { values: extractValues(serviceChnlCode()) },
    valueFormatter: function (params) {
      return lookupValue(serviceChnlCode(), params.value)
    },
    valueParser: function (params) {
      return lookupKey(serviceChnlCode(), params.newValue)
    },
    cellRenderer: convertserviceChnl,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '서비스코드',
    field: 'serviceCode',
    width: '210px',
    editable: (params) => params.data.rowStatus === 'C',
  },
  {
    headerName: '서비스명',
    field: 'serviceName',
    width: '420px',
    cellClass: ' cell_left  ',
  },
  {
    headerName: '로그인여부',
    field: 'needLoginYn',
    width: '160px',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: { values: extractValues(needLoginYnCode()) },
    valueFormatter: function (params) {
      return lookupValue(needLoginYnCode(), params.value)
    },
    valueParser: function (params) {
      return lookupKey(needLoginYnCode(), params.newValue)
    },
    cellRenderer: convertUseYn,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '서비스권한',
    field: 'serviceUser',
    width: '160px',
  },
])

let rowData = reactive([])

const defaultColDef = {
  sortable: true,
  filter: true,
  editable: true,
  resizable: true,
  cellStyle: { textAlign: 'center' },
}
/** 초기화 */
onMounted(() => {
  // 조회
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
  currentPage.value = Number(currentPage.value) + 1
  callApi()
}

const setPageSize = (number) => {
  pageSize.value = number
  searchData()
}

/************************************* API ***************************/
const callApi = () => {
  // 조회
  const params = searchParams.value //파라미터 셋팅
  params.pageNum = currentPage.value //페이지 넘버
  params.pageSize = pageSize.value //페이지 사이즈
  $fx.startLoadingbar()
  admApi
    .ADM0101S01(params)
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
//저장(추가,수정,삭제)
const callSave = (saveData) => {
  admApi.ADM0101I01(saveData).then(() => {
    searchData() //재검색
  })
}
</script>
