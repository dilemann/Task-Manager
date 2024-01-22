class MessageWindow {
  constructor() {
    // Stilvariablen erstellen
    this.containerClassName = 'modal_message';

    // this.containerClassName = 'user__btn_active';
    this.defaultBtnClassName = 'user__btn btn';

    // Erstelle Hauptcontainer
    this.container = document.createElement('div');
    this.container.className = this.containerClassName;
    this.container.style.position = 'fixed';
    this.container.style.top = '-100%';
  }

  /**
   * Zeigt die Nachricht in einem modalen Fenster mit Animation an.
   * @param {string} item - Nachrichtentext.
   * @param {string} [color='beige'] - Die Farbe des Nachrichtentextes (Standard ist 'beige').
   */
  showMessage(item, color = 'beige') {
    document.body.appendChild(this.container);
    this.container.innerHTML = '';
    this.container.style.color = color;
    this.container.innerHTML = item;
    this.container.style.animation = 'slideIn .3s forwards';
    setTimeout(() => {
      this.container.style.animation = 'slideOut 5s forwards';
      setTimeout(() => this.delete(), 100);
    }, 1500);
  }

  delete() {
    if (this.container && this.container.parentNode) {
      document.body.removeChild(this.container);
    }
  }
}

export default MessageWindow;
