function initCarousel() {

  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let carouselInner = document.querySelector('.carousel__inner');
  let carouselWidth = carouselInner.offsetWidth;

  arrowLeft.style.display = 'none';

  arrowRight.addEventListener('click', () => {
    arrowLeft.style.display = '';
    let currentCarouselWidth = new WebKitCSSMatrix(
      getComputedStyle(carouselInner).transform
    );

    if (!Math.abs(currentCarouselWidth.m41 % carouselWidth)) {
      carouselInner.style.transform = `translateX(-${
        carouselWidth - currentCarouselWidth.m41
      }px)`;
      if (currentCarouselWidth.m41 < -988) {
        arrowRight.style.display = 'none'
      };
    }
  });

  arrowLeft.addEventListener('click', () => {
    arrowRight.style.display = '';
    let currentCarouselWidth = new WebKitCSSMatrix(
      getComputedStyle(carouselInner).transform
    );

    if (!Math.abs(currentCarouselWidth.m41 % carouselWidth)) {
      carouselInner.style.transform = `translateX(${
        carouselWidth + currentCarouselWidth.m41
      }px)`;
      if (currentCarouselWidth.m41 >= -988) {
        arrowLeft.style.display = 'none'
      };
    }
  });
}

