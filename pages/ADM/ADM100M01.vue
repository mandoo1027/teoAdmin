<template>
  <!-- <h3 class="tit">관리자 계정 관리</h3> -->

  <div class="caution_box mb_20">
    <ul>
      <li>시스템관리자 등록입니다.</li>
      <li>삭제 또는 수정을 원하시면 아이디 Click하세요.</li>
    </ul>
  </div>

  <div class="tit_cnt_btn">
    <div>
      <v-btn class="vbtn line" size="small" @click="goView">관리자 계정 등록</v-btn>
    </div>
  </div>

  <CommonComAgGridBasic
    ref="agGrid"
    :columnDefs="columnDefs"
    :defaultColDef="defaultColDef"
    :showOptions="showOptions"
    @cellWasClicked="cellWasClicked"
  />
</template>

<style scoped></style>

<script setup>
import { hcoApi } from '@/api/index.ts'

/********************************* 변수 선언 및 정의 *************************/
/* 검색 변수 파라미터  */
const searchParams = ref({
  id: '',
})

const agGrid = ref(null) //ag-grid 객체

const columnDefs = ref([
  { headerName: 'NO', field: 'no', width: 100, valueGetter: 'node.rowIndex + 1' },
  { headerName: '아이디', field: 'id', width: 250 },
  { headerName: '이름', field: 'name', width: 250 },
  { headerName: '소속', field: 'deptNm', width: 250 },
  { headerName: '전화번호', field: 'phon', width: 250 },
  // { headerName: '이메일주소', field: 'email', width: 200 },
])
//그리드 기본 셋팅
const defaultColDef = {
  sortable: true, // 정렬 기능
  filter: true, // 필터 기능
  editable: false, // 편집 여부
  resizable: true, //
  cellStyle: { textAlign: 'center' }, //전체 컬럼 정렬
}
const showOptions = ref({
  isShowMoreBtn: false, // 더보기 버튼
})
/********************************* 초기화 *************************/
onMounted(() => {
  // 조회
  callApi()
})
/********************************* method *************************/
//  이동
const goView = () => {
  $fx.move('AADM002', {})
}

/************************************* API ***************************/
//팝업 상세.수정.
const cellWasClicked = (params) => {
  if (params.column.colId === 'id' || params.column.colId === 'name') {
    //id,이름 클릭시
    // console.log(params.data.id, "params.data.id>>>>>")
    const operId = params.data.id

    $fx.move('AADM002', { operId: operId })
  }
}

// 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  $fx.startLoadingbar()
  hcoApi
    .HCO0603S01(params)
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
