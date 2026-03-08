1. What is the difference between var, let, and const?
   var: Function-scoped, can be re-declared and updated, hoisted.
   let: Block-scoped, can be updated but not re-declared, hoisted but not initialized.
   const: Block-scoped, cannot be updated or re-declared, hoisted but not initialized.

2. What is the spread operator (...)?
   The spread operator (...) allows an iterable (like an array or string) to be expanded into individual elements. It can be used for copying arrays, merging arrays, and spreading elements in function calls.

3. What is the difference between map(), filter(), and forEach()?
   map(): Creates a new array by applying a function to each element of the original array.
   filter(): Creates a new array with elements that pass a test.
   forEach(): Executes a function for each element of the array but does not return a new array.

4. What is an arrow function?
   An arrow function is a concise syntax for writing function expressions in JavaScript. It uses the => syntax and has a shorter syntax compared to traditional functions. Arrow functions do not have their own this, arguments, super, or new.target. They are always anonymous.

5. What are template literals?
   Template literals are string literals that allow embedded expressions. They are enclosed by backticks (`) instead of single or double quotes. They support multi-line strings and string interpolation using ${expression}.
