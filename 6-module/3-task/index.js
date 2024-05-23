import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.createSlides();
    this.addProductSlides();
    this.initCarousel();
    this.test();
  }
  // let currentIndexSlideNumber;

  createSlides() {
    let productSlide = createElement(`
    
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
     
      <div class="carousel__inner">
      
        <div class="carousel__slide" data-id=${this.slides[0].id}>
          <img src="/assets/images/carousel/${this.slides[0].image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${this.slides[0].price.toFixed(2)}</span>
            <div class="carousel__title">${this.slides[0].name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>        
        <div class="carousel__slide" data-id=${this.slides[1].id}>
          <img src="/assets/images/carousel/${this.slides[1].image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${this.slides[1].price.toFixed(2)}</span>
            <div class="carousel__title">${this.slides[1].name}</div>
            <button type="button" class="carousel__button carousel__button1">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
        <div class="carousel__slide" data-id=${this.slides[2].id}>
          <img src="/assets/images/carousel/${this.slides[2].image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${this.slides[2].price.toFixed(2)}</span>
            <div class="carousel__title">${this.slides[2].name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
        <div class="carousel__slide" data-id=${this.slides[0].id}>
          <img src="/assets/images/carousel/${this.slides[0].image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${this.slides[0].price.toFixed(2)}</span>
            <div class="carousel__title">${this.slides[0].name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
              
      </div>
      
    </div>
    
    `)
    return productSlide
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

    // let btnAddToCart1 = this.elem.querySelector('.carousel__button1');
    let currenCartNumber = currentSlideNumber
    let btnAddToCartAll = this.elem.querySelectorAll('.carousel__button');
    // console.log(btnAddToCart[currentSlideNumber]);
    // console.log(currentSlideNumber);
    // console.log(this.initCarousel.currentSlideNumber);

    btnAddToCartAll[currenCartNumber].addEventListener('product-add', event => {
      console.log(btnAddToCartAll[currenCartNumber]);
      console.log(currenCartNumber);
      console.log(this.slides[currentSlideNumber].id);
    })

    btnAddToCartAll[currenCartNumber].addEventListener('click', event => {
      let clickEvent = new CustomEvent('product-add', {
        detail: this.slides[currenCartNumber].id,
        bubbles: true,
      })
      btnAddToCartAll[currenCartNumber].dispatchEvent(clickEvent);
    })

  }

  test() {
    // console.log(this.slidesObj)
  }

}