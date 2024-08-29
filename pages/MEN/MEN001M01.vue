<template>
  <v-table>
    <tbody>
      <tr>
        <th class="">시스템구분</th>
        <td>
          <CommonComSelectBox
            v-model="searchParams.sysDivCd"
            groupCode="SYS_DIV_CD"
            :isDefault="false"
            class="s_basics w_180"
          />
        </td>
        <th class="">메뉴코드</th>
        <td>
          <v-text-field
            label="메뉴코드"
            class="i_basics w_80"
            v-model="searchParams.menuCode"
            :maxlength="10"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">상위코드</th>
        <td>
          <v-text-field
            label="상위코드"
            class="i_basics w_80"
            v-model="searchParams.upperMenuCode"
            :maxlength="10"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <th class="">경로</th>
        <td>
          <v-text-field
            label="경로"
            class="i_basics"
            v-model="searchParams.filePath"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>

        <th class="">메뉴명</th>
        <td>
          <v-text-field
            label="메뉴명"
            class="i_basics"
            :maxlength="10"
            v-model="searchParams.menuName"
            @keydown.enter="searchData"
          ></v-text-field>
        </td>
        <td>
          <div class="d_flex">
            <v-btn class="vbtn ml_10" size="small" @click.prevent="searchData">검색</v-btn>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>

  <CommonComAgGridBasic
    ref="agGrid"
    :style="{ height: '430px' }"
    :columnDefs="columnDefs"
    :currentPage="currentPage"
    :defaultColDef="defaultColDef"
    :showOptions="showOptions"
    @cellWasClicked="cellWasClicked"
    @clickPagingNumber="clickPagingNumber"
    @cellValueChange="cellValueChanged"
    @setPageSize="setPageSize"
  />
  <div class="tit_btn right">
    <div>
      <v-btn class="vbtn" size="small" @click="deleteData" v-if="isEdit">삭제</v-btn>
      <v-btn class="vbtn" size="small" @click="addData" v-if="isEdit">신규</v-btn>
      <v-btn class="vbtn" size="small" @click="saveData">저장</v-btn>
    </div>
  </div>
  <v-form ref="form">
    <v-table class="vtable_view" disabled>
      <tbody>
        <tr>
          <th>
            <v-label> {{ selectedData.sysDivCd }}</v-label> 메뉴코드
          </th>
          <td>
            <v-text-field
              label="메뉴코드"
              v-model="selectedData.menuCode"
              placeholder=""
              @input="changeMenuCode"
              :disabled="!isEdit || selectedData.rowStatus !== 'C'"
              :rules="emptyRules"
              :maxlength="10"
              class="i_basics pwd_chk w_100"
            ></v-text-field>
          </td>
          <th>상위메뉴코드</th>
          <td>
            <v-text-field
              label="상위메뉴코드"
              v-model="selectedData.upperMenuCode"
              placeholder="상위메뉴코드"
              :disabled="!isEdit"
              :maxlength="10"
              class="i_basics pwd_chk w_100"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>메뉴(화면명)</th>
          <td>
            <v-text-field
              v-model="selectedData.menuName"
              placeholder=""
              :rules="emptyRules"
              :disabled="!isEdit"
              :maxlength="50"
              class="i_basics pwd_chk w_300"
            ></v-text-field>
          </td>
          <th>로그인/사용 여부</th>
          <td>
            <div class="vchk_box">
              <!-- 가로 배치는 vchk_box , 세로 배치는 vchk_box_row -->
              <v-checkbox
                v-model="selectedData.loginYn"
                true-value="Y"
                :disabled="!isEdit"
                false-value="N"
                :label="`로그인여부`"
              />
              <v-checkbox
                v-model="selectedData.useYn"
                true-value="Y"
                false-value="N"
                :label="`사용여부`"
              />
            </div>
          </td>
        </tr>

        <tr>
          <th>메뉴단계</th>
          <td>
            <CommonComSelectBox
              :isDefault="false"
              :disabled="!isEdit"
              :items="menuDepthCdItems"
              v-model="selectedData.menuDepth"
              class="s_basics w_150"
            />
          </td>
          <th>메뉴순서</th>
          <td>
            <v-text-field
              v-model="selectedData.menuSeq"
              placeholder=""
              type="number"
              @input="replaceNumber"
              :rules="emptyRules"
              class="i_basics pwd_chk w_300"
            ></v-text-field>
          </td>
        </tr>
        <template v-if="isEdit">
          <tr>
            <th>화면구분(M,S,N)</th>
            <td>
              <CommonComSelectBox
                groupCode="MENU_SCR_DEV"
                :isDefault="false"
                selected="M"
                v-model="selectedData.menuScrDev"
                class="s_basics w_150"
              />
            </td>
            <th>화면경로</th>
            <td>
              <v-text-field
                label="화면경로"
                v-model="selectedData.filePath"
                placeholder="화면경로"
                class="i_basics pwd_chk w_300"
              ></v-text-field>
            </td>
          </tr>
          <!-- <tr>
            <th>발주기관로고CSS</th>
            <td>
              <v-text-field
                label="발주기관로고CSS"
                v-model="selectedData.logoCss"
                placeholder="발주기관로고CSS"
                :maxlength="100"
                class="i_basics pwd_chk w_300"
              ></v-text-field>
            </td>
            <th>메뉴CSS</th>
            <td>
              <v-text-field
                label="메뉴CSS"
                v-model="selectedData.menuCss"
                placeholder="메뉴CSS"
                :maxlength="100"
                class="i_basics pwd_chk w_300"
              ></v-text-field>
            </td>
          </tr> -->
          <tr>
            <th>사용 시작 종료일</th>
            <td>
              <div class="i_calender">
                <CommonComDatePicker v-model="selectedData.useStrtDate" class="w_200" />
                <span>~</span>
                <CommonComDatePicker v-model="selectedData.useEndDate" class="w_200" />
              </div>
            </td>

            <th>{{ isAdmin ? '메뉴 권한' : '사용기관구분(O,C,A)' }}</th>
            <td>
              <CommonComSelectBox
                groupCode="MENU_AUTH"
                v-if="isAdmin"
                :isDefault="false"
                :rules="emptyRules"
                v-model="selectedData.useInstDiv"
                class="s_basics w_150"
              />
              <CommonComSelectBox
                v-else
                :items="useInstDivItems"
                :isDefault="false"
                :rules="emptyRules"
                v-model="selectedData.useInstDiv"
                class="s_basics w_150"
              />
            </td>
          </tr>
          <tr>
            <th>화면설명(비고)</th>
            <td colspan="3">
              <v-textarea
                class="h_100 w100"
                :rules="emptyRules"
                :maxlength="100"
                v-model="selectedData.scrCtn"
              ></v-textarea>
            </td>
          </tr>
          <tr v-if="!isAdmin">
            <th>발주/수행 메뉴 생성</th>
            <td colspan="3">
              <div class="chk_flex">
                <v-checkbox
                  v-model="selectedData.updateMenuTypeO"
                  :label="`발주기관 메인 메뉴`"
                  :disabled="!isEmptyMenuO"
                />
                <v-checkbox
                  v-model="selectedData.updateMenuTypeC"
                  :label="`수행기관 메인 메뉴`"
                  :disabled="!isEmptyMenuC"
                />
                <v-checkbox
                  v-model="selectedData.updateMenuTypeP"
                  :label="`EzPLus 메인 메뉴`"
                  :disabled="!isEmptyMenuP"
                />
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </v-form>
</template>

<script setup>
import { commonApi, menuApi } from '@/api/index.ts'
/********************************* 변수 선언 및 정의 *************************/
import _ from 'lodash'
//검색 파라미터
const searchParams = ref({
  searchType: 'ADM', // 사용여부 구분없이 조회하기 위한 조건
  sysDivCd: 'EFM', //코드그룹
  menuCode: '', //코드
  menuName: '',
  upperMenuCode: '',
  filePath: '',
  pageNum: 1,
  pageSize: 100,
  type: 'LIST',
})

const showOptions = {
  isShowMoreBtn: false,
}
const isClick = ref(false)
const agGrid = ref(null) //ag-grid 객체
const currentPage = ref(1) //현재페이지
const pageSize = ref(100)
const selectedData = ref({}) //선택된 데이터
const form = ref(null)
const updateMenuTypeO = ref(false) //발주 메뉴 생성
const updateMenuTypeC = ref(false) //수행 메뉴 생성
const updateMenuTypeP = ref(false) //Ezplus 메뉴 생성
const orgMenuTotalList = ref([]) //메뉴 전체
const orgMenuListO = ref([]) //발주,수행 메뉴리스트
const orgMenuListC = ref([]) //수행 메뉴리스트
const orgMenuListP = ref([]) //EzPlus 메뉴리스트

const isEmptyMenuO = ref(false) //발주기관 메뉴 존재 여부
const isEmptyMenuC = ref(false) //수행기관 메뉴 존재 여부
const isEmptyMenuP = ref(false) //EZ plus 메뉴 존재 여부

const isEdit = ref(true) //ADM, EFM일때만 모든 데이터 편집 가능..(EFMO,EFMC 일때는 편집 불가)
const isAdmin = ref(false)

//시스템 구분코드
const useInstDivItems = [
  { title: '전체(A)', value: 'A' },
  { title: '발주기관(O)', value: 'O' },
  { title: '수행기관(C)', value: 'C' },
]

//사용여부 코드
const useYnCdItems = [
  { title: 'Y', value: 'Y' },
  { title: 'N', value: 'N' },
]
//메뉴단계 코드
const menuDepthCdItems = [
  { title: '0', value: '0' },
  { title: '1', value: '1' },
  { title: '2', value: '2' },
]
//그리드 기본 셋팅
const defaultColDef = {
  editable: false, // 편집 여부
  resizable: true,
  filter: false,
  flex: 1,
}
const useYNCodes = [
  { name: 'Y', value: 'Y' },
  { name: 'N', value: 'N' },
]

const menuGbnCodes = [
  { name: '화면', value: 'S' },
  { name: '메뉴', value: 'M' },
  { name: '네비', value: 'N' },
]

const emptyRules = [(v) => !!v || '값을 입력해주세요.']
//노출 컬럼 정의
const columnDefs = [
  {
    headerName: '선택',
    field: 'chk',
    width: 80,
    headerComponent: $agGridUtils.CellRenderer.CheckboxCellererer,
    headerComponentParams: $agGridUtils.changeChkData,
    editable: false,
    cellRendererParams: {
      disabled: false,
    },
  },
  {
    headerName: '상태',
    field: 'rowStatus',
    width: 80,
    editable: false,
  },
  {
    headerName: '메뉴코드',
    field: 'menuCode',
    width: 160,
  },
  { headerName: '메뉴(화면명)', field: 'menuName', width: 200 },
  { headerName: '메뉴단계', field: 'menuDepth', width: 110 },
  { headerName: '메뉴순서', field: 'menuSeq', width: 120 },
  {
    headerName: '메뉴화면구분',
    field: 'menuScrDev',
    width: 130,
    // cellEditor: 'agSelectCellEditor',
    // cellEditorParams: { values: $agGridUtils.extractValues(menuGbnCodes) },
    // valueFormatter: (params) => $agGridUtils.lookupValue(menuGbnCodes, params.value),
    // valueParser: (params) => $agGridUtils.lookupKey(menuGbnCodes, params.newValue),
    // cellRenderer: (params) => $agGridUtils.getCodeValue(menuGbnCodes, params),
  },
  {
    headerName: '상위메뉴코드',
    field: 'upperMenuCode',
    width: 120,
  },
  {
    headerName: '로그인여부',
    field: 'loginYn',
    width: 110,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: { values: $agGridUtils.extractValues(useYNCodes) },
    valueFormatter: (params) => $agGridUtils.lookupValue(useYNCodes, params.value),
    valueParser: (params) => $agGridUtils.lookupKey(useYNCodes, params.newValue),
    cellRenderer: (params) => $agGridUtils.getCodeValue(useYNCodes, params),
  },
  {
    headerName: '화면경로',
    field: 'filePath',
    width: 180,
  },
  {
    headerName: '사용기관구분',
    field: 'useInstDiv',
    width: 120,
  },
  // {
  //   headerName: '메뉴CSS',
  //   field: 'menuCss',
  //   width: 120,
  // },
  // {
  //   headerName: '발주기관로고CSS',
  //   field: 'logoCss',
  //   width: 120,
  // },
  {
    headerName: '사용시작일자',
    field: 'useStrtDate',
    width: 120,
    valueGetter: (params) => {
      return $utils.formatDate(params.data.useStrtDate)
    },
  },
  {
    headerName: '사용종료일자',
    field: 'useEndDate',
    width: 120,
    valueGetter: (params) => {
      return $utils.formatDate(params.data.useEndDate)
    },
  },
  {
    headerName: '사용여부',
    field: 'useYn',
    width: 120,
  },
  {
    headerName: '수정자',
    field: 'lastUserId',
    width: 120,
  },
  {
    headerName: '수정일시',
    field: 'lastChgDt',
    width: 120,
    valueGetter: (params) => {
      return $utils.formatDate(params.data.lastChgDt)
    },
  },
]

/********************************* 초기화 *************************/
onMounted(() => {
  //공통코드 조회
  searchData()
})

/********************************* methods *************************/
watch(
  selectedData,
  (newValue) => {
    if (newValue?.menuScrDev) {
      if (!isClick.value) {
        applyData()
      }
      $agGridUtils.refrashGridData(agGrid.value)
    }
  },
  { deep: true },
)
//추가
const addData = () => {
  selectedData.value = {}
  selectedData.value.loginYn = 'Y'
  selectedData.value.menuScrDev = 'M'
  if (searchParams.value.sysDivCd === 'ADM') {
    selectedData.value.sysDivCd = 'ADM'
  } else {
    selectedData.value.sysDivCd = 'EFM'
  }
  selectedData.value.menuDepth = '2'
  selectedData.value.menuSeq = '1'
  selectedData.value.useYn = 'Y'
  if (isAdmin.value) {
    selectedData.value.useInstDiv = 'S'
  } else {
    selectedData.value.useInstDiv = 'A'
  }
  selectedData.value.useEndDate = '99991231'
  selectedData.value.useStrtDate = $utils.today()
  agGrid.value.addRowData(selectedData.value)
}

//검색
const searchData = () => {
  currentPage.value = 1
  selectedData.value = {}
  agGrid.value?.removeData()
  callApi()
}

//클릭시 상태 변경되지 않도록 상태관리 변수
watch(isClick, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      isClick.value = false
    }, 500)
  }
})
//페이지 클릭
const clickPagingNumber = (number) => {
  currentPage.value = number
  callApi()
}

const setPageSize = (number) => {
  pageSize.value = number
}
//현재 셀렉트된 로우 인덱스
const nowIndex = ref(-1)
//현재 로우 데이터 셋팅
const cellWasClicked = (e) => {
  let selectedRow = e.data
  nowIndex.value = e.rowIndex
  isClick.value = true
  selectedRow.useEndDate = selectedRow?.useEndDate
  selectedRow.useStrtDate = selectedRow?.useStrtDate
  selectedData.value = selectedRow
  if (selectedData.value?.menuCode) {
    findMenu()
  } else {
    isEmptyMenuO.value = true
    isEmptyMenuC.value = true
    isEmptyMenuP.value = true
  }
}

//메뉴코드 변경될때마다 체크
const changeMenuCode = () => {
  let findPage = $utils.findMenu(orgMenuTotalList.value, selectedData.value?.menuCode) // 통합 메뉴 코드 확인
  if (Object.keys(findPage).length === 0) {
    //없는 메뉴코드
    findMenu()
  } else {
    $fx.throwAlert('이미 동일한 메뉴코드가 존재합니다.').then(() => {
      selectedData.value.menuCode = ''
    })
  }
}

//메뉴 생성 여부 확인
const findMenu = () => {
  let findPageO = $utils.findMenu(orgMenuListO.value, selectedData.value?.menuCode) //발주
  let findPageC = $utils.findMenu(orgMenuListC.value, selectedData.value?.menuCode) //수행
  let findPageP = $utils.findMenu(orgMenuListP.value, selectedData.value?.menuCode) //EZ-Plus
  //발주기관 메뉴 존재 여부
  isEmptyMenuO.value = Object.keys(findPageO).length === 0 ? true : false
  //수행기관 메뉴 존재 여부
  isEmptyMenuC.value = Object.keys(findPageC).length === 0 ? true : false

  isEmptyMenuP.value = Object.keys(findPageP).length === 0 ? true : false
}

//그리드 수정시 반응하도록 수정
const cellValueChanged = (e) => {
  console.log(e)
}

// 유효성 체크 항목
const chkDataList = [
  { field: 'sysDivCd', name: '시스템구분' }, //시스템 구분
  { field: 'menuName', name: '화면명' }, //화면 명
  { field: 'menuDepth', name: '메뉴단계' }, //화면 뎁스
]
const setValidationData = () => {
  if (
    searchParams.value.sysDivCd !== 'EFMO' &&
    searchParams.value.sysDivCd !== 'EFMC' &&
    searchParams.value.sysDivCd !== 'EZP'
  ) {
    chkDataList.push({ field: 'menuScrDev', name: '화면구분(M,S,N)' }) //화면 구분
    chkDataList.push({ field: 'menuCode', name: '메뉴코드' }) //메뉴 코드
    chkDataList.push({ field: 'useStrtDate', name: '시작일자' }) //시작일자
    chkDataList.push({ field: 'useEndDate', name: '종료일자' }) //종료일자
    chkDataList.push({ field: 'useInstDiv', name: '사용기관구분(O,C,A)' }) //사용기관 구분
  }
}

//저장하기
const saveData = async () => {
  setValidationData()
  let isPass = await $agGridUtils.validationChk(agGrid.value, chkDataList)
  if (!isPass) {
    form.value.validate()
  } else {
    saveApi()
  }
}
const deleteData = () => {
  const checkList = agGrid.value.getCheckData()
  if (checkList.length > 0) {
    const removeTarget = checkList.find((item) => item.rowStatus === 'C')
    if (removeTarget) {
      const totalData = agGrid.value.getData()
      const newData = totalData.filter((item) => !(item.chk && item.rowStatus === 'C'))
      agGrid.value.removeData()
      agGrid.value.gridOption.api.applyTransaction({ add: newData })
      agGrid.value.movePosition({ isActionClick: true })
    } else {
      $fx.throwAlert('신규 데이터만 삭제 가능합니다.')
    }
  }
}

const returnChangeDate = (dateStr) => {
  let returnData
  if (typeof dateStr === 'object') {
    returnData = $utils.formatDate(dateStr)
  } else {
    let changeData = dateStr?.replaceAll('.', '')
    returnData = $utils.formatDate(changeData)
  }
  return returnData
}

const replaceNumber = (e) => {
  e.target.value = e.target.value.substring(0, 2)
}

//그리드에 적용시키기
const applyData = () => {
  const selectRowNode = agGrid.value.gridOption.api.getRowNode(nowIndex.value)
  selectRowNode.data.fileCtn = selectedData.value.fileCtn
  selectRowNode.data.filePath = selectedData.value.filePath
  selectRowNode.data.lastChgDt = selectedData.value.lastChgDt
  selectRowNode.data.lastUserId = selectedData.value.lastUserId
  selectRowNode.data.loginYn = selectedData.value.loginYn
  selectRowNode.data.logoCss = selectedData.value.logoCss
  selectRowNode.data.menuCode = selectedData.value.menuCode
  selectRowNode.data.menuCss = selectedData.value.menuCss
  selectRowNode.data.menuDepth = selectedData.value.menuDepth
  selectRowNode.data.menuName = selectedData.value.menuName
  selectRowNode.data.menuScrDev = selectedData.value.menuScrDev
  selectRowNode.data.menuSeq = selectedData.value.menuSeq
  selectRowNode.data.navigator = selectedData.value.navigator
  selectRowNode.data.rgtrDt = selectedData.value.rgtrDt
  selectRowNode.data.rgtrUserId = selectedData.value.rgtrUserId
  selectRowNode.data.scrCtn = selectedData.value.scrCtn
  selectRowNode.data.sysDivCd = selectedData.value.sysDivCd
  selectRowNode.data.upperMenuCode = selectedData.value.upperMenuCode
  selectRowNode.data.useInstDiv = selectedData.value.useInstDiv

  selectRowNode.data.useEndDate = selectedData.value.useEndDate
  selectRowNode.data.useStrtDate = selectedData.value.useStrtDate
  selectRowNode.data.useYn = selectedData.value.useYn
  if (selectRowNode.data.rowStatus !== 'C' && selectRowNode.data.rowStatus !== 'D') {
    selectRowNode.data.rowStatus = 'U'
  }
  if (selectedData.value?.menuCode) {
    findMenu()
  }
  agGrid.value.gridOption.api.refreshCells({ rowNodes: [selectRowNode] })
}

//발주 수행 메뉴 등록/수정
const addOrgMenuSave = () => {
  const updateDataList = agGrid.value.getUpdateList()
  let addOrgMenuList = [] //발주, 수행 메뉴 추가/수정
  updateDataList.map((item) => {
    addOrgMenuList.push(item)
    if (item.rowStatus === 'C' || item.rowStatus === 'U') {
      if (item.menuScrDev === 'M' || item.menuScrDev === 'N') {
        if (
          selectedData.value.updateMenuTypeO ||
          selectedData.value.updateMenuTypeC ||
          selectedData.value.updateMenuTypeP
        ) {
          if (selectedData.value.updateMenuTypeO) {
            //발주
            let saveData = newOrgMenuData(item)
            saveData.sysDivCd = 'EFMO'
            saveData.rowStatus = 'C'
            addOrgMenuList.push(saveData)
          }
          if (selectedData.value.updateMenuTypeC) {
            //수행
            let saveData = newOrgMenuData(item)
            saveData.sysDivCd = 'EFMC'
            saveData.rowStatus = 'C'
            addOrgMenuList.push(saveData)
          }
          if (selectedData.value.updateMenuTypeP) {
            //수행
            let saveData = newOrgMenuData(item)
            saveData.sysDivCd = 'EZP'
            saveData.rowStatus = 'C'
            addOrgMenuList.push(saveData)
          }
        }
      }
    }
  })

  return addOrgMenuList
}
/************************************* API ***************************/
//전체 메뉴 조회
const callApi = () => {
  const params = searchParams.value //파라미터 셋팅
  $fx.startLoadingbar()
  commonApi
    .searchMenuList(params)
    .then((response) => {
      let resultData
      isAdmin.value = false
      $agGridUtils.changeHeaderName(
        agGrid.value.gridOption.api,
        columnDefs,
        'useInstDiv',
        '사용기관구분',
      )
      if (searchParams.value.sysDivCd === 'ADM') {
        resultData = response.result.adm
        isEdit.value = true
        isAdmin.value = true
        $agGridUtils.changeHeaderName(
          agGrid.value.gridOption.api,
          columnDefs,
          'useInstDiv',
          '메뉴권한',
        )
      } else if (searchParams.value.sysDivCd === 'EFM') {
        isEdit.value = true
        resultData = response.result.efm
        const efmoList = response.result.efmo ?? []
        const efmcList = response.result.efmc ?? []
        const efmpList = response.result.efmp ?? []
        orgMenuTotalList.value.push(...resultData)
        orgMenuListO.value.push(...efmoList)
        orgMenuListC.value.push(...efmcList)
        orgMenuListP.value.push(...efmpList)
      } else if (searchParams.value.sysDivCd === 'EFMO') {
        resultData = response.result.efmo
        isEdit.value = false
      } else if (searchParams.value.sysDivCd === 'EFMC') {
        resultData = response.result.efmc
        isEdit.value = false
      } else if (searchParams.value.sysDivCd === 'EZP') {
        resultData = response.result.efmp
        isEdit.value = false
      }
      agGrid.value.addData(resultData)
      if (resultData.length > 0) {
        agGrid.value.movePosition({ isActionClick: true })
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

const newOrgMenuData = (item) => {
  return {
    sysDivCd: '',
    menuSeq: item.menuSeq,
    menuCode: item.menuCode,
    menuName: item.menuName,
    menuDepth: item.menuDepth,
    upperMenuCode: item.upperMenuCode,
    useInstDiv: item.useInstDiv === 'A' ? '' : item.useInstDiv,
    menuScrDev: item.menuScrDev,
    useEndDate: item.useEndDate,
    useStrtDate: item.useStrtDate,
    useYn: item.useYn,
    rowStatus: item.rowStatus,
  }
}

//전체 메뉴 조회
const saveApi = () => {
  const updateDataList = agGrid.value.getUpdateList()
  updateDataList.map((item) => {
    item.useStrtDate = item.useStrtDate?.replaceAll('.', '')
    item.useEndDate = item.useEndDate?.replaceAll('.', '')
  })

  //발주 수행 메뉴 등록/수정
  const addOrgMenu = addOrgMenuSave()
  const params = {
    menuList: addOrgMenu,
  }
  $fx.startLoadingbar()
  menuApi
    .MNU0101U02(params)
    .then((response) => {
      if (response.result.result) {
        $fx.throwAlert('저장이 완료되었습니다.', '알림').then(() => {
          searchData()
        })
      } else {
        $fx
          .throwAlert(
            '메뉴 저장에 실패했습니다.<br>(중복된 데이터가 존재할 경우 오류가 발생할 수 있습니다)',
            '실패',
          )
          .then(() => {
            //searchData()
          })
      }
    })
    .catch((error) => {
      $fx
        .throwAlert(
          '메뉴 저장에 실패했습니다.<br>(중복된 데이터가 존재할 경우 오류가 발생할 수 있습니다)',
          '실패',
        )
        .then(() => {
          //searchData()
        })
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
