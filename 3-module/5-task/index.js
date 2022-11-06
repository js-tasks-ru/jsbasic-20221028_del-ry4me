function getMinMax(str) {
  // ваш код...
  let arr = [];
  let arrNumbers = [];
  let max = 0;
  let min = 0;
  let result = {};

  arr = str.split(' ');

  for (const item of arr) {

    if (!Number.isNaN(+item)) {
      arrNumbers.push(item);
    }
  }
  max = Math.max(...arrNumbers);

  min = Math.min(...arrNumbers);

  result = {min, max};

  return result;
}

