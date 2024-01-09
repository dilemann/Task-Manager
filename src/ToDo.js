import User from './User.js';

class ToDo {
  constructor(parent) {
    this._currentUser = [];
    this.userList = [];
    this.user = null;
    this.parent = parent;
    this.container = document.createElement('div');
    this.wrapperNav = document.createElement('div');
    this.nav = document.createElement('nav');
    this.header = document.createElement('h2');

    this.actionBtn = document.querySelector('#add');

    this.container.classList.add('container');
    this.nav.classList.add('nav');
    // this.button.disabled = false;

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
    if (this.userList.length !== 0) this.container.lastChild.remove();
    this.user = new User(this.container, title);
    this.addNavList(title);
    this.header.textContent = title;
  }

  /**
   * Löschung von Benutzern
   */
  removeUser() {
    if (!this.user) return;
    this.header.textContent = '';
    if (localStorage.getItem(this.user.title)) {
      localStorage.removeItem(this.user.title);
    }
    if (this.userList.length > 1) {
      const newUserList = this.userList.filter(
        (num) => num.title !== this.user.title
      );
      this.user.container.remove();
      this.userList = newUserList;
      const currentUser = this.userList[this.userList.length - 1];
      localStorage.setItem('nav-list', JSON.stringify(this.userList));
      localStorage.setItem('currentUser', JSON.stringify(currentUser.title));
      this.nav.innerHTML = '';
      this.userList = [];
      this.ToDoInit();
    } else {
      this.userList = [];
      this.nav.innerHTML = '';
      this.user.container.remove();
      localStorage.removeItem('nav-list');
      localStorage.removeItem('currentUser');
    }
  }

  /**
   * Fügt der Navigation eine Benutzerschaltfläche hinzu.
   * @param {string} title - Titel der Benutzerschaltfläche.
   */
  addNavList(title) {
    const btn = document.createElement('button');
    btn.classList.add('user__btn', 'btn');
    this.nav.append(btn);
    btn.textContent = title;
    btn.addEventListener('click', () => {
      this.currentUser = title;
    });
    this.userList.push({
      title,
      btn,
    });
    this.btnActive(title);
  }

  /**
   * Legt den aktuellen Benutzer fest.
   * @type {string} ist der Name des aktuellen Benutzers.
   */
  set currentUser(title) {
    this._currentUser = title;
    this.container.lastChild.remove();
    this.user = new User(this.container, title);
    this.header.textContent = title;
    this.btnActive(title);
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
    if (
      localStorage.getItem('currentUser') &&
      localStorage.getItem('nav-list')
    ) {
      const list = JSON.parse(localStorage.getItem('nav-list'));
      const currentUserName = JSON.parse(localStorage.getItem('currentUser'));
      list.forEach((element) => this.addNavList(element.title));
      this.user = new User(this.container, currentUserName);
      this.btnActive(currentUserName);
      this.header.textContent = currentUserName;
    }
  }

  /**
   * Schaltet die Schaltfläche des Benutzers aktiv.
   * @param {string} title ist der Name des Benutzers, für den die Schaltfläche aktiviert wird.
   */
  btnActive(title) {
    localStorage.setItem('nav-list', JSON.stringify(this.userList));
    this.userList.forEach((element) => {
      element.btn.classList.remove('user__btn_active');
      if (title === element.btn.textContent) {
        element.btn.classList.add('user__btn_active');
      }
    });
    localStorage.setItem('currentUser', JSON.stringify(title));
  }
}

export default ToDo;
