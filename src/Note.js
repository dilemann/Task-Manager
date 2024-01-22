import NoteManagerModal from './NoteManagerModal.js';
import NoteEvent from './enums/note-event.enum.js';

class Note {
  constructor(done, name = '', id = new Date().getTime()) {
    this.name = name;
    this.done = done;
    this.id = id;

    // Stilvariablen erstellen
    this.itemClassName = 'note_container';
    this.activeItemBorderClassName = 'boxBorder_active';
    this.inputClassName = 'note_textField';
    this.activeInputClassName = 'note_active';
    this.buttonContainerClassName = 'noteManager_flexContainer';

    // Erstellung des Hauptcontainers
    this.item = document.createElement('div');
    this.item.className = this.itemClassName;

    // Erstelle Textfeld
    this.input = document.createElement('input');
    this.input.classList.add(this.inputClassName);
    this.input.disabled = true;
    this.item.append(this.input);

    // Erstelle NoteManager -Popup
    this.buttonContainer = document.createElement('div');
    this.buttonContainer.classList.add(this.buttonContainerClassName);
    this.noteManager = new NoteManagerModal(this.buttonContainer);
    this.buttonContainer.append(this.noteManager.container);
    this.item.append(this.buttonContainer);

    this.input.value = this.name;
    this.switchStatus();

    // Events
    this.noteManager.delete.addEventListener('click', () => {
      this.dispatchDeleteNote();
    });

    // Status Note Event
    this.noteManager.done.addEventListener('click', () => {
      this.done = !this.done;
      this.deactivateTextField();
      this.switchStatus();
      this.dispatchUpdateNote();
    });

    // change Note Event
    this.noteManager.edit.addEventListener('click', () => {
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
    this.item.classList.add(this.activeItemBorderClassName);
    this.input.focus();
  }

  /**
   *Deaktiviert das Feld zum Bearbeiten einer Notiz.
   */
  deactivateTextField() {
    this.input.disabled = true;
    this.item.classList.remove(this.activeItemBorderClassName);
  }

  /**
   * Aktualisiert die Farbe der Notiz in Abhängigkeit von ihrer Fertigstellung.
   */
  switchStatus() {
    if (this.done) {
      this.item.classList.add(this.activeInputClassName);
      this.input.style.textDecoration = 'line-through';
      this.noteManager.done.innerHTML = 'Cancel';
    } else {
      this.input.style.textDecoration = 'none';
      this.item.classList.remove(this.activeInputClassName);
      this.noteManager.done.innerHTML = 'Resolve';
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
