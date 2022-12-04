import '../scss/main.scss';
// eslint-disable-next-line
import * as bootstrap from 'bootstrap';
import { locationHandler, routeHandler } from './router';
import handleClick from './handleClick';

window.addEventListener('hashchange', () => locationHandler());
locationHandler();

document.addEventListener('click', (e) => {
  e.preventDefault();
  const { target } = e;
  const list = target.classList.value.split(' ');

  if (list.includes('arrow-btn')) {
    handleClick();
  }

  if (list.includes('menu-btn') || list.includes('menu__selection')) {
    routeHandler(e);
  }
});
