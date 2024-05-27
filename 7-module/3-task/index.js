export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.addSlider();
    this.createSliderSteps();
    this.configMoveSteps();
  }

  addSlider() {
    this.elem = document.createElement('div');
    this.elem.innerHTML =
      `
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: 50%;">
          <span class="slider__value">2</span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress" style="width: 50%;"></div>

        <!--Шаги слайдера-->
        <div class="slider__steps">
          ${this.sliderSteps}
        </div>

      </div>
    `
  };

  createSliderSteps() {
    this.sliderSteps = this.elem.querySelector('.slider__steps')
    this.sliderSteps.innerHTML = '<span></span>';

    for (let i = 0; i < this.steps - 1; i++) {
      this.sliderSteps.insertAdjacentHTML('beforeend', '<span></span>');
    };

  };

  configMoveSteps() {
    this.numberCurrentStep = this.elem.querySelector('.slider__value');
    this.sliderMove = this.elem.querySelector('.slider');
    this.sliderStepsAll = this.elem.querySelector('.slider__steps').childNodes;
    this.sliderStepsAll[this.numberCurrentStep.innerText].classList.add('slider__step-active')
    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderProgress = this.elem.querySelector('.slider__progress');

    window.addEventListener('load', (ev) => {
      this.sliderWidthX = this.sliderMove.offsetWidth;
      this.stepWidthX = this.sliderWidthX / (this.steps - 1);
      this.move();
    });
  }

  move() {
    this.sliderMove.addEventListener('click', (ev) => {
      let slider = ev.currentTarget.getBoundingClientRect();
      let clickX = ev.clientX - slider.left;
      let currentStepWidthX = this.stepWidthX / 2;

      for (let i = 1; i <= this.steps; i++) {
        if (clickX > currentStepWidthX) {
          currentStepWidthX = currentStepWidthX + this.stepWidthX;
        } else {
          this.createSliderSteps();
          this.numberCurrentStep.innerText = i;
          if (this.sliderStepsAll[i]) this.sliderStepsAll[i - 1].classList.add('slider__step-active');
          let leftPercents = clickX / this.sliderWidthX * 100;
          this.sliderThumb.style.left = `${leftPercents}%`;
          this.sliderProgress.style.width = `${leftPercents}%`;

          let button = ev.target.closest('.slider');
          if (button) {
            this.value = i - 1;
            this.elem.dispatchEvent(new CustomEvent('slider-change', {
              detail: this.value,
              bubbles: true
            }));
          };

          break;
        }
      }

    });
  }

}

