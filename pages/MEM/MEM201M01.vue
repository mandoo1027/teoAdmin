<template>
  <!-- <h3 class="tit">회원 목록</h3> -->
  <v-table>
    <tbody>
      <tr>
        <th>기관ID</th>
        <td>
          <span>{{ searchParams.instNm }}</span>
          <v-btn class="vbtn line ml_5" size="small" @click="searchOrgan">기관검색</v-btn>
        </td>
        <th>회원가입상태</th>
        <td>
          <CommonComSelectBox
            groupCode="MEM_JOIN_STAT_CD"
            v-model="searchParams.memJoinStatCd"
            :isDefault="false"
            :isAll="true"
            class="s_basics w_150"
          />
        </td>

        <th>회원검색</th>
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
              placeholder="검색어를 입력해주세요."
              class="i_basics w_200 ml_10"
              :disabled="$utils.isEmpty(selectedOrg)"
            ></v-text-field>
            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
            <v-btn class="vbtn ml_10" size="small" @click="searchRset">초기화</v-btn>
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
    <v-btn class="vbtn" size="small" @click="goSiup">일반회원 가입 신청</v-btn>
  </div>
</template>

<script setup>
import { memApi } from '@/api/index.ts'

const MEM001P01 = 'MEMMEM001P01' //기관 검색 팝업창

/********************************* 변수 선언 및 정의 *************************/

// 검색 변수 파라미터
const searchParams = ref({
  viewSeq: '',
  viewCount: '',
  instId: '',
  memId: '',
  memNm: '',
  instNm: '',
  member: '',
  memJoinStatCd: '',
  instList: '',
})

// 공통코드 쓰기위한 변수
const memDivCdCode = ref([])
const memJoinStatCdCode = ref([])
const ntcnChnlDivCdCode = ref([])

const flagBtn = ref(true)
const userOrgSearch = ref('')
const selectedOrg = ref('')
const selectedOrgItems = [
  { title: '회원ID', value: 'memId' },
  { title: '회원명', value: 'memNm' },
]

// 그리드 내용
const columnDefsReceive = ref([
  { headerName: 'NO.', field: 'no', width: 80, valueGetter: 'node.rowIndex + 1' },
  {
    headerName: '기관명',
    field: 'instNm',
    width: 150,
  },
  {
    headerName: '회원ID',
    field: 'memId',
    width: 150,
  },
  {
    headerName: '구분',
    field: 'memDivCd',
    width: 120,
    valueGetter: (params) => {
      return $utils.getCodeValue(memDivCdCode.value, params.data.memDivCd)
    },
  },
  {
    headerName: '회원명',
    field: 'memNm',
    width: 160,
    cellClass: (params) =>
      params.data.memNm === 'N'
        ? 'ico_tit ico_new ellipsis link basic'
        : 'ico_tit  ellipsis link basic',
  },
  {
    headerName: '생년월일',
    field: 'memBrth',
    width: 120,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  {
    headerName: '안내채널',
    field: 'ntcnChnlDivCd',
    width: 120,
    valueGetter: (params) => {
      return $utils.getCodeValue(ntcnChnlDivCdCode.value, params.data.ntcnChnlDivCd)
    },
  },
  {
    headerName: '가입일자',
    field: 'memJoinDate',
    width: 120,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  {
    headerName: '해지일자',
    field: 'memCnclDate',
    width: 140,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  {
    headerName: '최종접속일자',
    field: 'lastLoginDt',
    width: 160,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  { headerName: '책임자여부', field: 'memDivCd', width: 160, hide: true },
  {
    headerName: '회원가입상태',
    field: 'memJoinStatCd',
    width: 160,
    valueGetter: (params) => {
      return $utils.getCodeValue(memJoinStatCdCode.value, params.data.memJoinStatCd)
    },
  },
])

// 그리드 눌리지않게 확인
const defaultColDefReceive = {
  editable: false,
}

// AgGrid 페이징관련
const showOptions = ref({
  isChangeSearchData: true, // 검색 조건 변경시 더보기 노출 여부
})
watch(searchParams.value, () => (showOptions.value.isChangeSearchData = false))

const agGrid = ref(null) // agGrid 객체
const currentPage = ref(0) // 현재페이지
const pageSize = ref(10)

// 검색 초기화
const searchRset = () => {
  searchParams.value.instId = ''
  searchParams.value.memId = ''
  searchParams.value.memNm = ''
  searchParams.value.instNm = ''
  searchParams.value.memJoinStatCd = ''
  selectedOrg.value = ''
  userOrgSearch.value = ''

  searchData()
}

// 회원가입으로 이동
const goSiup = () => {
  $fx.move('AMEM102')
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

/********************************* methods 선언 및 정의 *************************/

// 최초 로드
onMounted(async () => {
  $fx.startLoadingbar()
  memDivCdCode.value = await $fx.getCommonCodeList('MEM_DIV_CD')
  memJoinStatCdCode.value = await $fx.getCommonCodeList('MEM_JOIN_STAT_CD')
  ntcnChnlDivCdCode.value = await $fx.getCommonCodeList('NTCN_CHNL_DIV_CD')
  $fx.finishLoadingbar()

  searchData() // 회원 목록조회
})

// 검색 클릭시
const searchData = () => {
  if (searchParams.value.memJoinStatCd === 'all') {
    searchParams.value.instId = ''
  }
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

// 기관 검색
const searchOrgan = () => {
  $fx.throwDialog(MEM001P01, { data: {}, close: false, title: '기관 검색' }).then((result) => {
    if (result) {
      searchParams.value.instNm = result.value?.title
      searchParams.value.instId = result.value?.value
    }
  })
}

// 상세화면 이동 성명클릭시
const cellWasClicked = (params) => {
  if (params.column.colId === 'memNm') {
    const memId = params.data.memId
    const memDivCd = params.data.memDivCd
    const memJoinStatCd = params.data.memJoinStatCd
    $fx.move('AMEM103', { memId: memId, memDivCd: memDivCd, memJoinStatCd: memJoinStatCd })
  }
}

/********************************* api 선언 및 정의 *************************/
// 검색
const callApi = () => {
  const params = searchParams.value
  params.viewSeq = currentPage.value // 페이지 넘버
  params.viewCount = pageSize.value // 페이지 사이즈

  // 검색관련 조회
  if (selectedOrg.value === 'all') {
    params.memId = ''
    params.memNm = ''
    flagBtn.value = true
  } else if (selectedOrg.value === 'memNm') {
    params.memNm = userOrgSearch.value
    params.memId = ''
    flagBtn.value = false
  } else {
    params.memId = userOrgSearch.value
    params.memNm = ''
    flagBtn.value = false
  }

  $fx.startLoadingbar()
  memApi
    .MEM0202S01(params)
    .then((response) => {
      const resultData = response.result.memberList

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
