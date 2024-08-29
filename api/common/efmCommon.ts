// import axios from '@/utils/common/axios'
type SearchCommonCodeParams = {
  codeGrp: string
  etcCodeOrName: string
  pageNum: string
  pageSize: string
}
type searchMenuListParams = {
  searchType:string
  sysDivCd: string
  type?: string
  menuCode?: string
  menuName?: string
}

/**
 * 파일업로드 추가
 */
type SearchDocListParams = {
  ordrInstId: string // 발주기관ID
  docJobMngNo: string // 문서업무관리번호
  docJobDivCd: string // 문서업무구분
  atchDocNo: string // 첨부문서번호 optional
}

type SearchFileParams = {
  atchDocNo: string // 첨부문서번호
  atchDocSeq: string // 첨부문서순번
}
export const commonApi = {
  /**
   * 공통코드 조회
   * @param groupCode : '0101'
   */
  searchCommonCode(params: SearchCommonCodeParams) {
    return $fx.axios().post('ADM0202S01', params)
  },
  searchMenuList(params: searchMenuListParams) {
    return $fx.axios().post('MNU0101S01', params)
  },

  /**
   * 파일업로드 추가
   */
  searchDocList(params: SearchDocListParams) {
    return $fx.axios().post('DOC0101S01', params)
  },

  searchFileList(params: SearchFileParams) {
    return $fx.axios().post('DOC0101S02', params)
  },

  fileUpload(params: FormData) {
    return $fx.uploadFiles().post('/fileUpload', params)
  },

  viewAsPdf(params: SearchFileParams) {
    return $fx.pdfViewFile().post(`/viewAsPdf/${params.atchDocNo}/${params.atchDocSeq}`)
  },

  viewAsImage(params: SearchFileParams) {
    return $fx.imageViewFile().post(`/viewAsImage/${params.atchDocNo}/${params.atchDocSeq}`)
  },

  fileDownload(params: SearchFileParams) {
    return $fx.fileDownload().post(`/fileDownload/${params.atchDocNo}/${params.atchDocSeq}`)
  },
  rndVal: () => {
    return $fx.axios().post('COM0101S02', {})
  },
}
