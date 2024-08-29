<template>
  <!-- <h3 class="tit">EAI응답코드매칭관리</h3> -->
  <v-table>
    <tbody>
      <tr>
        <th class="">코어MSG ID</th>
        <td>
          <v-text-field
            label="CORE뱅킹 MSG ID"
            v-model="searchParams.coreMsgId"
            class="i_basics"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">메시지ID</th>
        <td>
          <v-text-field
            label="메시지ID"
            v-model="searchParams.msgId"
            class="i_basics"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">메시지내용</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="CORE뱅킹 MSG 내용"
              v-model="searchParams.coreMsgCn"
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
  coreMsgId: '', //코어메시지ID
  msgId: '', //메시지ID
  coreMsgCn: '', //메시지내용
  pageNum: 1,
  pageSize: 100,
})

const nameRules = [
  (v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

const agGrid = ref(null) //ag-grid 객체
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
    headerName: 'MSG ID',
    field: 'msgId',
    width: '100px',
    editable: (params) => params.data.rowStatus === 'C',
  },
  {
    headerName: 'MSG 내용',
    field: 'msgCn',
    width: '300px',
    // editable: (params) => params.data.rowStatus === 'C',
    cellClass: ' cell_left  ',
  },
  {
    headerName: 'MSG 구분',
    field: 'msgCd',
    width: '150px',
    // editable: (params) => params.data.rowStatus === 'C',
  },
  {
    headerName: 'CORE뱅킹 MSG ID',
    field: 'coreMsgId',
    width: '150px',
    editable: (params) => params.data.rowStatus === 'C',
    cellClass: ' cell_left  ',
  },
  {
    headerName: 'CORE뱅킹 MSG 내용',
    field: 'coreMsgCn',
    width: '300px',
    //  editable: (params) => params.data.rowStatus === 'C',
    cellClass: ' cell_left  ',
  },
  {
    headerName: 'EIA 내용',
    field: 'remark',
    width: '100px',
  },
  {
    headerName: '예비 필드1',
    field: 'filler01',
    width: '100px',
  },
  {
    headerName: '예비 필드2',
    field: 'filler02',
    width: '100px',
  },
  {
    headerName: '예비 필드3',
    field: 'filler03',
    width: '100px',
  },
  {
    headerName: '예비 필드4',
    field: 'filler04',
    width: '100px',
  },
])
let rowData = reactive([])
const defaultColDef = {
  sortable: true,
  filter: true,
  editable: true,
  resizable: true,
  
}

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
    .ADM0103S01(params)
    .then((response) => {
      const resultData = response.result.result
      
      if (resultData.length == 0) {
        $fx.finishLoadingbar()
      }
      agGrid.value.addData(resultData)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
//에러코드 저장(추가,수정,삭제)
const callSave = (saveData) => {
  
  admApi.ADM0103I01(saveData).then(() => {
    searchData() //재검색
  })
}
</script>
