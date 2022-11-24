import '../scss/main.scss';
// eslint-disable-next-line
import * as bootstrap from 'bootstrap';
import handleClick from './handle';
import display from './display';

const btn = document.querySelector('.btn-group');
const testButton = document.querySelector('.testButton');

btn.addEventListener('click', handleClick);
display();

let isClick = false;

testButton.addEventListener('click', () => {
  const test = document.querySelector('.test');
  isClick = !isClick;
  if (isClick) {
    fetch('../templates/about.html')
      .then((res) => res.text())
      .then((result) => (test.innerHTML = result));
  } else {
    fetch('../templates/home.html')
      .then((res) => res.text())
      .then((result) => (test.innerHTML = result));
  }
});
