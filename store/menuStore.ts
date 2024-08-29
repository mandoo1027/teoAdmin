import { defineStore } from 'pinia'

export const menuStore = defineStore('menu', () => {
  const menu = ref({
    header: true,
    left: true,
    footer: true,
    navigator: true,
    menuListO: [], //발주 메뉴
    menuListC: [], //수주 메뉴
    menuListAll: [], //전체 메뉴 메뉴
    mappingMenuList: [], //매핑 메뉴
    curruntPage: {
      children: [],
      fileCtn: '',
      filePath: '',
      lastChgDt: '',
      lastUserId: '',
      loginYn: '',
      logoCss: '',
      menuCode: '',
      menuCss: '',
      menuDepth: '',
      menuScrDev: '',
      menuName: '',
      menuSeq: '',
      navigator: [],
      rgtrDt: '',
      rgtrUserId: '',
      sysDivCd: '',
      upperMenuCode: '',
      useEndDate: '',
      useStrtDate: '',
      useYn: '',
      useInstDiv: '',
      scrCtn: '',
    },
  })
  //현재 페이지정보
  const currentPage = computed(() => menu.value.curruntPage)
  //전체 메뉴
  const mappingMenuList = computed(() => menu.value.mappingMenuList)
  const menuListO = computed(() => menu.value.menuListO)
  const menuListC = computed(() => menu.value.menuListC)
  const menuListAll = computed(() => menu.value.menuListAll) 
  const isShowHeader = computed(() => menu.value.header)
  const isShowLeft = computed(() => menu.value.left)
  const isShowFooter = computed(() => menu.value.footer)
  const isShowNavigator = computed(() => menu.value.navigator)

  const setIsShowLayout = (value: boolean) => {
    menu.value.header = value
    menu.value.left = value
    menu.value.footer = value
    menu.value.navigator = value
  }
  const setIsHeader = (value: boolean) => {
    menu.value.header = value
  }
  const setIsLeft = (value: boolean) => {
    menu.value.left = value
  }
  const setIsFooter = (value: boolean) => {
    menu.value.footer = value
  }
  /* 강제 헤더, 네이게이터 셋팅 */
  const setNavigator = (menuName: string, navigator: Array) => {
    menu.value.curruntPage.menuName = menuName
    menu.value.curruntPage.navigator = navigator
  }

  //네이게이터 활성화/비활성화
  const setIsNavigator = (value: boolean) => {
    menu.value.navigator = value
  }

  //페이지(발주)
  const setMenuListO = (menuList: Array) => {
    menu.value.menuListO = menuList
  }
  //페이지(발주)
  const setMenuListC = (menuList: Array) => {
    menu.value.menuListC = menuList
  }
  //페이지(전체)
  const setMenuListAll = (menuList: Array) => {
    menu.value.menuListAll = menuList
  }
  //전체 매핑 메뉴
  const setMappingMenuList = (menuList: Array) => {
    menu.value.mappingMenuList = menuList
  }

  //현재 페이지 셋팅
  const setCurrentPage = (toPath: string) => {
    const curruntPage = $utils.findMenu(menu.value.mappingMenuList, toPath) || {}
    menu.value.curruntPage = curruntPage
  }

  //페이지 찾기
  const findPage = (toPath: string) => {
    const findPage = $utils.findMenu(menu.value.mappingMenuList, toPath) || {}
    return findPage
  }

  return {
    isShowHeader,
    isShowFooter,
    isShowLeft,
    isShowNavigator,
    currentPage,
    mappingMenuList,
    menuListO,
    menuListC,
    menuListAll,
    setCurrentPage,
    setNavigator,
    setMenuListO,
    setMenuListC,
    setMenuListAll,
    setMappingMenuList,
    setIsShowLayout,
    setIsHeader,
    setIsLeft,
    setIsFooter,
    findPage,
    setIsNavigator,
  }
})
