<template>
  <CommonComSpinner v-if="isLoading" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
import { menuStore, loadingStore } from '@/store'
const isLoading = computed(() => loadingStore()?.isLoading)
</script>
