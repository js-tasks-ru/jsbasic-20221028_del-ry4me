function sumSalary(salaries) {
  // ваш код...
  let result = 0;

  for (let key in salaries) {

    if (Number.isInteger(salaries[key])) {

      result = result + salaries[key];
    }
  }

  return result;
}
