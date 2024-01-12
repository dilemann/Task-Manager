import NoteList from './NoteList.js';

class User {
  constructor({ container, nav, userList, saveNavList }, title, active) {
    // Komponenten der übergeordneten Klasse
    this.parentContainer = container;
    this.userNavigation = nav;
    this.userList = userList;

    // Methoden der übergeordneten Klasse
    this.saveNavList = saveNavList;

    // Abruf des Benutzernamens
    this.title = title;

    // Stilvariablen erstellen
    this.className = 'user-container';
    this.activeBtnClassName = 'user__btn_active';
    this.defaultBtnClassName = 'user__btn btn';

    // Erstellung von Containern und Kopfzeilen
    this.container = document.createElement('div');
    this.userTitle = document.createElement('h2');

    // Containerverladung
    this.reload();

    // Erstellen einer Benutzerschaltfläche für die Navigation
    this.userNavBtn = document.createElement('button');
    this.userNavBtn.innerHTML = this.title;

    // füge Elementen Stile hinzu
    this.container.className = this.className;
    this.userNavBtn.className = this.defaultBtnClassName;

    // Benutzerstatus
    this.active = active;
    this.active ? this.activate() : this.deactivate();

    // füge Elemente zum Dom hinzu
    this.container.append(this.userTitle);
    this.userNavigation.append(this.userNavBtn);

    // To-Do-Liste erstellen
    this.noteList = new NoteList(this.container, this.title);

    //  Button-Ereignis-Listener
    this.userNavBtn.addEventListener('click', () => {
      this.reload().userNavBtnActivate();
    });
  }
  /// nav

  reload() {
    const previousContainer = document.querySelector(`.${this.className}`);

    if (previousContainer) {
      previousContainer.remove();
    }

    this.parentContainer.append(this.container);
    this.userTitle.innerHTML = this.title;

    return this;
  }

  userNavBtnActivate() {
    this.userList.forEach((user) => {
      user === this ? user.activate() : user.deactivate();
    });
    this.saveNavList();
  }

  activate() {
    this.active = true;
    this.userNavBtn.classList.add(this.activeBtnClassName);
  }

  deactivate() {
    this.active = false;
    this.userNavBtn.classList.remove(this.activeBtnClassName);
  }

  toJSON() {
    return { title: this.title, active: this.active };
  }
}

export default User;
