<template>
  <Left v-if="isShowLeft" />
  <!-- <Header v-if="isShowHeader" /> -->
  <div class="container" :class="isLogin ? '' : 'login'">
    <div class="content">
      <Navigator v-if="isShowNavigator" />
      <slot />
    </div>
  </div>

  <div v-for="dialog in dialogList" :key="dialog._id">
    <LayerPopup v-bind="dialog" />
  </div>
</template>
<script setup>
import Header from '@/layouts/header/Header'
import Left from '@/layouts/left/Left'
import Footer from '@/layouts/footer/Footer'
import Navigator from '@/layouts/header/Navigator'
import { menuStore } from '@/store/menuStore'
import { useDialogStore } from '~/store/dialogStore'
import LayerPopup from '@/components/common/LayerPopup'
const isShowHeader = computed(() => menuStore().isShowHeader)
const isShowFooter = computed(() => menuStore().isShowFooter)
const isShowLeft = computed(() => menuStore().isShowLeft)
const isShowNavigator = computed(() => menuStore().isShowNavigator)
const dialogList = computed(() => useDialogStore().getDialogList())
const isLogin = computed(() => $fx.isLogin())
</script>
