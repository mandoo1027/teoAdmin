<template>
  <!-- <h3 class="tit">섹션모니터링</h3> -->
  <v-table>
    <tbody>
      <tr>
        <th class="">서비스채널</th>
        <td>
          <CommonComSelectBox
            v-model="searchParams.sysGbn"
            :items="sysGbn"
            :isDefault="false"
            class="s_basics w_150"
            @changeValue="searchData"
          />
        </td>
        <th class="">기간</th>
        <td>
          <div class="d_flex">
            <CommonComDatePicker v-model="searchParams.frDt" class="w_200" />
            ~
            <CommonComDatePicker v-model="searchParams.toDt" class="w_200" />
          </div>
        </td>
      </tr>
      <tr>
        <th class="">회원ID</th>
        <td>
          <v-text-field
            label="GID"
            v-model="searchParams.userId"
            class="i_basics w_200"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">GID</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="GID"
              v-model="searchParams.gid"
              class="i_basics w_200"
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
    :defaultColDef="defaultColDef"
    :pageSize="pageSize"
    :currentPage="currentPage"
    :showOptions="showOptions"
    @clickPagingNumber="clickPagingNumber"
    @setPageSize="setPageSize"
  />
</template>

<style scoped></style>

<script setup>
import { admApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/
/* 검색 변수 파라미터  */
const searchParams = ref({
  univCd: '', //고객코드
  userId: '',
  gid: '', //gid
  sysGbn: '',
  frDt: '',
  toDt: '',
})

searchParams.value.frDt = $utils.getDateYYYYMMDD(0, 0, 0)
searchParams.value.toDt = $utils.getDateYYYYMMDD(0, 0, 0)

const nameRules = [
  (v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

/* 콤보 박스 */

const sysGbn = ref([
  { title: '전체', value: '' },
  { title: 'AICMS', value: 'web' },
  { title: '관리자', value: 'admin' },
])

const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(1) //현재페이지
const pageSize = ref(100)

const columnDefs = ref([
  { headerName: 'NO.', field: 'no', width: '80px', valueGetter: 'node.rowIndex + 1' },
  {
    headerName: '세션생성일자',
    field: 'createDt',
    width: '130px',
  },
  {
    headerName: '세션생성시간',
    field: 'createTm',
    width: '130px',
  },
  // {
  //   headerName: '서비스구분',
  //   field: 'sysGbn',
  //   width: '120px',
  // },
  {
    headerName: '호스트명',
    field: 'hostname',
    width: '100px',
    cellClass: ' cell_left  ',
  },
  {
    headerName: '컨테이너',
    field: 'containerId',
    width: '100px',
  },
  {
    headerName: 'UUID',
    field: 'sessionUuid',
    width: '300px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    headerName: '세션ID',
    field: 'sessionId',
    width: '300px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    headerName: '접속IP',
    field: 'clientIp',
    width: '150px',
  },
  {
    headerName: '접속식별정보',
    field: 'clientName',
    width: '150px',
  },
  {
    headerName: '클라이언트채널',
    field: 'clientChannel',
    width: '150px',
  },
  {
    headerName: 'User-Agent',
    field: 'userAgent',
    width: '220px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    headerName: '세션생성GID',
    field: 'createGid',
    width: '220px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    //  고객고유번호
    headerName: '고객번호',
    field: 'loginAreaCd',
    width: '130px',
  },
  {
    //고객식별코드
    headerName: '회원ID',
    field: 'loginUserId',
    width: '130px',
  },
  {
    //고객식별명
    headerName: '회원명',
    field: 'loginUserNm',
    width: '170px',
  },
  {
    headerName: '로그인 일시',
    field: 'loginDttm',
    width: '200px',
  },
  {
    headerName: '로그인 매체',
    field: 'loginMeche',
    width: '170px',
  },
  {
    headerName: '로그인 GID',
    field: 'loginGid',
    width: '200px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    headerName: '로그아웃 일시',
    field: 'logoutDttm',
    width: '200px',
  },
  {
    headerName: '로그아웃 GID',
    field: 'logoutGid',
    width: '200px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    headerName: '세션만료처리 일시',
    field: 'expiredDttm',
    width: '200px',
  },
  {
    headerName: '세션만료처리 사유',
    field: 'expiredReason',
    width: '170px',
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
watch(searchParams.value, () => (showOptions.value.isChangeSearchData = false))
/********************************* 초기화 *************************/
onMounted(() => {
  //공통코드 조회
  searchData()
})

/********************************* methods *************************/
//검색
const searchData = () => {
  if ($utils.isEmpty(searchParams.value.frDt) || $utils.isEmpty(searchParams.value.toDt)) {
    $fx.throwAlert('검색 기간을 선택해주세요', '알림')
    return
  }

  //미래날짜는 없는 데이타 당일로 수정.
  if (searchParams.value.frDt > $utils.getDateYYYYMMDD(0, 0, 0)) {
    searchParams.value.frDt = $utils.getDateYYYYMMDD(0, 0, 0)
  }
  if (searchParams.value.toDt > $utils.getDateYYYYMMDD(0, 0, 0)) {
    searchParams.value.toDt = $utils.getDateYYYYMMDD(0, 0, 0)
  }

  if (searchParams.value.frDt > searchParams.value.toDt) {
    const dt = searchParams.value.frDt
    searchParams.value.frDt = searchParams.value.toDt
    searchParams.value.toDt = dt
  }

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
//공통코드 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  params.pageNum = currentPage.value //페이지 넘버
  params.pageSize = pageSize.value //페이지 사이즈
  $fx.startLoadingbar()
  admApi
    .ADM0303S01(params)
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
