import Popup from './Popup.js';
import Modal from './Modal.js';
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
      this.noteStatus();
      this.updateNoteStatus();
    });

    this.popup.edit.addEventListener('click', () => {
      this.feldActivate();
      this.noteStatus();
      this.editAndSave();
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
      this.input.style.textDecoration = 'line-through';
      this.popup.done.innerHTML = 'Cancel';
    } else {
      this.input.style.textDecoration = 'none';
      this.item.classList.remove('note_active');
      this.popup.done.innerHTML = 'Resolve';
    }
  }

  editAndSave() {
    const mouseLeaveHandler = () => {
      this.feldDeactivate();
      this.updateNote();
      this.updateNoteStatus();
      this.input.removeEventListener('mouseleave', mouseLeaveHandler);
    };

    this.input.addEventListener('mouseleave', mouseLeaveHandler);
  }

  /**
   * die Notiz wird gelöscht
   */
  delete() {
    const removeNote = new CustomEvent(UserEvent.removeNote, {
      detail: { note: this },
    });
    document.dispatchEvent(removeNote);
  }

  updateNote() {
    const updateNote = new CustomEvent(UserEvent.updateNote, {
      detail: { note: this, noteItem: this.input.value },
    });
    document.dispatchEvent(updateNote);
    const modal = new Modal();
    this.item.append(modal.container);
    modal.showMessage('Note: successfully updated');
  }

  updateNoteStatus() {
    const updateNoteStatus = new CustomEvent(UserEvent.updateNoteStatus, {
      detail: { note: this },
    });
    document.dispatchEvent(updateNoteStatus);
  }

  toJSON() {
    return { name: this.name, done: this.done };
  }
}

export default Note;
