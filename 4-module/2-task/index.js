function makeDiagonalRed(table) {
  // ваш код...
  let i = 0;

  while (i <= (table.rows.length - 1)) {

    table.rows[i].cells[i].style.backgroundColor = 'red';
    i += 1;
  }

}
