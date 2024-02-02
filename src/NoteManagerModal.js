import ModalEvent from './enums/modal-event.enum.js';

class NoteManagerModal {
  constructor() {
    this.active = false;
    // Stilvariablen erstellen
    this.containerClassName = 'noteManager_container';
    this.dropDownMenuClassName = 'noteManager_dropdown';
    this.circleClassName = 'noteManager_circle';
    this.toggleModalClassName = 'noteManager_show-modal';
    this.doneClassName = 'done';
    this.editClassName = 'edit';
    this.deleteClassName = 'delete';

    // erstelle Elemente
    this.container = document.createElement('div');
    this.createCircleElement();
    this.modal = document.createElement('div');
    this.done = document.createElement('p');
    this.edit = document.createElement('p');
    this.save = document.createElement('p');
    this.delete = document.createElement('p');
    this.done.innerHTML = 'Resolve';
    this.edit.innerHTML = 'Edit';
    this.delete.innerHTML = 'Remove';

    // füge Elementen Stile hinzu
    this.container.className = this.containerClassName;
    this.modal.className = this.dropDownMenuClassName;
    this.done.className = this.doneClassName;
    this.edit.className = this.editClassName;
    this.delete.className = this.deleteClassName;

    // füge Elemente zum Dom hinzu
    this.container.append(this.modal);
    this.modal.append(this.done);
    this.modal.append(this.edit);
    this.modal.append(this.delete);

    // addeventlistener
    this.container.addEventListener('click', () => this.toggleModal());

    document.addEventListener(ModalEvent.closeModal, () => {
      if (!this.active) return;
      this.active = false;
      this.container.classList.remove(this.toggleModalClassName);
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

  createCircleElement() {
    for (let i = 1; i < 4; i += 1) {
      this.circle = document.createElement('div');
      this.circle.className = this.circleClassName;
      this.container.append(this.circle);
    }
  }

  toggleModal() {
    this.container.classList.toggle(this.toggleModalClassName);
    this.active = !this.active;
  }
}

export default NoteManagerModal;
