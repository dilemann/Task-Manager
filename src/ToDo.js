import User from './User.js';

class ToDo {
  constructor(parent) {
    this._currentUser = [];
    this._lastUser = [];
    this.userList = [];
    this.parent = parent;
    this.container = document.createElement('div');
    this.wrapperNav = document.createElement('div');
    this.nav = document.createElement('nav');
    this.header = document.createElement('h2');

    this.actionBtn = document.querySelector('#add');

    this.container.classList.add('container');
    this.nav.classList.add('nav');

    this.wrapperNav.append(this.nav);
    this.wrapperNav.append(this.header);
    this.container.append(this.wrapperNav);
    this.parent.append(this.container);
    this.ToDoInit();
  }

  /**
   * ein neuer Benutzer wird mit dem übergebenem Titel erstellt
   * @param {string} title
   */

  addNewUser(title) {
    if (!title) return;
    const foundDuplicate = this.userList.some((user) => user.title === title);
    if (foundDuplicate) {
      alert('Same name is forbidden!');
      return;
    }
    this.currentUser = new User(this, title);
  }

  /**
   * Löschung von Benutzern
   */
  removeUser() {
    if (this.userList.length === 0) return;

    if (this.userList.length <= 1) {
      this.userList = [];
      this.nav.innerHTML = '';
      this.header.innerHTML = '';
      this.container.lastChild.remove();
      localStorage.removeItem('nav-list');
      return;
    }

    this.userList.forEach((user) => {
      if (user.userNavBtn.className === 'user__btn btn user__btn_active') {
        user.userNavBtn.remove();
        user.container.remove();

        const indexToRemove = this.userList.indexOf(user);
        if (indexToRemove !== -1) {
          this.userList.splice(indexToRemove, 1);
        }
      }
    });

    const lastUser = this.userList[this.userList.length - 1];
    lastUser.userNavBtn.className.userNavBtnActivate();

    this.ToDoInit();
  }

  /**
   * Legt den aktuellen Benutzer fest.
   * @type {User} ist der Name des aktuellen Benutzers.
   */
  set currentUser(user) {
    this._currentUser = user;
    this.userList.push(this.currentUser);
    console.log('setter!');
    user.userNavBtnActivate();
  }

  /**
   * Ruft den aktuellen Benutzer ab.
   * @Typ {String}
   */
  get currentUser() {
    return this._currentUser;
  }

  /**
   * Initialisiert die ToDo-Anwendung.
   */
  ToDoInit() {
    if (!localStorage.getItem('nav-list')) return;
    const list = JSON.parse(localStorage.getItem('nav-list'));
    this.nav.innerHTML = '';
    let lastActiveUser = null;

    list.forEach((user) => {
      const newUser = new User(this, user.title);
      this.userList.push(newUser);
      if (user.btn === 'user__btn btn user__btn_active') {
        lastActiveUser = newUser;
        lastActiveUser.userNavBtn.className = 'user__btn btn user__btn_active';
      }
    });

    if (lastActiveUser) lastActiveUser.reload();
  }
}

export default ToDo;
