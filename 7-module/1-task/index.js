import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.addMenu();
    this.scrollMenu();
    this.arrowVisible();
    this.clickLinkMenu();
  }

  categoriesMenu() {
    let menuNav = this.categories
      .map((item) =>
        `<a href="#" class="ribbon__item" 
        data-id="${item.id}">${item.name}</a>`)
      .join('');

    let menu = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${menuNav}
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right  ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `)
    return menu
  }

  addMenu() {
    this.elem = this.categoriesMenu();
  }

  scrollMenu() {
    this.ribbonInner = this.elem.querySelector('.ribbon__inner');

    this.elem.addEventListener('click', ({ target }) => {
      let toLeft = target.closest('.ribbon__arrow_left');
      let toRight = target.closest('.ribbon__arrow_right');

      if (toLeft) this.ribbonInner.scrollBy(-350, 0);
      if (toRight) this.ribbonInner.scrollBy(350, 0);
    });
  }

  arrowVisible() {
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    this.ribbonInner.addEventListener('scroll', () => {
      let scrollLeft = this.ribbonInner.scrollLeft;
      let scrollRight = this.ribbonInner.scrollWidth - scrollLeft - this.ribbonInner.clientWidth;

      (scrollLeft !== 0) ?
        arrowLeft.classList.add('ribbon__arrow_visible') :
        arrowLeft.classList.remove('ribbon__arrow_visible');
      (scrollRight === 0) ?
        arrowRight.classList.remove('ribbon__arrow_visible') :
        arrowRight.classList.add('ribbon__arrow_visible');
    });
  };

  clickLinkMenu() {
    let linkMenuAll = this.elem.querySelectorAll('.ribbon__item');

    this.elem.addEventListener('click', ( ev ) => {
      ev.preventDefault();
      let linkMenu = ev.target.closest('.ribbon__item');
      
      if (linkMenu) {
        for (const key of linkMenuAll) {
          key.classList.remove('ribbon__item_active')
        }
        linkMenu.classList.add('ribbon__item_active')
      };

      if (linkMenu) {
        let id = ev.target.closest('[data-id]').dataset.id;
        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: id,
          bubbles: true
        }));
      }
    });
  };
}
