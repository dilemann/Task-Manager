import Note from './Note.js';
import MessageWindow from './MessageWindow.js';
import UserEvent from './enums/user-event.enum.js';
import NoteEvent from './enums/note-event.enum.js';

class NoteList {
  constructor(userId) {
    this.noteList = [];
    this.userId = userId;

    // Erstellung des Hauptcontainers
    this.element = document.createElement('div');

    // Erstelle Form-Container
    this.form = document.createElement('form');
    this.form.classList.add('form');
    this.element.append(this.form);
    this.form.reset();

    // Erstelle input
    this.input = document.createElement('input');
    this.input.classList.add('form__input');
    this.input.placeholder = 'Enter the title of the new task';
    this.form.append(this.input);

    // Erstelle Button
    this.buttonWrapper = document.createElement('div');
    this.buttonWrapper.classList.add('form__btn-container');
    this.button = document.createElement('button');
    this.button.classList.add('form__btn');
    this.buttonWrapper.append(this.button);
    this.button.textContent = 'Add a task';
    this.form.append(this.buttonWrapper);

    // Erstelle List- Container
    this.listContainer = document.createElement('div');
    this.listContainer.classList.add('list');
    this.element.append(this.listContainer);

    // Erstelle Dialog-Fenster
    this.infoMessage = new MessageWindow();

    this.initialise();

    // Events
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

    // Remove Note Event
    document.addEventListener(NoteEvent.removeNote, (event) => {
      const indexOfNoteToRemove = this.noteList.findIndex(
        (note) => note.id === event.detail.id
      );
      if (indexOfNoteToRemove >= 0) {
        this.removeNote(indexOfNoteToRemove);
        this.infoMessage.showMessage('Note: successfully deleted');
      }
    });

    // Update Note Event
    document.addEventListener(NoteEvent.updateNote, (event) => {
      this.saveNoteList();
      if (event.detail.withAlert) {
        this.infoMessage.showMessage('Note: successfully updated');
      }
    });
  }

  /**
   * Erstellt eine neue Notiz mit dem angegebenen Textinhalt.
   * @param {string} item - Der Textinhalt der neuen Notiz.
   */
  addNote(done, item) {
    const newNote = new Note(done, item);
    this.noteList.push(newNote);
    this.listContainer.append(newNote.item);
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
    this.saveNoteList();
  }

  removeNote(index) {
    const noteToRemove = this.noteList[index];
    noteToRemove.item.remove();
    this.noteList.splice(index, 1);
    this.saveNoteList();
  }

  /**
   * Speichern von Notizdaten auf localStorage
   *
   */
  saveNoteList() {
    localStorage.setItem(
      this.userId,
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
    if (!localStorage.getItem(this.userId)) return;
    const list = this.getNoteList();

    list.forEach(({ note }) => {
      this.addNote(note.done, note.name, note.id);
    });
  }

  getNoteList() {
    return JSON.parse(localStorage.getItem(this.userId));
  }
}

export default NoteList;
