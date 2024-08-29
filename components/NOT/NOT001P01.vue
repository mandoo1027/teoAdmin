<template>
  <!-- popup size width:500 height:490 -->
  <div class="popup_body">
    <!-- <p class="pop_top_txt">
      입력하신 사업자등록번호와 일치하는 사업자등록증 업로드를 완료 하셔야 기관 회원가입이 완료
      됩니다.
    </p> -->
    <div class="bdr_gray mt_20 pl_20 pr_20">
      <ul class="pop_txt_list">
        <li>문서 확장자는 doc, docx, pdf, jpg, tft, png, hwp 로 가능합니다.</li>
        <li>최대 10메가까지 파일 첨부가 가능합니다.</li>
        <li>업로드 된 파일은 2년간 보관됩니다.</li>
      </ul>
    </div>
    <v-file-input
      v-model="files"
      show-size
      :rules="fileRules"
      @change="checkFileSize"
      class="file_upload mt_20"
    />

    <div class="btm_btn_wrap">
      <!-- 화면 확인용 - 팝업 구동시 타이틀 display:none 처리됨 -->
      <v-btn class="vbtn" @click="uploadFiles">확인</v-btn>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { commonApi } from '@/api/index.ts'
import _ from 'lodash'

const emits = defineEmits(['close-dialog'])

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

onMounted(() => {
  initValid() // 필수값 체크
})

const files = ref([])
const allowedExtensions = ['doc', 'docx', 'pdf', 'jpg', 'tft', 'png', 'hwp'] // 허용가능 확장자
const maxSize = 10 * 1024 * 1024 // 10MB
let isValidationSize
let isValidationExtension

const fileRules = [
  (v) => !!v || '업로드된 파일을 다시 확인해주세요.',
  () =>
    (isValidationSize && files.value.every((file) => file.size <= maxSize)) ||
    '최대 10메가까지 파일 첨부가 가능합니다.',
  () =>
    (isValidationExtension &&
      allowedExtensions.includes(files.value[0]?.name.split('.').pop().toLowerCase())) ||
    'doc, docx, pdf, jpg, tft, png, hwp 파일만 업로드 가능합니다.',
]

function checkFileSize() {
  isValidationSize = true
  isValidationExtension = true
  files.value = files.value.filter((file) => file.size <= maxSize)
  if (files.value.length === 0) {
    isValidationSize = false
    return
  }

  files.value = files.value.filter((file) =>
    allowedExtensions.includes(file.name.split('.').pop().toLowerCase()),
  )
  if (files.value.length === 0) {
    isValidationExtension = false
    return
  }
}

function initValid() {
  if (_.isEmpty(props.data.ordrInstId)) {
    emits('close-dialog')
    $fx.throwAlert('[ordrInstId] is Empty!!', '알림')
    return
  }

  if (_.isEmpty(props.data.docJobMngNo)) {
    emits('close-dialog')
    $fx.throwAlert('[docJobMngNo] is Empty!!', '알림')
    return
  }

  if (_.isEmpty(props.data.docJobDivCd)) {
    emits('close-dialog')
    $fx.throwAlert('[docJobDivCd] is Empty!!', '알림')
    return
  }

  return false
}

// 서버업로드
function uploadFiles() {
  const formData = new FormData()

  if (validation()) {
    return
  }

  files.value.forEach((file, index) => {
    formData.append('files', file)
    formData.append('docKndCds', '100') // 문서종류코드
    formData.append('docKndNms', '사업자등록증') // 문서명
    formData.append('ordrInstIds', props.data.ordrInstId) // 발주기관ID
    formData.append('docJobMngNos', props.data.docJobMngNo) // 문서업무관리번호
    formData.append('docJobDivCds', props.data.docJobDivCd) // 문서업무구분
    formData.append('atchDocNos', props.data.atchDocNo) // 첨부문서번호 optional
  })
  $fx.startLoadingbar()
  commonApi
    .fileUpload(formData)
    .then((response) => {
      if (response) {
        const fileData = {
          atchDocNo: response.data.atchDocNo,
          file: files.value,
        }
        emits('close-dialog', fileData)
        $fx.throwAlert('파일업로드에 성공하였습니다.', '알림')
      } else {
        $fx.throwAlert('파일업로드에 실패하였습니다.', '알림')
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      $fx.finishLoadingbar()
    })
}

function validation() {
  if (files.value.length < 1) {
    $fx.throwAlert('파일을 첨부하세요.', '알림')
    return true
  }

  return false
}
</script>
