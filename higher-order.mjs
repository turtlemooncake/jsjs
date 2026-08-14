/**
 * Ch 2: Higher order functions, passing functions to functions
 */
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
