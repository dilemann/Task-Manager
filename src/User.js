import NoteList from './NoteList.js';

class User {
  constructor(parent, title) {
    this.title = title;
    this.parent = parent;
    this.container = document.createElement('div');
    this.reload();
    this.container.className = 'user-container';
    this.parent.container.append(this.container);
    this.userNavBtn = document.createElement('button');
    this.userNavBtn.innerHTML = this.title;
    this.userNavBtn.className = 'user__btn btn';
    this.parent.nav.append(this.userNavBtn);
    this.noteList = new NoteList(this.container, this.title);
    this.parent.header.innerHTML = this.title;
    this.userNavBtn.addEventListener('click', () => {
      this.reload();
      this.userNavBtnActivate();
    });
  }
  /// nav

  reload() {
    const previousContainer = document.querySelector('.user-container');
    if (previousContainer) {
      previousContainer.remove();
      this.parent.container.append(this.container);
      this.parent.header.innerHTML = this.title;
    }
  }

  userNavBtnActivate() {
    document.querySelectorAll('.user__btn').forEach((btn) => {
      if (this.userNavBtn === btn) btn.classList.add('user__btn_active');
      else btn.classList.remove('user__btn_active');
    });

    localStorage.setItem(
      'nav-list',
      JSON.stringify(
        this.parent.userList.map((user) => ({
          title: user.title,
          btn: user.userNavBtn.className,
        }))
      )
    );
  }
}

export default User;
