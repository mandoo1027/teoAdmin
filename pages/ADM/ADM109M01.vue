<template>
  <!-- <h3 class="tit">오류모니터링</h3> -->
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
          />
        </td>
        <th class="">오류구분</th>
        <td>
          <CommonComSelectBox
            v-model="searchParams.errorGbn"
            :items="errorGbn"
            :isDefault="false"
            class="s_basics w_150"
          />
        </td>
        <th class="">기간</th>
        <td>
          <div class="d_flex">
            <CommonComDatePicker v-model="searchParams.frDate" class="w_200" />
            ~
            <CommonComDatePicker v-model="searchParams.toDate" class="w_200" />
          </div>
        </td>
      </tr>
      <tr>
        <th class="">서비스 코드</th>
        <td colspan="3">
          <v-text-field
            label="SHORT GID"
            v-model="searchParams.regPgm"
            class="i_basics w_200"
          ></v-text-field>
        </td>
        <!-- <th class="">SHORT GID</th>
        <td>
          <v-text-field
            label="SHORT GID"
            v-model="searchParams.gidShort"
            class="i_basics"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">GID</th>
        <td>
          <v-text-field
            label="GID"
            v-model="searchParams.gid"
            class="i_basics"
            @keydown.enter="searchData"
          ></v-text-field>
        </td> -->
        <th class="">오류코드</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="오류코드"
              v-model="searchParams.errorCode"
              class="i_basics w_200"
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
    :showOptions="showOptions"
    @clickPagingNumber="clickPagingNumber"
    @setPageSize="setPageSize"
    @cellWasClicked="cellWasClicked"
    :style="{ height: '400px' }"
  />

  <v-table class="vtable_view" disabled>
    <tbody>
      <tr>
        <th>
          <v-label> GID</v-label>
        </th>
        <td>{{ viewParm.gid }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 서비스구분</v-label>
        </th>
        <td>{{ viewParm.sysGbn }}</td>
      </tr>

      <tr>
        <th>
          <v-label> 오류발생순번</v-label>
        </th>
        <td>{{ viewParm.errorSeq }}</td>
      </tr>
      <tr>
        <th>
          <!-- 등록 프로그램명 -->
          <v-label> 서비스 코드</v-label>
        </th>
        <td>{{ viewParm.regPgm }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 오류코드</v-label>
        </th>
        <td>{{ viewParm.errorCode }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 오류발생일시</v-label>
        </th>
        <td>{{ viewParm.errorDt }} {{ viewParm.errorTm }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 오류종류 (SYS:시스템오류 / BIZ:업무오류)</v-label>
        </th>
        <td>{{ viewParm.errorGbn }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 오류삭제여부 (Y/N)</v-label>
        </th>
        <td>{{ viewParm.errorClear_yn }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 오류메시지</v-label>
        </th>
        <td>{{ viewParm.errorMsg }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 오류부가메시지</v-label>
        </th>
        <td>{{ viewParm.errorAddMsg }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 단축GID정보</v-label>
        </th>
        <td>{{ viewParm.gidShort }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 프로그램명</v-label>
        </th>
        <td>{{ viewParm.pgmName }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 프로그램 패키지 경로</v-label>
        </th>
        <td>{{ viewParm.pgmPath }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 프로그램 라인번호</v-label>
        </th>
        <td>{{ viewParm.pgmLine }}</td>
      </tr>

      <tr>
        <th style="vertical-align: top">
          <v-label> CALLSTACK1</v-label>
        </th>
        <td v-html="viewParm.callstack1.replaceAll('at ', '<br />at ')"></td>
      </tr>
      <tr>
        <th style="vertical-align: top">
          <v-label> CALLSTACK2</v-label>
        </th>
        <td v-html="viewParm.callstack2.replaceAll('at ', '<br />at ')"></td>
      </tr>
      <tr>
        <th style="vertical-align: top">
          <v-label> CALLSTACK3</v-label>
        </th>
        <td v-html="viewParm.callstack3.replaceAll('at ', '<br />at ')"></td>
      </tr>
      <tr>
        <th>
          <v-label> 호스트이름</v-label>
        </th>
        <td>{{ viewParm.hostname }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 컨테이너ID</v-label>
        </th>
        <td>{{ viewParm.containerId }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 언어코드 (KO, EN, VN, CN)</v-label>
        </th>
        <td>{{ viewParm.lang_code }}</td>
      </tr>
      <tr>
        <th>
          <v-label> GID(날짜+시스템+시간+밀레세컨드+마이크로세컨드+채널)</v-label>
        </th>
        <td>{{ viewParm.gidBody }}</td>
      </tr>
      <tr>
        <th>
          <v-label> GID(거래번호)</v-label>
        </th>
        <td>{{ viewParm.gidTrsno }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 등록 GID</v-label>
        </th>
        <td>{{ viewParm.regGid }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 등록일시 (YYYYMMDDhhmmss.SSS)</v-label>
        </th>
        <td>{{ viewParm.regDttm }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped></style>

<script setup>
import { admApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/
/* 검색 변수 파라미터  */
const searchParams = ref({
  errorCode: '', //코드
  gidShort: '',
  gid: '', //gid
  errorGbn: '',
  sysGbn: '',
  frDate: '',
  toDate: '',
  regPgm: '',
})
const viewParm = ref({
  callstack1: '',
  callstack2: '',
  callstack3: '',
})

const viewParm2 = ref({
  rnum: '',
  gid: '',
  errorSeq: '',
  errorCode: '',
  errorDt: '',
  errorTm: '',
  errorGbn: '',
  errorClear_yn: '',
  errorMsg: '',
  errorAddMsg: '',
  gidShort: '',
  pgmName: '',
  pgmPath: '',
  pgmLine: '',
  hostname: '',
  containerId: '',
  lang_code: '',
  callstack1: '',
  callstack2: '',
  callstack3: '',
  gidBody: '',
  gidTrsno: '',
  regGid: '',
  regDttm: '',
  regPgm: '',
  regUser: '',
  updGid: '',
  updDttm: '',
  updCnt: '',
  updPgm: '',
  updUser: '',
  sysGbn: '',
})

searchParams.value.frDate = $utils.getDateYYYYMMDD(0, 0, 0)
searchParams.value.toDate = $utils.getDateYYYYMMDD(0, 0, 0)
const nameRules = [
  (v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

/* 콤보 박스 */
const errorGbn = ref([
  { title: '전체', value: '' },
  { title: '시스템오류(SYS)', value: 'SYS' },
  { title: '업무오류(BIZ)', value: 'BIZ' },
])

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
    headerName: '일자',
    field: 'errorDt',
    width: '90px',
  },
  {
    headerName: '발생시간',
    field: 'errorTm',
    width: '100px',
  },
  {
    headerName: '오류구분',
    field: 'errorGbn',
    width: '100px',
  },
  {
    headerName: '서비스구분',
    field: 'sysGbn',
    width: '120px',
  },
  {
    headerName: '호스트명',
    field: 'hostname',
    width: '100px',
  },
  {
    headerName: '컨테이너',
    field: 'containerId',
    width: '150px',
  },
  {
    headerName: 'GID',
    field: 'gid',
    width: '150px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    // 등록프로그램
    headerName: '서비스 코드',
    field: 'regPgm',
    width: '150px',
  },
  {
    headerName: '오류코드',
    field: 'errorCode',
    width: '100px',
  },
  {
    headerName: 'Short GID',
    field: 'gidShort',
    width: '150px',
  },
  {
    headerName: '메시지',
    field: 'errorMsg',
    width: '250px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    headerName: '추가메시지',
    field: 'errorAddMsg',
    width: '100px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    headerName: '프로그램',
    field: 'pgmName',
    width: '150px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    headerName: '위치',
    field: 'pgmPath',
    width: '200px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    headerName: '라인No',
    field: 'pgmLine',
    width: '100px',
  },
  {
    headerName: 'CallStack1',
    field: 'callstack1',
    width: '200px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    headerName: 'CallStack2',
    field: 'callstack2',
    width: '100px',
    cellClass: 'ellipsis  cell_left  ',
  },
  {
    headerName: 'CallStack3',
    field: 'callstack3',
    width: '100px',
    cellClass: 'ellipsis  cell_left  ',
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
  // 조회
  searchData()
})

/********************************* methods *************************/
//검색
const searchData = () => {
  if ($utils.isEmpty(searchParams.value.frDate) || $utils.isEmpty(searchParams.value.toDate)) {
    $fx.throwAlert('검색 기간을 선택해주세요', '알림')
    return
  }

  //미래날짜는 없는 데이타 당일로 수정.
  if (searchParams.value.frDate > $utils.getDateYYYYMMDD(0, 0, 0)) {
    searchParams.value.frDate = $utils.getDateYYYYMMDD(0, 0, 0)
  }
  if (searchParams.value.toDate > $utils.getDateYYYYMMDD(0, 0, 0)) {
    searchParams.value.toDate = $utils.getDateYYYYMMDD(0, 0, 0)
  }

  if (searchParams.value.frDate > searchParams.value.toDate) {
    const dt = searchParams.value.frDate
    searchParams.value.frDate = searchParams.value.toDate
    searchParams.value.toDate = dt
  }

  currentPage.value = 1
  agGrid.value.removeData()
  viewParm.value = viewParm2.value
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

//상세
const cellWasClicked = (params) => {
  viewParm.value = params.data
  viewParm.value.callstack1 = params.data.callstack1 ?? ''
  viewParm.value.callstack2 = params.data.callstack2 ?? ''
  viewParm.value.callstack3 = params.data.callstack3 ?? ''
}

/************************************* API ***************************/
// 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  params.pageNum = currentPage.value //페이지 넘버
  params.pageSize = pageSize.value //페이지 사이즈
  $fx.startLoadingbar()
  admApi
    .ADM0302S01(params)
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
