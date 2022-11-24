import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this._slider = this.makeSlider();
  }

  get elem() {
    return this._slider;
  }

  makeSlider() {
    // SLIDER INITIAL MARKUP
    let slider = createElement(`
    <div class="slider">

    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">2</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 50%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
      ${this.stepsForSlider()}
    </div>
  </div>`);


    let thumb = slider.querySelector('.slider__thumb');
    let progress = slider.querySelector('.slider__progress');
    let sliderValue = slider.querySelector('.slider__value');
    let sliderSteps = slider.querySelector('.slider__steps');
    let leftPercents = 55;
    let x = this.steps;
    sliderSteps.children[0].classList.add('slider__step-active');

    // CLICK LISTENER
    slider.addEventListener('click', handler);

    function handler(event) {
      // PERCENTAGE COUNT ON SLIDER CLICK
      let left = event.clientX - slider.getBoundingClientRect().left;
      let leftRelative = left / slider.offsetWidth;
      let segments = x - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      leftPercents = value / segments * 100;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      sliderValue.innerHTML = value;

      // ON SPAN CLICK
      let target = event.target;
      if (target.tagName == 'SPAN') {
        for (let i = 0; i <= sliderSteps.children.length - 1; i++) {
          sliderSteps.children[i].classList.remove('slider__step-active');
          if (sliderSteps.children[i] == target) {
            sliderValue.innerHTML = i;
            leftPercents = (100 * i) / (sliderSteps.children.length - 1);
            thumb.style.left = `${leftPercents}%`;
            progress.style.width = `${leftPercents}%`;
          }
        }
        target.classList.add('slider__step-active');
      }

      // BBUBLING EVENT
      let msg = new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      });
      slider.dispatchEvent(msg);
    }

    // DRAG`N`DROP SLIDER
    thumb.ondragstart = function() {
      return false;
    };

    thumb.onpointerdown = function(event) {
      slider.classList.add('slider_dragging');
      event.preventDefault(); // предотвратить запуск выделения (действие браузера)

      let shiftX = event.clientX - thumb.getBoundingClientRect().left;
      // shiftY здесь не нужен, слайдер двигается только по горизонтали

      document.addEventListener('pointermove', onMouseMove);
      document.addEventListener('pointerup', onMouseUp);

      function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

        // курсор вышел из слайдера => оставить бегунок в его границах.
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = leftRelative * 100;

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
        let segments = x - 1;
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);
        sliderValue.innerHTML = value;
      }

      function onMouseUp() {
        slider.classList.remove('slider_dragging');
        document.removeEventListener('pointer', onMouseUp);
        document.removeEventListener('pointermove', onMouseMove);
        let msg1 = new CustomEvent('slider-change', {
          detail: +sliderValue.innerHTML,
          bubbles: true
        });
        slider.dispatchEvent(msg1);
      }

    };

    thumb.ondragstart = function() {
      return false;
    };

    return slider;
  }



  stepsForSlider() {
    // COMPOSING SPANS FOR SLIDER STEPS
    let stepss = '';
    for (let i = 0; i < this.steps; i++) {
      stepss = stepss + '<span></span>';
    }
    return stepss;
  }
}
