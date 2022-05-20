import { $if, IfFunctionType } from "./if";
import { $switch, SwitchFunctionType } from "./switch";

declare global {
  var $if: IfFunctionType;
  var $switch: SwitchFunctionType;
}

globalThis.$if = $if;
globalThis.$switch = $switch;
