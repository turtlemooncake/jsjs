/**
 * Ch 2: Higher order functions, passing functions to functions
 */

// 2.1
function fib(n) {
  function go(p, curr, next) {
    if (p <= 0) {
      return curr;
    }

    return go(p - 1, next, curr + next); // p just acts as a counter. we are still adding bottom to top
  }

  return go(n, 0, 1);
}

function otherFib(n) {
  if (n <= 0) {
    return 0;
  }

  if (n == 1) {
    return 1;
  }

  return otherFib(n - 1) + otherFib(n - 2);
}

// wll finish (as long as n not too big)
// console.time("tail recursion");
// fib(100);
// console.timeEnd("tail recursion");

// will never finish
// console.time("recursion");
// const ans = otherFib(100);
// console.log(ans);
// console.timeEnd("recursion");

// 2.2
function isSorted(A, gt) {
  function go(n) {
    if (n + 1 >= A.length) {
      return true;
    }

    if (gt(A[n], A[n + 1])) {
      return false;
    }

    return go(n + 1);
  }

  return go(0);
}

// let ans = isSorted([1, 2, 3], (a, b) => a > b);
// console.log(ans);
// ans = isSorted([3, 2, 1], (a, b) => a > b);
// console.log(ans);
