function factorial(n) {
  // ваш код...
  if (n === 1 || n === 0) {
    return 1;
  }

  let result = n;
  let i = 1;

  while (i < n) {
    result = result * (n - i);
    i = i + 1;
  }

  return result;
}
