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

// let rows = [
//   {
//       name: 'Вася',
//       age: 25,
//       salary: 1000,
//       city: 'Самара'
//   },
//   {
//       name: 'Петя',
//       age: 30,
//       salary: 1500,
//       city: 'Москва'
//   }
// ];
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.add();
    this.remove();
  }
  add() {
    this.elem = document.createElement('TABLE')
    this.elem.innerHTML = this.rows
      .map(({ name, age, salary, city }) =>
        `<tr>
          <td>${name}</td><td>${age}</td><td>${salary}</td><td>${city}</td><td><button>X</button></td>
        </tr>`)
      .join('');

    this.user
  }

  remove() {
    this.elem.addEventListener('click', ({ target }) => {
      if (target.closest('button')) {
        let del = target.parentNode.querySelector('button').parentNode.parentNode;
        del.remove();
      }
    });
  }
}
