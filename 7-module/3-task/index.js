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

    this.elem.querySelector('.slider__steps')
      .children[this.value].classList.add('slider__step-active');

    this.elem.querySelector('.slider__value').textContent = this.value;
  };

  move() {
    this.elem.addEventListener('click', (ev) => {

      let newLeft = (ev.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
      this.value = Math.round((this.steps - 1) * newLeft);
      let valuePercents = (this.value / (this.steps - 1)) * 100;

      this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
      this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;

      this.elem.querySelector('.slider__value').innerHTML = this.value;

      this.updateSliderStyle();

      this.sendDataServer();
    });
  }

  updateSliderStyle() {
    if (this.elem.querySelector('.slider__step-active')) {
      this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    }

    this.elem.querySelector('.slider__steps').children[this.value].classList.add('slider__step-active');
  };

  sendDataServer() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  };
}
