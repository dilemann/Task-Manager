import NoteList from './NoteList.js';

class User {
  constructor({ container, nav, userList, saveNavList }, title, active) {
    this.parentContainer = container;
    this.userNavigation = nav;
    this.userList = userList;
    this.saveNavList = saveNavList;

    this.className = 'user-container';
    this.activeBtnClassName = 'user__btn_active';
    this.defaultBtnClassName = 'user__btn btn';

    this.userNavBtn = document.createElement('button');
    this.userNavBtn.className = this.defaultBtnClassName;

    this.active = active;
    this.active ? this.activate() : this.deactivate();

    this.title = title;

    this.container = document.createElement('div');
    this.container.className = this.className;
    this.userTitle = document.createElement('h2');
    this.reload();

    this.userNavBtn.innerHTML = this.title;
    this.container.append(this.userTitle);
    this.userNavigation.append(this.userNavBtn);
    this.noteList = new NoteList(this.container, this.title);
    this.userNavBtn.addEventListener('click', () => {
      this.reload().userNavBtnActivate();
    });
  }
  /// nav

  reload() {
    const previousContainer = document.querySelector(`.${this.className}`);

    if (previousContainer) {
      previousContainer.remove();
    }

    this.parentContainer.append(this.container);
    this.userTitle.innerHTML = this.title;

    return this;
  }

  userNavBtnActivate() {
    this.userList.forEach((user) => {
      user === this ? user.activate() : user.deactivate();
    });
    this.saveNavList();
  }

  activate() {
    this.active = true;
    this.userNavBtn.classList.add(this.activeBtnClassName);
  }

  deactivate() {
    this.active = false;
    this.userNavBtn.classList.remove(this.activeBtnClassName);
  }

  toJSON() {
    return { title: this.title, active: this.active };
  }
}

export default User;
