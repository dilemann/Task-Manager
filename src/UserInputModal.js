import ModalEvent from './enums/modal-event.enum.js';

class UserInputModal {
  constructor() {
    this.active = true;
    // Erstelle HauptContainer
    this.container = document.createElement('div');
    this.container.innerHTML = "Enter the user's name:";
    this.container.classList.add('modal_content');
    document.body.appendChild(this.container);

    // Erstelle input
    this.input = document.createElement('input');
    this.container.appendChild(this.input);
    this.input.focus();

    // Erstelle confirm-Button
    this.okButton = document.createElement('button');
    this.okButton.textContent = 'OK';
    this.container.appendChild(this.okButton);
    this.okButton.className = 'modal_ok';

    // Erstelle cancel-Button
    this.cancelButton = document.createElement('button');
    this.cancelButton.textContent = 'Cancel';
    this.container.appendChild(this.cancelButton);
    this.cancelButton.className = 'modal_cancel';

    // Event
    this.cancelButton.addEventListener('click', () => {
      this.container.remove();
      this.active = false;
    });
  }

  set active(bool) {
    this.activeValue = bool;
    this.dispatchScreenLock();
  }

  get active() {
    return this.activeValue;
  }

  dispatchScreenLock() {
    const screenLock = new CustomEvent(ModalEvent.screenLock, {
      detail: { screenLock: this.active },
    });
    document.dispatchEvent(screenLock);
  }

  getValue() {
    return this.input.value;
  }
}

export default UserInputModal;
