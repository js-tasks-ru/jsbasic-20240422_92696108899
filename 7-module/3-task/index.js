import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {

    this.steps = steps;
    this.value = value;

    this.render();
    this.move();
  }

  render() {
    this.elem = createElement(`
       <div class="slider">
         <div class="slider__thumb">
           <span class="slider__value"></span>
         </div>
         <div class="slider__progress"></div>
         <div class="slider__steps">
           ${'<span></span>'.repeat(this.steps)}
         </div>
       </div>
     `);
    this.sliderSteps = this.elem.querySelector('.slider__steps');
    this.sliderValue = this.elem.querySelector('.slider__value');
    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderProgress = this.elem.querySelector('.slider__progress');

    this.sliderSteps.children[this.value].classList.add('slider__step-active');
    this.sliderValue.textContent = this.value;

    this.updateSliderStyle();
  };

  move() {
    this.elem.addEventListener('click', (ev) => {

      let newLeft = (ev.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
      this.value = Math.round((this.steps - 1) * newLeft);

      this.updateSliderStyle();

      this.sendDataServer();
    });
  }

  updateSliderStyle() {
    if (this.elem.querySelector('.slider__step-active')) {
      this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    }
    this.sliderSteps.children[this.value].classList.add('slider__step-active');
       
    this.valuePercents = (this.value / (this.steps - 1)) * 100;
    this.sliderThumb.style.left = `${this.valuePercents}%`;
    this.sliderProgress.style.width = `${this.valuePercents}%`;
    this.sliderValue.innerHTML = this.value;
  };

  sendDataServer() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  };
}
