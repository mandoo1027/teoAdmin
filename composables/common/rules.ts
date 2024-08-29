﻿import * as XLSX from 'xlsx'
import _ from 'lodash'

type DefineRules = (value: string) => boolean | string

export const defineRules = {
  maxLength: (max: string, message: string): DefineRules => {
    return (value: string) =>
      value.length <= parseInt(max) ||
      (_.isEmpty(message) ? `최대 ${max}글자까지 입력 가능합니다.` : message)
  },
  minLength: (min: string, message: string): DefineRules => {
    return (value: string) =>
      value.length >= parseInt(min) ||
      (_.isEmpty(message) ? `최소 ${min}글자 이상 입력해야 합니다.` : message)
  },
  required: (message: string): DefineRules => {
    return (value: string) => {
      if (!value) {
        return _.isEmpty(message) ? '필수 입력 항목입니다.' : message
      }
      return true
    }
  },
  id: (message: string): DefineRules => {
    return (value: string) => {
      if (!value) {
        return '아이디가 입력되지 않았습니다.'
      } else if (value && !/^[A-Z0-9]{6,16}$/.test(value)) {
        return _.isEmpty(message) ? '영문 대문자, 숫자 6~16 자리' : message
      }
      return true
    }
  },
  code: (message: string): DefineRules => {
    return (value: string) => {
      if (!value) {
        return '기관코드가 입력되지 않았습니다.'
      } else if (value && !/^[A-Z0-9]{4}$/.test(value)) {
        return _.isEmpty(message) ? '영문 대문자 4자리' : message
      }
      return true
    }
  },
  password: (message: string): DefineRules => {
    return (value: string) => {
      if (!value) {
        return '비밀번호가 입력되지 않았습니다.'
      } else if (!(value.length <= 16 && value.length >= 8)) {
        return '자리수를 확인해주세요. 8~16 까지 입력이 가능합니다.'
      } else if (
        !/^(?=.*[a-zA-Z])(?=.*[0-9!@#\$%\^\&*\)\(+=._-])(?=.*[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]).{8,}$/.test(
          value,
        )
      ) {
        return '영문/숫자/특수문자 2가지 이상 조합해주세요.'
      } else if (!/^(?!.*(.)\1\1)[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+$/.test(value)) {
        return '동일한 문자/숫자 3가지 이상 연속 사용 불가합니다.'
      }
      return true
    }
  },
  birth: (message: string): DefineRules => {
    const regex = /^\d{4}\d{2}\d{2}$/
    return (value: string) => {
      if (!value) {
        return '생년월일이 입력되지 않았습니다.'
      } else if (!regex.test(value)) {
        return 'YYYYMMDD 날짜 형식이 맞지 않습니다.'
      } else {
        let mm = value.substring(4, 6)
        let dd = value.substring(6, 8)
        if (mm) {
          if (Number(mm) > 12 || Number(mm) < 1) {
            return '생년월일이 맞지 않습니다.'
          }
        }
        if (dd) {
          if (Number(dd) > 31 || Number(mm) < 1) {
            return '생년월일이 맞지 않습니다.'
          }
        }
      }
      return true
    }
  },
}
