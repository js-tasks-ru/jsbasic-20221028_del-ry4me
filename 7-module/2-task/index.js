import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
  }
  // PROPERTY CONTAINIG MARKUP

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
    // MODAL WINDOW OPEN
    document.body.classList.add('is-modal-open');
    document.body.append(this.content);

    // X BUTTON EVENT HANDLING
    let button = document.querySelector('.modal__close');
    button.addEventListener("click", handler2);

    function handler2() {
      modal.remove();
      document.removeEventListener('keydown', this.handler);
      document.body.classList.remove('is-modal-open');
    }

    // ESC BUTTON EVENT HANDLER
    let modal = document.querySelector('.modal');
    document.addEventListener('keydown', handler);

    function handler(event) {
      if (event.code == 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', this.handler);
        document.body.classList.remove('is-modal-open');
      }
    }

  }

  setTitle(n) {
    let modalTitle = this.content.querySelector('.modal__title');
    modalTitle.innerHTML = n;
  }

  setBody(m) {
    let body = this.content.querySelector('.modal__body');
    body.firstChild.replaceWith(m);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.content.remove();
  }

}


