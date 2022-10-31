function truncate(str, maxlength) {
  // ваш код...
  newStr = "";

  if (str.length <= maxlength) {
    return str;
  }

  newStr = str.substr(0, (maxlength - 1)) + "…";

  return newStr;

}
