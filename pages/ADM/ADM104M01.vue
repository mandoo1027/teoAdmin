<template>
  <!-- <h3 class="tit">메세지관리</h3> -->
  <v-table>
    <tbody>
      <tr>
        <th class="">메시지코드</th>
        <td>
          <v-text-field
            label="메시지코드"
            v-model="searchParams.msgCd"
            class="i_basics"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">메시지명</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="메시지명"
              v-model="searchParams.msgNm"
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
  msgCd: '', //메시지코드
  msgNm: '', //메시지명
  pageNum: 1,
  pageSize: 100,
})

const nameRules = [
  (v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

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
  { headerName: '상태', field: 'rowStatus', width: '100px', editable: false },
  {
    headerName: '메시지코드',
    field: 'msgCd',
    width: '150px',
    editable: (params) => params.data.rowStatus === 'C',
  },
  {
    headerName: '메시지명',
    field: 'msgKo',
    width: '1060px',
    cellClass: ' cell_left  ',
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
    .ADM0102S01(params)
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
//메시지 저장(추가,수정,삭제)
const callSave = (saveData) => {
  admApi.ADM0102I01(saveData).then(() => {
    searchData() //재검색
  })
}
</script>
