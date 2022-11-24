import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._ribbon = this.makeRibbonMenu(this.categories);
  }

  get elem() {
    return this._ribbon;
  }

  makeRibbonMenu() {

    // RIBBON MENU HTML MARKUP

    const ribbon = createElement(`
    <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">
    ${this.makeRibbonElements()}
    </nav>
    <button class="ribbon__arrow ribbon__arrow_right  ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `);

    //NAVIGATION ARROWS

    function arrowHandling() {
      let innerRibbon = ribbon.querySelector('.ribbon__inner');
      let ribbonOuter = ribbon.querySelector('.ribbon');
      let arrowRight = ribbon.querySelector('.ribbon__arrow_right');
      let arrowLeft = ribbon.querySelector('.ribbon__arrow_left');

      // CLICK EVENTS HANDLING

      ribbon.onclick = function(event) {
        let target = event.target;
        if (target.classList.contains('ribbon__arrow_right')) { // ARROW RIGHT
          let scrollWidth = innerRibbon.scrollWidth;
          let scrollLeft = innerRibbon.scrollLeft;
          let clientWidth = innerRibbon.clientWidth;
          let scrollRight = scrollWidth - scrollLeft - clientWidth;
          innerRibbon.scrollBy(350, 0);
          arrowLeft.classList.add('ribbon__arrow_visible');
          if (scrollRight < 1) {
            target.classList.remove('ribbon__arrow_visible');
          }
        } else if (target.classList.contains('ribbon__arrow_left')) { // ARROW LEFT
          innerRibbon.scrollBy(-350, 0);
          arrowRight.classList.add('ribbon__arrow_visible');
          if (innerRibbon.scrollLeft == 0) {
            arrowLeft.classList.remove('ribbon__arrow_visible');
          }
        } else if (target.classList.contains('ribbon__item')) { // REFERENCES HANDLING
          let ttt = new CustomEvent("ribbon-select", {
            detail: target.dataset.id,
            bubbles: true
          });
          ribbon.dispatchEvent(ttt);

          event.preventDefault();

          for (const child of innerRibbon.children) {
            child.classList.remove('ribbon__item_active');
          }
          target.classList.add('ribbon__item_active');
        }
      };

    }


    arrowHandling();
    return ribbon;
  }

  makeRibbonElements() {

    // COMPOSING ELEMENTS FROM INPUT ("THIS.CATEGORIES")

    let ribbonElements = '';

    for (const i in this.categories) {
      ribbonElements = ribbonElements + `
      <a href="#" class="ribbon__item" data-id="${this.categories[i].id}">${this.categories[i].name}</a>
      `;
    }

    return ribbonElements;
  }
}
