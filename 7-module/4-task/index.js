import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 3 }) {

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

  onClick = (event) => {
    let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    this.value = Math.round((this.steps - 1) * newLeft);
    // 
    this.valuePercents = (this.value / (this.steps - 1)) * 100;
    // 
    this.updateSliderStyle();
    this.sendDataServer();
  }

  move() {
    this.sliderThumb.ondragstart = () => false;
    this.elem.onclick = this.onClick;

    this.sliderThumb.addEventListener('pointerdown', (mousedownEvent) => {
      this.elem.classList.add('slider_dragging');

      if (mousedownEvent.target.closest('.slider__thumb')) {
        // 1) mousedown - подготовка к перемещению
        this.sliderThumb.style.position = 'absolute';
        this.sliderThumb.style.zIndex = 1000;

        // 2) mousemove - передвигаем элемент на новые координаты меняя left/top
        this.onMousemove = (mouseMoveEvent) => {

          let x = (mouseMoveEvent.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

          if (x < 0) { x = 0; }
          if (x > 1) { x = 1; }

          this.sliderThumb.style.left = x * 100 + '%';
          this.sliderProgress.style.width = x * 100 + '%';
        };
        this.elem.addEventListener('pointermove', this.onMousemove);
      } // END if (mousedownEvent.target.closest('.slider__thumb')

      let onMouseUp = (mouseUpEvent) => {
        this.elem.classList.remove('slider_dragging');

        let newLeft = (mouseUpEvent.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
        if (newLeft > 1) newLeft = 1;
        if (newLeft < 0) newLeft = 0;
        this.value = Math.round((this.steps - 1) * newLeft);

        this.valuePercents = (this.value / (this.steps - 1)) * 100;
        if (mousedownEvent.target.closest('.slider__thumb')) {
          this.elem.removeEventListener('pointermove', this.onMousemove);
          document.removeEventListener('pointerup', onMouseUp);

          this.updateSliderStyle();
          this.sendDataServer();
        }
      }
      document.addEventListener('pointerup', onMouseUp);
    })
  };

  updateSliderStyle() {
    this.valuePercents = (this.value / (this.steps - 1)) * 100;
    this.sliderThumb.style.left = `${this.valuePercents}%`;
    this.sliderProgress.style.width = `${this.valuePercents}%`;
    this.sliderValue.innerHTML = this.value;

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

