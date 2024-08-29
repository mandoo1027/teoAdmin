// 공지사항 목록조회(관리자)
type NOT0102S01Params = {
  ordrInstId: string //발주기관ID
  pstgDate: string //게시일자
  infrmTtl: string //공지사항제목
  viewCount: string //조회수
  viewSeq: string //조회순번
}
// 공지사항 목록조회
type NOT0101S01Params = {
  infrmTtl: string
  viewCount: string
  viewSeq: string
}
// 공지사항 상세조회
type NOT0101S02Params = {
  instId: string
  infrmSeq: string
}
// // 공지사항 신규
type NOT0101I03Params = {
  ordrInstId: string //발주기관ID
  pstgDate: string //게시일자
  infrmTtl: string //공지사항제목
  viewCount: string //조회수
  viewSeq: string //조회순번

  infrmCtn: string // 공지내용
  pstgSeq: string // 게시순번
  pstgStrtDate: string // 게시시작일자
  pstgEndDate: string // 게시종료일자
  popupYn: string // 메인팝업여부
  procFlag: string
  // atchDocNo: string		// 첨부문서번호
  atchDocNo: string // 첨부문서번호
}
// // 공지사항 변경/삭제
type NOT0101U04Params = {
  procFlag: string // 처리구분 (U,D)
  instId: string // 기관ID (관리자에서 등록 시 ADMIN)
  infrmSeq: string // 공지일련번호
  infrmTtl: string // 공지제목(U)
  infrmCtn: string // 공지내용(U)
  pstgSeq: string // 게시순번(U)
  pstgStrtDate: string // 게시시작일자(U)
  pstgEndDate: string // 게시종료일자(U)
  popupYn: string // 메인팝업여부(U)
  atchDocNo: string // 첨부문서번호(U)
}
// // 내쪽지 목록조회
type NOT0201S01Params = {
  sndngRcvrFlag: string // 발신수신구분  S:발신 , R:수신
  startDate: string // 조회시작일자
  endDate: string // 조회종료일자
  infrmCtn: string // 쪽지내용
  infrmJobDivCd: string // 쪽지종류코드  ( 전체:빈값)
  viewCount: string // 조회건수 (default:10)
  viewSeq: string // 조회순번 (default:0)
  sndDivCd: '' //발송구분코드
  memCtn: '' // 회원검색내용
}
// 쪽지보내기
type NOT0201I02Params = {
  infrmJobDivCd: string // 알림업무구분
  infrmCtn: string // 쪽지내용
  rcvrId: [string] // 수신자ID
}
// 내쪽지 상세조회
type NOT0201S03Params = {
  sndngSeq: string // 발신일련번호 : 발신일시(14) + 랜덤(6)
}
// 쪽지 삭제
type NOT0201U04Params = {
  sndngSeqList: {
    sndngSeq: string // 발신일련번호 : 발신일시(14) + 랜덤(6)
  }
}
export const notApi = {
  /**
   * 공지사항 목록조회(관리자)
   * @param NOT0102S01Params
   */
  NOT0102S01(params: NOT0102S01Params) {
    return $fx.axios().post('NOT0102S01', params)
  },
  /**
   * 공지사항 목록조회
   * @param NOT0101S01
   */
  NOT0101S01(params: NOT0101S01Params) {
    return $fx.axios().post('NOT0101S01', params)
  },
  /**
   * 공지사항 상세조회
   * @param NOT0101S02
   */
  NOT0101S02(params: NOT0101S02Params) {
    return $fx.axios().post('NOT0101S02', params)
  },
  /**
   * 공지사항 신규등록
   * @param NOT0101I03
   */
  NOT0101I03(params: NOT0101I03Params) {
    return $fx.axios().post('NOT0101I03', params)
  },
  /**
   * 공지사항 변경/삭제
   * @param NOT0101U04Params
   */
  NOT0101U04(params: NOT0101U04Params) {
    return $fx.axios().post('NOT0101U04', params)
  },
  /**
   * 내쪽지 목록조회
   * @param NOT0201S01Params
   */
  NOT0201S01(params: NOT0201S01Params) {
    return $fx.axios().post('NOT0201S01', params)
  },
  /**
   * 쪽지보내기
   * @param NOT0201I02Params
   */
  NOT0201I02(params: NOT0201I02Params) {
    return $fx.axios().post('NOT0201I02', params)
  },
  /**
   * 내쪽지 상세조회
   * @param NOT0201S03Params
   */
  NOT0201S03(params: NOT0201S03Params) {
    return $fx.axios().post('NOT0201S03', params)
  },
  /**
   * 쪽지 삭제
   * @param NOT0201U04Params
   */
  NOT0201U04(params: NOT0201U04Params) {
    return $fx.axios().post('NOT0201U04', params)
  },
}
