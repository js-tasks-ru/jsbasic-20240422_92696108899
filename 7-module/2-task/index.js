import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {

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
          ${this.modalTitle}
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
    this.modalTitle = modalTitle
    this.createModal();
  };

  setBody(nodeBody) {
    this.modalBody = this.modal.querySelector('.modal__body');
    this.modalBody.innerText = '';
    this.modalBody.append(nodeBody);
  };

  close() {
    this.modalDelete = document.body.querySelector('.modal');
    this.modalDelete.parentNode.remove();
    document.body.classList.remove('is-modal-open');
    // this.removeEvent();
  };

  closeBTN() {
    this.modal.addEventListener('click', ({ target }) => {
      let BTN = target.closest('.modal__close');
      if (BTN) this.close();
    });
  }
  closeEscape() {
    let modalDel = document.body.querySelector('.modal');
    function closeModalEscape(ev) {
      if (ev.code === 'Escape') {
        modalDel.parentNode.remove();
        console.log(ev.code === 'Escape')
        document.removeEventListener('keydown', closeModalEscape);
      };
    }
    document.addEventListener('keydown', closeModalEscape);
  }


  
  // removeEvent(){
  //   document.removeEventListener('keydown', closeModalEscape);
  // }
}
     
