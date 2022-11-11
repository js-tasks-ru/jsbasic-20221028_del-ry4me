function initCarousel() {
  // ваш код...
  let carouselArrowRight = document.querySelector(".carousel__arrow_right");
  let carouselArrowLeft = document.querySelector(".carousel__arrow_left");
  let slide = document.querySelector('.carousel__inner');
  let slideWidth = document.querySelector('.carousel__inner').offsetWidth;
  let count = 0;

  if (count == 0) {
    carouselArrowLeft.style.display = 'none';
  }

  function counterRight() {
    if (count == 2) {
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
    let a = slideWidth * count;
    slide.style.transform = `translateX(-${a}px)`;
  }

  carouselArrowRight.addEventListener('click', counterRight);
  carouselArrowLeft.addEventListener('click', counterLeft);

}
