import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { $utils } from '~/composables/common/utils'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const vuetify = createVuetify({
    components,
    directives,
  })
  //뷰티파이 프레임워크 적용
  nuxtApp.vueApp.use(vuetify)

  // utils template 에서 사용가능하도록 전역변수 등록
  nuxtApp.vueApp.config.globalProperties.$utils = $utils

  //라우터 공통에서 쓸 수있도록 셋팅
  const router = useRouter()
  $fx.setRouter(router)
  $fx.setConfig(config)

    //사용법 태그에 v-autocomplete-off  적용해주면됨.
    nuxtApp.vueApp.directive('autocomplete-off', {
      mounted(el) {
        el.getElementsByTagName('input')[0]?.setAttribute('autocomplete', 'new-password')
      },
    })
    //사용법 태그에 v-focus  적용해주면됨.
    nuxtApp.vueApp.directive('focus', {
      mounted(el) {
        setTimeout(()=>{
          el.getElementsByTagName('input')[0]?.focus()
        },300)
      },
    })
  
})
