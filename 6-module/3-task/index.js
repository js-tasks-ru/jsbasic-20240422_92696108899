import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.createSlides();
    this.addProductSlides();
    this.initCarousel();
    this.addToCart();
    this.test();
  }

  createSlides() {
    let slides = this.slides
      .map((item, index) =>
        `<div class="carousel__slide" data-id=${this.slides[index].id}>
          <img src="/assets/images/carousel/${this.slides[index].image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${this.slides[index].price.toFixed(2)}</span>
            <div class="carousel__title">${this.slides[index].name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`)
      .join('');

    let productSlides = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${slides}
       </div>
    </div>
    `)
    return productSlides
  }

  addProductSlides() {
    this.elem = this.createSlides();
  }

  initCarousel() {
    let currentSlideNumber = 0;
    let slidesAmount = this.slides.length - 1;

    let carouselInnerElem = this.elem.querySelector('.carousel__inner');
    let carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    let carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');

    // let carousel = this.elem.querySelector('.carousel');
    // console.log(carousel);

    update();

    carouselArrowRight.onclick = () => {
      currentSlideNumber++;
      update();
    }
    carouselArrowLeft.onclick = () => {
      currentSlideNumber--;
      update();
    }

    function update() {
      let offset = -carouselInnerElem.offsetWidth * currentSlideNumber;
      carouselInnerElem.style.transform = `translateX(${offset}px)`;

      if (currentSlideNumber == slidesAmount) {
        carouselArrowRight.style.display = 'none';
      } else {
        carouselArrowRight.style.display = '';
      }

      if (currentSlideNumber == 0) {
        carouselArrowLeft.style.display = 'none';
      } else {
        carouselArrowLeft.style.display = '';
      }
    }

  }
  addToCart() {
    this.elem.addEventListener('click', ({ target }) => {
      let button = target.closest('.carousel__button');

      if (button) {
        let id = target.closest('[data-id]').dataset.id;
        this.elem.dispatchEvent(new CustomEvent('product-add', {
          detail: id,
          bubbles: true
        }));
      }
    });
  }


  test() {
    console.log(this.elem)

  }

}





