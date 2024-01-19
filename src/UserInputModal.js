class UserInputModal {
  constructor() {
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
    });
  }

  getValue() {
    return this.input.value;
  }
}

export default UserInputModal;
