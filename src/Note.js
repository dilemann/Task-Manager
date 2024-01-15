import Popup from './Popup.js';
import UserEvent from './enums/user-event.enum.js';

class Note {
  constructor(done, name = '') {
    this.name = name;
    this.done = done;
    this.item = document.createElement('div');
    this.buttonContainer = document.createElement('div');
    this.input = document.createElement('input');
    this.input.disabled = true;
    this.popup = new Popup(this.buttonContainer);
    // add a class
    this.item.classList.add('note', 'box');
    this.input.classList.add('inputStyle');
    this.buttonContainer.classList.add('container__btn');
    this.buttonContainer.append(this.popup.container);

    // add to parent
    // this.parent.listContainer.append(this.item);
    this.item.append(this.input);

    this.item.append(this.buttonContainer);

    this.popup.delete.addEventListener('click', () => this.delete());

    this.popup.done.addEventListener('click', () => {
      this.done = !this.done;
      this.feldDeactivate();
      this.changeStatus();
    });

    this.popup.edit.addEventListener('click', () => {
      this.feldActivate();
      this.editAndSave();
      this.changeStatus();
    });

    this.input.value = this.name;
    this.noteStatus();
  }

  /**
   *Aktiviert das Feld zum Bearbeiten einer Notiz.
   *Setzt den Fertigstellungsstatus auf `false`.
   */
  feldActivate() {
    this.done = false;
    this.input.disabled = false;
    this.item.classList.add('note_border');
    this.input.focus();
  }

  /**
   *Deaktiviert das Feld zum Bearbeiten einer Notiz.
   */
  feldDeactivate() {
    this.input.disabled = true;
    this.item.classList.remove('note_border');
  }

  /**
   * Aktualisiert die Farbe der Notiz in Abhängigkeit von ihrer Fertigstellung.
   */
  noteStatus() {
    if (this.done) {
      this.item.classList.add('note_active');
      this.popup.done.innerHTML = 'Cancel';
    } else {
      this.item.classList.remove('note_active');
      this.popup.done.innerHTML = 'Resolve';
    }
  }

  editAndSave() {
    // if (this.input.disabled === false) {+
    console.log(this.input.value);
    const mouseLeaveHandler = () => {
      this.feldDeactivate();
      this.input.removeEventListener('mouseleave', mouseLeaveHandler);
    };

    this.input.addEventListener('mouseleave', mouseLeaveHandler);
    console.log(this.input.value);
    this.changeStatus();
  }

  /**
   * die Notiz wird gelöscht
   */
  delete() {
    console.log(this.input.value);
    const removeNote = new CustomEvent(UserEvent.removeNote, {
      detail: { noteItem: this.input.value },
    });
    document.dispatchEvent(removeNote);

    // console.log(this.id);
    // console.log(this.parent.noteList);
    // if (this.noteList.length === 0) return;
    // this.parent.noteList.splice(this.id - 1, 1);
    // this.parent.noteList.forEach((element) => (element.id = 0));
    // this.parent.noteList.forEach((note) => (note.id = this.parent.getNewId()));
    // this.parent.saveLS();
    // this.item.remove();
    // this.parent.checkEmpty();

    // if (this.userList.length === 0) return;

    // const indexOfUserToRemove = this.userList.findIndex(
    //   (user) => user.active === true
    // );
  }

  changeStatus() {
    const statusNote = new CustomEvent(UserEvent.statusNote, {
      detail: { noteItem: this.input.value, done: this.done },
    });
    document.dispatchEvent(statusNote);
    this.noteStatus();
  }

  toJSON() {
    return { name: this.name, done: this.done };
  }
}

export default Note;
