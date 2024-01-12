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
    this.writeField = document.createElement('span');
    this.popup = new Popup(this.buttonContainer);
    // add a class
    this.item.classList.add('note', 'box');
    this.input.classList.add('inputStyle');
    this.buttonContainer.classList.add('container__btn');
    this.buttonContainer.append(this.popup.container);

    this.writeField.classList.add('note__write');

    // add to parent
    this.parent.listContainer.append(this.item);
    this.item.append(this.input);
    this.item.append(this.writeField);
    this.item.append(this.buttonContainer);

    this.popup.delete.addEventListener('click', () => this.delete());

    this.popup.done.addEventListener('click', () => {
      this.done = !this.done;
      this.modifyLS();
    });

    this.popup.edit.addEventListener('click', () => {
      this.feldActivate();
    });

    this.popup.save.addEventListener('click', () => {
      this.feldDEActivate();
      this.modifyLS();
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
    this.feldDEActivate();
    this.noteStatus();
    this._done
      ? (this.popup.done.innerHTML = 'Cancel')
      : (this.popup.done.innerHTML = 'Resolve');
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
  }

  /**
   *Deaktiviert das Feld zum Bearbeiten einer Notiz.
   */
  feldDEActivate() {
    this.input.disabled = true;
    this.item.classList.remove('note_border');
  }

  /**
   * Aktualisiert die Farbe der Notiz in Abhängigkeit von ihrer Fertigstellung.
   */
  noteStatus() {
    if (this.done) this.item.classList.add('note_active');
    else this.item.classList.remove('note_active');
  }

  /**
   * Ändert den Lokalspeicher nach dem Ändern einer Notiz.
   */
  modifyLS() {
    if (!localStorage.getItem(this.parent.title)) return;
    const list = JSON.parse(localStorage.getItem(this.parent.title));
    list.forEach((element) => {
      if (element.id === this.id) {
        element.name = this.input.value;
        element.done = this._done;
      }
    });
    localStorage.setItem(this.parent.title, JSON.stringify(list));
  }

  /**
   * die Notiz wird gelöscht
   */
  delete() {
    this.parent._noteList.splice(this.id - 1, 1);
    this.parent._noteList.forEach((element) => (element.id = 0));
    this.parent._noteList.forEach(
      (element) => (element.id = this.parent.getNewId())
    );
    this.parent.saveLS();
    this.item.remove();
    this.parent.saveLS();
    this.parent.checkEmpty();
  }
}

export default Note;
