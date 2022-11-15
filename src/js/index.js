import '../scss/main.scss';
import * as bootstrap from 'bootstrap';
import { handleClick } from './handle';
import { display } from './display';

const btn = document.querySelector('.btn-group');
btn.addEventListener('click', handleClick);
display();
