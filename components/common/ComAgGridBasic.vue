<template>
  <div class="grid">
    <ag-grid-vue
      class="ag-theme-alpine"
      :style="props.style"
      :rowData="props.rowData"
      :columnDefs="columnDefs"
      :defaultColDef="computeDefaultColDef"
      :rowSelection="gridOptions.rowSelection"
      :supressRowClickSelection="gridOptions.supressRowClickSelection"
      :singleClickEdit="gridOptions.singleClickEdit"
      :rowDragEntireRow="gridOptions.rowDragEntireRow"
      :rowDragManaged="true"
      :animateRows="gridOptions.animateRows"
      :rowHeight="rowHeight"
      :suppressColumnVirtuallsation="gridOptions.suppressColumnVirtuallsation"
      :localeText="{ noRowsToShow: '조회된 데이터가 없습니다.' }"
      @cell-clicked="cellWasClicked"
      @cell-focused="cellFocused"
      @grid-ready="onGridReady"
      @cell-value-changed="cellValueChanged"
    >
      <!-- editType='fullRow' -->
    </ag-grid-vue>
  </div>
  <!-- <CommonComPagenation
    v-if="isShowPaging"
    :pages="computedTotalPage"
    :length="computedTotalPage"
    :total-visible="totalVisible"
    @clickPagingNumber="clickPagingNumber(page)"
  ></CommonComPagenation> -->

  <div
    class="btn_grid_more"
    v-if="computeShowOption.isShowMoreBtn && isShowMore && computeShowOption.isChangeSearchData"
  >
    <v-btn class="vbtn" size="small" @click="moreNextPage">더보기</v-btn>
  </div>
</template>

<script setup>
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'

const emit = defineEmits([
  'clickPagingNumber',
  'setPageSize',
  'callSave',
  'cellWasClicked',
  'cellValueChange',
  'cellValueChangeChk',
])

const props = defineProps({
  columnDefs: {
    type: Array,
    default: [],
  },
  defaultColDef: { type: Object, default: {} },
  showOptions: {
    //버튼 노출 여부
    type: Object,
    default: {
      sameChk: '', //체크 조건
      isShowAdd: true, //추가 버튼
      isShowDel: true, //삭제 버튼
      isShowSave: true, //저장 버튼
      isShowPageSize: true, //페이지 사이즈 콤보박스
      isShowMoreBtn: true, // 더보기 버튼
      isChangeSearchData: true, //검색 조건 변경시 더보기 노출 여부
      isRadio: false, //라디오 이벤트(체크박스 1건 선택) 여부
      differentChk: '', //체크 조건
    },
  },
  rowData: { type: Array, default: [] },
  rowHeight: { type: Number, default: 51 }, //페이징 영역 노출 여부
  isShowPaging: { type: Boolean, default: false },
  style: { type: Object, default: { height: '480px' } },
  currentPage: { type: Number, default: 1 },
  pageSize: { type: Number, default: 100 },
  gridOptions: {
    type: Object,
    default: {
      rowSelection: 'multiple',
      suppressRowClickSelection: false,
      singleClickEdit: true,
      rowDragEntireRow: true,
      rowDragManaged: true,
      animateRows: true,
      copyHeadersToClipboard: true, //헤더를 클립보드로 복사
    },
  },
})

const totalCount = ref(0)

const gridOption = ref({}) //그리드 객체
const isShowMore = ref(false) //더보기 버튼 보여주기

const computeDefaultColDef = computed(() => {
  return {
    sortable: props.defaultColDef.sortable ?? true, // 정렬 기능
    filter: props.defaultColDef.filter ?? true, // 필터 기능
    editable: props.defaultColDef.editable ?? true, // 편집 여부
    resizable: props.defaultColDef.resizable ?? true, // 자동 넓이 조정
    cellStyle: props.defaultColDef.cellStyle ?? { textAlign: 'center' }, //전체 컬럼 정렬
  }
})
const computeShowOption = computed(() => {
  return {
    isShowAdd: props.showOptions.isShowAdd ?? true, //추가 버튼
    isShowDel: props.showOptions.isShowDel ?? true, //삭제 버튼
    isShowSave: props.showOptions.isShowSave ?? true, //저장 버튼
    isShowPageSize: props.showOptions.isShowPageSize ?? true, //페이지 사이즈 콤보박스
    isShowMoreBtn: props.showOptions.isShowMoreBtn ?? true, // 더보기 버튼
    isChangeSearchData: props.showOptions.isChangeSearchData ?? true, //검색 조건 변경시 더보기 노출 여부
    sameChk: props.showOptions.sameChk ?? '', //체크될 때 동일한 값이 있을 경우 모두 체크되도록 수정
    isRadio: props.showOptions.isRadio ?? false, //라디오 이벤트(체크박스 1건 선택) 여부
    differentChk: props.showOptions.differentChk ?? '', //체크될 때 다른 값이 있을 경우 모두 체크 해제되도록 수정
  }
})

//그리드 클릭시
const cellWasClicked = (e) => {
  emit('cellWasClicked', e)
}
//그리드 포커싱될때
const cellFocused = (e) => {}

//그리드 객체 받기
const onGridReady = (e) => {
  gridOption.value = e
  removeData()
}
// 값 변경될 때 이벤트
const cellValueChanged = (e) => {
  if (e.column.colId !== 'chk' && e.data.rowStatus !== 'D' && e.data.rowStatus !== 'C') {
    e.data.rowStatus = 'U'
    const rowData = gridOption.value.api.applyTransaction({ update: [e.data] })
    emit('cellValueChange', rowData)
  } else if (e.column.colId === 'chk') {
    if (computeShowOption.value.sameChk) {
      setSameChkList(e.data, e.data.chk)
    } else if (computeShowOption.value.isRadio) {
      setRadioEvt(e.rowIndex)
    } else if (computeShowOption.value.differentChk && e.data.chk) {
      setDifferentChkList(e.data)
    }
    emit('cellValueChangeChk', e.data)
  }
}

const setRadioEvt = (rowIndex) => {
  //체크 해제(체크 ROW 제외)
  const targetList = getAllData()
  targetList.splice(rowIndex, 1)
  targetList.map((targetRow) => {
    targetRow.chk = false
    gridOption.value.api.applyTransaction({ update: [targetRow] })
  })
}

const setDifferentChkList = (rowData) => {
  let differentValue = rowData[computeShowOption.value.differentChk]
  //값이 있을 경우 해당 컬럼과 비교하여 다른 값이 있으면 모두 체크 해제
  const targetList = getAllData()
  const filerList = targetList.filter(
    (item) => item[computeShowOption.value.differentChk] !== differentValue,
  )
  filerList.map((targetRow) => {
    targetRow.chk = false
    gridOption.value.api.applyTransaction({ update: [targetRow] })
  })
}

const setSameChkList = (rowData, isTrue) => {
  let sameValue = rowData[computeShowOption.value.sameChk]
  //값이 있을 경우 해당 컬럼과 비교하여 동일한 값이 있으면 모두 체크
  const targetList = getAllData()
  const filerList = targetList.filter((item) => item[computeShowOption.value.sameChk] === sameValue)
  filerList.map((targetRow) => {
    targetRow.chk = isTrue
    gridOption.value.api.applyTransaction({ update: [targetRow] })
  })
}
//더보기 클릭시
const moreNextPage = () => {
  //const nextPage = props.currentPage + 1
  const rowCount = gridOption.value.api.getDisplayedRowCount()
  emit('clickPagingNumber', rowCount)
}

//페이징 클릭시
const clickPagingNumber = (number) => {
  emit('clickPagingNumber', number)
}

const getAllData = () => {
  return gridOption.value.api.getModel().rowsToDisplay.map((node) => node.data)
}

const setData = (type) => {
  // 그리드 추가(add) , 삭제(del)
  if (type === 'del') {
    const currentRowsC = getAllData()
    const chkData = currentRowsC.find((item) => item.chk === true)
    if (!chkData) {
      $fx.throwAlert('삭제할 데이터를 선택하세요', '알람')
      return
    } else {
      //추가된 데이터만 삭제하기
      currentRowsC.map((item) => {
        if (item.chk === true && item.rowStatus === 'C') {
          gridOption.value.api.applyTransaction({ remove: [item] })
        } else if (item.chk === true) {
          item.rowStatus = 'D'
          gridOption.value.api.applyTransaction({ update: [item] })
        }
      })
    }
  } else {
    gridOption.value.api.applyTransaction({ add: [{ chk: false, rowStatus: 'C' }] })
    movePosition()
  }
}
//저장 직전에 편집 상태를 변경하면 현재 로우의 편집 상태를 셋팅함(좋은 방법 있으면 알려줘)
const saveRefresh = () => {
  gridOption.value.api.stopEditing()
}
//저장 버튼 클릭
const saveData = () => {
  saveRefresh()
  setTimeout(() => {
    const changeRows = gridOption.value.api
      .getRenderedNodes()
      .map((node) => node.data)
      .filter((item) => item.rowStatus)
    console.log(changeRows)
    emit('callSave', changeRows)
  }, 500)
}

// 업무 페이지에서 접근(목록에 데이터 ADD)
const addData = (resultData) => {
  /** 그리드 최하단으로 이동 후 셋팅*/
  movePosition()
  if (resultData.length > 0) {
    const setData = resultData.map((item) => {
      item.chk = false
      item.rowStatus = ''
      return item
    })
    gridOption.value.api.applyTransaction({ add: setData })
    isShowMore.value = true
  } else {
    isShowMore.value = false
  }
  props.showOptions.isChangeSearchData = true
  //총 개수 셋팅
  totalCount.value = gridOption.value.api.getDisplayedRowCount()
}
// 그리드 데이터 삭제
const removeData = () => {
  gridOption.value?.api?.setRowData([])
}

//데이터 내보내기
const getData = () => {
  const rowDataList = getAllData()
  return rowDataList
}
//체크된 데이터 내보내기
const getCheckData = () => {
  const rowData = getAllData()
  const chkDataList = rowData.filter((item) => item.chk === true)
  return chkDataList
}
// row클릭시 데이터 가져오기
const getSelectedRows = () => {
  return gridOption.value.api.getSelectedRows()
}

// row클릭시 데이터 가져오기
const getSelectedRowIndex = () => {
  const node = gridOption.value.api.getSelectedNodes()
  if (node.length > 0) {
    return node[0].rowIndex
  }
  return -1
}
//수정된 데이터 가져오기
const getUpdateList = () => {
  const allData = gridOption.value.api.getModel().rowsToDisplay.map((node) => node.data)
  const updateList = allData.filter(
    (item) => item.rowStatus === 'D' || item.rowStatus === 'C' || item.rowStatus === 'U',
  )
  return updateList
}

//신규 데이터 생성
const addRowData = (data) => {
  const initData = { chk: false, rowStatus: 'C' }
  const addData = Object.assign({}, initData, data)
  gridOption.value.api.applyTransaction({ add: [addData] })
  movePosition({ isActionClick: true })
}

//해당 위치로 이동
/**
 * params : index : 이동위치
 *          isActionClick : 클릭 데이터 다운여부
 */
const movePosition = (params = { index: undefined, isActionClick: false }) => {
  if (!params.index) {
    params.index = gridOption.value.api.getDisplayedRowCount() - 1
  }
  const lastIndex = params.index
  if (lastIndex > -1) {
    //셀렉트시키기
    const rowNode = gridOption.value.api.getDisplayedRowAtIndex(lastIndex)
    rowNode.setSelected(true, true) //true(셀렉트 시키기) , true(기존에 셀렉트 해제하기)
    if (params.isActionClick) {
      emit('cellWasClicked', rowNode) //강제로 데이터 내리기
    }
    //이동
    gridOption.value.api.ensureIndexVisible(lastIndex, 'bottom') //해당 인덱스로 이동
  }
}
//총개수
const getTotalCount = () => {
  const totalCnt = gridOption.value.api.getDisplayedRowCount()
  return totalCnt
}

defineExpose({
  gridOption,
  addData,
  removeData,
  getData,
  getCheckData,
  getSelectedRows,
  setData,
  getSelectedRowIndex,
  getUpdateList,
  addRowData,
  movePosition,
  getTotalCount,
})
</script>
