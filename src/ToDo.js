import User from './User.js';

class ToDo {
  constructor(parent) {
    this._currentUser = [];
    this._lastUser = [];
    this.userList = [];
    this.parent = parent;

    // erstelle Elemente
    this.container = document.createElement('div');
    this.wrapperNav = document.createElement('div');
    this.nav = document.createElement('nav');
    this.header = document.createElement('h2');

    // füge Elementen Stile hinzu
    this.container.classList.add('container');
    this.nav.classList.add('nav');

    // füge Elemente zum Dom hinzu
    this.wrapperNav.append(this.nav);
    this.wrapperNav.append(this.header);
    this.container.append(this.wrapperNav);
    this.parent.append(this.container);

    this.initialise();
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
    this.userList.push(this.currentUser);
    this.saveNavList();
  }

  /**
   * Löschung von Benutzern
   */
  removeUser() {
    if (this.userList.length === 0) return;

    console.log(this.userList);
    const indexOfUserToRemove = this.userList.findIndex(
      (user) => user.active === true
    );
    console.log(indexOfUserToRemove);
    let needToSave = false;
    if (indexOfUserToRemove !== -1) {
      const userToRemove = this.userList[indexOfUserToRemove];
      userToRemove.userNavBtn.remove();
      userToRemove.container.remove();
      this.header.innerHTML = '';

      this.userList.splice(indexOfUserToRemove, 1);
      needToSave = true;
    }

    const newСurrentUser = this.userList[this.userList.length - 1];
    if (newСurrentUser) {
      this.currentUser = newСurrentUser;
      needToSave = true;
    }
    if (needToSave) this.saveNavList();
  }

  /**
   * Legt den aktuellen Benutzer fest.
   * @type {User} ist der Name des aktuellen Benutzers.
   */
  set currentUser(user) {
    this._currentUser = user;
    const activeUser = this.userList.find((storedUser) => storedUser.active);
    if (activeUser) activeUser.deactivate();
    this.currentUser.activate();
    this.currentUser.reload();
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
  initialise() {
    if (!localStorage.getItem('user-list')) return;

    const list = this.getNavList();
    this.nav.innerHTML = '';
    let lastActiveUser = null;

    list.forEach(({ user }) => {
      console.log(user.active);
      const newUser = new User(this, user.title, user.active);
      this.userList.push(newUser);
      if (user.active) {
        lastActiveUser = newUser;
      }
    });
    console.log(this.userList);

    if (lastActiveUser) lastActiveUser.reload();
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

export default ToDo;
