function camelize(str) {
  // ваш код...
  let arrToModify = [];
  let newStr = '';



  arrToModify = str.split('-');

  arrToModify = arrToModify.map(function(item, index) {

    if (index === 0) {
      return item = item;
    } else {
      return item = item[0].toUpperCase() + item.substr(1, (item.length - 1));
    }
  });

  newStr = arrToModify.join('');

  return newStr;
}


