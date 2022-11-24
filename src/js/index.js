import '../scss/main.scss';
// eslint-disable-next-line
import * as bootstrap from 'bootstrap';
import handleClick from './handle';
import display from './display';
import home from '../templates/home.html';
import about from '../templates/about.html';

const btn = document.querySelector('.btn-group');
const testButton = document.querySelector('.testButton');

btn.addEventListener('click', handleClick);
display();

let isClick = false;

testButton.addEventListener('click', () => {
  const test = document.querySelector('.test');
  isClick = !isClick;
  if (isClick) {
    test.innerHTML = about;
  } else {
    test.innerHTML = home;
  }
});
