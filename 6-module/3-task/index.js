import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._container = this.makeCarousel(this.slides);
  }

  get elem() {
    return this._container;
  }


  makeCarousel() {

    // CAROUSEL HTML MARKUP

    const carousel = createElement(`
      <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
    ${this.makeSlide()}
          </div>
      </div>`);

    // BUBBLING EVENT (PASSING SLIDE ID)

    carousel.onclick = function(event) {
      let target = event.target;

      if (target.className == "carousel__button") {
        let ttt = new CustomEvent("product-add", {
          detail: target.parentNode.parentNode.dataset.id,
          bubbles: true
        });
        carousel.dispatchEvent(ttt);
      }
    };


    // ARROWS HANDLING...

    function initCarousel() {
      const carouselArrowRight = carousel.querySelector(".carousel__arrow_right");
      const carouselArrowLeft = carousel.querySelector(".carousel__arrow_left");
      const slide = carousel.querySelector('.carousel__inner');
      const numberOfSlides = carousel.querySelectorAll('.carousel__slide').length;
      let count = 0;

      if (count == 0) {
        carouselArrowLeft.style.display = 'none';
      }

      function counterRight() {
        if (count == (numberOfSlides - 2)) {
          carouselArrowRight.style.display = 'none';
        } else {
          carouselArrowRight.style.display = '';
        }
        carouselArrowLeft.style.display = '';
        count = count + 1;
        slidePosition();
        return count;
      }

      function counterLeft() {
        if (count == 1) {
          carouselArrowLeft.style.display = 'none';
        } else {
          carouselArrowLeft.style.display = '';
        }
        carouselArrowRight.style.display = '';
        count = count - 1;
        slidePosition();
        return count;
      }

      function slidePosition() {
        let slideWidth = slide.offsetWidth;
        let a = slideWidth * count;
        slide.style.transform = `translateX(-${a}px)`;
      }

      carouselArrowRight.addEventListener('click', counterRight);
      carouselArrowLeft.addEventListener('click', counterLeft);

    }

    initCarousel();

    return carousel;
  }


  makeSlide() {
    let fullSlide = '';

    // COMPOSING SLIDES FROM INPUT ("THIS.SLIDES")

    for (let i in this.slides) {
      fullSlide = fullSlide + `
      <div class="carousel__slide" data-id="${this.slides[i].id}">
          <img src="/assets/images/carousel/${this.slides[i].image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">${'€' + this.slides[i].price.toFixed(2)}</span>
            <div class="carousel__title">${this.slides[i].name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`;
    }

    return fullSlide;
  }
}
