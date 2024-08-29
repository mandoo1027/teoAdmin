<template>
  <div class="caution_box mb_20">
    <ul>
      <li>배치 정보를 조회/등록/수정/실행/삭제(사용여부 : N) 하실 수 있습니다.</li>
      <li><span class="color_blue">등록버튼</span>을 클릭하시면 팝업에서 등록 하실 수 있습니다.</li>
      <li><span class="color_blue">배치명</span>을 클릭하시면 팝업에서 수정 하실 수 있습니다.</li>
    </ul>
  </div>

  <v-table class="mb_20">
    <tbody>
      <tr>
        <th class="">배치명</th>
        <td>
          <v-text-field
            label="배치명"
            v-model="searchParams.operName"
            class="i_basics"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">배치ID</th>
        <td>
          <v-text-field
            label="배치ID"
            v-model="searchParams.operId"
            class="i_basics"
            @keydown.enter="searchData"
            maxlength="5"
          ></v-text-field>
        </td>
        <th class="">프로그램URL</th>
        <td>
          <v-text-field
            label="프로그램URL"
            v-model="searchParams.programUrl"
            class="i_basics"
            @keydown.enter="searchData"
            maxlength="100"
          ></v-text-field>
        </td>

        <th class="">사용여부</th>
        <td>
          <div class="d_flex">
            <ComSelectBox
              v-model="searchParams.useYn"
              :items="itemUseYn"
              :isDefault="false"
              class="s_basics w_150"
              @changeValue="searchData"
            />
            <v-btn class="vbtn ml_10" size="small" @click="searchData">검색</v-btn>
            <v-btn class="vbtn ml_10" size="small" @click="searchRset">초기화</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div class="d_flex">
    <v-btn class="vbtn ml_10" size="small" @click="popupBAT101P01">등록</v-btn>
    <v-btn class="vbtn ml_10" size="small" @click="calldel">삭제</v-btn>
    <v-btn class="vbtn ml_10" size="small" @click="batExe">실행</v-btn>
  </div>
  <CommonComAgGridBasic
    ref="agGrid"
    :columnDefs="columnDefs"
    :currentPage="currentPage"
    :defaultColDef="defaultColDef"
    :pageSize="pageSize"
    @clickPagingNumber="clickPagingNumber"
    @setPageSize="setPageSize"
    @cellWasClicked="cellWasClicked"
  />
</template>

<style scoped></style>

<script setup>
import { batApi } from '@/api/index.ts'
import ComSelectBox from '@/components/common/ComSelectBox.vue'

/********************************* 변수 선언 및 정의 *************************/
/* 검색 변수 파라미터  */
const searchParams = ref({
  operId: '', //배치ID
  operName: '', //배치명
  programUrl: '', //프로그램URL
  useYn: '', //사용여부
  pageNum: 1,
  pageSize: 100,
})

const operIdExeParams = reactive({
  operId: '', //배치ID
  programUrl: '',
  paramList: '',
  useYn: '',
  postYn: '',
})

const nameRules = [
  (v) => !!v || '다시 입력해주세요.',
  (v) => (v && v.length >= 2) || '두 자리 이상 검색어를 입력해주세요.',
]

/* 콤보 박스 */
const itemUseYn = ref([
  { title: '전체', value: '' },
  { title: '사용', value: 'Y' },
  { title: '미사용', value: 'N' },
])

const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(1) //현재페이지
const pageSize = ref(100)

const columnDefs = ref([
  {
    headerName: '선택',
    field: 'chk',
    width: 80,
    cellRenderer: 'agCheckboxCellRenderer',
    editable: false,
    cellRendererParams: {
      disabled: false,
    },
  },
  { headerName: '배치명', field: 'operName', width: '230px', cellClass: 'ellipsis  cell_left  ' },
  { headerName: '배치ID', field: 'operId', width: '130px' },
  {
    headerName: '프로그램URL',
    field: 'programUrl',
    width: '350px',
    cellClass: 'ellipsis  cell_left  ',
  },
  { headerName: '파라미터', field: 'paramList', width: '230px', cellClass: 'ellipsis  ' },
  { headerName: '사용여부', field: 'useYn', width: '100px' },
  { headerName: '등록일자', field: 'rgtrDt', width: '150px' },
  { headerName: '등록자', field: 'rgtrUserId', width: '150px' },
])
//그리드 기본 셋팅
const defaultColDef = {
  sortable: true, // 정렬 기능
  filter: true, // 필터 기능
  editable: false, // 편집 여부
  resizable: true, // 모르겠다
  cellStyle: { textAlign: 'center' }, //전체 컬럼 정렬
}

/********************************* 초기화 *************************/
onMounted(() => {
  // 조회
  searchData()
})

/********************************* methods *************************/
//초기화

const searchRset = () => {
  searchParams.value.operId = '' //배치ID
  searchParams.value.operName = '' //배치명
  searchParams.value.programUrl = '' //프로그램URL
  searchParams.value.useYn = '' //사용여부

  searchData()
}
//검색
const searchData = () => {
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
// 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  params.pageNum = currentPage.value //페이지 넘버
  params.pageSize = pageSize.value //페이지 사이즈
  $fx.startLoadingbar()
  batApi
    .BAT0101S01(params)
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

const emit = defineEmits()
const props = defineComponent({
  operId: {
    type: String,
    default: '',
  },
})

// 팝업 등록
const popupBAT101P01 = () => {
  $fx
    .throwDialog('BATBAT101P01', {
      data: '',
      close: false,
      //closeLabel: '확인',
      title: '배치 등록',
    })
    .then((result) => {
      if (result) {
        //조회
        searchData()
      }
    })
}

//팝업 상세.수정.
const cellWasClicked = (params) => {
  if (params.column.colId != 'chk') {
    //배치명 클릭시
    const operId = params.data.operId
    $fx
      .throwDialog('BATBAT101P01', {
        data: operId,
        close: false,
        title: '배치 관리',
        //closeLabel: '확인',
      })
      .then((result) => {
        if (result) {
          //조회
          searchData()
        }
      })
  }
}

const searchView = () => {
  searchParams.operId = ref('00001') //배치ID
  const params = searchParams.value //파라미터 셋팅
  //params.operId=  searchParams.operId
  $fx.startLoadingbar()
  batApi
    .BAT0101S02(params)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

//삭제
const calldel = () => {
  if (agGrid.value.getCheckData().length == 0) {
    $fx.throwAlert('삭제할 배치의 체크박스를 선택해주세요.', '알람')
    return
  }

  const rchk = ref(0)

  const returnList = agGrid.value.getCheckData().map((item) => {
    if (item.useYn === 'Y') {
      $fx.throwAlert(
        '사용중인 배치(' +
          item.operId +
          ')를 선택했습니다. 미사용( 사용여부 : N ) 배치만 삭제 할 수 있습니다',
        '알람',
      )
      rchk.value = 1
      return
    }

    return { operId: item.operId }
  })

  if (rchk.value == 1) {
    return
  }

  const params = returnList
  $fx.startLoadingbar()
  batApi
    .BAT0101D01(params)
    .then((response) => {
      const resultData = response.result

      if (resultData.resultCd === 'Y') {
        $fx.throwAlert('정상 처리되었습니다.').then((result) => {
          searchData() //재검색
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

//실행 batExe
const batExe = (saveData) => {
  if (agGrid.value.getCheckData().length == 0) {
    $fx.throwAlert('실행할 배치의 체크박스를 선택해주세요.', '알람')
    return
  }
  if (agGrid.value.getCheckData().length > 1) {
    $fx.throwAlert('실행은 한 건씩 할 수 있습니다. 한 건의 체크박스를 선택해주세요.', '알람')
    return
  }

  const rchk = ref(0)
  const operId = agGrid.value.getCheckData().map((item) => {
    if (item.useYn === 'N') {
      $fx.throwAlert('사용하지 않는 배치를 선택했습니다. 배치ID :' + item.operId, '알람')
      rchk.value = 1
      return
    }
    operIdExeParams.operId = item.operId
    operIdExeParams.programUrl = item.programUrl
    operIdExeParams.paramList = item.paramList
    operIdExeParams.useYn = item.useYn

    return item.operId
  })

  if (rchk.value == 1) {
    return
  }

  const params = operIdExeParams //파라미터 셋팅
  $fx.startLoadingbar()
  batApi
    .BAT0101I02(params)
    .then((response) => {
      const resultData = response.result

      if (resultData.resultCd === 'Y') {
        $fx.throwAlert(
          '정상 처리되었습니다. \n배치 순번 : ' +
            resultData.execSeq +
            '\n실행 결과 : ' +
            resultData.execResult +
            '\n오류 메시지 : ' +
            resultData.errDsc,
          '알람',
        )
        searchData() //재검색
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
