<template>
  <!-- popup size width:500 height:300 -->
  <div class="popup_body">
    <h2 class="poptit"></h2>

    <ul class="pop_view_list">
      <li>
        <div class="con" v-html="$utils.convertRegexToHtml(dpstCnclResn)"></div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>

<script setup>
/*  파라미터  */
const dpstCnclResn = ref('')

const emits = defineEmits()

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
})

/********************************* 초기화 *************************/
onBeforeMount(async () => {
  dpstCnclResn.value = props.data.dpstCnclResn
})

const init = () => {}
</script>
