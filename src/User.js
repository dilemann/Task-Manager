import NoteList from './NoteList.js';
import UserEvent from './enums/user-event.enum.js';

class User {
  constructor(title, active) {
    this.title = title;

    // Stilvariablen erstellen
    this.className = 'user-container';

    // Erstellung von Containern und Kopfzeilen
    this.container = document.createElement('div');
    this.container.className = this.className;

    // Erstellen einer Benutzerschaltfläche für die Navigation
    this.userTitle = document.createElement('div');
    this.userTitle.innerHTML = this.title;

    // Benutzerstatus
    active ? this.activate() : this.deactivate();

    // To-Do-Liste erstellen
    this.noteList = new NoteList(this.title);
    this.container.append(this.noteList.element);

    document.addEventListener(UserEvent.removeUser, (event) => {
      if (event.detail.userTitle === this.title) {
        this.userTitle.remove();
        this.container.remove();
      }
    });

    // wenn Sie das Ereignis "deactivateActiveUser"
    // lesen, ändert der aktive Benutzer seinen Status auf inaktiv.
    document.addEventListener(UserEvent.deactivateActiveUser, () => {
      if (this.active) this.deactivate();
    });

    this.userTitle.addEventListener('click', () => {
      this.activate();
    });
  }

  activate() {
    // Event-Erstellung  "deactivateActiveUser"
    const deactivateActiveUser = new Event(UserEvent.deactivateActiveUser);
    // Senden Sie das erstellte Ereignis an das Dokument
    document.dispatchEvent(deactivateActiveUser);
    // nachdem der Ereignis-Listener das Signal ausgelöst und das "deactivate()"
    // des Benutzers mit dem Flag "active=true" ausgeführt hat, dann wird die :
    this.active = true;

    // Event-Erstellung  "userActivated"
    const userActivated = new CustomEvent(UserEvent.userActivated, {
      detail: { userTitle: this.title },
    });
    document.dispatchEvent(userActivated);
  }

  deactivate() {
    this.active = false;
  }

  toJSON() {
    return { title: this.title, active: this.active };
  }
}

export default User;
