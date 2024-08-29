<template>
  <div class="popup_body">
    <v-form ref="form">
      <v-combobox
        label="기관명을 입력해주세요."
        :items="orgList"
        v-model="userOrgSearch"
        :rules="nameOrgSearchRules"
        @input="changeData"
        v-focus
        class="v_combo mt_20"
        placeholder="기관명 또는 사업자번호를 2자 이상 입력해주세요."
      ></v-combobox>
    </v-form>

    <div class="btm_btn_wrap">
      <v-btn class="vbtn" @click="choiceOrgan">선택</v-btn>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { memApi } from '@/api/index.ts'
const emits = defineEmits(['close-dialog'])
/* 라디오 */
const selectedOrg = ref('A')

const form = ref(null)

const radioOrg = [
  { label: '기관명', value: 'A' },
  { label: '사업자번호', value: 'B' },
]
let searchOrgList = reactive([])
let orgList = ref([])
const userOrgSearch = ref(null)
const nameOrgSearchRules = [
  (v) => {
    return !!v || '조회된 기관이 없습니다. 다시 입력해주세요.'
  },
  (v) => {
    // console.log(!isEmpty.value)
    return !isEmpty.value || '조회된 기관이 없습니다. 다시 입력해주세요'
  },
]

const isEmpty = computed(
  () => userOrgSearch.value.length > 1 && orgList.value.length === 0 && searchOrgList.length > 0,
)

const props = defineProps({
  data: {
    type: Object,
    default: {
      instFlag: '',
    },
  },
})

const choiceOrgan = () => {
  if (!userOrgSearch.value) {
    $fx.throwAlert('기관이 선택되지 않았습니다.')
    return
  } else if (!userOrgSearch.value?.instId) {
    $fx.throwAlert('기관이 선택되지 않았습니다.')
    return
  }
  //선택 버튼 클릭
  emits('close-dialog', userOrgSearch)
}
/********************************* INIT ****************************/
onMounted(() => {
  callApi()
})

/********************************* METHODS *************************/

const changeData = () => {
  $utils.validate(form)

  //2글자 이상인 경우에 검색
  if (userOrgSearch.value && userOrgSearch.value.length >= 2) {
    var search = new RegExp(userOrgSearch.value, 'i')

    orgList.value = searchOrgList.filter((item) => search.test(item.title))
  } else {
    orgList.value = []
  }
}

const moveSignup = () => {
  emits('close-dialog')
  $fx.move('MMEM003')
}

/*********************************** API ***************************/
// 기관검색
const callApi = () => {
  let instBrno = ''
  let instNm = ''
  if (selectedOrg.value === 'A') {
    instNm = userOrgSearch.value
  } else {
    instBrno = userOrgSearch.value
  }
  const params = {
    instBrno,
    instNm,
    instDivCd: '',
    instFlag: props.data.instFlag,
  }
  $fx.startLoadingbar()
  memApi
    .MEM0201S03(params)
    .then((response) => {
      // console.log(response)
      searchOrgList = response.result.result.map((item) => {
        return {
          ...item,
          title: `[${item.instBrno}] ${item.instNm}`,
          value: item.instId,
        }
      })
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}
</script>
