class Popup {
  constructor() {
    // Stilvariablen erstellen
    this.className = 'popup__nav-container';
    this.dropDownMenuClassName = 'popup__dropdown-menu';
    this.circleClassName = 'popup__circle';
    this.toggleModalClassName = 'popup__show-modal';
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
    this.container.className = this.className;
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
  }

  createCircleElement() {
    for (let i = 1; i < 4; i += 1) {
      this.circle = document.createElement('div');
      this.circle.className = this.circleClassName;
      this.container.append(this.circle);
    }
  }

  toggleModal() {
    this.modal.classList.toggle(this.toggleModalClassName);
  }
}

export default Popup;
