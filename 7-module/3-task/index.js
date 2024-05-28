export default class StepSlider {
  constructor({ steps, value = 0 }) {
    
    this.steps = steps;
    this.value = value;

    this.addSlider();
    this.createSliderSteps();
    this.configSliderValue();
    this.configSteps();
  }

  addSlider() {
    this.elem = document.createElement('div');
    this.elem.innerHTML =
      `
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: 50%;">
          <span class="slider__value"></span>
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
  configSliderValue() {
    this.slider = this.elem.querySelector('.slider');
    this.sliderValue = this.elem.querySelector('.slider__value');
    this.sliderValue.textContent = this.value;

    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderProgress = this.elem.querySelector('.slider__progress');
  };

  configSteps() {
    this.sliderStepsAll = this.elem.querySelector('.slider__steps').childNodes;
    this.sliderStepsAll[this.sliderValue.innerText]
      .classList.add('slider__step-active')

    window.addEventListener('load', (ev) => {
      this.sliderWidthPX = this.slider.offsetWidth;
      this.stepWidthPX = this.sliderWidthPX / (this.steps - 1);

      this.move();
    });
  }

  move() {
    this.slider.addEventListener('click', (ev) => {
      let sliderX = ev.currentTarget.getBoundingClientRect();
      this.clickX = ev.clientX - sliderX.left;
      let currentStepWidthX = this.stepWidthPX;

      for (let i = 1; i < this.steps; i++) {
        if (this.clickX > currentStepWidthX) {
          currentStepWidthX = currentStepWidthX + this.stepWidthPX;
        } else {
          this.value = i
          
          this.createSliderSteps(); // this.removeClassSteps();

          this.updateSliderData();

          this.updateSliderStyle();
          
          this.sliderChange = ev.target.closest('.slider');
          if (sliderChange) this.sendDataServer();
          
          break;
        }
      }
    });
  }
  removeClassSteps() {

  };
  updateSliderData() {
    this.sliderValue.innerText = this.value;
    this.sliderStepsAll[this.value].classList.add('slider__step-active');
  };
  updateSliderStyle() {


    this.leftPercents = this.clickX / this.sliderWidthPX * 100;
    this.sliderThumb.style.left = `${this.leftPercents}%`;
    this.sliderProgress.style.width = `${this.leftPercents}%`;
  };
  sendDataServer(){
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));

  };

}
