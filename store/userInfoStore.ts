import { defineStore } from 'pinia'

export const userInfoStore = defineStore('userInfo', () => {
  const userInfo = ref({
    sessionKey: '',
    userId: '',
    userName: '',
    redirectUrl: '',
    loginTime: '',
    userData: {
      id: '', // 아이디
      pwd: '', // 비번
      name: '', // 이름
      idno: '', // 골드윙 사번
      ip: '', // 사용아이피
      moblTelno1: '', // 전화번호1
      moblTelno2: '', // 전화번호2
      moblTelno3: '', // 전화번호3
      email: '', // 이메일주소
      useStatCd: '', // 사용상태
      useStrtDate: '', // 가입일자
      useEndDate: '', // 탈퇴일자
      menuAuth: '', // 메뉴권한코드
      deptCd: '', // 부서코드
      deptNm: '', // 부서명
      memo: '', // 메모
      otpSkey: '', // OTP_SKEY
    },
  })

  // 로그인 여부
  //const isLogin = computed(() => !!userInfo.value.sessionKey)
  const isLogin = computed(() => !!userInfo.value.sessionKey)
  //발주기관여부
  const isOrdrInst = computed(() => !!userInfo?.value?.userData?.ordrInstCode)
  //발주 기관 아이디
  const ordrInstCode = computed(() => false)

  //세션 정보
  const sessionKey = computed(() => userInfo?.value?.sessionKey)

  //현재 아이피
  const userIp = computed(() => !!userInfo?.value?.userData?.ip)

  const menuAuth = computed(() => userInfo?.value?.userData?.menuAuth)

  //유저 정보
  const userData = computed(() => userInfo?.value?.userData)

  const setUserData = (userData: any) => {
    const nowDate = $utils.getDate()
    userInfo.value.userData = userData
    userInfo.value.sessionKey = userData.id
    $fx.setLocalStorageItem('sessionKey', userData.id)
  }

  const setSessionKey = (sessionKey: string) => {
    userInfo.value.sessionKey = sessionKey
  }
  const clearSessionKey = () => {
    userInfo.value.sessionKey = ''
    $fx.removeLocalStorageItem('sessionKey')
  }
  const setReDirectUrl = (url: string) => {
    userInfo.value.redirectUrl = url

    $fx.setSessionStorageItem('redirectUrl', url)
  }

  const getRedirectUrl = () => {
    //LoginForm에서 호출: 해당 함수를 호출했다는건 로그인이 되었다는 의미이기때문에 세션 스토리지에서 삭제
    $fx.removeSessionStorageItem('redirectUrl')
    let redirectUrl = userInfo.value.redirectUrl
    return redirectUrl ? redirectUrl : '/'
  }

  //로그아웃시 세션 정보 삭제
  const logout = () => {
    clearSessionKey()
    userInfo.value.redirectUrl = ''
    userInfo.value.userData = {}
    $fx.removeSessionStorageItem('redirectUrl')
    $fx.removeSessionStorageItem('loginTime')
  }

  return {
    sessionKey,
    setSessionKey,
    clearSessionKey,
    setReDirectUrl,
    getRedirectUrl,
    isLogin,
    menuAuth,
    logout,
    setUserData,
    isOrdrInst,
    ordrInstCode,
    userIp,
    userData,
  }
})
