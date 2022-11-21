import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
  }

  open() {
    let content = createElement(`
    <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>

  </div>`);
    let x = content.querySelector('.modal__inner');
    x.append(this.setTitle(this.name));
    document.body.classList.add('is-modal-open');
    document.body.append(content);
  }

  setTitle(n) {
    let title = document.createElement('h3');
    title.innerHTML = n;
    title.classList.add('modal__title');
    return title;
  }

  setBody() {}



}


