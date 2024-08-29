<template>
  <v-table>
    <tbody>
      <tr>
        <th>기간검색</th>
        <td>
          <div class="con">
            <div class="i_calender">
              <CommonComDatePicker
                v-model="searchParams.startDate"
                class="i_date w_160"
                placeholder="날짜선택"
              />
              <span>~</span>
              <CommonComDatePicker
                v-model="searchParams.endDate"
                class="i_date w_160"
                placeholder="날짜선택"
              />
            </div>
          </div>
        </td>
        <th>쪽지종류</th>
        <td>
          <div class="d_flex">
            <CommonComSelectBox
              groupCode="INFRM_JOB_DIV_CD"
              v-model="searchParams.infrmJobDivCd"
              :delItems="[{ code: '110' }, { code: '120' }, { code: '130' }, { code: '330' }]"
              :isAll="true"
              :isDefault="false"
              class="s_basics w_160 ml_5 none_details"
            />
            <v-text-field
              label="검색어"
              v-model="searchParams.infrmCtn"
              placeholder="내용을 입력하세요"
              class="i_basics w_200 none_details ml_5"
              @keydown.enter="searchData"
            ></v-text-field>
          </div>
        </td>
        <th>회원검색</th>
        <td>
          <div class="d_flex">
            <CommonComSelectBox
              v-model="searchParams.sndDivCd"
              :items="sndDivCdItems"
              :isDefault="false"
              :isAll="true"
              class="s_basics w_100"
            />
            <v-text-field
              label="검색어"
              v-model="searchParams.memCtn"
              placeholder="내용을 입력하세요"
              class="i_basics w_200 none_details ml_5"
              @keydown.enter="searchData"
            ></v-text-field>
            <v-btn class="vbtn search ml_5" size="small" @click="searchData">조회</v-btn>
            <v-btn class="vbtn search ml_5" size="small" @click="searchRset">초기화</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <CommonComAgGrid
    ref="agGrid"
    :columnDefs="columnDefsReceive"
    :pageSize="pageSize"
    :showOptions="showOptions"
    :defaultColDef="defaultColDefReceive"
    @clickPagingNumber="clickPagingNumber"
    @setPageSize="setPageSize"
    @cellWasClicked="cellWasClicked"
  />
</template>

<script setup>
import { notApi } from '@/api/index.ts'
import { userInfoStore } from '@/store/userInfoStore'

const MEM003P01 = 'MEMMEM003P01' // 쪽지 상세 팝업

/********************************* 변수 정의 *************************/
const isSend = ref(false) // 버튼 상태 관리
//* 검색 변수 파라미터 */
const searchParams = ref({
  startDate: '',
  endDate: '',
  sndngRcvrFlag: 'R', // 발신수신구분  S:발신 , R:수신
  sndDivCd: '', //발송구분코드
  infrmCtn: '', // 쪽지내용
  memCtn: '', // 회원검색내용
  infrmJobDivCd: '', // 쪽지종류코드
  viewSeq: 0,
  viewCount: 10,
})

const columnDefsReceive = ref([
  { headerName: 'NO.', field: 'viewSeq', width: 75 },
  { headerName: '쪽지 종류', field: 'infrmJobDivNm', width: 150 },
  { headerName: '쪽지 종류', field: 'infrmJobDivCd', hide: true },
  {
    headerName: '쪽지 내용',
    field: 'infrmCtn',
    width: 780,
    cellClass: (params) =>
      params.data.infrmCfmtnYn === 'N'
        ? 'cell_left ico_tit ico_new link ellipsis'
        : 'cell_left ico_tit link ellipsis',
    valueFormatter: (params) => $utils.convertRegexToText(params?.value),
  },
  {
    headerName: '회신여부',
    field: 'replyYn',
    width: 100,
  },
  {
    headerName: '받은 날짜',
    field: 'sndngDate',
    width: 180,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  { headerName: '받는 분', field: 'rcvrIdNm', width: 120 },
  { headerName: '보낸 분', field: 'sndngIdNm', width: 120 },
  { headerName: '발신일련번호', field: 'sndngSeq', hide: true },
])

// 그리드 선택안되게
const defaultColDefReceive = {
  editable: false,
}

// 더보기 노출 여부
const showOptions = ref({
  isChangeSearchData: true, // 검색 조건 변경시 더보기 노출 여부
})
watch(searchParams.value, () => (showOptions.value.isChangeSearchData = false))

const agGrid = ref(null) // ag-grid 객체
const currentPage = ref(0) // 현재페이지
const pageSize = ref(10)

const isVisible = ref(true)
const initData = ref([])

const flagBtn = ref(true) // 전체버튼 비활성화 여부
const userOrgSearch = ref('')
const sndDivCdItems = [
  { title: '받는분', value: 'RECV' },
  { title: '보낸분', value: 'SEND' },
]

// 검색 초기화
const searchRset = () => {
  searchParams.value.rcvrIdNm = '' // 받는분
  searchParams.value.sndngIdNm = '' // 보낸분
  searchParams.value.infrmJobDivCd = '' // 쪽지종류
  searchParams.value.sndDivCd = '' // 발송구분코드
  searchParams.value.memCtn = '' // 회원검색내용
  searchParams.value.infrmJobDivCd = ''
  searchParams.value.infrmCtn = '' // 쪽지내용 초기화

  // 날짜 관련
  searchParams.value.startDate = $utils.getDateYYYYMMDD(0, -1, 0) // 검색 시작일
  searchParams.value.endDate = $utils.getDateYYYYMMDD(0, 0, 0) // 검색 종료일

  searchData()
}

/********************************* 초기화 *************************/
onMounted(() => {
  // 초기 날짜 값 셋팅
  searchParams.value.startDate = $utils.getDateYYYYMMDD(0, -1, 0) // 검색 시작일
  searchParams.value.endDate = $utils.getDateYYYYMMDD(0, 0, 0) // 검색 종료일

  searchData() // 조회
})

/********************************* methods *************************/
// 검색
const searchData = () => {
  if (searchParams.value.startDate > searchParams.value.endDate) {
    $fx.throwAlert('지정한 날짜를 다시 확인하세요', '알람')
    return
  }

  currentPage.value = 0
  agGrid.value.removeData()

  callApi() // api호출
}

// 페이지 클릭
const clickPagingNumber = (number) => {
  currentPage.value = number
  callApi()
}

const setPageSize = (number) => {
  pageSize.value = number
  searchData()
}

// 쪽지보내기 팝업 노출
const cellWasClicked = (params) => {
  if (params.column.colId === 'infrmCtn') {
    $fx
      .throwDialog(MEM003P01, {
        data: {
          sndngSeq: params.data.sndngSeq,
          infrmCtn: params.data.infrmCtn,
          infrmJobDivCd: params.data.infrmJobDivCd, // 쪽지종류
          sndngRcvrFlag: 'R', // 발신수신구분  S:발신 , R:수신
          rcvrIdNm: params.data.rcvrIdNm,
          sndngIdNm: params.data.sndngIdNm,
        },
        close: false,
        title: '나의 쪽지',
        dialogClasses: 'large',
      })
      .then((result) => {
        if (result) {
          searchData()
        }
      })
    return
  }
}

/*********************************** API ***************************/
// 쪽지 목록 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅

  params.viewSeq = currentPage.value //페이지 넘버
  params.viewCount = pageSize.value //페이지 사이즈

  $fx.startLoadingbar()
  notApi
    .NOT0201S01(params)
    .then((response) => {
      const resultData = response.result.result
      initData.value = resultData
      // console.log(initData.value)
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
