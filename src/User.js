import NoteList from './NoteList.js';
import UserEvent from './enums/user-event.enum.js';

class User {
  constructor(title, active) {
    // Abruf des Benutzernamens
    this.title = title;

    // Stilvariablen erstellen
    this.className = 'user-container';
    this.activeBtnClassName = 'user__btn_active';
    this.defaultBtnClassName = 'user__btn btn';

    // Erstellung von Containern und Kopfzeilen
    this.container = document.createElement('div');
    this.userTitle = document.createElement('h2');
    this.userTitle.style.textAlign = 'left';

    // Containerverladung

    // Erstellen einer Benutzerschaltfläche für die Navigation
    this.userNavBtn = document.createElement('button');
    this.userNavBtn.innerHTML = this.title;

    // füge Elementen Stile hinzu
    this.container.className = this.className;
    this.userNavBtn.className = this.defaultBtnClassName;

    // Benutzerstatus
    active ? this.activate() : this.deactivate();

    // füge Elemente zum Dom hinzu
    this.container.append(this.userTitle);

    // To-Do-Liste erstellen
    this.noteList = new NoteList(this.title);
    this.container.append(this.noteList.element);

    document.addEventListener(UserEvent.removeUser, (event) => {
      if (event.detail.userTitle === this.title) {
        this.userNavBtn.remove();
        this.container.remove();
      }
    });

    // wenn Sie das Ereignis "deactivateActiveUser"
    // lesen, ändert der aktive Benutzer seinen Status auf inaktiv.
    document.addEventListener(UserEvent.deactivateActiveUser, () => {
      if (this.active) this.deactivate();
    });

    this.userNavBtn.addEventListener('click', () => {
      this.activate();
    });
  }
  /// nav

  activate() {
    // Event-Erstellung  "deactivateActiveUser"
    const deactivateActiveUser = new Event(UserEvent.deactivateActiveUser);
    // Senden Sie das erstellte Ereignis an das Dokument
    document.dispatchEvent(deactivateActiveUser);
    // nachdem der Ereignis-Listener das Signal ausgelöst und das "deactivate()"
    // des Benutzers mit dem Flag "active=true" ausgeführt hat, dann wird die :
    this.active = true;
    this.userNavBtn.classList.add(this.activeBtnClassName);
    this.userTitle.innerHTML = `User: ${this.title}`;
    // Event-Erstellung  "userActivated"
    const userActivated = new CustomEvent(UserEvent.userActivated, {
      detail: { userTitle: this.title },
    });
    document.dispatchEvent(userActivated);
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
