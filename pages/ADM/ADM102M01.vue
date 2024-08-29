<template>
  <!-- <h3 class="tit">일배치현황</h3> -->
  <div class="caution_box mb_20">
    <ul>
      <li>일배치 현황을 조회할 수 있습니다</li>
    </ul>
  </div>

  <v-table>
    <tbody>
      <tr>
        <th class="">날짜</th>
        <td>
          <div class="d_flex">
            <CommonComDatePicker v-model="searchParams.stdt" class="w_300" />
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
    :showOptions="showOptions"
  />
</template>

<style scoped></style>

<script setup>
import { hcoApi } from '@/api/index.ts'


/********************************* 변수 선언 및 정의 *************************/
/* 검색 변수 파라미터  */
const searchParams = ref({
  stdt: '',  
})


const formattedToday =  $utils.getDateYYYYMMDD(0, 0, 0)

searchParams.value.stdt = $utils.getDateYYYYMMDD(0, 0, 0)

const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(1) //현재페이지
const pageSize = ref(100)

const columnDefs = ref([
  {
    headerName: '날짜',
    field: 'syldate',
    width: '150px',
    cellClass: (params) => (params.data.aa === '진행안됨' ? 'color_red ' : ''),
  },
  {
    headerName: '배치명',
    field: 'code',
    width: '300px',
    cellClass: (params) => (params.data.aa === '진행안됨' ? 'color_red ' : ''),
  },
  {
    headerName: '배치설명',
    field: 'name',
    width: '350px',
    cellClass: (params) => (params.data.aa === '진행안됨' ? 'color_red ' : ''),
  },
  {
    headerName: '시작시간',
    field: 'starttime',
    width: '150px',
    cellClass: (params) => (params.data.aa === '진행안됨' ? 'color_red ' : ''),
  },
  {
    headerName: '종료시간',
    field: 'endtime',
    width: '150px',
    cellClass: (params) => (params.data.aa === '진행안됨' ? 'color_red ' : ''),
  },
  {
    headerName: '작업시간',
    field: 'aa',
    width: '200px',
    cellClass: (params) => (params.data.aa === '진행안됨' ? 'color_red ' : ''),
  },
])

//그리드 기본 셋팅
const defaultColDef = {
  sortable: true, // 정렬 기능
  filter: true, // 필터 기능
  editable: false, // 편집 여부
  resizable: true, // 모르겠다
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
//검색
const searchData = () => {
  currentPage.value = 1
  agGrid.value.removeData()
  callApi()
}
//페이지 클릭
const clickPagingNumber = (number) => {
  currentPage.value =  Number(currentPage.value)+1
  callApi()
}

const setPageSize = (number) => {
  pageSize.value = number
  searchData()
}

/************************************* API ***************************/
//일배치현황 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  params.pageNum = currentPage.value //페이지 넘버
  params.pageSize = pageSize.value //페이지 사이즈
  $fx.startLoadingbar()
  hcoApi
    .HCO0508S01(params)
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
</script>
