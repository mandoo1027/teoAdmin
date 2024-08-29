<template>
  <div>
    <loadDynamicUrlPDF v-if="!pdfurl" @onURL="(url) => (pdfurl = url)"> </loadDynamicUrlPDF>

    <div v-else>
      <ClientOnly fallback-tag="span" fallback="Loading Component">
        <pdf-render :url="pdfurl"></pdf-render>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup >
import { ref } from 'vue'
import loadDynamicUrlPDF from '@/components/common/pdf/loadDynamicUrlPDF.vue'
import pdfRender from '@/components/common/pdf/pdfRender.vue'

const pdfurl = ref(
  'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
)
</script>

<style scoped></style>