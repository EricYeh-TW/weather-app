import { renderCurrent, renderForecast, renderDropDown } from './render';
import { routeHandler } from './router';

let currentNumber = 1;

const handleArrowBtn = async (number) => {
  renderCurrent();
  currentNumber += 1;

  if (currentNumber >= number) {
    currentNumber = 0;
  }
};

function handleClick(e, number) {
  e.preventDefault();
  const { target } = e;
  const list = target.classList.value.split(' ');
  console.log(number);

  if (list.includes('arrow-btn')) {
    handleArrowBtn(number);
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
    renderDropDown(number);
  }
}

export default handleClick;
