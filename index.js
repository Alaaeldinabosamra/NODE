console.log(arguments);
console.log(require("module").wrapper);

// module.exports
const C = require("./test-module");
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
// const calc2 = require("./test-module2");
const { add, multiply, divide } = require("./test-module2");
console.log(add(2, 5));

// caching
// this module only loaded once and code inside of it executed once only
require("./test.module3")();
require("./test.module3")();
require("./test.module3")();
/**
 * How Node works folder with special wrapper function
 * all the code inside a module is wrapped in common function
 * wrapper function (exports, require, module, __filename, __dirname)
 * Arguments is an array in Javascript
 * and this array contain all the values there were passed into a function
 * '0' => export
 * '1' => require function
 * '2' => module inside it exports
 * '3' => path of root file name
 * '4' => Directory name
 */
