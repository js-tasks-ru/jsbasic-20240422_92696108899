export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    
    this.currentSteps();
    this.addSlider();
    this.createSliderSteps();
    this.move();
   

    this.test();

  }

  addSlider() {
    this.elem = document.createElement('div');
    this.elem.innerHTML =
      `
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: 50%;">
          <span class="slider__value">${this.numberCurrentStep}</span>
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
    }
  };

  currentSteps(){
    this.numberCurrentStep = 2;

    let borders = this.sliderOffsetX / this.steps
    console.log(borders);

    // this.sliderMove = this.elem.querySelector('.slider');
    // this.sliderPositionX = this.sliderMove.offsetWidth;
    
    // this.sliderPositionX = of
    // Number(this.elem.querySelector('.slider__value').innerHTML);


  }

  move() {
    this.sliderMove = this.elem.querySelector('.slider');

    
    // console.log(sliderPositionX);
    console.log(this.sliderMove);
    this.sliderMove.addEventListener('click', (ev) => {
      let slider = ev.currentTarget.getBoundingClientRect();
      let clickX = ev.clientX - slider.left;

      this.sliderOffsetX = this.sliderMove.offsetWidth;
      console.log(this.sliderOffsetX);
      // let slider1 = ev.currentTarget.closest('.slider');
      
      this.currentSteps()
      
      // if(slider){
        
      // console.log(slider)
      // console.log(slider1)
      // console.log('X', ev.offsetX);
      // console.log('Y', ev.offsetY);
      // console.log('pageX', ev.pageX);
      // console.log('pageY', ev.pageY);
      // }
      // if (slider) {
      //   slider.slider__value;
      // }
    });

  }
  /* 

  var rect = e.currentTarget.getBoundingClientRect(),
      offsetX = e.clientX - rect.left,
      offsetY = e.clientY - rect.top;


    closeBTN() {
      this.modal.addEventListener('click', ({ target }) => {
        let BTN = target.closest('.modal__close');
        if (BTN) this.close();
      });
    }
  */




  test() {
    // console.log('this.elem:', this.elem)
    // console.log('this.sliderPositionX :', this.sliderPositionX )
    // console.log('this.numberCurrentStep:', this.numberCurrentStep)


  }







}




/* 

   // }
    // this.test = "<div>alert('Я Джон в раздражающем alert!')</div>";
    // return this.test.innerHTML  // 


    // return '<div></div>'
    /* 

        <div class="slider__steps">
          <span></span>
          <span></span>
          <span class="slider__step-active"></span>
          <span></span>
          <span></span>
        </div>



  
    add() {
    this.elem = document.createElement('TABLE')
    this.elem.innerHTML = this.rows
      .map(({ name, age, salary, city }) =>
        `<tr>
          <td>${name}</td><td>${age}</td><td>${salary}</td><td>${city}</td><td><button>X</button></td>
        </tr>`)
      .join('');

    this.user
  }
 */

