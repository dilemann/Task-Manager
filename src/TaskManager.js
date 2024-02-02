import User from './User.js';
import UserEvent from './enums/user-event.enum.js';
import ModalEvent from './enums/modal-event.enum.js';
import MessageWindow from './MessageWindow.js';
import UserInputModal from './UserInputModal.js';

import UserSelectionModal from './UserSelectionModal.js';

class TaskManager {
  constructor() {
    this.currentUser = undefined;
    this.userList = [];

    // Stilvariablen erstellen
    this.containerClassName = 'container';
    this.appClassName = 'app';
    this.navClassName = 'nav';
    this.addBtnClassList = 'action__btn btn';
    this.removeBtnClassList = 'remove__btn btn';

    // Fensterschloss Hintergrund definieren
    this.overlay = document.createElement('div');
    this.overlay.className = 'overlay';
    document.body.append(this.overlay);

    // Erstelle APP-Container
    const element = document.createElement('div');
    element.className = this.appClassName;
    document.body.append(element);

    // Erstelle Buttons für User-Management
    this.addUserBtn = this.createAddUserButton();
    element.append(this.addUserBtn);
    this.removeUserBtn = this.createRemoveUserButton();
    element.append(this.removeUserBtn);

    // Erstelle Manager Container
    this.container = document.createElement('div');
    this.container.classList.add(this.containerClassName);
    element.append(this.container);

    // Erstelle Dialog-Fenster
    this.infoMessage = new MessageWindow();

    // Event User-Activate
    document.addEventListener(UserEvent.userActivated, (event) => {
      this.currentUser = this.userList.find(
        (user) => user.title === event.detail.userTitle
      );
      this.loadUserData(this.currentUser.title);
      if (this.userPopup) this.userPopup.show(this.currentUser.title);

      this.saveNavList();
    });

    // Event der Bildschirmsperre
    document.addEventListener(ModalEvent.screenLock, (event) => {
      if (event.detail.screenLock) {
        this.overlay.classList.add('active');
        this.overlay.onclick = () => this.dispatchCloseModal();
        return;
      }
      this.overlay.classList.remove('active');
    });

    this.initialise();
  }

  createAddUserButton() {
    const addUserBtn = document.createElement('button');
    addUserBtn.innerHTML = 'Add User';
    addUserBtn.className = this.addBtnClassList;
    addUserBtn.addEventListener('click', () => {
      const userInputModal = new UserInputModal();
      userInputModal.okButton.addEventListener('click', () => {
        if (!userInputModal.input.value) return;
        this.addAndSaveUser(userInputModal.getValue());
        userInputModal.container.remove();
        userInputModal.active = false;
      });
    });
    return addUserBtn;
  }

  createRemoveUserButton() {
    const removeUserBtn = document.createElement('button');
    removeUserBtn.innerHTML = 'Remove User';
    removeUserBtn.className = this.removeBtnClassList;
    removeUserBtn.addEventListener('click', () => {
      this.removeUser();
    });
    return removeUserBtn;
  }

  addAndSaveUser(title) {
    const foundDuplicate = this.userList.find((user) => user.title === title);
    if (foundDuplicate) {
      this.infoMessage.showMessage('Same name is forbidden!', 'red');
      return;
    }
    this.addNewUser(title).activate();

    this.saveNavList();
    this.infoMessage.showMessage(`user "${title}" added`);
  }

  /**
   * ein neuer Benutzer wird mit dem übergebenem Titel erstellt
   * @param {string} title
   */
  addNewUser(title) {
    if (!title) return;

    this.currentUser = new User(title);
    if (this.userList.length === 0) {
      this.userPopup = new UserSelectionModal();
      this.container.append(this.userPopup.container);
    }
    this.userList.push(this.currentUser);

    this.userPopup.option.append(this.currentUser.userTitle);
    return this.currentUser;
  }

  loadUserData(title) {
    const userToLoad = this.userList.find((user) => user.title === title);
    const previousContainer = document.querySelector(
      `.${userToLoad.className}`
    );

    if (previousContainer) previousContainer.remove();

    this.container.append(userToLoad.container);
  }

  /**
   * Löschung von Benutzern
   */
  removeUser() {
    if (this.userList.length === 0) return;

    const indexOfUserToRemove = this.userList.findIndex(
      (user) => user.active === true
    );

    if (indexOfUserToRemove !== -1) {
      const userToRemove = this.userList[indexOfUserToRemove];

      // Event User Remove für seine Notizen aus dem Speicher zu löschen
      // und User Elemente vom User zu löschen
      const removeUser = new CustomEvent(UserEvent.removeUser, {
        detail: { userTitle: userToRemove.title },
      });
      document.dispatchEvent(removeUser);

      this.userList.splice(indexOfUserToRemove, 1);
      this.saveNavList();
      this.infoMessage.showMessage(`user "${userToRemove.title}" removed`);
    }

    const newСurrentUser = this.userList[0];
    if (!newСurrentUser) {
      this.userPopup.container.remove();
      return;
    }

    this.currentUser = newСurrentUser;
    this.currentUser.activate();
  }

  /**
   * Initialisiert die ToDo-Anwendung.
   */
  initialise() {
    const userLocalStorage = localStorage.getItem('user-list');
    if (!userLocalStorage || userLocalStorage.length < 3) return;

    const list = this.getNavList();
    let activeUser;

    list.forEach(({ user }) => {
      const newUser = this.addNewUser(user.title);
      if (user.active) activeUser = newUser;
    });
    activeUser.activate();
  }

  saveNavList() {
    localStorage.setItem(
      'user-list',
      JSON.stringify(
        this.userList.map((item) => ({
          user: item.toJSON(),
        }))
      )
    );
  }

  getNavList() {
    return JSON.parse(localStorage.getItem('user-list'));
  }

  dispatchCloseModal() {
    const closeModal = new CustomEvent(ModalEvent.closeModal);
    document.dispatchEvent(closeModal);
  }
}

export default new TaskManager();
