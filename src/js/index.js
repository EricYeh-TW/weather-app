import '../scss/main.scss';
// eslint-disable-next-line
import * as bootstrap from 'bootstrap';
import handleClick from './handle';
import display from './display';

const btn = document.querySelector('.btn-group');

btn.addEventListener('click', handleClick);
display();
