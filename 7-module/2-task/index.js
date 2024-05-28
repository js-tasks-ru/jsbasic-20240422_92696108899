import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.createModal();
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add('is-modal-open');
    this.closeBTN();
    this.closeEscape();
  };

  createModal() {
    this.modal = createElement(`
  <div class="container">
    <div class="modal">
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
          </h3>
        </div>
        <div class="modal__body">
           A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>
  </div>
      `)
  }

  setTitle(modalTitle) {
    this.modal.querySelector('.modal__title').textContent = modalTitle;
  };

  setBody(nodeBody) {
    this.modalBody = this.modal.querySelector('.modal__body');
    this.modalBody.innerText = '';
    this.modalBody.append(nodeBody);
  };

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    this.removeEvent();
  };

  closeBTN() {
    this.modal.addEventListener('click', ({ target }) => {
      let BTN = target.closest('.modal__close');
      if (BTN) this.close();
    });
  }
  
  closeEscape() {
    this.closeModalEscape = (ev)  => {
      if (ev.code === 'Escape') {
        ev.preventDefault();
        this.close();
      };
    }
    document.addEventListener('keydown', this.closeModalEscape);
  }
 
  removeEvent(){
    document.removeEventListener('keydown', this.closeModalEscape);
  }
}
     
