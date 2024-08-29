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
              <CommonComSelectBox
                groupCode="INFRM_JOB_DIV_CD"
                v-model="searchParams.infrmJobDivCd"
                :delItems="[{ code: '110' }, { code: '120' }, { code: '130' }, { code: '330' }]"
                :isAll="true"
                class="s_basics w_160 ml_5 none_details"
              />
              <v-text-field
                label="검색어"
                v-model="searchParams.infrmCtn"
                placeholder="쪽지 내용을 입력하세요"
                class="i_basics w_200 none_details ml_5"
                @keydown.enter="searchData"
              ></v-text-field>
              <v-btn class="vbtn search ml_20" size="small" @click="searchData">조회</v-btn>
            </div>
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
  <div class="btn_btm_wrap">
    <v-btn class="vbtn line" size="small" @click="delDate">삭제</v-btn>
    <v-btn class="vbtn" size="small" @click="writeMsg">쪽지쓰기</v-btn>
  </div>
</template>

<style scoped></style>

<script setup>
import { notApi } from '@/api/index.ts'

const emits = defineEmits(['writeMsg'])
const MEM003P01 = 'MEMMEM003P01' //쪽지 상세 팝업
//* 검색 변수 파라미터  */
const searchParams = ref({
  startDate: '20231108',
  endDate: '20231208',
  sndngRcvrFlag: 'S', // 발신수신구분  S:발신 , R:수신
  infrmCtn: '', // 쪽지내용
  infrmJobDivCd: '', // 쪽지종류코드
  viewSeq: 0,
  viewCount: 10,
})

//쪽지 삭제 리스트
const sndngSeqList = reactive([])

//검색 시작일  1개월전
// searchParams.value.startDate = $utils.getDateYYYYMMDD(0, -1, 0)
//검색 종료일
// searchParams.value.endDate = $utils.getDateYYYYMMDD(0, 0, 0)

const columnDefsReceive = ref([
  {
    headerName: '선택',
    field: 'chk',
    width: 76,
    headerComponent: $agGridUtils.CellRenderer.CheckboxCellererer,
    headerComponentParams: $agGridUtils.changeChkData,
    editable: false,
    cellRendererParams: {
      disabled: false,
    },
  },
  { headerName: 'NO.', field: 'viewSeq', width: 75 },
  { headerName: '쪽지 종류', field: 'infrmJobDivNm', width: 130 },
  { headerName: '쪽지 종류', field: 'infrmJobDivCd', hide: true },
  {
    headerName: '쪽지 내용',
    field: 'infrmCtn',
    width: 670,
    cellClass: 'cell_left ellipsis vlink basic',
  },
  {
    headerName: '받은 날짜',
    field: 'sndngDate',
    width: 100,
    valueFormatter: (params) => $utils.formatDate(params?.value),
  },
  { headerName: '받는 분', field: 'rcvrIdNm', width: 105 },
  { headerName: '발신일련번호', field: 'sndngSeq', hide: true },
])
const defaultColDefReceive = {
  editable: false,
}

const showOptions = ref({
  isChangeSearchData: true, //검색 조건 변경시 더보기 노출 여부
})
watch(searchParams.value, () => (showOptions.value.isChangeSearchData = false))

const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(0) //현재페이지
const pageSize = ref(10)
/********************************* 초기화 *************************/
onMounted(() => {
  // 조회
  searchData()
})

/********************************* methods *************************/

//검색
const searchData = () => {
  //날짜 체크
  if (searchParams.value.startDate > searchParams.value.endDate) {
    $fx.throwAlert('지정한 날짜를 다시 확인하세요', '알람')
    return
  }
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

//상세화면 이동
const cellWasClicked = (params) => {
  if (params.column.colId === 'infrmCtn') {
    $fx
      .throwDialog(MEM003P01, {
        data: {
          sndngSeq: params.data.sndngSeq,
          sndngRcvrFlag: 'S', // 발신수신구분  S:발신 , R:수신
        },
        close: false,
        title: '나의 쪽지',
        // dialogClasses: 'large',
      })
      .then((result) => {})
    return
  }
}

//쪽지쓰기
const writeMsg = () => {
  emits('writeMsg')
}

/*********************************** API ***************************/
//쪽지 목록 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅

  params.viewSeq = currentPage.value //페이지 넘버
  params.viewCount = pageSize.value //페이지 사이즈

  $fx.startLoadingbar()
  notApi
    .NOT0201S01(params)
    .then((response) => {
      console.log('response===', response)
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

//쪽지 삭제
const delDate = () => {
  if (agGrid?.value?.getCheckData().length < 1) {
    $fx.throwAlert('삭제할 데이터를 선택하세요', '알람')
    return
  }

  sndngSeqList.push(
    //저장된 참여기관 리스트
    ...agGrid.value.getCheckData().map((item) => {
      return {
        sndngSeq: item.sndngSeq,
      }
    }),
  )

  let param = {}
  param.sndngSeqList = sndngSeqList
  $fx.startLoadingbar()
  notApi
    .NOT0201U04(param)
    .then((response) => {
      console.log('response===', response)
      if (response.result.result) {
        $fx.throwAlert('삭제 되었습니다.', '확인').then((result) => {
          agGrid.value.removeData()
          callApi() //목록으로 이동.
        })
      } else {
        $fx.throwAlert('삭제 되지 않았습니다. /' + response.result.result, '확인')
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
