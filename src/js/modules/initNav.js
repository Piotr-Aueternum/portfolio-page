function initNav(nodeNav) {
  const nav = document.querySelector(nodeNav);
  const toggle = nav.querySelector(`${nodeNav}__toggle`);
  const list = nav.querySelector(`${nodeNav}__list`);
  const activeClass = 'active';
  list.classList.remove(activeClass);
  function expand() {
    list.classList.toggle(activeClass);
    toggle.classList.toggle(activeClass);
  }
  toggle.addEventListener('click', () => {
    expand();
  });
}
initNav('.nav');
