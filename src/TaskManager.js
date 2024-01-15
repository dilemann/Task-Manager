import User from './User.js';
import UserEvent from './enums/user-event.enum.js';

class TaskManager {
  constructor() {
    this.currentUser = undefined;
    this.userList = [];

    // Erstelle APP-Container
    const element = document.createElement('div');
    element.className = 'app';
    document.body.append(element);

    // Erstelle Buttons für User-Management
    this.addUserBtn = this.createAddUserButton();
    element.append(this.addUserBtn);
    this.removeUserBtn = this.createRemoveUserButton();
    element.append(this.removeUserBtn);

    // Erstelle Elemente
    this.nav = document.createElement('nav');
    this.container = document.createElement('div');
    this.wrapperNav = document.createElement('div');

    // füge Elementen Stile hinzu
    this.container.classList.add('container');
    this.nav.classList.add('nav');

    // füge Elemente zum Dom hinzu
    this.wrapperNav.append(this.nav);
    this.container.append(this.wrapperNav);
    element.append(this.container);

    document.addEventListener(UserEvent.userActivated, (event) => {
      this.currentUser = this.userList.find(
        (user) => user.title === event.detail.userTitle
      );
      this.loadUserData(this.currentUser.title);
      this.saveNavList();
    });

    this.initialise();
  }

  createAddUserButton() {
    const addUserBtn = document.createElement('button');
    addUserBtn.innerHTML = 'Add User';
    addUserBtn.className = 'action__btn btn';
    addUserBtn.addEventListener('click', () => {
      this.addAndSaveUser(prompt('enter User Name:'));
    });
    return addUserBtn;
  }

  createRemoveUserButton() {
    const removeUserBtn = document.createElement('button');
    removeUserBtn.innerHTML = 'Remove User';
    removeUserBtn.className = 'remove__btn btn';
    removeUserBtn.addEventListener('click', () => {
      this.removeUser();
    });
    return removeUserBtn;
  }

  addAndSaveUser(title) {
    const foundDuplicate = this.userList.find((user) => user.title === title);
    if (foundDuplicate) {
      alert('Same name is forbidden!');
      return;
    }
    this.addNewUser(title).activate();
    this.saveNavList();
  }

  /**
   * ein neuer Benutzer wird mit dem übergebenem Titel erstellt
   * @param {string} title
   */
  addNewUser(title) {
    if (!title) return;

    this.currentUser = new User(title);
    this.userList.push(this.currentUser);
    this.nav.append(this.currentUser.userNavBtn);
    // this.currentUser.activate();
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

    let needToSave = false;
    if (indexOfUserToRemove !== -1) {
      const userToRemove = this.userList[indexOfUserToRemove];
      userToRemove.userNavBtn.remove();
      userToRemove.container.remove();

      // Event User Remove für seine Notizen aus dem Speicher zu löschen
      const removeUser = new CustomEvent(UserEvent.removeUser, {
        detail: { userTitle: userToRemove.title },
      });
      document.dispatchEvent(removeUser);

      this.userList.splice(indexOfUserToRemove, 1);
      needToSave = true;
    }

    const newСurrentUser = this.userList[this.userList.length - 1];
    if (newСurrentUser) {
      this.currentUser = newСurrentUser;
      this.currentUser.activate();
      needToSave = false;
    }
    if (needToSave) this.saveNavList();
  }

  /**
   * Initialisiert die ToDo-Anwendung.
   */
  initialise() {
    if (!localStorage.getItem('user-list')) return;
    const list = this.getNavList();

    list.forEach(({ user }) => {
      // create newUser
      const newUser = this.addNewUser(user.title);
      if (user.active) newUser.activate();
    });
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
}

export default new TaskManager();
