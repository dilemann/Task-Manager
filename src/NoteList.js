import Note from './Note.js';

class NoteList {
  constructor(parent, title) {
    this._noteList = [];
    this.listContainer = document.createElement('div');
    this.listContainer.classList.add('cc');
    this.form = document.createElement('form');
    this.input = document.createElement('input');
    this.buttonWrapper = document.createElement('div');
    this.button = document.createElement('button');
    this.title = title;
    this.parent = parent;

    this.form.classList.add('form');
    this.input.classList.add('form__input');
    this.input.placeholder = 'Enter the title of the new task';
    this.buttonWrapper.classList.add('form__btn-container');
    this.button.classList.add('form__btn');
    this.button.textContent = 'Add a task';

    this.buttonWrapper.append(this.button);
    this.form.append(this.input);
    this.form.reset();
    this.form.append(this.buttonWrapper);
    this.parent.append(this.form);
    this.parent.append(this.listContainer);
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addNote(this.input.value);
      this.form.reset();
    });
    this.noteInit();
    this.checkEmpty();
  }

  /**
   * gibt die Identifikationsnummer der Noten zurück
   * @returns
   */
  getNewId() {
    let max = 0;
    this._noteList.forEach((note) => {
      if (note.id > max) max = note.id;
    });
    return max + 1;
  }

  /**
   * Erstellt eine neue Notiz mit dem angegebenen Textinhalt.
   * @param {string} item - Der Textinhalt der neuen Notiz.
   */
  addNote(item) {
    const newNote = new Note(this, item);
    newNote.id = this.getNewId();
    this._noteList.push(newNote);
    this.saveLS();
  }

  /**
   * Speichern von Notizdaten auf localStorage
   *
   */
  saveLS() {
    if (!this._noteList.length) {
      localStorage.removeItem(this.title);
      return;
    }
    const list = [];
    this._noteList.forEach((element) => {
      const obj = {
        id: element.id,
        name: element.name,
        done: element.done,
      };
      list.push(obj);
    });
    localStorage.setItem(this.title, JSON.stringify(list));

    this.checkEmpty();
  }

  /**
   * Initialisierung von Notizen aus localstorage, wenn der Datensatz existiert
   *
   */

  noteInit() {
    if (!localStorage.getItem(this.title)) return;
    this._noteList = JSON.parse(localStorage.getItem(this.title));
    this._noteList.forEach((element) => {
      const { name, done } = element;
      const newNote = new Note(this, name, done);
      newNote.id = element.id;
    });
  }

  /**
   * Prüfung, wenn das Feld leer ist, wird die entsprechende Meldung angezeigt
   *
   */

  checkEmpty() {
    if (this._noteList.length === 0) {
      this.empty = document.createElement('div');
      this.empty.classList.add('empty__list', 'box');
      this.listContainer.append(this.empty);
      this.empty.innerHTML = 'Empty page';
    } else if (this.empty) this.empty.remove();
  }
}

export default NoteList;
