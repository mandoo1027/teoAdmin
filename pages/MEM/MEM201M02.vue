<template>
  <!-- <h3 class="tit">기관 목록</h3> -->
  <v-table>
    <tbody>
      <tr>
        <th>기관구분</th>
        <td>
          <CommonComSelectBox
            groupCode="USE_INST_DIV"
            v-model="searchParams.instOrdrDiv"
            :isDefault="false"
            :isAll="true"
            class="s_basics w_150"
          />
        </td>
        <th>회원가입상태</th>
        <td>
          <CommonComSelectBox
            groupCode="INST_JOIN_STAT_CD"
            v-model="searchParams.instJoinStatCd"
            :isDefault="false"
            :isAll="true"
            class="s_basics w_150"
          />
        </td>
        <th>검색어</th>
        <td>
          <div class="d_flex">
            <CommonComSelectBox
              v-model="selectedOrg"
              :items="selectedOrgItems"
              :isDefault="false"
              :isAll="true"
              class="s_basics w_150"
            />
            <v-text-field
              label="검색어를 입력해주세요."
              v-model="userOrgSearch"
              :items="orgList"
              class="i_basics w_200 ml_10"
              placeholder="검색어를 입력해주세요."
              :disabled="$utils.isEmpty(selectedOrg)"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
            <v-btn class="vbtn ml_5" size="small" @click="searchRset">초기화</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <!-- 그리드 관련 컴포넌트 -->
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

  <div class="btm_btn_wrap">
    <v-btn class="vbtn" size="small" @click="goSiup">발주기관 가입 신청</v-btn>
  </div>
</template>
<script setup>
// api ts
import { memApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/
//* 검색 변수 파라미터  */
const searchParams = ref({
  instOrdrDiv: '', // 기관구분
  instJoinStatCd: '', // 기관회원가입상태
  instNm: '', // 기관명
  instBrno: '', // 사업자등록번호
  viewSeq: '', //
  viewCount: '', //
  memId: '',
  instId: '',
  infrmSeq: '',
  selectedOrg: '', // 기관명, 사업자등록번호 담는...
})

const itemsBaseNmFlag = ref(true)
/* 검색어 조회 */
const selectedOrg = ref('')
const selectedOrgItems = [
  { title: '기관명', value: 'A' },
  { title: '사업자등록번호', value: 'B' },
]

// 검색창
let searchOrgList = reactive([])
let orgList = ref([])
const userOrgSearch = ref('')

// AgGrid 컬럼값
const columnDefsReceive = ref([
  { headerName: 'NO.', field: 'no', width: 80, valueGetter: 'node.rowIndex + 1' },
  {
    headerName: '기관구분',
    field: 'instOrdrDiv',
    width: 140,
  },
  {
    headerName: '기관ID',
    field: 'instId',
    width: 160,
    cellClass: (params) =>
      params.data.instId === 'N'
        ? 'ico_tit ico_new ellipsis link basic'
        : 'ico_tit ellipsis link basic',
  },
  {
    headerName: '기업구분',
    field: 'instDivCdNm',
    width: 140,
    valueGetter: (params) => {
      return $utils.getCodeValue(instDivCdCode.value, params.data.instDivCd)
    },
  },
  { headerName: '기관명', field: 'instNm', width: 200 },
  {
    headerName: '사업자등록번호',
    field: 'instBrno',
    width: 180,
    valueFormatter: (params) => $utils.bizNumberformatter(params?.value),
  },
  {
    headerName: '가입일자',
    field: 'instJoinDate',
    width: 150,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  {
    headerName: '해지일자',
    field: 'instCnclDate',
    width: 150,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  { headerName: '책임자아이디', field: 'memId', width: 120, hide: true },
  { headerName: '책임자성명', field: 'memNm', width: 180 },
  {
    headerName: '기관가입상태',
    field: 'instJoinStatCd',
    width: 140,
    valueGetter: (params) => {
      return $utils.getCodeValue(instJoinStatCdCode.value, params.data.instJoinStatCd)
    },
  },
])

// 그리드 옵션
const defaultColDefReceive = {
  editable: false,
}

// aggrid 페이징관련
const showOptions = ref({
  isChangeSearchData: true, //검색 조건 변경시 더보기 노출 여부
})
watch(searchParams.value, () => (showOptions.value.isChangeSearchData = false))

const agGrid = ref(null) //agGrid 객체
const currentPage = ref(0) //현재페이지
const pageSize = ref(10)
const checkBtn = ref(true) // 버튼 디세이블

const instDivCdCode = ref([])
const instJoinStatCdCode = ref([])

// 검색 초기화
const searchRset = () => {
  searchParams.value.instOrdrDiv = '' // 기관구분
  searchParams.value.instJoinStatCd = '' // 기관회원가입상태
  searchParams.value.instNm = '' // 기관명
  searchParams.value.instBrno = '' // 사업자등록번호
  selectedOrg.value = ''
  userOrgSearch.value = ''
  searchData()
}

/********************************* methods 선언 및 정의 *************************/
// 최초 로드
onMounted(async () => {
  $fx.startLoadingbar()
  instDivCdCode.value = await $fx.getCommonCodeList('INST_DIV_CD')
  instJoinStatCdCode.value = await $fx.getCommonCodeList('INST_JOIN_STAT_CD')
  $fx.finishLoadingbar()

  searchData() // 회원 목록조회
})

// 검색어 콤보박스 선택시
// const changItemsBase = () => {
//   if (selectedOrg.value === 'all') {
//     console.log(selectedOrg.value, 'all')
//     selectedOrg.value = ''
//     itemsBaseNmFlag.value = true
//   } else if (selectedOrg.value === 'A') {
//     console.log(selectedOrg.value, 'A')
//     selectedOrg.value = ''
//     itemsBaseNmFlag.value = false
//   } else {
//     console.log(selectedOrg.value, 'B')
//     selectedOrg.value = ''
//     itemsBaseNmFlag.value = false
//   }
// }

// 검색 클릭시
const searchData = () => {
  currentPage.value = 0
  agGrid.value.removeData()

  callApi()
}

// 페이지 클릭
const clickPagingNumber = (number) => {
  currentPage.value = number
  callApi()
}

// 페이징 사이즈
const setPageSize = (number) => {
  pageSize.value = number
  searchData()
}

const changeData = () => {
  // 2글자 이상인 경우에 검색
  if (userOrgSearch.value && userOrgSearch.value.length >= 2) {
    var search = new RegExp(userOrgSearch.value, 'i')

    orgList.value = searchOrgList.filter((item) => search.test(item.title))
  } else {
    orgList.value = []
  }
}

// 상세화면 이동 기관ID클릭시
const cellWasClicked = (params) => {
  if (params.column.colId === 'instId') {
    const memId = params.data.memId
    const instId = params.data.instId
    $fx.move('AMEM110', { memId: memId, instId: instId })
  }
}

// 발주기관 가입 신청시 넘어감
const goSiup = () => {
  $fx.move('AMEM112')
}

/********************************* api 선언 및 정의 *************************/
// 조회
const callApi = () => {
  const params = searchParams.value
  params.viewSeq = currentPage.value // 페이지 넘버
  params.viewCount = pageSize.value // 페이지 사이즈

  // 검색관련 조회
  if (selectedOrg.value === 'all') {
    params.instBrno = ''
    params.instNm = ''
  } else if (selectedOrg.value === 'A') {
    params.instNm = userOrgSearch.value
    params.instBrno = ''
  } else {
    params.instBrno = userOrgSearch.value
    params.instNm = ''
  }

  $fx.startLoadingbar()
  // console.log(params, '회원가입쪽 params')
  memApi
    .MEM0202S03(params)
    .then((response) => {
      const resultData = response.result.result
      // console.log(resultData, 'resultData')
      // 그리드에 데이터 추가
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
