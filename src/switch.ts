/**
 * Determines if a case should be executed in $switch
 *
 * @param Type Type of the value of the $switch function to be checked
 * @param t Instance of the type for checking
 */
type SwitchFunction<Type> = (t: Type) => boolean;

/**
 * Function type for the cases and default of $switch,
 * in case more complex operations need to take place
 * in these expressions.
 *
 * @param TReturn The return type
 */
type ReturnFunction<TReturn> = () => TReturn;

/**
 * Option type for the $switch function
 *
 * @param with The value to be compared
 * @param cases A tuple of possible cases. Each case consists of
 * 1. a constant value to compare against OR a SwitchFunction to compare and
 * 2. a constant value OR a ReturnFunction to return
 * @param default The default case. This case must be supplied at all times, as it will be returned if none of the cases match
 */
type SwitchOptions<Type, TReturn> = {
  with: Type;
  cases: [
    c: Type | SwitchFunction<Type>,
    then: TReturn | ReturnFunction<TReturn>,
  ][];
  default: TReturn | ReturnFunction<TReturn>;
};

/**
 * Function type provider for globalize.ts
 */
export type SwitchFunctionType = <Type, TReturn>(
  options: SwitchOptions<Type, TReturn>,
) => TReturn;

/**
 * Functional switch expression
 * It will iterate through the cases in order and return the first one that matches.
 * If no case matches, it will return the default value
 *
 * @param options Options for the execution
 * @returns The matching case or, if none match, the default case
 */
export const $switch = <Type, TReturn>(
  options: SwitchOptions<Type, TReturn>,
): TReturn => {
  let $return;
  for (const [c, then] of options.cases) {
    if (
      (typeof c === 'function' && (c as SwitchFunction<Type>)(options.with)) ||
      c === options.with
    ) {
      $return = then;
      break;
    }
  }

  $return = $return ?? options.default;

  if (typeof $return === 'function') {
    return ($return as ReturnFunction<TReturn>)();
  } else {
    return $return;
  }
};
