<template>
  <div>
    <!-- 팝업 레이어 -->
    <div class="layer_popup">
      <div class="popup_wrap" :class="dialogClasses">
        <div class="popup_title">
          <template v-if="title && isShowTitle">
            {{ title }}
          </template>
          <v-btn @click="handleButtonClick(false)" class="popup_close_btn"></v-btn>
        </div>
        <div class="popup_content">
          <component
            :is="props.name"
            :data="data"
            @close-dialog="handleCloseButtonClickFromChild"
          />
          <div class="popup_body" v-if="data.message">
            <div class="pop_top_txt t_center" :class="iconCss" v-html="data.message"></div>
          </div>
        </div>
        <div class="popup_func_btn" v-if="confirm || close">
          <template v-if="confirm">
            <v-btn @click="handleButtonClick(false)" class="vbtn blue" v-if="close">{{
              closeLabel
            }}</v-btn>
            <v-btn @click="handleButtonClick(true)" id="confirmBtn" class="vbtn" v-if="confirm">{{
              confirmLabel
            }}</v-btn>
          </template>
          <template v-else>
            <v-btn @click="handleButtonClick(true)" id="closeBtn" class="vbtn" v-if="close">{{
              closeLabel
            }}</v-btn>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, watch } from 'vue'
import { useDialogStore } from '@/store/dialogStore'

const dialogStore = useDialogStore()
const dynamicComponent = shallowRef(null)

const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  close: {
    type: Boolean,
    default: true,
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  closeLabel: {
    type: String,
    default: '취소',
  },
  confirmLabel: {
    type: String,
    default: '확인',
  },
  // 다이알로그 UI 옵션
  dialogClasses: {
    type: String,
    default: 'medium',
  },
  title: {
    type: String,
    default: null,
  },
  isShowTitle: {
    //팝업창 여부
    type: Boolean,
    default: false,
  },
})

// watch(
//   () => props.name,
//   async (newName) => {
//     try {
//       if (newName !== 'alert') {
//         const path = `./../${newName}.vue`
//         const loadedComponent = await import(/* @vite-ignore */ path)
//         dynamicComponent.value = loadedComponent.default
//       }
//     } catch (error) {
//       console.error(`Failed to load component: ${newName}`)
//     }
//   },
//   { immediate: true },
// )

onMounted(() => {
  if (props.confirm) {
    document.getElementById('confirmBtn').focus()
  } else if (props.close) {
    document.getElementById('closeBtn').focus()
  }
})
const iconCss = computed(() => {
  if (props.title === '확인') {
    return 'ico_complete'
  } else if (props.title === '경고') {
    return 'ico_warning'
  } else if (props.title === '알림') {
    return 'ico_caution'
  } else {
    return 'ico_caution'
  }
})

function handleCloseButtonClickFromChild(returnData) {
  // 긍정 : true, 부정 : false
  handleButtonClick(returnData)
}

const handleButtonClick = (returnData) => {
  dialogStore.popDialogList(returnData)
}
</script>

<style scoped>
.layer-popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6); /* 반투명한 검은색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소 위에 나타나게 함 */
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  position: relative;
}

.pill {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 아이템 간 간격 */
}

.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}

.close-btn {
  position: relative;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.close-btn:hover {
  color: red;
}
</style>
