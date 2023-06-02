/**
 * Function type for then / else branches of $if,
 * in case more complex operations need to take place
 * in these expressions.
 *
 * @param Type Return type
 */
type IfFunction<Type> = () => Type

/**
 * Function type provider for globalize.ts
 */
export type IfFunctionType = <TThen, TElse>(
  /* eslint-disable @typescript-eslint/no-explicit-any */
  condition: any,
  thenCase: IfFunction<TThen> | TThen,
  elseCase: IfFunction<TElse> | TElse,
) => TThen | TElse

/**
 * Functional @see if expression
 *
 * @param condition Condition to be evaluated
 * @param thenCase Case that is returned if condition is truthy
 * @param elseCase Case that is returned if condition is falsy
 * @returns Either thenCase or elseCase, or the result of their operations, respectively
 */
export const $if = <TThen, TElse>(
  /* eslint-disable @typescript-eslint/no-explicit-any */
  condition: any,
  thenCase: IfFunction<TThen> | TThen,
  elseCase: IfFunction<TElse> | TElse,
): TThen | TElse => {
  const $return = condition ? thenCase : elseCase

  if (typeof $return === 'function') {
    return ($return as IfFunction<TThen | TElse>)()
  } else {
    return $return
  }
}
