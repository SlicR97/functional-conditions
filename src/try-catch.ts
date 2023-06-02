/**
 * Function that $tryCatch will try to execute that may throw
 *
 * @param TReturn The return type of the function
 */
type FunctionType<TReturn> = () => TReturn

/**
 * Function that formats an error
 *
 * @param err The error that has been caught
 * @param TError The return type
 */
type ErrorFunction<TError> = (err: Error) => TError

/**
 * Error type for the try-catch function
 * Can be either a function that takes an Error object and returns something, or a constant value
 *
 * @param TError The type to be returned
 */
type ErrorType<TError> = ErrorFunction<TError> | TError

/**
 * Function type provider for globalize.ts
 */
export type TryCatchFunctionType = <TReturn, TError>(
  fn: FunctionType<TReturn>,
  err: ErrorType<TError>,
) => TReturn | TError

/**
 * Functional try-catch expression that gets handed a function it tries to execute.
 * If that function throws an error, it gets caught and either handed to the error function or a static value is returned.
 *
 * @param fn Function to execute that may throw an error
 * @param err Either a constant value that is returned when an error is thrown or a function that takes a thrown error.
 */
export const $tryCatch = <TReturn, TError>(
  fn: FunctionType<TReturn>,
  err: ErrorType<TError>,
) => {
  try {
    return fn()
  } catch (e) {
    if (typeof err === 'function') {
      return (err as ErrorFunction<TError>)(e as Error)
    }

    return err
  }
}
