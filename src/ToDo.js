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

    this.currentUser.container.remove();
    this.userList = this.userList.filter(
      (user) => user.userNavBtn !== this.currentUser.userNavBtn
    );
    this.userList[this.userList.length - 1].userNavBtn =
      this.currentUser.userNavBtn;
    console.log(this.userList);
    this.nav.innerHTML = '';
    this.userList.forEach((user) => {
      const newUser = new User(this, user.title);
    });
    this.currentUser.userNavBtnActivate();
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

    this.userList = JSON.parse(localStorage.getItem('nav-list'));
    this.nav.innerHTML = '';
    this.userList.forEach((user) => {
      const newUser = new User(this, user.title);
    });
  }
}

export default ToDo;
