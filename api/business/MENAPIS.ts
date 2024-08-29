// 로그인
type MNU0101U02Params = {
  type: string // 업데이트타입
  sysDivCd: string // 시스템구분 : ADM, EFM, EFMO, EFMC
  menuCode: string // 메뉴코드 : M + 업무구분(3) + 순번(3)
  menuName: string // 메뉴_화면명
  menuDepth: string // 메뉴단계
  menuSeq: string // 메뉴노출순서 : 메뉴 depth 내 순서
  menuScrDev: string // 메뉴화면구분 : M 메뉴  S 화면, N 네비게이터
  upperMenuCode: string // 상위메뉴코드
  loginYn: string // 로그인여부
  filePath: string // 화면경로 : /COM/COM002M00
  useInstDiv: string // 사용기관구분 : O 발주, C 수행, A 전체
  menuCss: string // 메뉴CSS
  logoCss: string // 발주기관로고CSS
  useYn: string // 사용여부
  scrCtn: string // 화면설명
}

// 전자서명 목록 조회
type MEN0401S01Params = {
  certJobDivCd: string // 인증서업무구분
  certInstId: string // 서명기관ID
  certMemId: string // 서명회원ID
  certDate: string // 서명일자
  viewSeq: string
  viewCount: string
}

// 전자서명 상세
type MEN0401S02Params = {
  certDocSeq: string
}

// 이체거래내역 목록 조회
type MEN0501S01Params = {
  implMngNo: string
  dpstAcntNo: string
  acntTrsSeq: string
}

// 이체거래내역 상세
type MEN0501S02Params = {
  trsDate: string //이체일자
  implMngNo: string //집행관리번호
  acntTrsAmt: string //이체금액
  viewSeq: string
  viewCount: string
}

//이용현황 목록 조회
type MEN0601S01Params = {
}

//가상계좌 발급 요청 등록
type MEN0601I01Params = {
  ordrInstId: string	// 수신기관ID
  memId: string			// 수신자ID
  memNm: string			// 책임자이름
  moblTelno: string		// 핸드폰번호
  vraNoCnt: string		// 가상계좌잔여개수
}

//회계년도별현황 목록 조회
type MEN0701S01Params = {
  bizFyr: string
  bizStatCd: string
}

export const menuApi = {
  /**
   * 메뉴 등록/수정
   * @param MNU0101U02Params
   */
  MNU0101U02(params: MNU0101U02Params) {
    return $fx.axios().post('MNU0101U02', params)
  },

  /**
   * 전자서명 목록 조회
   * @param MEN0401S01Params
   */
  MEN0401S01(params: MEN0401S01Params) {
    return $fx.axios().post('MEN0401S01', params)
  },

  /**
   * 전자서명 상세 조회
   * @param MEN0401S02Params
   */
  MEN0401S02(params: MEN0401S02Params) {
    return $fx.axios().post('MEN0401S02', params)
  },
  /**
   * 이체거래내역 목록 조회
   * @param MEN0501S01Params
   */
  MEN0501S01(params: MEN0501S01Params) {
    return $fx.axios().post('MEN0501S01', params)
  },

  /**
   * 이체거래내역 상세 조회
   * @param MEN0501S02Params
   */
  MEN0501S02(params: MEN0501S02Params) {
    return $fx.axios().post('MEN0501S02', params)
  },

  /**
   * 회계년도별현황 목록 조회
   * @param MEN0601S01Params
   */
  MEN0601S01(params: MEN0601S01Params) {
    return $fx.axios().post('MEN0601S01', params)
  },

  /**
   * 가상계좌 발급 요청 등록
   * @param MEN0601I01Params
   */
  MEN0601I01(params: MEN0601I01Params) {
    return $fx.axios().post('MEN0601I01', params)
  },

  /**
   * 회계년도별현황 목록 조회
   * @param MEN0701S01Params
   */
  MEN0701S01(params: MEN0701S01Params) {
    return $fx.axios().post('MEN0701S01', params)
  },
}