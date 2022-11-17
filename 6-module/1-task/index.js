/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this._table = this.makeTable(this.rows);
  }

  get elem() {
    return this._table;
  }


  makeTable() {

    let t = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');


    // HEADER
    thead.insertRow();
    let arr = ['Имя', 'Возраст', 'Зарплата', 'Город'];
    for (let i = 0; i < 4; i++) {
      let th = document.createElement('th');
      thead.rows[0].append(th);
      thead.rows[0].cells[i].innerHTML = arr[i];
    }

    //BODY
    for (let i = 0; i < this.rows.length; i++) {
      tbody.insertRow();
    }
    for (let i = 0; i < tbody.rows.length; i++) {
      for (let k = 0; k < 5; k++) {
        let td = document.createElement('td');
        let button = document.createElement('button');
        button.innerHTML = 'X';

        tbody.rows[i].append(td);
        if (k == 0) {
          tbody.rows[i].cells[k].innerHTML = `${this.rows[i].name}`;
        } else if (k == 1) {
          tbody.rows[i].cells[k].innerHTML = `${this.rows[i].age}`;
        } else if (k == 2) {
          tbody.rows[i].cells[k].innerHTML = `${this.rows[i].salary}`;
        } else if (k == 3) {
          tbody.rows[i].cells[k].innerHTML = `${this.rows[i].city}`;
        } else if (k == 4) {
          tbody.rows[i].cells[k].append(button);
        }
      }
    }


    t.append(thead);
    t.append(tbody);



    // REMOVE ROW
    t.onclick = function(event) {
      let target = event.target;

      if (target.tagName == 'BUTTON') {
        target.parentElement.parentElement.remove();
      }
    };

    return t;
  }


}



