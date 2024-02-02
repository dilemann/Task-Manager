import ModalEvent from './enums/modal-event.enum.js';

class UserSelectionModal {
  constructor() {
    this.active = false;
    // erstelle container
    this.container = document.createElement('div');
    this.container.className = 'user_selection_container';

    // erstelle title
    this.header = document.createElement('h2');
    this.header.textContent = 'User: ';
    this.container.appendChild(this.header);

    // erstelle dropDown
    this.dropDown = document.createElement('div');
    this.dropDown.className = 'user_selection_dropdown';
    this.container.appendChild(this.dropDown);

    // erstelle dropDown userTitle
    this.userTitle = document.createElement('h2');
    this.dropDown.appendChild(this.userTitle);

    // erstelle user -list container
    this.option = document.createElement('div');
    this.option.className = 'option';
    this.dropDown.appendChild(this.option);

    this.dropDown.addEventListener('click', () => {
      this.dropDown.classList.toggle('active_userName');
      this.active = !this.active;
    });

    document.addEventListener(ModalEvent.closeModal, () => {
      if (!this.active) return;
      this.active = false;
      this.dropDown.classList.remove('active_userName');
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

  show(currentUserName) {
    this.userTitle.textContent = currentUserName;
  }
}

export default UserSelectionModal;
