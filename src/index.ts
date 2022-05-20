type IfFunction<Type> = () => Type;

export const $if = <TThen, TElse>(
  condition: any,
  thenCase: IfFunction<TThen> | TThen,
  elseCase: IfFunction<TElse> | TElse,
): TThen | TElse => {
  const $return = condition
    ? thenCase
    : elseCase;

  if (typeof $return === 'function') {
    return ($return as ReturnFunction<TThen | TElse>)();
  } else {
    return $return;
  }
};

type SwitchFunction<Type> = (t: Type) => boolean;
type ReturnFunction<TReturn> = () => TReturn;
type SwitchOptions<Type, TReturn> = {
  with: Type;
  cases: [c: Type | SwitchFunction<Type>, then: TReturn | ReturnFunction<TReturn>][];
  default: TReturn | ReturnFunction<TReturn>;
};

export const $switch = <Type, TReturn>(options: SwitchOptions<Type, TReturn>): TReturn => {
  let $return;
  for (const [c, then] of options.cases) {
    if (
      (typeof c === 'function' && (c as SwitchFunction<Type>)(options.with)) ||
      (c === options.with)
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