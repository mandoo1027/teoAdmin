<template>
  <!-- popup size width:500 height:300 -->
  <!-- 배치관리. 등록/수정/상세보기 -->
  <div class="popup_body">
    <div class="tit_btn">
      <h3 class="tit">
        <!-- 배치등록 -->
      </h3>
      <div class="d_flex mb_20">
        <v-btn class="vbtn black" size="small" v-if="computedIsShowOperId" @click="searchRset"
          >초기화</v-btn
        >
      </div>
    </div>
    <v-table class="vtable_view th_140 ">
      <tbody>
        <tr v-if="!computedIsShowOperId">
          <th>배치ID</th>
          <td>
            <v-text-field
              label="배치ID"
              v-model="viewParams.operId"
              maxlength="5"
              class="i_basics"
              readonly
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>배치명</th>
          <td>
            <v-text-field
              label="배치명"
              v-model="viewParams.operName"
              id="operName"
              :rules="batchNameRules"
               maxlength="20"
              class="i_basics operName"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>프로그램URL</th>
          <td>
            <v-text-field
              label="프로그램URL"
              v-model="viewParams.programUrl"
              :rules="programRules"
              id="programUrl"
              class="i_basics"
              maxlength="100"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <th>파라미터</th>
          <td>
            <v-text-field
              label="파라미터"
              v-model="viewParams.paramList"
              :rules="parameterRules"
              id="paramList"
              class="i_basics"
               maxlength="100"
            ></v-text-field>
          </td>
        </tr>
        <!-- <tr>
          <th>기업</th>
          <td>
            <ComSelectBox
              v-model="viewParams.instId"
              :items="itemsInstId"
              item-title="title"
              item-value="value"
              :isDefault="true"
              class="s_basics"
            />
          </td>
        </tr> -->
        <tr>
          <th>사용여부</th>
          <td>
            <ComSelectBox
              v-model="viewParams.useYn"
              :items="itemsUseAcc"
              :isDefault="true"
              class="s_basics"
            />
          </td>
        </tr>
        <tr>
          <th>배치설명</th>
          <td><v-textarea v-model="viewParams.operDsc" maxlength="500"></v-textarea></td>
        </tr>

        <!-- <tr v-if="computedIsHidenOperId" > -->
        <tr v-show="none">
          <th>후행처리</th>
          <td>
            <!-- <p>후행처리할 배치를 입력/선택해주세요.</p> -->

            <ComSelectBox
              label="후행처리"
              :items="itemsAfterProcess"
              v-model="viewParams.afterProcess"
              item-title="title"
              item-value="value"
              :rules="afterProcessRules"
              class="s_basics"
              placeholder="후행처리할 배치를 입력/선택해주세요."
              @changeValue="itemsAfterProcessSelected"
            ></ComSelectBox>

            <v-table v-model="selectedList">
              <tr></tr>
            </v-table>
          </td>
        </tr>
        <tr>
          <th>스케줄링 타입</th>
          <td>
            <ComSelectBox
              v-model="viewParams.operType"
              :items="itemsScheduleType"
              :isDefault="true"
              class="s_basics"
            />
          </td>
        </tr>
        <tr>
          <th>담당자</th>
          <td>
            <ComSelectBox
              v-model="viewParams.batchManager"
              :items="itemsPerson"
              item-title="title"
              item-value="value"
              :isDefault="true"
              class="s_basics"
            />
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="btm_btn_wrap">
      <v-btn class="vbtn black" size="small" v-if="computedIsHidenOperId" @click="callUpdate"
        >수정</v-btn
      >
      <v-btn class="vbtn" size="small" v-if="computedIsShowOperId" @click="callSave">등록</v-btn>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { batApi } from '@/api/index.ts'
import ComSelectBox from '@/components/common/ComSelectBox.vue'
import { useDialogStore } from '@/store/dialogStore'
/********************************* 변수 선언 및 정의 *************************/

/* 검색 변수 파라미터  */
const searchParams = ref({
  operId: '', //배치ID
})

const emit = defineEmits()

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  selected: {
    type: String,
    default: '',
  },
  items: {
    type: Object,
    default: null,
  },
  isDefault: {
    type: Boolean,
    default: true,
  },
})

//초기화, 등록 버튼 노출   (신규 등록만)
const computedIsShowOperId = computed(() => props.data === '')

//수정버튼 노출
const computedIsHidenOperId = computed(() => props.data != '')

const bindItems = computed(() => {
  let returnData = []

  if (props.items) {
    returnData = props.items
  } else {
    returnData = searchItems
  }
  const copiedArray = [...returnData]
  if (props.isDefault) {
    copiedArray.unshift({ title: '선택하세요', value: '' })
  }
  return copiedArray
})

/* 검색 변수 파라미터  */
const viewParams = reactive({
  operId: '', //배치ID
  operName: '', //배치명
  programUrl: '', //프로그램URL
  paramList: '', //파라미터
  afterProcess: '', //
  useYn: '', //
  instId: 'ALL', //
  operDsc: '', //
  operType: '', //
  batchManager: '', //
  postBatchYn: '', //
  seqList: [],
})

const batchName = ref('')
const batchNameRules = [
  (v) => !!v || '입력해주세요.',
  (v) => (v && v.length >= 2) || '입력해주세요',
]

const program = ref('')
const programRules = [(v) => !!v || '입력해주세요.', (v) => (v && v.length >= 2) || '입력해주세요']

const parameter = ref('')
const parameterRules = [
  (v) => !!v || '입력해주세요.',
  (v) => (v && v.length >= 2) || '입력해주세요',
]

const itemsInstId = ref([])
const itemsAfterProcess = ref([])
const useAcc = ref('')
const itemsUseAcc = ref([
  { title: 'Y', value: 'Y' },
  { title: 'N', value: 'N' },
])

//후행처리 리스트  나중에..
const selectedList = reactive([])
//후행처리 리스트  나중에..
const itemsAfterProcessSelected = (item) => {
  if (selectedList.length < 5) {
    selectedList.push({
      orperId: item,
      parentId: '',
      instId: '',
      operName: '',
      operSortNo: '',
      programUrl: '',
      paramList: '',
    })
  } else {
    $fx.throwAlert('후행배치는 5개까지 설정 가능합니다').then((result) => {
      return
    })
  }
}

const afterProcess = ref(null)
const afterProcessRules = [
  //(v) => !!v || '후행처리할 배치가 없습니다. 다시 입력해주세요.',
  //(v) => (v && v.length >= 2) || '2자 이상 입력 후 검색하세요.',
]

const itemsScheduleType = ref([
  { title: '매 영업일', value: 'day_oper' },
  { title: '매일', value: 'day_all' },
  { title: '매월 1일', value: 'mon_1d' },
])

const itemsPerson = ref([])

/********************************* methods *************************/
const updateValue = (value) => {
  emit('update:modelValue', value)
  emit('changeValue', value)
}

onBeforeMount(async () => {
  init()

  if (props.data) {
    searchParams.operId = props.data
  }
  await callApi()
})
const init = () => {
  // if (props.isDefault) {
  //   itemsPerson.value.unshift({ title: '선택하세요', value: '' })
  // }
}

const searchRset = () => {
  viewParams.operId = '' //배치ID
  viewParams.operName = '' //배치명
  viewParams.programUrl = '' //프로그램URL
  viewParams.paramList = '' //파라미터
  viewParams.afterProcess = '' //후행처리
  viewParams.useYn = '' //
  viewParams.instId = 'ALL' //
  viewParams.operDsc = '' //
  viewParams.operType = '' //
  viewParams.batchManager = '' //
  viewParams.seqList = [] //
}

/************************************* API ***************************/
const validation = () => {
  if (viewParams.operName === '') {
    operName.focus()
    return false
  }
  if (viewParams.programUrl === '') {
    programUrl.focus()
    programRules
    return false
  }
  if (viewParams.paramList === '') {
    paramList.focus()
    return false
  }

  if (viewParams.instId === '') {
    $fx.throwAlert('기업 선택해주세요').then((result) => {
      return false
    })
  }
  if (viewParams.useYn === '') {
    $fx.throwAlert('사용여부 선택해주세요').then((result) => {
      return false
    })
  }

  if (viewParams.batchManager === '') {
    $fx.throwAlert('담당자 선택해주세요').then((result) => {
      return false
    })
  }

  return true
}

const dialogStore = useDialogStore()
// 저장
const callSave = () => {
  //viewParams.seqList = selectedList  //후행처리 나중에..
  const vresult = validation()
  if (!vresult) {
    return
  }
  const params = viewParams //파라미터 셋팅
  params.instId = 'ALL' //기관

  $fx.startLoadingbar()
  batApi
    .BAT0101I01(params)
    .then((response) => {
      const resultData = response.result.resultCd
      if (resultData === 'Y') {
        $fx.throwAlert('정상 처리되었습니다.').then((result) => {
          //팝업닫기
          dialogStore.popDialogList(true)
          //handleButtonClick(true)
          return
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

// 수정
const callUpdate = () => {
  //viewParams.seqList = selectedList  //후행처리  나중에..

  const vresult = validation()
  if (!vresult) {
    return
  }
  const params = viewParams //파라미터 셋팅

  $fx.startLoadingbar()
  batApi
    .BAT0101U01(params)
    .then((response) => {
      const resultData = response.result.resultCd
      if (resultData === 'Y') {
        $fx.throwAlert('정상 처리되었습니다.').then((result) => {
          //팝업닫기
          dialogStore.popDialogList(true)
          //handleButtonClick(true)
          return
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

// 조회
const callApi = () => {
  searchParams.operId = props?.data

  const params = {
    operId: searchParams.operId,
  }
  $fx.startLoadingbar()
  batApi
    .BAT0101S02(params)
    .then((response) => {
      const resultData = response.result
      const resultInfo = resultData.resultInfo // 배치정보 조회

      //기관
      // itemsInstId.value.push(
      //   ...resultData.instList.map((item) => {
      //     return { value: item.instId, title: item.instNm }
      //   }),
      // )
      // itemsAfterProcess.value.push(
      //   ...resultData.afterOperList.map((item) => {
      //     return { value: item.operId, title: item.operName }
      //   }),
      // )

      itemsPerson.value.push(
        ...resultData.batchMngrList.map((item) => {
          return { value: item.mngId, title: item.mngNm }
        }),
      )
      //후행리스트 나중에..
      // selectedList.push(
      //   ...resultData.selectedItemList.map((item) => {
      //     // return { operId: item.operId, opername: item.opername }
      //     return { operId: item.operId }
      //   }),
      // )

      if (resultInfo) {
        viewParams.operId = resultInfo.operId //배치ID
        viewParams.operName = resultInfo.operName //배치명
        viewParams.programUrl = resultInfo.programUrl //프로그램URL
        viewParams.paramList = resultInfo.paramList //파라미터
        viewParams.useYn = resultInfo.useYn //
        viewParams.instId = resultInfo.instId //
        viewParams.operDsc = resultInfo.operDsc //
        viewParams.operType = resultInfo.operType //
        viewParams.batchManager = resultInfo.batchManager //
        
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
