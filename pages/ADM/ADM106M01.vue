<template>
  <!-- <h3 class="tit">오류코드관리</h3> -->
  <v-table>
    <tbody>
      <tr>
        <th class="">오류코드</th>
        <td>
          <v-text-field
            label="오류코드"
            v-model="searchParams.errorCode"
            class="i_basics"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">오류메시지</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="오류메시지"
              v-model="searchParams.errorMsg"
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
  errorCode: '', //에러코드
  errorMsg: '', //에러메시지  
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
  { headerName: '상태', field: 'rowStatus', width: '100px', editable: false },
  {
    headerName: '오류코드',
    field: 'errorCode',
    width: '200px',
    editable: (params) => params.data.rowStatus === 'C',
  },
  {
    headerName: '오류메시지',
    field: 'errorMsg',
    width: '850px',
    cellClass: ' cell_left',
  },
  // {
  //   headerName: '셀프팁ID',
  //   field: 'selftipId',
  //   width: '170px',
  // },
])
let rowData = reactive([])
const defaultColDef = {
  sortable: true,
  filter: true,
  editable: true,
  // resizable: true,
  //cellStyle: { textAlign: 'center' },
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
    .ADM0201S01(params)
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
//에러코드 저장(추가,수정,삭제)
const callSave = (saveData) => {
  admApi.ADM0201I01(saveData).then(() => {
    searchData() //재검색
  })
}
</script>
