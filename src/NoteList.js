import Note from './Note.js';
import Modal from './Modal.js';
import UserEvent from './enums/user-event.enum.js';

class NoteList {
  constructor(parent, title) {
    this.noteList = [];
    // this.currentNote = undefined;
    this.listContainer = document.createElement('div');
    this.listContainer.classList.add('list');
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

    // erstellen Dialog-Fenster
    this.infoMessage = new Modal();

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addAndSaveNote(false, this.input.value);

      this.form.reset();
    });
    // verfolgt das Ereignis der Benutzerlöschung. Wenn ein Benutzer gelöscht wird,
    // werden seine Notizen aus dem Speicher des Browsers gelöscht
    document.addEventListener(UserEvent.removeUser, (event) => {
      localStorage.removeItem(event.detail.userTitle);
      this.noteList = [];
    });

    document.addEventListener(UserEvent.removeNote, (event) => {
      const indexOfNoteToRemove = this.noteList.findIndex(
        (note) => note === event.detail.note
      );
      if (indexOfNoteToRemove >= 0) {
        this.removeNote(indexOfNoteToRemove);
        this.infoMessage.showMessage('Note: successfully deleted');
      }
    });

    document.addEventListener(UserEvent.updateNoteStatus, (event) => {
      this.noteList.forEach((note) => {
        if (note === event.detail.note) {
          note.done = event.detail.note.done;
          this.saveLS();
        }
      });
    });

    document.addEventListener(UserEvent.updateNote, (event) => {
      this.noteList.forEach((note) => {
        if (note === event.detail.note) {
          note.name = event.detail.noteItem;
          this.saveLS();
          this.infoMessage.showMessage('Note: successfully updated');
        }
      });
    });

    this.initialise();
    this.checkEmpty();
  }

  /**
   * Erstellt eine neue Notiz mit dem angegebenen Textinhalt.
   * @param {string} item - Der Textinhalt der neuen Notiz.
   */
  addNote(done, item) {
    const newNote = new Note(done, item);
    this.noteList.push(newNote);
    this.listContainer.append(newNote.item);
    this.checkEmpty();
  }

  addAndSaveNote(done, item) {
    const foundDuplicate = this.noteList.find((note) => note.name === item);
    if (foundDuplicate) {
      this.infoMessage.showMessage(
        'Eine solche Notiz wurde früher erstellt!',
        'red'
      );

      return;
    }
    this.addNote(done, item);
    this.saveLS();
  }

  removeNote(index) {
    const noteToRemove = this.noteList[index];
    noteToRemove.item.remove();
    this.noteList.splice(index, 1);
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
          note: item.toJSON(),
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
      this.addNote(note.done, note.name);
    });
  }

  /**
   * Prüfung, wenn das Feld leer ist, wird die entsprechende Meldung angezeigt
   *
   */

  checkEmpty() {
    if (this.noteList.length === 0) {
      this.empty = document.createElement('div');
      this.empty.classList.add('empty__list');
      this.listContainer.append(this.empty);
      this.empty.innerHTML = 'Empty page';
    } else if (this.empty) this.empty.remove();
  }

  getNoteList() {
    return JSON.parse(localStorage.getItem(this.title));
  }
}

export default NoteList;
