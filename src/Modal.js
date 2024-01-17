class Modal {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'modal_message';
    this.container.style.position = 'fixed';
    this.container.style.top = '-100%';
    document.body.appendChild(this.container);
  }

  showMessage(item) {
    this.container.innerHTML = '';
    this.container.style.color = 'beige';
    this.container.innerHTML = item;
    this.container.style.animation = 'slideIn .5s forwards';
    setTimeout(() => {
      this.container.style.animation = 'slideOut 2s forwards';
    }, 2000);
    return this;
  }

  showWarningStyle() {
    this.container.style.color = 'red';
  }
}

export default Modal;
