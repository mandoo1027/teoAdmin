<template>
  <DocViwer :src="docUrl" width="100%" height="100%"></DocViwer>
</template>

<script setup >
import DocViwer from '@/components/common/doc/DocViewer.vue'
const docUrl = ref('https://static-1252421604.cos.ap-guangzhou.myqcloud.com/vdp.docx')
</script> 