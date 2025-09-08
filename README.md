
#### 1) What is the difference between var, let, and const?
**The three keywords basically used to declare variables in JavaScript.**
```VAR```:- globally-scoped. 
```LET```:- block-scoped. 
```CONST```:- block-scoped, but cannot be reassigned.

#### 2) What is the difference between map(), forEach(), and filter()? 
**map(), forEach(), and filter(). are all methods in JavaScript basicly this methods used to iterate over arrays. But they are used different purpose and they are show different results.**

```map()```:-  creates a new array by calling a provided function on every element in the original array.
**Example:**
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled); ANSER:- [2, 4, 6]
```forEach()```:- The method provides a function to execute arra y elements. It does not create a new array or return.
**Example:**
const numbers = [1, 2, 3];
numbers.forEach(num => console.log(num)); ANSER:- 1 2 3
```filter()```:- The method creates a new array using condition but not change orginial array  
**Example:**
const numbers = [1, 2, 3];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); ANSER:- [2]

#### 3) What are arrow functions in ES6?
```Arrow function```:-They provide a shorter syntax compared to traditional function expressions.Arrow functions are always anonymous and not used as constructors.
**Example:**
*Normal function*
const add = function(a, b) {
  return a + b;
};
*Arrow function*
const addArrow = (a, b) => a + b;
#### 4) How does destructuring assignment work in ES6?
```Destructuring assignment```:- It provides a more concise and readable way to extract data avoiding repetitive code. &  The variables are declared inside square brackets [] and their values are assigned from the array in the same order.
**Example:**
const fruits = ['apple', 'banana', 'cherry'];
const [first, second, third] = fruits; 
console.log(first);   
 ANSER --apple


#### 5) Explain template literals in ES6. How are they different from string concatenation?
```Template literals```:-The main difference between template literals and traditional string concatenation is the syntax and readability, especially when combining variables and strings. Template literals use backticks (`` ` ``) and allow for multi-line strings and embedded expressions.
**Example:**
const name = 'John';
const age = 30;
const mesage = 'Hello, my name is ' + name + ' and I am ' + age + ' years old.'; *Traditional string concatenation*
const message = `Hello, my name is ${name} and I am ${age} years old.`; *Template literals*
console.log(message); 
ANSWER --Hello, my name is John and I am 30 years old.

