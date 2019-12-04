# Lesson-02 - Variables, Data Types and Operators
Date: 02.12.2019

## Variable & its Declaration

A variable is a “named storage” for data. We can use variables to store goodies, visitors, and other data.

```
let message; // declare variable

message = "hi"; // store some Data
```

Or simply do both on one line:

```
let message = "hi";
```

It is also possible (but not advisable) to declare few variables on one line:

```
let user = 'John', age = 25, message = 'hi';
```

Or like one of the following two:

```
let user = 'John',
  age = 25,
  message = 'hi';

let user = 'John'
  , age = 25
  , message = 'Hello';
```

There are 3 keywords to declare a variable:

`let` is used to declare a variable in latest version of JS
`const` is used to declare constant variables, that are not going to change
`var` is an older version of let from older versions of JS

## Variable naming
### MUST

There are limitations on variable names in JavaScript:

1. The name must contain only letters, digits, or the symbols $ and \_.
2. The first character must not be a digit.
3. Case matters
4. Non-Latin letters are not advisable
5. Reserved names are not allowed (`let`, `class`, etc);

### SHOULD

1. Most of the variables are commonly named in `camelCase`.
2. Variable has to be descriptive like (`userName`, `ourPlanetName`).
3. Constant variables that are known before execution are named in `ALL_CAPS_WITH_UNDERSCORES` (`COLOR_RED, BIRTH_DATE`).
4. Constant variables that are not known before execution are named normally with `camelCase`.

### Good advises

* Use human-readable names like `userName` or `shoppingCart`.
* Stay away from abbreviations or short names like `a`, `b`, `c`, unless you really know what you’re doing.
* Make names maximally descriptive and concise. Examples of bad names are data and value. Such names say nothing. It’s only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
* Agree on terms within your team and in your own mind. If a site visitor is called a “user” then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.
* Better create than reuse

## Data types

JS is a "dynamically typed" language, meaning that the variable can change the data type of it's value.

Use `typeof` operator to check the type of argument.

There are **8 data types** is JS:

### Number

* `42` - integer
* `1.14` - float
* `0x2A`
* `4e3`
* `Infinity` - Special numeric value. Appears as a result of division by zero or referencing it directly.
* `NaN` - 'Not a Number' - result of a computational error. Further operations with `NaN` always return `NaN`. **NB!:** not equal to anything, even to itself.

### String

There are 3 ways to define a string:
```
let str = "Hello"; // Double quotes
let str2 = 'Single quotes are ok too'; // Single quotes
let phrase = `can embed another ${str}`; //Backticks
```

### Boolean (logical type)

The boolean type has only two values: `true` and `false`.

### Undefined

The meaning of `undefined` is “value is not assigned”.

If a variable is declared, but not assigned, then its value is `undefined`.

Technically, it is possible to assign `undefined` to any variable, but it is **not** advisable to do so (rather use `null`), because `undefined` is used for different checks.

### null

Used for unknown values – a standalone type that has a single value `null`. Usually appears in DOM.

### Symbol

The `symbol` type is used to create unique identifiers for objects.

### Object

All other types are called “primitive” because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

```
var user = {
  name : 'Oleg',
  age : 30
}
```

### BigInt

`BigInt` type was recently added to the language to represent integers of arbitrary length.

A `BigInt` is created by appending n to the end of an integer literal:
```
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

___

`typeof` in action:
```
typeof undefined // "undefined"
typeof 0 // "number"
typeof 10n // "bigint"
typeof true // "boolean"
typeof "foo" // "string"
typeof Symbol("id") // "symbol"
typeof Math // "object"  (1)
typeof null // "object"  (2)
typeof alert // "function"  (3)
```

## Operators

Operand (Argument) - is what operators are applied to

Operator - things like `+`, `-`, `\` and so on.

Operators can be unary, binary or ternary.

### Binary + and concatenation

If the binary `+` is applied to strings, it merges (concatenates) them. Even more: if one of the operands is a string, the other one is converted to a string too.

However, note that operations run from left to right. If there are two numbers followed by a string, the numbers will be added before being converted to a string:

```
alert(2 + 2 + '1' ); // "41" and not "221"
```
String concatenation and conversion is a special feature of the binary plus `+`. Other arithmetic operators work only with numbers and always convert their operands to numbers.

### Unary + and numeric conversion

The unary plus or, in other words, the plus operator `+` applied to a single value, doesn’t do anything to numbers. But if the operand is not a number, the unary plus converts it into a number.

```
// No effect on numbers
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

// Converts non-numbers
alert( +true ); // 1
alert( +"" );   // 0
```

### Operator precedence

[Precedence table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

### Assignment =

`=` has vary low precedence and calculated right-to-left. Thus one can chain assignments:

```
let a, b, c;

a = b = c = 2 + 2;

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

### Remainder %

The result of `a % b` is the remainder of the integer division of `a` by `b`.

For instance:
```
alert( 5 % 2 ); // 1 is a remainder of 5 divided by 2
alert( 8 % 3 ); // 2 is a remainder of 8 divided by 3
alert( 6 % 3 ); // 0 is a remainder of 6 divided by 3
```

### Exponentiation **

For a natural number b, the result of `a ** b` is a multiplied by itself b times
```
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

### Increment/decrement

Increment `++` increases a variable by 1.

Decrement `--` decreases.

**NB!:** they can only be applied to variables.

* When the operator goes after the variable, it is in **“postfix form”**: `counter++`. Returns old value.
```
let counter = 1;
let a = ++counter;
alert(a); // 2
```

* The **“prefix form”** is when the operator goes before the variable: `++counter`. Returns new value.
```
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++
alert(a); // 1
```

### modify-and-assign Operators

`+=`
`-=`
`/=`
`%=` and so on.

## Comparisons





## Sources and useful links

[Javascript.info - Variables](https://javascript.info/variables)

[Javascript.info - Types](https://javascript.info/types)
