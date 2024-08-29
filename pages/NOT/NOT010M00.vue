<template>
  <v-table>
    <tbody>
      <tr>
        <th>검색일자</th>
        <td>
          <div class="d_flex">
            <div class="i_calender">
              <CommonComDatePicker
                v-model="searchParams.pstgDate"
                :rules="$utils.getRules(['required|날짜를 입력해주세요.'])"
                class="i_date w_140"
                placeholder="날짜선택"
              />
            </div>
          </div>
        </td>
        <th>등록기관</th>
        <td>
          <CommonComSelectBox
            v-model="searchParams.ordrInstId"
            :items="instCovItems"
            :isDefault="false"
            :isAll="true"
            class="s_basics w_140"
          />
        </td>
        <th>제목</th>
        <td>
          <div class="d_flex">
            <v-text-field
              label="공지사항"
              v-model="searchParams.infrmTtl"
              placeholder="검색어를 입력해주세요."
              maxlength="100"
              class="i_basics none_details"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
            <v-btn class="vbtn search ml_5" size="small" @click="searchRset">초기화</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <CommonComAgGrid
    ref="agGrid"
    :columnDefs="columnDefsReceive"
    :currentPage="currentPage"
    :pageSize="pageSize"
    :showOptions="showOptions"
    :defaultColDef="defaultColDefReceive"
    @clickPagingNumber="clickPagingNumber"
    @setPageSize="setPageSize"
    @cellWasClicked="cellWasClicked"
  />

  <div class="btm_btn_wrap">
    <v-btn class="vbtn" size="small" @click="goInsert">신규등록</v-btn>
  </div>
</template>

<script setup>
import { notApi, memApi } from '@/api/index.ts'

/********************************* 변수 *************************/
// 검색변수
const instSearchParams = ref({
  instFlag: 'O',
})

const searchParams = ref({
  ordrInstId: '',
  instId: '',
  // instId: 'ADMIN',
  infrmTtl: '',
  pstgDate: '',
  instCov: '',

  viewSeq: 0,
  viewCount: 10,
})

const atchDocNo = ref() // 파일첨부 번호
const atchDocNm = ref() // 파일첨부 이름
const noticeList = ref('all') // 검색 변수
const noticeListItem = ref([{ title: '전체', value: 'all' }]) // 검색 변수
const instCovItems = ref([])
// const instCovItems = [
//   { title: 'ADMIN', value: 'RECV' },
//   { title: '한마정보통신', value: 'SEND' },
//   { title: '이스타벅스', value: 'SEND' },
// ]

//기간검색 셋팅  기간 1주일전
const today = new Date() // 현재 날짜와 시간을 포함하는 Date 객체 생성
const day = today.getDate() // 일 가져오기

const pevToday = new Date().setDate(day - 7) // 일주일
const mTodaay = new Date(pevToday)
//console.log(new Date(pevToday))
const pevYear = mTodaay.getFullYear() // 년도 가져오기
const pevMonth = mTodaay.getMonth() + 1 // 월 가져오기 (0부터 시작하므로 1 더하기)
const pevDay = mTodaay.getDate() // 일 가져오기

const formattedDay = ref(
  `${pevYear}${pevMonth.toString().padStart(2, '0')}${pevDay.toString().padStart(2, '0')}`,
)

// 그리드 정보
const columnDefsReceive = ref([
  {
    headerName: 'NO.',
    field: 'viewSeq',
    width: 80,
    valueFormatter: (params) => (Number(params.data.viewSeq) <= 5 ? '[공지]' : params.data.viewSeq),
    cellClass: (params) => (Number(params.data.viewSeq) <= 5 ? 'color_red' : ''),
  },
  { headerName: '공지일련번호', field: 'infrmSeq', hide: true },
  {
    headerName: '공지제목',
    field: 'infrmTtl',
    width: 600,
    cellClass: (params) =>
      params.data.pstgStrtDate >= formattedDay.value
        ? 'cell_left ico_tit ico_new ellipsis link basic'
        : 'cell_left ico_tit ellipsis link basic',
    //cellClass: 'cell_left ico_tit ico_new ellipsis',
    valueFormatter: (params) => $utils.convertRegexToText(params?.value),
  },
  {
    headerName: '첨부문서번호',
    field: 'atchDocNo',
    hide: true,
  },
  {
    headerName: '첨부파일',
    field: 'atchDocNm',
    width: 300,
    cellClass: (params) => (params.data.atchDocNm === null ? '' : 'ico_file'),
  },
  {
    headerName: '게시시작일 ',
    field: 'pstgStrtDate',
    width: 120,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  {
    headerName: '게시종료일 ',
    field: 'pstgEndDate',
    width: 120,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  { headerName: '기관명', field: 'instNm', width: 140 },
  { headerName: '팝업여부', field: 'popupYn', width: 100 },
])

const agGrid = ref(null) // 그리드 변수
const currentPage = ref(0)
const pageSize = ref(10)
const orgList = ref({})
let searchOrgList = reactive([])
const instCovInstList = ref([])

const defaultColDefReceive = {
  editable: false,
}

// Grid옵션
const showOptions = ref({
  isChangeSearchData: true, //검색 조건 변경시 더보기 노출 여부
})
watch(searchParams.value, () => (showOptions.value.isChangeSearchData = false))

onMounted(async () => {
  searchParams.value.pstgDate = $utils.getDateYYYYMMDD(0, 0, 0) // 검색 시작일

  $fx.startLoadingbar()
  await fisrtApi() // 기관ID
  await searchData()
  $fx.finishLoadingbar()
})

/********************************* methods *************************/
// 검색 초기화
const searchRset = () => {
  searchParams.value.instId = ''
  searchParams.value.ordrInstId = ''
  searchParams.value.infrmTtl = ''
  searchParams.value.pstgDate = ''
  searchParams.value.instCov = ''

  // 날짜 관련
  searchParams.value.pstgDate = $utils.getDateYYYYMMDD(0, 0, 0) // 검색 시작일

  searchData()
}

// 검색
const searchData = () => {
  currentPage.value = 0
  agGrid.value.removeData()

  callApi() // 검색 리스트 셋팅
}

// 페이지 클릭
const clickPagingNumber = (number) => {
  // currentPage.value = Number(currentPage.value) + 0
  currentPage.value = number

  callApi()
}

// 페이지 사이즈
const setPageSize = (number) => {
  pageSize.value = number

  searchData()
}

// 상세 이동
const cellWasClicked = (params) => {
  if (params.column.colId === 'infrmTtl') {
    const instId = params.data.instId
    const instNm = params.data.instNm
    const infrmSeq = params.data.infrmSeq
    $fx.move('ANOT002', { instId: instId, instNm: instNm, infrmSeq: infrmSeq })
  }
}

// 신규 등록
const goInsert = () => {
  $fx.move('ANOT003', { type: 'NEW' })
}

/*********************************** API ***************************/
// 기관NM가져오기
const fisrtApi = () => {
  const params = instSearchParams.value
  instCovInstList.value = searchOrgList.value
  $fx.startLoadingbar()
  memApi
    .MEM0201S03(params)
    .then((response) => {
      const searchOrgList = response.result.result.map((item) => {
        return {
          title: item.instNm,
          value: item.instId,
        }
      })

      instCovItems.value.push({ title: 'ADMIN', value: 'ADMIN' })
      instCovItems.value.push(...searchOrgList.filter((item) => item.value !== 'ADMIN'))
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

// 조회
const callApi = () => {
  const params = searchParams.value // 파라미터 셋팅
  params.viewSeq = currentPage.value // 페이지 넘버
  params.viewCount = pageSize.value // 페이지 사이즈
  // console.log(params, 'params 목록')
  $fx.startLoadingbar()
  notApi
    .NOT0102S01(params)
    .then((response) => {
      // console.log(response)
      const resultData = response.result.result
      // console.log(resultData, 'resultData 목록')
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
