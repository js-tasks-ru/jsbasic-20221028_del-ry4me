function checkSpam(str) {
  // ваш код...
  strInLowerCase = '';

  strInLowerCase = str.toLowerCase();

  if (strInLowerCase.includes("1xbet") || strInLowerCase.includes("xxx")) {
    return true;
  } else {
    return false;
  }

}
