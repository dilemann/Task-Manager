class Modal {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'modal_message';
    this.container.style.position = 'fixed';
    this.container.style.top = '-100%';
    document.body.appendChild(this.container);
  }

  /**
   * Zeigt die Nachricht in einem modalen Fenster mit Animation an.
   * @param {string} item - Nachrichtentext.
   * @param {string} [color='beige'] - Die Farbe des Nachrichtentextes (Standard ist 'beige').
   */
  showMessage(item, color = 'beige') {
    this.container.innerHTML = '';
    this.container.style.color = color;
    this.container.innerHTML = item;
    this.container.style.animation = 'slideIn .3s forwards';
    setTimeout(() => {
      this.container.style.animation = 'slideOut 2s forwards';
    }, 1500);
  }

  showInput() {
    return new Promise((resolve) => {
      this.container.style.top = '50%';
      this.container.style.left = '30%';
      this.container.innerHTML = '';
      this.container.classList.add('modal_input');

      const input = document.createElement('input');
      input.placeholder = 'Введите текст...';
      this.container.appendChild(input);

      const okButton = document.createElement('button');
      okButton.textContent = 'OK';
      okButton.addEventListener('click', () => {
        const inputValue = input.value;
        this.container.innerHTML = '';
        resolve(inputValue);
      });

      this.container.appendChild(okButton);
    });
  }
}

export default Modal;
