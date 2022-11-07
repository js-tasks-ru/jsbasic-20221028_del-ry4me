function filterRange(arr, a, b) {
  // ваш код...
  let arrToModify = arr.slice();

  arrToModify = arrToModify.filter(item => item >= a && item <= b);

  return arrToModify;

}



