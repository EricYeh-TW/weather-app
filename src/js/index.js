import '../scss/main.scss';
// eslint-disable-next-line
import * as bootstrap from 'bootstrap';
import handleClick from './handle';
import display from './display';
import home from '../templates/home.html';
import menu from '../templates/menu.html';
import _404 from '../templates/404.html';

const pageTitle = 'Weather App';

const routes = {
  404: {
    template: _404,
    title: `${pageTitle} | 404`,
    description: 'Page not found',
  },
  '/': {
    template: home,
    title: `${pageTitle} | home`,
    description: 'This is a simple weather app',
  },
  menu: {
    template: menu,
    title: `${pageTitle} | menu`,
    description: 'Setting for city & location & background-image',
  },
};

function locationHandler() {
  let location = window.location.hash.replace('#', '');
  if (location.length === 0) {
    location = '/';
  }
  const route = routes[location] || routes[404];
  const html = route.template;
  document.querySelector('#root').innerHTML = html;
  document.title = route.title;
  document.querySelector('meta[name="description"]').setAttribute('content', route.description);
}

function routeHandler(e = window.event) {
  e.preventDefault();
  window.history.pushState({}, '', e.target.href);
  locationHandler();
}

window.addEventListener('hashchange', locationHandler);
locationHandler();

const menuButton = document.querySelector('.menu-btn');
menuButton.addEventListener('click', (e) => {
  e.preventDefault();
  routeHandler(e);
});
