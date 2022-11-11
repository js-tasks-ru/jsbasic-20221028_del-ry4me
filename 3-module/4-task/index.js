function showSalary(users, age) {
  // ваш код...
  salaryStr = '';
  for (const item of users) {
    if (item.age <= age) {
      salaryStr = salaryStr + item.name + ', ' + item.balance + '\n';
    }
  }
  salaryStr = salaryStr.slice(0, (salaryStr.length - 1));

  return salaryStr;
}
