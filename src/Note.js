import Popup from './Popup.js';
import NoteEvent from './enums/note-event.enum.js';

class Note {
  constructor(done, name = '', id = new Date().getTime()) {
    this.name = name;
    this.done = done;
    this.id = id;

    // Erstellung des Hauptcontainers
    this.item = document.createElement('div');
    this.item.classList.add('note', 'box');

    // Erstelle Textfeld
    this.input = document.createElement('input');
    this.input.classList.add('inputStyle');
    this.input.disabled = true;
    this.item.append(this.input);

    // Erstelle Popup
    this.buttonContainer = document.createElement('div');
    this.buttonContainer.classList.add('container__btn');
    this.popup = new Popup(this.buttonContainer);
    this.buttonContainer.append(this.popup.container);
    this.item.append(this.buttonContainer);

    this.input.value = this.name;
    this.switchStatus();

    // Events
    this.popup.delete.addEventListener('click', () => {
      this.dispatchDeleteNote();
    });

    // Status Note Event
    this.popup.done.addEventListener('click', () => {
      this.done = !this.done;
      this.deactivateTextField();
      this.switchStatus();
      this.dispatchUpdateNote();
    });

    // change Note Event
    this.popup.edit.addEventListener('click', () => {
      this.activateTextField();
      this.switchStatus();
      this.updateAndSaveText();
    });
  }

  /**
   *Aktiviert das Feld zum Bearbeiten einer Notiz.
   *Setzt den Fertigstellungsstatus auf `false`.
   */
  activateTextField() {
    this.done = false;
    this.input.disabled = false;
    this.item.classList.add('note_border');
    this.input.focus();
  }

  /**
   *Deaktiviert das Feld zum Bearbeiten einer Notiz.
   */
  deactivateTextField() {
    this.input.disabled = true;
    this.item.classList.remove('note_border');
  }

  /**
   * Aktualisiert die Farbe der Notiz in Abhängigkeit von ihrer Fertigstellung.
   */
  switchStatus() {
    if (this.done) {
      this.item.classList.add('note_active');
      this.input.style.textDecoration = 'line-through';
      this.popup.done.innerHTML = 'Cancel';
    } else {
      this.input.style.textDecoration = 'none';
      this.item.classList.remove('note_active');
      this.popup.done.innerHTML = 'Resolve';
    }
  }

  updateAndSaveText() {
    const mouseLeaveHandler = () => {
      this.name = this.input.value;
      this.deactivateTextField();
      this.dispatchUpdateNote(true);

      this.input.removeEventListener('mouseleave', mouseLeaveHandler);
    };
    this.input.addEventListener('mouseleave', mouseLeaveHandler);
  }

  /**
   * die Notiz wird gelöscht
   */
  dispatchDeleteNote() {
    const removeNote = new CustomEvent(NoteEvent.removeNote, {
      detail: { id: this.id },
    });
    document.dispatchEvent(removeNote);
  }

  dispatchUpdateNote(withAlert) {
    const updateNote = new CustomEvent(NoteEvent.updateNote, {
      detail: { withAlert },
    });
    document.dispatchEvent(updateNote);
  }

  toJSON() {
    return { name: this.name, done: this.done, id: this.id };
  }
}

export default Note;
