export default defineNuxtPlugin((nuxtApp) => {
  //input autocomplete
  nuxtApp.hook('vue:error', (error, instance, info) => {
    if (error?.message) {
      console.log('errorStr:::', error)
      if (error?.message?.indexOf('Failed to fetch dynamically imported') > -1) {
        //location.href='/admin/'
        location.reload()
      }
    }
  })
})
