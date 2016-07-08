const assert = require('assert');

// var testcases = [
//   { input: [2, 2, 4, 4], expected: [4, 8, 0, 0] },
//   { input: [4, 2, 0, 2], expected: [4, 4, 0, 0] },
//   { input: [2, 4, 2, 2], expected: [2, 4, 4, 0] },
//   { input: [0, 4, 4, 2], expected: [8, 2, 0, 0] },
//   { input: [4, 2, 4, 2], expected: [4, 2, 4, 2] },
//   { input: [2, 2, 16, 4], expected: [4, 16, 4, 0] },
// ];

// function checkEquals(a, b) {
//   assert(a.length == b.length);

//   for (var i = 0; i < a.length; i++) {
//     assert(a[i] === b[i]);
//   }
// }

// function shiftRow(row) {
//   var shifted = [];
//   var can_merge = true;

//   // shift elements in a row to the left
//   for (var el of row) {
//     if (!el) {
//       // always collapse zeros
//       continue;
//     }

//     if (can_merge &&
//         // ensure there is something valid to merge with
//         shifted.length && shifted[shifted.length-1] === el) {
//       shifted[shifted.length-1] *= 2;
//       can_merge = false;
//     } else {
//       shifted.push(el);
//       can_merge = true;
//     }
//   }

//   // pad array with zeros
//   while (shifted.length < row.length) {
//     shifted.push(0);
//   }

//   return shifted;
// }

// for (var i = 0; i < testcases.length; i++) {
//   var testcase = testcases[i];
//   var output = shiftRow(testcase.input);
//   console.log('input: ' + testcase.input + ', expected: ' + testcase.expected + ', output: ' + output);
//   checkEquals(testcase.expected, output);
// }