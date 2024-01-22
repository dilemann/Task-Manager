class UserSelectionModal {
  constructor() {
    // erstelle container
    this.container = document.createElement('div');
    this.container.className = 'user_popup';

    // erstelle title
    this.header = document.createElement('h2');
    this.header.textContent = 'User: ';
    this.container.appendChild(this.header);

    // erstelle dropDown
    this.dropDown = document.createElement('div');
    this.dropDown.className = 'user_dropdown';
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
    });
  }

  show(currentUserName) {
    this.userTitle.textContent = currentUserName;
  }
}

export default UserSelectionModal;