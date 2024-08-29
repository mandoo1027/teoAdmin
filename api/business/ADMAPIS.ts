type SearchServiceParams = {
  serviceChnl: string //서비스채널
  serviceCode: string //서비스코드
  serviceName: string //서비스명
  pageNum: string
  pageSize: string
}
type SaveServiceParams = [
  {
    rowStatus: string
    serviceChnl: string //서비스채널
    serviceCode: string //서비스코드
    serviceName: string //서비스명
    needLoginYn: string //로그인여부
    serviceUser: string //서비스권한
  },
]
type SearchMsgParams = {
  msgCd: string
  msgNm: string
  msgKo: string
  pageNum: string
  pageSize: string
}
type SaveMsgParams = [
  {
    rowStatus: string
    msgCd: string
    msgNm: string
    msgKo: string
  },
]

type SearchEaiCodeParams = {
  coreMsgId: string //CORE뱅킹 MSG ID
  coreMsgCn: string //CORE뱅킹 MSG 내용
  msgId: string //메시지ID
  msgCn: string //MSG 내용
  msgCd: string //MSG 구분
  filler01: string
  filler02: string
  filler03: string
  filler04: string
  remark: string //EIA 내용
  pageNum: string
  pageSize: string
}
type SaveEaiCodeParams = [
  {
    rowStatus: string
    coreMsgId: string //CORE뱅킹 MSG ID
    coreMsgCn: string //CORE뱅킹 MSG 내용
    msgId: string //메시지ID
    msgCn: string //MSG 내용
    msgCd: string //MSG 구분
    filler01: string
    filler02: string
    filler03: string
    filler04: string
    remark: string //EIA 내용
  },
]

type SearchErrorParams = {
  errorCd: string
  errorNm: string
  pageNum: string
  pageSize: string
}

type SaveErrorParams = [
  {
    rowStatus: string
    errorCd: string
    errorNm: string
    selftipId: String
  },
]

type SearchErrMoniterParams = {
  errorGbn: string
  frDate: string
  toDate: string
  gid: string
  gidShort: string
  errorCode: string
  sysGbn: string
  pageNum: string
  pageSize: string
}
type SearchLogScMoniterParams = {
  errorGbn: string
  toDate: string
  gid: string
  caller: string
  errorCode: string
  regUser: string
  sysGbn: string
  serviceCode: string
  pageNum: string
  pageSize: string
}
type SearchSessionLogParams = {
  frDt: string
  toDt: string
  gid: string
  sysGbn: string
  univCd: string
  userId: string
  pageNum: string
  pageSize: string
}

type SearchServerMoiterParams = {
  frDt: string
  toDt: string
  gid: string
  sysGbn: string //시스템
  svrGbn: string //서버
  chkGbn: string //점검
}

type SearchFileLogParams = {
  logfilePath: String // 로그파일 경로
  keyword: String // 검색 키워드
}

type saveADM0202I01Params = [
  {
    rowStatus: string
    codeGrp: string
    code: string
    name: string
    code2: string
    name2: string
    code3: string
    name3: string
    code4: string
    name4: string
    code5: string
    codeGrpName: string
    seq: string
    validYn: string
  },
]

type MemoryReloadingParams = {
  contents: String // ADM, WEB
  category: String // 서비스(SERVICE_CONTROL), 에러코드(ERROR_CODE), 공통코드(COMM_CODE), 프로퍼티(PROPERTIES), 전체(ALL), (메뉴목록)MENU_LIST, (EAI메세지맵핑)EAI_MSG_LIST
}

export const admApi = {
  /**
   * 서비스속성관리 조회
   * @param SearchServiceParams : Obejct
   */
  ADM0101S01(params: SearchServiceParams) {
    return $fx.axios().post('ADM0101S01', params)
  },
  /**
   * 서비스코드 등록/삭제/수정
   * @param SaveServiceParams :  Obejct
   */
  ADM0101I01(params: SaveServiceParams) {
    return $fx.axios().post('ADM0101I01', params)
  },
  /**
   * EAI응답코드매핑관리 조회
   * @param SearchEaiCodeParams :  Obejct
   */
  ADM0103S01(params: SearchEaiCodeParams) {
    return $fx.axios().post('ADM0103S01', params)
  },
  /**
   * EAI응답코드매핑관리 등록/삭제/수정
   * @param SaveEaiCodeParams :  Obejct
   */
  ADM0103I01(params: SaveEaiCodeParams) {
    return $fx.axios().post('ADM0103I01', params)
  },

  /**
   * 메시지관리 조회
   * @param SearchMsgParams :  Obejct
   */
  ADM0102S01(params: SearchMsgParams) {
    return $fx.axios().post('ADM0102S01', params)
  },
  /** 메시지 등록/삭제/수정 */
  /**
   * 저장
   * @param SaveMsgParams : Obejct
   */
  ADM0102I01(params: SaveMsgParams) {
    return $fx.axios().post('ADM0102I01', params)
  },
  /**
   * 에러코드관리 조회
   * @param msgCd : ''
   */
  ADM0201S01(params: SearchErrorParams) {
    return $fx.axios().post('ADM0201S01', params)
  },
  /** 에러코드  등록/수정/삭제 */
  /**
   *
   * @param SaveErrorParams : Obejct
   */
  ADM0201I01(params: SaveErrorParams) {
    return $fx.axios().post('ADM0201I01', params)
  },

  /** 공통 코드 */
  /**
   * 저장
   * @param saveADM0202I01Params : Obejct
   */
  ADM0202I01(params: saveADM0202I01Params) {
    return $fx.axios().post('ADM0202I01', params)
  },

  /**
   * 오류모니터링관리 조회
   * @param SearchErrMoniterParams : Obejct
   */
  ADM0302S01(params: SearchErrMoniterParams) {
    return $fx.axios().post('ADM0302S01', params)
  },
  /**
   * 섹션모니터링관리 조회
   * @param SearchSessionLogParams : Obejct
   */
  ADM0303S01(params: SearchSessionLogParams) {
    return $fx.axios().post('ADM0303S01', params)
  },

  /**
   * 서버모니터링 조회
   * @param SearchSessionLogParams : Obejct
   */
  ADM0901S01(params: SearchServerMoiterParams) {
    return $fx.axios().post('ADM0901S01', params)
  },

  /**
   * 파일로그 컨테이너 정보 확인
   * @param SearchSessionLogParams : Obejct
   */
  ADM0304S01(params: SearchFileLogParams) {
    return $fx.axios().post('ADM0304S01', params)
  },

  /**
   * 파일로그 조회
   * @param SearchSessionLogParams : Obejct
   */
  ADM0304S02(params: SearchFileLogParams) {
    return $fx.axios().post('ADM0304S02', params)
  },

  /**
   * 서비스호출이력 모니터링
   * @param SearchLogScMoniterParams : Obejct
   */
  ADM0302S02(params: SearchLogScMoniterParams) {
    return $fx.axios().post('ADM0302S02', params)
  },

  /**
   * 메모리로딩 WEB
   * @param MemoryReloadingParams : Obejct
   */
  ADM0106S01(params: MemoryReloadingParams) {
    return $fx.axios().post('ADM0106S01', params)
  },

  /**
   * 메모리로딩 ADMIN
   * @param MemoryReloadingParams : Obejct
   */
  ADM0106S02(params: MemoryReloadingParams) {
    return $fx.axios().post('ADM0106S02', params)
  },
}
