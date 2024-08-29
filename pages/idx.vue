<template>
  <template v-if="componentComputed">
    <component :is="componentComputed"></component>
  </template>
  <!-- <div v-else>loading...</div> -->

  <!-- <component :is="componentNm" @></component> -->
</template>

<script setup>
import { menuStore } from '@/store/menuStore'

const isComponentLoaded = ref(false)
const params = computed(() => $fx.getParams().z)

const componentNm = ref('')
const firstCount = 0
const componentComputed = computed(() => {
  try {
    return resolveComponent(componentNm.value)
  } catch (error) {
    location.reload()
  }
})
watch(
  params,
  (menuCode) => {
    if (menuCode) {
      isComponentLoaded.value = false
      let currentPage = menuStore().findPage(menuCode)
      if (!currentPage) {
        location.href = '/error.html'
      } else {
        componentNm.value = currentPage?.filePath?.replaceAll('/', '') ?? menuCode
      }
    }
  },
  { immediate: true },
)
</script>