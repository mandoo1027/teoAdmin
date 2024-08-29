/**
 * AG-GRID COMMON UTILS
 *
 * @author kkaok, kkaok.pe.kr@gmail.com
 */

/**
 * Date Picker 사용법
 * 1. 칼럼 정의 시 editable : true, cellEditor : 'datePicker' 추가
 * 2. 칼럼옵션에 컴포넌트 추가
 * gridOpt.components = {
 *  datePicker: getDatePicker('yy-mm-dd') // date format 지정시 포맷 전달
 *  datePicker: getDatePicker()  // 기본은 yymmdd 8자리로 됨
 * };
 */

/** 셀 무브 렌더러 */
class moveCellRenderer {
  eGui

  init(params) {
    this.eGui = document.createElement('div')
    this.eGui.innerHTML = `<div>화살표</div>`
    var rowDragger = document.createElement('i')
    rowDragger.classList.add('fas', 'fa-arrows-alt-v')
    this.eGui.appendChild(rowDragger)
    params.registerRowDragger(rowDragger, 0)
  }

  getGui() {
    return this.eGui
  }
  refresh(params) {
    return false
  }
}

class CheckboxCellererer {
  constructor(callbackFunction) {
    this.callbackFunction = callbackFunction
  }
  eGui
  init(params) {
    this.eGui = document.createElement('input')
    this.eGui.type = 'checkbox'
    this.eGui.addEventListener('change', (e) => {
      params.change(params, e.target.checked)
    })
  }
  getGui() {
    return this.eGui
  }
}

export const $agGridUtils = {
  changeChkData: {
    change: (gridOption, isCheck) => {
      const resultData = gridOption.api.getModel().rowsToDisplay.map((node) => node.data)
      const setData = resultData.map((item) => {
        item.chk = isCheck
        return item
      })
      gridOption.api?.setRowData([])
      gridOption.api?.applyTransaction({ add: setData })
    },
  },
  getDatePicker(paramFmt) {
    var _this = this
    _this.fmt = 'yymmdd'
    if (paramFmt) {
      _this.fmt = paramFmt
    }
    // function to act as a class
    function Datepicker() {}

    // gets called once before the renderer is used
    Datepicker.prototype.init = function (params) {
      // create the cell
      this.eInput = document.createElement('input')
      this.eInput.value = params.value

      // https://jqueryui.com/datepicker/
      $(this.eInput).datepicker({
        dateFormat: _this.fmt,
      })
    }

    // gets called once when grid ready to insert the element
    Datepicker.prototype.getGui = function () {
      return this.eInput
    }

    // focus and select can be done after the gui is attached
    Datepicker.prototype.afterGuiAttached = function () {
      this.eInput.focus()
      this.eInput.select()
    }

    // returns the new value after editing
    Datepicker.prototype.getValue = function () {
      return this.eInput.value
    }

    // any cleanup we need to be done here
    Datepicker.prototype.destroy = function () {
      // but this example is simple, no cleanup, we could
      // even leave this method out as it's optional
    }

    // if true, then this editor will appear in a popup
    Datepicker.prototype.isPopup = function () {
      // and we could leave this method out also, false is the default
      return false
    }

    return Datepicker
  },
  /**
   * 공통 그리드 util
   */
  CommonGrid: {
    defaultBlank: ' - ',
    // csv 파일 export
    onBtExport: function (title, gridOpts) {
      var params = {
        skipHeader: false,
        skipFooters: false,
        columnGroups: true,
        skipGroups: false,
        skipPinnedTop: false,
        skipPinnedBottom: false,
        allColumns: true,
        onlySelected: false,
        fileName: title + moment().format('YYYYMMDDHHmmss') + '.csv',
      }
      gridOpts.api.exportDataAsCsv(params)
    },
    // 칼럼정의 값으로 기본 grid option을 생성한다.
    getDefaultGridOpt: function (pColumnDefs) {
      return this.getDefaultGridOptResize(pColumnDefs, true)
    },
    // 칼럼정의 값으로 기본 grid option을 생성한다. 리사이즈 안함.
    getDefaultGridOptNoResize: function (pColumnDefs) {
      return this.getDefaultGridOptResize(pColumnDefs, false)
    },
    // 칼럼정의 값으로 기본 grid option을 생성한다.
    getDefaultGridOptResize: function (pColumnDefs, autosize) {
      return {
        columnDefs: pColumnDefs,
        rowSelection: 'single' /* 'single' or 'multiple',*/,
        enableColResize: true,
        enableSorting: true,
        enableFilter: true,
        enableRangeSelection: true,
        suppressRowClickSelection: false,
        animateRows: true,
        suppressHorizontalScroll: false,
        localeText: { noRowsToShow: '조회 결과가 없습니다.' },
        getRowStyle: function (param) {
          if (param.node.rowPinned) {
            return { 'font-weight': 'bold', background: '#dddddd' }
          }
          return { 'text-align': 'center' }
        },
        getRowHeight: function (param) {
          if (param.node.rowPinned) {
            return 30
          }
          return 30
        },
        // 리사이즈
        onGridReady: function (params) {
          params.api.sizeColumnsToFit()
        },
        // 창 크기 변경 되었을 때 이벤트
        onGridSizeChanged: function (params) {
          params.api.sizeColumnsToFit()
        },
        debug: false,
      }
    },
    // 그리드 값 넣기
    makeGridCommon: function (gridDiv, pGridOpts, rowData) {
      $('#' + gridDiv)
        .children()
        .remove()
      var eGridDiv = document.querySelector('#' + gridDiv)
      new agGrid.Grid(eGridDiv, pGridOpts)
      pGridOpts.api.setRowData(rowData)
    },
    convertTime: function (param) {
      if (!param.value) {
        return this.defaultBlank
      } else {
        return moment(param.value, 'YYYYMMDDHHmmss').format('HH:mm')
      }
    },
    convertDate: function (param) {
      // 8자리 문자열을 날짜로 변환
      if (!param.value) {
        return this.defaultBlank
      } else {
        if (param.value.length == 8) {
          return moment(param.value, 'YYYYMMDD').format('YYYY-MM-DD')
        } else {
          return param.value
        }
      }
    },
    convertTimestamp: function (param) {
      // 8자리 문자열을 날짜로 변환
      if (!param.value) {
        return this.defaultBlank
      } else {
        return moment(param.value, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
      }
    },
    formatDate: function (param) {
      // long 값을 날짜로 변환
      if (!param.value) {
        return this.defaultBlank
      } else {
        return moment(parseInt(param.value)).format('YYYY-MM-DD')
      }
    },
    formatTimestamp: function (param) {
      // long 값을 날짜로 변환
      if (!param.value) {
        return this.defaultBlank
      } else {
        return moment(parseInt(param.value)).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    numberOnly: function (param) {
      if (!param.value || param.value == '') return ''
      if (typeof param.value === 'string') {
        return param.value.replace(/[^0-9\.]+/g, '')
      }
      return CommonGrid.formatCurrency(param)
    },
    formatCurrency: function (param) {
      if (!param.value && param.value != '0') {
        return this.defaultBlank
      }
      return parseInt(param.value).format()
    },
    formatNumber: function (param) {
      if (!param.value && param.value != '0') {
        return this.defaultBlank
      }
      return numberFormatPoint2Digits(param.value)
    },
    convertCommon: function (codes, param) {
      if (!codes) return ' - '
      for (var i = 0; i < codes.length; i++) {
        if (param.value == codes[i].name) {
          return codes[i].value
        }
      }
      return this.defaultBlank
    },
    getCode: function (codes, value) {
      for (var i = 0; i < codes.length; i++) {
        if (value == codes[i].value) {
          return codes[i].name
        }
      }
      return ''
    },
    checkMobile: function (gridOpts) {
      // 모바일 브라우저 가로크기 체크
      if (document.body.clientWidth < 800) {
        if (gridOpts) {
          gridOpts.columnDefs.forEach(function (el) {
            el.pinned = null
            if (el.children) {
              el.children.forEach(function (subEl) {
                subEl.pinned = null
              })
            }
          })
        }
      }
    },
    makeTopGrid: function (gridMainOpts, rowData, params) {
      var colsSum = []
      gridMainOpts.columnDefs.forEach(function (coldefs, index) {
        if (coldefs.children) {
          coldefs.children.forEach(function (child, index) {
            if (child.isSum && child.isSum == true) {
              var temp = {}
              temp[child.field] = 0
              temp['field'] = child.field
              colsSum.push(temp)
            }
          })
        } else {
          if (coldefs.isSum && coldefs.isSum == true) {
            var temp = {}
            temp[coldefs.field] = 0
            temp['field'] = coldefs.field
            colsSum.push(temp)
          }
        }
      })
      rowData.forEach(function (rowvalue, index) {
        colsSum.forEach(function (value, index) {
          if (rowvalue[value.field] && !rowvalue[value.field].isNaN)
            value[value.field] += rowvalue[value.field]
        })
      })
      var resultSum = {}
      colsSum.forEach(function (cValue, index) {
        resultSum[cValue.field] = cValue[cValue.field]
      })
      if (params && params.length > 0) {
        params.forEach(function (value, index) {
          resultSum[value.field] = value.value
        })
      }
      resultSum['top'] = true
      var resultArray = []
      resultArray[0] = resultSum
      gridMainOpts.api.setPinnedTopRowData(resultArray)
    },
  },
  CellRenderer: {
    /** 셀 무브 렌더러 */
    moveCellRenderer: moveCellRenderer,
    CheckboxCellererer: CheckboxCellererer,
  },
  orderDescNo(params: Object) {
    return params.node.parent.childrenAfterFilter.length - params.node.rowIndex
  },
  extractValues(mappings) {
    var params = new Array()
    for (var i = 0; i < mappings.length; i++) {
      params.push(mappings[i].name)
    }
    return params
  },
  /**
   * 객체에서 key로 value을 반환하는 함수, 콤보박스에서 사용
   */
  lookupValue(mappings, key) {
    for (var i = 0; i < mappings.length; i++) {
      if (mappings[i].name == key) {
        return mappings[i].value
      }
    }
    return ''
  },
  lookupKey(mappings, name) {
    for (var i = 0; i < mappings.length; i++) {
      if (mappings[i].value == name) {
        return mappings[i].name
      }
    }
    return ''
  },
  getCodeValue(codes, nodeData) {
    if (!codes) return ' - '
    for (var i = 0; i < codes.length; i++) {
      if (nodeData.value == codes[i].name) {
        return codes[i].value
      }
    }
    return ' - '
  },
  refrashGridData(agGrid) {
    const updateDataList = agGrid.getData()

    for (let i = 0; i < updateDataList.length; i++) {
      let item = updateDataList[i]

      if (item.rowStatus) {
        const selectRowNode = agGrid.gridOption.api.getRowNode(i)
        agGrid.gridOption.api.refreshCells({ rowNodes: [selectRowNode] })
      }
    }
  },
  //그리드 전체 유효성 체크
  validationChk(agGrid, chkDataList) {
    $agGridUtils.refrashGridData(agGrid)
    const updateDataList = agGrid.getData()
    let isPass = true
    let chkList = []
    for (let i = 0; i < updateDataList.length; i++) {
      let item = updateDataList[i]

      if (item.rowStatus) {
        chkDataList.map((chkData) => {
          if (!item[chkData.field]) {
            //체크 데이터
            isPass = false
            chkList.push(chkData.name)
          }
        })
        if (!isPass) {
          agGrid.movePosition({ index: i })
          break
        }
      }
    }
    if (!isPass) {
      $fx.throwAlert(`${chkList} 필수 값 확인 부탁드립니다.`, '유효성 체크')
    }
    return isPass
  },
  changeHeaderName(gridApi, columnDefs, field, newName) {
    const column = columnDefs.find((colDef) => colDef.field === field)
    if (column) {
      column.headerName = newName
      gridApi.setColumnDefs(columnDefs)
    }
  },
}
