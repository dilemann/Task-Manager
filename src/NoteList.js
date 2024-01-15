import Note from './Note.js';
import UserEvent from './enums/user-event.enum.js';

class NoteList {
  constructor(parent, title) {
    this.noteList = [];
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
    // verfolgt das Ereignis der Benutzerlöschung. Wenn ein Benutzer gelöscht wird,
    // werden seine Notizen aus dem Speicher des Browsers gelöscht
    document.addEventListener(UserEvent.removeUser, (event) => {
      localStorage.removeItem(event.detail.userTitle);
      this.noteList = [];
    });
    this.initialise();
    this.checkEmpty();
  }

  /**
   * gibt die Identifikationsnummer der Noten zurück
   * @returns
   */
  getNewId() {
    let max = 0;
    this.noteList.forEach((note) => {
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
    this.noteList.push(newNote);
    this.saveLS();
    this.checkEmpty();
  }

  /**
   * Speichern von Notizdaten auf localStorage
   *
   */
  saveLS() {
    localStorage.setItem(
      this.title,
      JSON.stringify(
        this.noteList.map((item) => ({
          note: item.toJSON(item.id),
        }))
      )
    );
  }

  /**
   * Initialisierung von Notizen aus localstorage, wenn der Datensatz existiert
   *
   */

  initialise() {
    if (!localStorage.getItem(this.title)) return;
    const list = this.getNoteList();

    list.forEach(({ note }) => {
      const newNote = new Note(this, note.name, note.done);
      newNote.id = note.id;
      this.noteList.push(newNote);
    });
  }

  /**
   * Prüfung, wenn das Feld leer ist, wird die entsprechende Meldung angezeigt
   *
   */

  checkEmpty() {
    if (this.noteList.length === 0) {
      this.empty = document.createElement('div');
      this.empty.classList.add('empty__list', 'box');
      this.listContainer.append(this.empty);
      this.empty.innerHTML = 'Empty page';
    } else if (this.empty) this.empty.remove();
  }

  getNoteList() {
    return JSON.parse(localStorage.getItem(this.title));
  }
}

export default NoteList;
