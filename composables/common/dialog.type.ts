interface DialogOption {
  name: string
  data?: { message?: string }
  size?: 'small' | 'medium' | 'large'
  _id?: string
  _deferrer?: {
    promise: Promise<any>
    resolve: (value?: any) => void
    reject: (reason?: any) => void
  }
  returnValue?: any
  title?: string
  isShowTitle?:Boolean
  confirm?: Boolean
  closeLabel?: string
  confirmLabel?:string
}
