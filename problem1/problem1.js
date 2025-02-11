const checkValue = (number) => {
  if (number <= 0) {
    console.log("number must be positive number");
    return false;
  }
  return true;
};
var sum_to_n_a = function (n) {
  const isValidValue = checkValue(n);
  if (!isValidValue) {
    return;
  }
  let sum_arr_n_a = 0;
  for (let i = 1; i <= n; i++) {
    sum_arr_n_a += i;
  }
  return sum_arr_n_a;
};
console.log(sum_to_n_a(5));

var sum_to_n_b = function (n) {
  const isValidValue = checkValue(n);
  if (!isValidValue) {
    return;
  }
  let sum_arr_n_b = 0;
  let i = 1;
  while (i <= n) {
    sum_arr_n_b += i;
    i++;
  }
  return sum_arr_n_b;
};
console.log(sum_to_n_b(5));

var sum_to_n_c = function (n) {
  const isValidValue = checkValue(n);
  if (!isValidValue) {
    return;
  }
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
};
console.log(sum_to_n_c(5));
