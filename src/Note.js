import Popup from './Popup.js';

class Note {
  constructor(parent, name = '', done = '') {
    this.parent = parent;
    this.name = name;
    this._done = done;
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
    this.parent.listContainer.append(this.item);
    this.item.append(this.input);

    this.item.append(this.buttonContainer);

    this.popup.delete.addEventListener('click', () => this.delete());

    this.popup.done.addEventListener('click', () => {
      this.done = !this.done;
      this.modifyLS();
    });

    this.popup.edit.addEventListener('click', () => {
      this.feldActivate();
      this.edit();
    });

    this.input.value = this.name;
    this.noteStatus();
  }

  /**
   *  Liest oder setzt den Fertigstellungsstatus der Notiz.
   * @type {boolean}
   */
  set done(item) {
    this._done = item;
    this.feldDeactivate();
    this.noteStatus();
  }

  get done() {
    return this._done;
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

  /**
   * Ändert den Lokalspeicher nach dem Ändern einer Notiz.
   */
  modifyLS() {
    this.parent.noteList.forEach((note) => {
      if (note.id === this.id) {
        note.name = this.input.value;
        note.done = this.done;
      }
    });
    this.parent.saveLS();
  }

  edit() {
    if (this.input.disabled === false) {
      const mouseLeaveHandler = () => {
        this.feldDeactivate();
        this.modifyLS();
        this.input.removeEventListener('mouseleave', mouseLeaveHandler);
      };

      this.input.addEventListener('mouseleave', mouseLeaveHandler);
    }
  }

  /**
   * die Notiz wird gelöscht
   */
  delete() {
    console.log(this.id);
    console.log(this.parent.noteList);
    this.parent.noteList.splice(this.id - 1, 1);
    console.log(this.parent.noteList);
    this.parent.noteList.forEach((note) => (note.id = this.parent.getNewId()));
    this.parent.saveLS();
    this.item.remove();
    this.parent.checkEmpty();
  }

  toJSON(id) {
    return { name: this.name, done: this.done, id };
  }
}

export default Note;
