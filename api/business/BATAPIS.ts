type SearchBatParams = {
  operId: string //배치ID
  operName: string //배치명
  programUrl: string //프로그램URL
  paramList: string
  useYn: string //사용여부
  postYn: string
  execResult: string
  execSeq: string
  stdt: string
  eddt: string
  jobExecutionId: string
  jobInstanceId: string
  pageNum: string
  pageSize: string
}

type operIdParams = [
  {
    operId: string //배치ID
  },
]

type saveBatParams = {
  operId: string
  operName: string
  operDsc: string
  programUrl: string
  paramList: string
  instId: string
  useYn: string
  postBatchYn: string
  batchManager: string
  holiYn: string
  operType: string
  seqList: [
    {
      orperId: string
      parentId: string
      instId: string
      operName: string
      operSortNo: string
      programUrl: string
      paramList: string
    },
  ]
}

export const batApi = {
  /**
   * 배치관리 조회
   * @param SearchBatParams : Obejct
   */
  BAT0101S01(params: SearchBatParams) {
    return $fx.axios().post('BAT0101S01', params)
  },
  /**
   * 배치관리 등록
   * @param saveBatParams : Obejct
   */
  BAT0101I01(params: saveBatParams) {
    return $fx.axios().post('BAT0101I01', params)
  },

  /**
   * 배치관리 수정
   * @param saveBatParams : Obejct
   */
  BAT0101U01(params: saveBatParams) {
    return $fx.axios().post('BAT0101U01', params)
  },
  /**
   * 배치관리 삭제
   * @param operIdParams : Obejct
   */
  BAT0101D01(params: operIdParams) {
    return $fx.axios().post('BAT0101D01', params)
  },
  /**
   * 배치관리 실행
   * @param SearchBatParams : Obejct
   */
  BAT0101I02(params: SearchBatParams) {
    return $fx.axios().post('BAT0101I02', params)
  },

  /**
   * 배치관리 상세조회
   * @param SearchBatParams :  Obejct
   */
  BAT0101S02(params: SearchBatParams) {
    return $fx.axios().post('BAT0101S02', params)
  },

  /**
   * 작업이력 조회
   * @param SearchBatParams :  Obejct
   */
  BAT0301S01(params: SearchBatParams) {
    return $fx.axios().post('BAT0301S01', params)
  },
  /**
   *  작업이력 상세조회
   * @param SearchBatParams :  Obejct
   */
  BAT0301S02(params: SearchBatParams) {
    return $fx.axios().post('BAT0301S02', params)
  },
  /**
   *  작업이력 배치정보 재실행
   * @param SearchBatParams :  Obejct
   */
  BAT0301S03(params: SearchBatParams) {
    return $fx.axios().post('BAT0301S03', params)
  },

  /**
   * 실행배치조회
   * @param SearchBatParams :  Obejct
   */
  BAT0401S01(params: SearchBatParams) {
    return $fx.axios().post('BAT0401S01', params)
  },
  /**
   * 배치 정지
   * @param SearchBatParams :  Obejct
   */
  BAT0401S02(params: SearchBatParams) {
    return $fx.axios().post('BAT0401S02', params)
  },
}
