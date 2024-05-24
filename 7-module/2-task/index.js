import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    // this.open();
    // this.setTitle('modal title');
    // this.setBody(node);
    this.close();

  }
  open() {
    this.openModal = createElement(`
      <div class="container">
        <div class="modal">
          <div class="modal__overlay"></div>
      
          <div class="modal__inner">
            <div class="modal__header">
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>
      
              <h3 class="modal__title">
                Вот сюда нужно добавлять заголовок
              </h3>
            </div>
            <div class="modal__body">
              A сюда нужно добавлять содержимое тела модального окна
            </div>
          </div>

        </div>
      </div>
    `)
    document.body.append(this.openModal);
    document.body.classList.add('is-modal-open');
  };
  setTitle(ModalTitle) {
    this.ModalTitle = 1
  };
  setBody(node) {

  };
  close() {
    console.log(this.openModal)
  };



}
