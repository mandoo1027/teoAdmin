<template>
  <!-- <h3 class="tit">서비스 호출 이력 모니터링</h3> -->
  <v-table>
    <tbody>
      <tr>
        <th class="">접속IP</th>
        <td>
          <v-text-field
            label="caller"
            v-model="searchParams.caller"
            class="i_basics"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">서비스 코드</th>
        <td>
          <v-text-field
            label="serviceCode"
            v-model="searchParams.serviceCode"
            class="i_basics"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">요청일</th>
        <td>
          <div class="d_flex">
            <CommonComDatePicker v-model="searchParams.toDate" class="w_200" />
          </div>
        </td>
      </tr>

      <tr>
        <th class="">사용자ID</th>
        <td>
          <v-text-field
            label="사용자ID"
            v-model="searchParams.regUser"
            class="i_basics"
            @keydown.enter="searchData"
            @cellWasClicked="cellWasClicked"
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
        </td>

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
    :currentPage="currentPage"
    :showOptions="showOptions"
    @clickPagingNumber="clickPagingNumber"
    @setPageSize="setPageSize"
    @cellWasClicked="cellWasClicked"
    :style="{ height: '400px' }"
  />

  <v-table class="vtable_view" disabled>
    <colgroup>
      <col style="width: 110px" />
      <col style="width: 450px" />
      <col style="width: 110px" />
      <col style="width: *" />
    </colgroup>
    <tbody>
      <tr>
        <th>
          <v-label> 서비스코드/명 </v-label>
        </th>
        <td>
          {{ viewParm.serviceCode }} / <b>{{ viewParm.apiName }}</b>
        </td>

        <th>
          <v-label> 화면ID/명 (구분 : {{ viewParm.reqGbn }}) </v-label>
        </th>
        <td>
          {{ viewParm.screenId }} / <b>{{ viewParm.menuName }}</b>
        </td>
      </tr>

      <tr>
        <th>
          <v-label> 접속IP</v-label>
        </th>
        <td>{{ viewParm.caller }}</td>
        <th>
          <v-label> 사용자ID</v-label>
        </th>
        <td>{{ viewParm.regUser }}</td>
      </tr>

      <tr>
        <th>
          <v-label> 요청일시</v-label>
        </th>
        <td>{{ $utils.formatDate(viewParm.reqDt) }} {{ viewParm.reqTm }}</td>

        <th>
          <v-label> 응답일시</v-label>
        </th>
        <td>{{ $utils.formatDate(viewParm.resDt) }} {{ viewParm.resTm }}</td>
      </tr>
      <tr>
        <th style="vertical-align: top">
          <v-label> Request데이터</v-label><v-label> (길이: {{ viewParm.reqLen }} )</v-label>
        </th>
        <td
          style="vertical-align: top"
          v-html="
            viewParm.reqData
              .replaceAll(',', '<br/>,')
              .replaceAll('{', '{<br/>')
              .replaceAll('}', '<br/>}')
          "
        ></td>

        <th style="vertical-align: top">
          <v-label> Response데이터</v-label> <v-label>(길이: {{ viewParm.resLen }} )</v-label>
        </th>
        <td
          style="vertical-align: top"
          v-html="
            viewParm.resData
              .replaceAll(',', '<br/>,')
              .replaceAll('{', '{<br/>')
              .replaceAll('}', '<br/>}')
          "
        ></td>
      </tr>
      <tr>
        <th>
          <v-label> 오류코드</v-label>
        </th>
        <td class="color_red">{{ viewParm.errorCode }}</td>

        <th>
          <v-label> 소요시간(hhmmss.SSS)</v-label>
        </th>
        <td>{{ viewParm.elapsedTime }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 오류메시지</v-label>
        </th>
        <td class="color_red">{{ viewParm.errorMsg }}</td>

        <th>
          <v-label>오류부가메시지 </v-label>
        </th>
        <td class="color_red">{{ viewParm.errorAddMsg }}</td>
      </tr>
      <tr>
        <th>
          <v-label> HOSTNAME</v-label>
        </th>
        <td>{{ viewParm.hostname }}</td>

        <th>
          <v-label> 컨테이너번호</v-label>
        </th>
        <td>{{ viewParm.containerId }}</td>
      </tr>
      <tr>
        <th>
          <v-label> 동일 GID로 callSeq</v-label>
        </th>
        <td>{{ viewParm.callSeq }}</td>

        <th>
          <v-label> GID</v-label>
        </th>
        <td>{{ viewParm.gid }}</td>
      </tr>
      <tr>
        <th>
          <v-label> GIDBody </v-label>
        </th>
        <td>{{ viewParm.gidBody }}</td>

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

        <th>
          <v-label> 등록일시 </v-label>
        </th>
        <td>{{ $utils.formatDate(viewParm.regDttm) }} ({{ viewParm.regDttm }})</td>
      </tr>
      <!-- <tr>
        <th>
          <v-label> 서비스구분</v-label>
        </th>
        <td>{{ viewParm.sysGbn }}</td>
        <th>
          <v-label> calleeEtc</v-label>
        </th>
        <td>{{ viewParm.calleeEtc }}</td>
      </tr> -->
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
  serviceCode: '', //서비스 코드
  regUser: '', //사용자ID
  gid: '',
  errorGbn: '',
  sysGbn: '',
  toDate: '',
  caller: '',
})

const viewParm = ref({
  reqData: '',
  resData: '',
})
const viewParm2 = ref({
  rnum: '',
  reqDt: '',
  reqTm: '',
  reqGbn: '',
  serviceCode: '',
  screenId: '',
  calleeEtc: '',
  caller: '',
  callSeq: '',
  reqLen: '',
  reqData: '',
  resDt: '',
  resTm: '',
  resLen: '',
  resData: '',
  errorCode: '',
  elapsedTime: '',
  hostname: '',
  containerId: '',
  gid: '',
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
const formattedToday = $utils.getDateYYYYMMDD(0, 0, 0)
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

const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(1) //현재페이지
const pageSize = ref(100)

const columnDefs = ref([
  { headerName: 'NO.', field: 'no', width: '80px', valueGetter: 'node.rowIndex + 1' },
  {
    headerName: '요청일',
    field: 'reqDt',
    width: '108px',

    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  {
    headerName: '요청시간',
    field: 'reqTm',
    width: '100px',
  },
  {
    headerName: '화면ID',
    field: 'screenId',
    width: '120px',
  },
  {
    headerName: '화면명',
    field: 'menuName',
    width: '130px',
    cellClass: 'ellipsis  cell_left  ',
  },
  // {
  //   headerName: '요청구분',
  //   field: 'reqGbn',
  //   width: '100px',
  // },
  {
    headerName: '서비스ID',
    field: 'serviceCode',
    width: '120px',
  },
  {
    headerName: '서비스명',
    field: 'apiName',
    width: '180px',
    cellClass: 'ellipsis  cell_left  ',
  },

  {
    headerName: '사용자ID',
    field: 'regUser',
    width: '120px',
  },

  {
    headerName: '접속IP',
    field: 'caller',
    width: '130px',
  },
  // {
  //   headerName: 'callSeq',
  //   field: 'callSeq',
  //   width: '100px',
  // },
  // {
  //   headerName: 'Req길이',
  //   field: 'reqLen',
  //   width: '100px',
  // },
  {
    headerName: 'reqData',
    field: 'reqData',
    width: '220px',
    cellClass: 'ellipsis  cell_left  ',
    valueFormatter: (params) => $utils.convertRegexToText(params?.value),
  },
  // {
  //   headerName: '응답일자',
  //   field: 'resDt',
  //   width: '120px',

  //   valueFormatter: (params) => $utils.formatDate(params?.value),
  // },
  // {
  //   headerName: '응답시간',
  //   field: 'resTm',
  //   width: '100px',
  // },
  // {
  //   headerName: 'Res길이',
  //   field: 'resLen',
  //   width: '100px',
  // },
  {
    headerName: 'resData',
    field: 'resData',
    width: '220px',
    cellClass: 'ellipsis  cell_left  ',
    valueFormatter: (params) => $utils.convertRegexToText(params?.value),
  },

  {
    headerName: '소요시간',
    field: 'elapsedTime',
    width: '90px',
  },
  {
    headerName: 'gid',
    field: 'gid',
    width: '250px',
    cellClass: 'cell_left  ',
  },
  {
    headerName: '에러코드',
    field: 'errorCode',
    width: '100px',
  },

  {
    headerName: '에러메시지',
    field: 'errorMsg',
    width: '170px',
    cellClass: 'ellipsis  cell_left  ',
  },

  {
    headerName: '에러부가메시지',
    field: 'errorAddMsg',
    width: '170px',
    cellClass: 'ellipsis  cell_left  ',
  },

  // {
  //   headerName: '호스트',
  //   field: 'hostname',
  //   width: '100px',
  // },
  // {
  //   headerName: '컨테이너번호',
  //   field: 'containerId',
  //   width: '100px',
  // },

  // {
  //   headerName: 'gidBody',
  //   field: 'gidBody',
  //   width: '100px',
  // },
  // {
  //   headerName: '거래번호',
  //   field: 'gidTrsno',
  //   width: '100px',
  // },
  // {
  //   headerName: 'regGid',
  //   field: 'regGid',
  //   width: '180px',
  // },

  // {
  //   headerName: 'sysGbn',
  //   field: 'sysGbn',
  //   width: '100px',
  // },
  // {
  //   headerName: 'calleeEtc',
  //   field: 'calleeEtc',
  //   width: '100px',
  // },
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
    if (searchParams.value.toDate > $utils.getDateYYYYMMDD(0, 0, 0)) {
    searchParams.value.toDate = $utils.getDateYYYYMMDD(0, 0, 0)
  }
  if ($utils.isEmpty(searchParams.value.toDate)) {
    $fx.throwAlert('요청일을 선택해주세요', '알림')
    return
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
}

/************************************* API ***************************/
// 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  params.pageNum = currentPage.value //페이지 넘버
  params.pageSize = pageSize.value //페이지 사이즈
  $fx.startLoadingbar()
  admApi
    .ADM0302S02(params)
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
