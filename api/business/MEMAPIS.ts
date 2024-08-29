// 발주기관 일반회원(승인자) 가입
type MEM0202I05Params = {
  instId: string
  member: {
    memId: string
    memDivCd: string
    nltyDivCd: string
    memNm: string
    memPw: string
    memBrth: string
    memSeCd: string
    ntcnChnlDivCd: string
    memCertDivCd: string
    email: string
    moblTelno1: string
    moblTelno2: string
    moblTelno3: string
  }
}

// 발주기관 일반 회원목록
type MEM0202S01Params = {
  instId: string // 기관아이디
  memId: string // 회원아이디
  instNm: string // 기관명
  memNm: string // 회원명
  memJoinStatCd: string // 회원가입상태
}

// 기관 검색
type MEM0201S03Params = {
  instBrno?: string
  instNm?: string
  instDivCd?: string
  chkDuplication?: string
  instFlag?: string
}

// 발주기관 & 책임자 가입
type MEM0201I01Params = {
  instMember: {
    instId: string // 기관ID
    instNm: string // 기관명
    instDivCd: string // 기업구분
    instJoinDate: string // 회원가입일자
    instCnclDate: string // 회원탈퇴일자
    instEmailDomain: string // 회사이메일주소
    // instCertDivCd: string // 회원인증방법
  }
  bizReg: {
    instBrno: string // 사업자등록번호
    instBrnoNm: string // 사업자명
    rprsvNm?: string // 대표자명
    bplcAddr?: string // 사업장주소
  }
  member: {
    instId: string
    memId: string // 아이디
    memDivCd: string // 회원구분
    nltyDivCd: string // 내국인 구분
    memNm: string // 책임자성명
    memPw: string // 패스워드
    memBrth: string // 생일
    memSeCd: string // 성별
    ntcnChnlDivCd: string // 내외국인
    instDtyCd: string // 소속기관직무
    email?: string // 이메일 관련
    moblTelno1: string // 핸드폰관련
    moblTelno2: string // 핸드폰관련
    moblTelno3: string // 핸드폰관련
  }
  ordrInst: {
    instId: string // 발주기관ID : 발주기관코드(4)+"00"
    ordrInstCode: string // 발주기관코드
    ordrInstNm: string // 발주기관명

    shbJoinDate: string // 은행협약시작일자
    shbCnclDate: string // 은행협약종료일자
    shbCovStatCd: string // 은행협약상태
    shbCovFnct: string // 발주기관협약기능 : SHB_COV_FNCT_CD 코드 조합

    covBCode: string // 계좌이체: 펌 서비스 업무코드
    covCCode: string // 계정이체: EZ+업무코드

    conectUrl?: string // 접속URL
    logoCss?: string // 기관로고CSS
    ordrInstCss?: string // 기관정보CSS
    remark?: string // 비고
  }
}

// 아이디 중복 조회 (기관, 일반 같이씀)
type MEM0201S02Params = {
  instId: string // 기관아이디
  memId: string // 책임자아이디
}

// 발주기관코드 중복조회
type MEM0201S01Params = {
  ordrInstCode: string // 발주기관 코드
}

// 기관 회원상세
type MEM0202S02Params = {
  memId: string
}

// 기관 회원목록
type MEM0202S03Params = {
  instOrdrDivInfo: string // 기관구분
  instJoinStatCd: string // 기관회원가입상태
  instNm: string // 기관명
  instBrno: string // 사업자등록번호
  viewSeq: string // 사업자등록번호
  viewCount: string // 사업자등록번호
  selectedOrg: string
}

// 기관정보수정
type MEM0202U04Params = {
  ordrInstCode: string // 발주기관코드
  instId: string // 발주기관 아이디
  instBrno: string // 사업자등록번호
  conectUrl: string // 기관접속URL
  instDivCd: string // 기업구분
  instNm: string // 기관명
  instBrnoNm: string // 사업자명
  rprsvNm: string // 대표자명
  bplcAddr: string // 사업장주소
  shbCovFnct: string // 발주기관 협약기능
  instEmailDomain: string // 회사이메일용 도메인
  covBCode: string // 계좌이체
  covCCode: string // 계정이체
  instJoinDate: string // 가입시작일
  instCnclDate: string // 종료일
  ordrInstCss: string // 스킨css
  logoCss: string // 로고css
  remark: string // 비고
}

// 일반 회원 정보수정
type MEM0202U05Params = {
  type: string
  memId: string
  instNm: string // 기관명
  instDivCd: string // 소속기관직무
  memSeCd: string // 회원구분
  memNm: string // 성명
  nltyDivCd: string // 내외국인
  memBrth: string // 생일
  ntcnChnlDivCd?: string // 안내채널
  moblTelno1?: string // 핸드폰번호1
  moblTelno2?: string // 핸드폰번호2
  moblTelno3?: string // 핸드폰번호3
  email?: string // 이메일
  memCnclResn: string // 회원탈퇴사유
}

// 오류횟수초기화
type MEM0202U07Params = {
  memId: string
}

// 책임자 변경
type MEM0202U06Params = {
  instId: string // 기관ID
  memId: string // 변경후 책임자
  radioAuthority: string // 권한변경
  rbprsnChgResn?: string // 책임자변경사유
  managerCancelYn?: string // 책임자탈퇴여부
}

// 사업자 등록증 변경이력
type MEM0202S08Params = {
  instId: string
}

// 회원정보 변경이력
type MEM0202S09Params = {
  memId: string
}

export const memApi = {
  /**
   * 기관 검색팝업창
   *
   */
  MEM0201S03(params: MEM0201S03Params) {
    return $fx.axios().post('MEM0201S03', params)
  },
  /**
   * 일반 회원가입
   */
  MEM0202I05(params: MEM0202I05Params) {
    return $fx.axios().post('MEM0202I05', params)
  },
  /**
   * 발주기관 회원가입
   */
  MEM0201I01(params: MEM0201I01Params) {
    return $fx.axios().post('MEM0201I01', params)
  },
  /**
   * 아이디 중복 조회
   *
   */
  MEM0201S02(params: MEM0201S02Params) {
    return $fx.axios().post('MEM0201S02', params)
  },
  /**
   * 발주기관 코드 중복 조회
   *
   */
  MEM0201S01(params: MEM0201S01Params) {
    return $fx.axios().post('MEM0201S01', params)
  },
  /**
   * 일반 회원목록
   *
   */
  MEM0202S01(params: MEM0202S01Params) {
    return $fx.axios().post('MEM0202S01', params)
  },
  /**
   * 기관 회원목록
   *
   */
  MEM0202S03(params: MEM0202S03Params) {
    return $fx.axios().post('MEM0202S03', params)
  },
  /**
   * 기관 상세정보
   *
   */
  MEM0202S02(params: MEM0202S02Params) {
    return $fx.axios().post('MEM0202S02', params)
  },
  /**
   * 기관정보 수정
   *
   */
  MEM0202U04(params: MEM0202U04Params) {
    return $fx.axios().post('MEM0202U04', params)
  },
  /*
   * 일반회원정보 수정
   */
  MEM0202U05(params: MEM0202U05Params) {
    return $fx.axios().post('MEM0202U05', params)
  },
  /*
   * 오류횟수초기화
   */
  MEM0202U07(params: MEM0202U07Params) {
    return $fx.axios().post('MEM0202U07', params)
  },
  /*
   * 책임자 변경
   */
  MEM0202U06(params: MEM0202U06Params) {
    return $fx.axios().post('MEM0202U06', params)
  },
  /**
   * 사업자등록증 변경이력
   */
  MEM0202S08(params: MEM0202S08Params) {
    return $fx.axios().post('MEM0202S08', params)
  },
  /**
   * 회원정보 변경이력
   */
  MEM0202S09(params: MEM0202S09Params) {
    return $fx.axios().post('MEM0202S09', params)
  },
}
