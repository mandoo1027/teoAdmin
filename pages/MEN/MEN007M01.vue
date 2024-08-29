<template>
  <!-- 회계년도별현황 -->
  <v-table>
    <tbody>
      <tr>
        <th class="">회계연도</th>
        <td>
          <CommonComSelectBox
            v-model="searchParams.bizFyr"
            :items="itemsYear"
            :isDefault="false"
            class="s_basics w_200 none_details"
          />
        </td>
        <th class="">사업상태</th>
        <td>
          <div class="d_flex">
            <CommonComSelectBox
              groupCode="BIZ_STAT_CD"
              v-model="searchParams.bizStatCd"
              :isDefault="false"
              :isAll="true"
              class="s_basics w_250"
            />
            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
            <v-btn class="vbtn ml_10" size="small" @click="searchRset">초기화</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <CommonComAgGrid
    ref="agGrid"
    :columnDefs="columnDefs"
    :defaultColDef="defaultColDef"
    :pageSize="pageSize"
    :showOptions="showOptions"
    @clickPagingNumber="clickPagingNumber"
    @setPageSize="setPageSize"
  />
</template>

<style scoped></style>

<script setup>
import { menuApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/

const today = new Date() // 현재 날짜와 시간을 포함하는 Date 객체 생성
const year = today.getFullYear() // 년도 가져오기
//const yearList = today.getFullYear() - 2 // 년도 가져오기
/* 검색 변수 파라미터  */
const searchParams = ref({
  bizFyr: year, //회계년도
  bizStatCd: '', //사업상태코드
})
const itemsYear = ref([])
searchParams.value.certDate = $utils.getDateYYYYMMDD(0, 0, 0)

const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(0) //현재페이지
const pageSize = ref(100)

//2023년도 부터갖어오기
for (let index = 0; index < 2; index++) {
  const element = 2023 + index
  itemsYear.value.push({ title: element, value: element })
}

const columnDefs = ref([
  { headerName: 'NO.', field: 'no', width: '80px', valueGetter: 'node.rowIndex + 1' },
  { headerName: '발주기관', field: 'ordrInstNm', width: '300px' },
  {
    headerName: '사업건수',
    field: 'bizCnt',
    width: '250px',
    valueFormatter: (params) => $utils.addComma(params?.value) + '건',
  },
  {
    headerName: 'TASK건수',
    field: 'taskCnt',
    width: '250px',
    valueFormatter: (params) => $utils.addComma(params?.value) + '건',
  },
  {
    headerName: '총 예산',
    field: 'budgetTotAmt',
    width: '250px',
    cellClass: ' cell_right  ',
    valueFormatter: (params) => $utils.addComma(params?.value) + '원',
  },
  {
    headerName: '총 지급액',
    field: 'sumTrsAmt',
    width: '250px',
    cellClass: ' cell_right  ',
    valueFormatter: (params) => $utils.addComma(params?.value) + '원',
  },
])

//그리드 기본 셋팅
const defaultColDef = {
  editable: false, // 편집 여부
  cellStyle: { textAlign: 'center' }, //전체 컬럼 정렬
}
const showOptions = ref({
  isChangeSearchData: true, //검색 조건 변경시 더보기 노출 여부
})

/********************************* 초기화 *************************/
onMounted(() => {
  // 조회
  searchData()
})

/********************************* methods *************************/

//초기화
const searchRset = () => {
  searchParams.value.bizFyr = year
  searchParams.value.bizStatCd = ''
  // 조회
  searchData()
}

//검색
const searchData = () => {
  currentPage.value = 0
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
  searchData()
}

/************************************* API ***************************/
// 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  params.viewSeq = currentPage.value //페이지 넘버
  params.viewCount = pageSize.value //페이지 사이즈

  $fx.startLoadingbar()
  menuApi
    .MEN0701S01(params)
    .then((response) => {
      const resultData = response.result.implMngPayList
      agGrid.value.addData(resultData)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
