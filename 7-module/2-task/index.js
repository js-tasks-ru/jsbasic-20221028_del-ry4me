import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
  }

  content = createElement(`
    <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">

        </h3>
      </div>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>

  </div>`)

  open() {
    document.body.classList.add('is-modal-open');
    document.body.append(this.content);

    let button = document.querySelector('.modal__close');
    button.addEventListener("click", () =>
      this.close());

    document.addEventListener('keydown', handler);

    function handler(event) {
      if (event.code == 'Escape') {
        this.close();
      }
    }

  }

  setTitle(n) {
    this.content = createElement(`
    <div class="modal">
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
          ${n}
        </h3>
      </div>

      <div class="modal__body">

      </div>
    </div>

  </div>`);

  }

  setBody(m) {
    let body = this.content.querySelector('.modal__body');
    body.firstChild.replaceWith(m);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    let modal = document.body.querySelector('.modal');
    modal.remove();
    document.removeEventListener('keydown', this.handler);
  }


}


