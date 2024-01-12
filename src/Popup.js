class Popup {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'popup-nav-container';

    this.createCircle();

    this.modal = document.createElement('div');
    this.modal.className = 'popup-modal';
    this.done = document.createElement('p');
    this.edit = document.createElement('p');
    this.save = document.createElement('p');
    this.delete = document.createElement('p');

    this.done.innerHTML = 'Resolve';
    this.edit.innerHTML = 'Edit';
    this.save.innerHTML = 'Save';
    this.delete.innerHTML = 'Remove';

    this.modal = document.createElement('div');
    this.modal.className = 'popup-modal';
    this.done.className = 'done';
    this.edit.className = 'edit';
    this.save.className = 'save';
    this.delete.className = 'delete';

    this.modal.append(this.done);
    this.modal.append(this.edit);
    this.modal.append(this.save);
    this.modal.append(this.delete);

    this.container.append(this.modal);

    this.container.addEventListener('click', () => this.toggleModal());
  }

  createCircle() {
    for (let i = 1; i < 4; i++) {
      this.circle = document.createElement('div');
      this.circle.className = 'popup-circle';
      this.container.append(this.circle);
    }
  }

  toggleModal() {
    this.modal.classList.toggle('show-modal');
  }
}

export default Popup;
