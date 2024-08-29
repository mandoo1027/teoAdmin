/** global function : gf  */
import { Router } from 'vue-router'

import { loadingStore } from '@/store/loadingStore'
import { userInfoStore } from '@/store/userInfoStore'
import { useDialogStore } from '~/store/dialogStore'
import { menuStore } from '@/store/menuStore'

import { loginApi, commonApi } from '@/api/index'

import _ from 'lodash'

const storeRouter = {
  router: {},
  params: {},
}

const config = {
  apiBase: '',
  server: '',
}

const logoutInfo = {
  cnt: 0,
  inervalNumber: 0,
}

export const $fx = {
  // 환경변수 변수에 값 셋팅
  setConfig: (configData: Object) => {
    config.apiBase = configData.public?.apiBase
    config.server = configData.public?.server
  },
  //서버 타입(LOC,DEV,PRD)
  getConfig: () => {
    return config
  },
  isLocal: () => $fx.getConfig().server === 'LOC' || window.location.host === '192.168.154.108',
  /**
   * 파라미터 가져오기
   * @param isPost POST방식
   * @returns returnValue 결과 오브젝트
   */
  getParams: () => {
    //type : ALL , default : query 먼저 체크 후 params 가져오도록 수정
    const route = useRoute()

    let returnValue = {}
    //store.params에 값이 있을 경우 가져오기
    if (Object.keys(storeRouter.params).length > 0) {
      returnValue = storeRouter.params
    }
    if (Object.keys(route.query).length > 0) {
      returnValue = { ...returnValue, ...route.query }
    }

    if (!returnValue?.z) {
      const page = $fx.homePathPage()
      returnValue.z = page.menuCode
    }

    return returnValue
  },
  setRouter: (router: Router) => {
    storeRouter.router = router
  },
  startLoadingbar: () => {
    loadingStore().startLoadingbar()
  },
  finishLoadingbar: () => {
    loadingStore().finishLoadingbar()
  },
  axios: () => {
    return $useAxios().instance
  },
  /**
   * 파일 업로드 추가
   */
  uploadFiles: () => {
    return $useAxios().uploadInstance
  },
  pdfViewFile: () => {
    return $useAxios().pdfViewInstance
  },
  imageViewFile: () => {
    return $useAxios().imageViewInstance
  },
  fileDownload: () => {
    return $useAxios().fileDownloadInstance
  },
  //로그인 여부
  isLogin: () => userInfoStore().isLogin,
  //발주 기관 여부
  isOrdrInst: () => userInfoStore().isOrdrInst,
  //발주 기관 아이디
  ordrInstCode: () => userInfoStore().ordrInstCode,

  menuAuth:()=>userInfoStore().menuAuth,
  //현재 아이피
  userIp: () => userInfoStore().userIp,

  userData: () => userInfoStore().userData,

  logout: (url: String = '/') => {
    //로그아웃
    userInfoStore().logout()
    useDialogStore().clearDialogs()
    useDialogStore().clearIntervalNumber()
    $fx.move(url)
  },
  homePathPage: () => {
    let url = ''
    if($fx.isLogin()){
      url = 'ASTA001'
    }else{
      url ='AHOM001'
    }
    return { menuCode: url }
  },
  /** 이전 페이지로 이동
   * index : 이동단계(기본 -1)
   */
  historyBack: (index: Number = -1) => {
    storeRouter.router.go(index)
  },
  /**
   * url : 경로 or menuCode
   * params : 파라미터
   * isPost : true(post) , false(get)
   */
  move: (url: string, params?: Object = {}) => {
    let curruntPage
    if (url === '/') {
      curruntPage = $fx.homePathPage()
    } else {
      curruntPage = menuStore().findPage(url)
    }

    let movePath
    if (curruntPage?.menuCode) {
      movePath = curruntPage.menuCode
    } else {
      movePath = url
    }

    let urlData = {
      path: '/idx/',
    }

    storeRouter.params = params

    let copyParams = {}
    copyParams.z = movePath

    urlData.query = copyParams
    if ($fx.getConfig().server === 'LOC') {
      storeRouter.router.push(urlData)
    } else {
      if ('AHOM002' === url) {
        location.href = '/admin/idx/?z=AHOM002'
      } else {
        storeRouter.router.push(urlData)
      }
    }
  },
  setNavigator: (title = '제목없음', navigator = []) => {
    menuStore().setNavigator(title, navigator)
  },
  setReDirectUrl: (menuCode: string) => {
    userInfoStore().setReDirectUrl(menuCode)
  },
  getCommonCodeList: async (groupCode: string, subCode: string) => {
    if (!groupCode) return
    const searchParams = {
      codeGrp: groupCode || '',
      etcCodeOrName: subCode || '',
      pageNum:1,
    }

    const data = await commonApi.searchCommonCode(searchParams).catch((error) => {
      console.log(error)
    })
    return data?.RES_DAT?.result
  },
  getRedirectUrl: () => {
    //로그인 후 이동될 URL
    return userInfoStore().getRedirectUrl()
  },
  setSessionStorageItem: (name: string, data: any) => {
    //세션 스토리지 저장
    sessionStorage.setItem(name, data)
  },
  getSessionStorageItem: (name: string) => {
    //세션 스토리지 가져오기
    return sessionStorage.getItem(name)
  },
  removeSessionStorageItem: (name: string) => {
    //세션 스토리지 삭제
    sessionStorage.removeItem(name)
  },
  setLocalStorageItem: (name: string, data: any) => {
    //세션 스토리지 저장
    localStorage.setItem(name, data)
  },
  getLocalStorageItem: (name: string) => {
    //세션 스토리지 가져오기
    return localStorage.getItem(name)
  },
  removeLocalStorageItem: (name: string) => {
    //세션 스토리지 삭제
    localStorage.removeItem(name)
  },
  saveLoginTime: () => {
    const currentTime = new Date().getTime()
    $fx.setSessionStorageItem('loginTime', currentTime.toString())
  },
  checkLoginTime: () => {
    if (!$fx.isLogin()) return
    const loginTime = $fx.getLoginTime()
    if (loginTime) {
      const currentTime = new Date().getTime()
      const elapsedMinutes = (currentTime - loginTime) / (1000 * 60)
      if (elapsedMinutes >= 10) {
        $fx.logout()
      } else if (elapsedMinutes >= 9 && logoutInfo.cnt === 0) {
        logoutInfo.cnt = 1
        $fx
          .throwConfirm(
            '60초 후 자동 로그아웃 입니다.<br>안전한 사이트 이용을 위해 10분 경과 후 자동으로 접속이 종료됩니다.<br>로그인 시간을 연장하시겠습니까?',
            '알림',
            {
              confirmLabel: '연장',
              closeLabel: '로그아웃',
            },
          )
          .then((result) => {
            if (result) {
              //연장
              loginApi.LOG0101S02()
            } else {
              //로그아웃

              $fx.logout()
            }
          })
      }
    }
  },
  getLoginTime: () => {
    const loginTime = sessionStorage.getItem('loginTime')
    return loginTime ? parseInt(loginTime) : null
  },
  makeDialog: (option: DialogOption): Promise<any> => {
    const deferrer = createDeferred()
    option._id = _.uniqueId('shinhan_dialog')
    option._deferrer = deferrer
    option.returnValue = {}

    useDialogStore().pushDialogList(option)

    return option._deferrer.promise
  },
  throwDialog: (name: string, options: Partial<DialogOption> = {}): Promise<any> => {
    const combinedOptions: DialogOption = {
      name: name,
      closeLabel: '확인',
      isShowTitle: true,
      ...options,
    }
    return $fx.makeDialog(combinedOptions)
  },
  throwAlert: (
    message: string,
    title: string,
    options: Partial<DialogOption> = {},
  ): Promise<any> => {
    if (!options.closeLabel) {
      options.closeLabel = '확인'
    }
    const combinedOptions: DialogOption = {
      name: 'alert',
      data: { message: message },
      dialogClasses: 'small',
      title,
      ...options,
    }
    return $fx.makeDialog(combinedOptions)
  },
  throwConfirm: (
    message: string,
    title: string,
    options: Partial<DialogOption> = {},
  ): Promise<any> => {
    const combinedOptions: DialogOption = {
      name: 'alert',
      data: { message: message },
      title,
      confirm: true,
      dialogClasses: 'small',
      isShowTitle: false,
      ...options,
    }
    return $fx.makeDialog(combinedOptions)
  },
}

function createDeferred() {
  let _resolve, _reject
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  return {
    promise,
    resolve: _resolve,
    reject: _reject,
  }
}
