/* eslint-disable no-var */
// noinspection JSConstantReassignment,ES6ConvertVarToLetConst

import { $if, IfFunctionType } from './if'
import { $switch, SwitchFunctionType } from './switch'
import { $tryCatch, TryCatchFunctionType } from './try-catch'

declare global {
  var $if: IfFunctionType
  var $switch: SwitchFunctionType
  var $tryCatch: TryCatchFunctionType
}

globalThis.$if = $if
globalThis.$switch = $switch
globalThis.$tryCatch = $tryCatch
