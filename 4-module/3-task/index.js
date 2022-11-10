function highlight(table) {
  // ваш код...
  for (let row of table.rows) {

    if (row.cells[1].innerHTML < 18) {

      row.style.textDecoration = 'line-through';
    }
    if (row.cells[2].innerHTML === 'm') {

      row.classList.add('male');

    } else if (row.cells[2].innerHTML === 'f') {

      row.classList.add('female');
    }
    if (row.cells[3].getAttribute('data-available') === 'true') {

      row.classList.add('available');

    } else if (row.cells[3].getAttribute('data-available') === 'false') {

      row.classList.add('unavailable');
    }
    if (!row.cells[3].hasAttribute('data-available')) {

      row.setAttribute('hidden', true);
    }

  }
}
