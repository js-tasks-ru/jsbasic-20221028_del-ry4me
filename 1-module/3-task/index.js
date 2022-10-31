function ucFirst(str) {
  // ваш код...
  let newStr = "";

  if (str === "") {
    return "";
  }

  newStr = str[0].toUpperCase() + str.substr(1, (str.length - 1));

  return newStr;

}
