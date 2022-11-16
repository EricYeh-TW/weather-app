import display from './display';

let cache;

function handleClick(e) {
  const el = e.target;
  if (el.classList.value.split(' ').includes('dropdown-toggle')) return;
  // prevent same result
  if (cache === el.dataset.name) return;
  cache = el.dataset.name;
  display(cache);
}

export default handleClick;
