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
    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderProgress = this.elem.querySelector('.slider__progress');
    this.elem.ondragstart = () => false;

    this.elem.addEventListener('pointerdown', (mousedownEvent) => {

      if (mousedownEvent.target.closest('.slider__thumb')) {
        // 1) mousedown - подготовка к перемещению
        this.shiftX = mousedownEvent.clientX;
        this.sliderThumb.style.position = 'absolute';
        this.sliderThumb.style.zIndex = 1000;
        console.log('this.elem.getBoundingClientRect().left', this.elem.getBoundingClientRect().left)

        // 2) mousemove - передвигаем элемент на новые координаты меняя left/top
        this.onMousemove = (mouseMoveEvent) => {
          let x = mouseMoveEvent.clientX - this.elem.getBoundingClientRect().left;
          if (x >= 0 && x <= this.elem.offsetWidth) {
            this.sliderThumb.style.left = x + 'px';
            this.sliderProgress.style.width = x + 'px';
          }
        };
        this.elem.addEventListener('pointermove', this.onMousemove);

      } // END if (mousedownEvent.target.closest('.slider__thumb')

      let onMouseUp = document.addEventListener('pointerup', (mouseUpEvent) => {

        let newLeft = (mouseUpEvent.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
        if (newLeft > 1) newLeft = 1;
        if (newLeft < 0) newLeft = 0;
        this.value = Math.round((this.steps - 1) * newLeft);
        this.valuePercents = (this.value / (this.steps - 1)) * 100;

        if (mousedownEvent.target.closest('.slider__thumb')) {
          this.elem.removeEventListener('pointermove', this.onMousemove);
          this.elem.removeEventListener('pointerup', onMouseUp);
          onMouseUp = null
        }

        this.updateSliderStyle();
        this.sendDataServer();
      });
    })
  };

  updateSliderStyle() {
    this.elem.querySelector('.slider__thumb').style.left = `${this.valuePercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${this.valuePercents}%`;
    this.elem.querySelector('.slider__value').innerHTML = this.value;

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



