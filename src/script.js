import ToDo from './ToDo.js';

const parent = document.querySelector('.app');
const action = document.querySelector('.action__btn');
const removeBtn = document.querySelector('.remove__btn');

const newToDo = new ToDo(parent);

action.addEventListener('click', () => {
  newToDo.addNewUser(prompt('enter User Name:'));
});

removeBtn.addEventListener('click', () => {
  newToDo.removeUser();
});
