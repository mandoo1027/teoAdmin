
<template>
  <ClientOnly>
    <Header />
    <Left />
    <slot />
    <Footer />
  </ClientOnly>
</template> 
<script setup>
import Header from '@/layouts/header/Header'
import Left from '@/layouts/left/Left'
import Footer from '@/layouts/footer/Footer'
</script>