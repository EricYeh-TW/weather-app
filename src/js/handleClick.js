// eslint-disable-next-line
import { renderCurrent, renderForecast, renderDropDown, renderSelection } from './render';
import { routeHandler } from './router';

let currentNumber = 1;

const handleArrowBtn = async (data, number) => {
  renderCurrent(data, currentNumber);
  currentNumber += 1;
  if (currentNumber >= number) {
    currentNumber = 0;
  }
};

function handleClick(e, data) {
  e.preventDefault();
  const { target } = e;
  const list = target.classList.value.split(' ');

  if (list.includes('arrow-btn')) {
    handleArrowBtn(data, data.length);
  }

  if (list.includes('menu-btn')) {
    routeHandler(e);
  }

  if (list.includes('menu__selection')) {
    routeHandler(e);
    renderCurrent();
    renderForecast();
  }

  if (list.includes('dropdown-item')) {
    const toggleList = target.parentNode.parentNode.classList.value.split(' ');

    if (toggleList.includes('city')) {
      renderSelection('city', target.dataset.name);
      renderDropDown(data.length);
    }

    if (toggleList.includes('location')) {
      renderSelection('location', target.textContent);
    }

    if (toggleList.includes('background')) {
      renderSelection('background', target.textContent);
    }
  }
}

export default handleClick;
