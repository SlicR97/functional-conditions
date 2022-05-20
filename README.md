# functional-conditions
Making conditional statements in JavaScript functional

## Installation
Using npm:
```
npm install @slicr97/functional-conditions
```

Using yarn:
```
yarn add @slicr97/functional-conditions
```

## Usage
Import the functions you want to use:
```typescript
import { $if, $switch } from '@slicr97/functional-conditions';
```

Or, make them available globally by importing at the top of your entrypoint:
```typescript
import '@slicr97/functional-conditions/globalize';
```

### The `$if` function

This function provides a simple, pure wrapper around JavaScript's `if` statement. It takes three parameters:
1. The condition, which is checked for being truthy or falsy
2. The 'then'-case. This can be either a constant value or a function resolving into any return type. This case is executed if `condition` evaluates to `true`.
3. The 'else'-case. This can also be a constant or a function. This case is executed if `condition` evaluates to `false`.

### The `$switch` function

This function emulates a wrapper around JavaScript's `switch` statement. It takes one `option` parameter, consisting of the following properties:
1. `with` is the value that is being evaluated
2. `cases` is an array of tuples. Each case consists of
  1. `c` can be a constant value that will be compared to `with` or a function that takes `with` and returns either `true` or `false`
  2. `then` can be a constant value that will be returned or a function that returns a value
3. `default` is the default value that is returned if no cases match. This can be either a constant value or a function that returns a value.

## Examples

### `$if`
```typescript
import { $if } from '@slicr97/functional-conditions';

const a = 2;
const b = 3;

const message = $if (
  a > b,
  'a is larger than b',
  'a is not larger than b'
);

console.log(message); // Will log "a is not larger than b"
```

### $switch
```typescript
import { $switch } from '@slicr97/functional-conditions';

const age = 43;

const message = $switch ({
  with: age,
  cases: [
    [a => a > 80, 'You\'re very old'],
    [a => a > 60, 'You\'re pretty old'],
    [a => a > 40, 'You\'re not that old'],
    [a => a > 20, 'You\'re pretty young'],
    [a => a > 0, 'You\'re very young']
  ],
  default: 'You\'re less than 0 years old???'
});

console.log(message); // Will log "You're not that old"
```

### Considerations

#### Switch cases
Switch cases are checked sequentially and execution stops once the first valid case is reached. This means that if you have
```typescript
[a => a > 20]
```
and
```typescript
[a => a > 40]
```
in that order, the code could never step into the second case, as the first one also satisfies the condition.

#### Side effects
While it is not strictly necessary to pass pure functions into `$if` or `$switch`, I strongly encourage doing so. These functions were not built with effectful functions in mind and I won't guarantee that the functions will not be executed out of order.
