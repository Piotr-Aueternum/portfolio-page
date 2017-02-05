function initNav(nodeNav) {
  const nav = document.querySelector(nodeNav);
  const toggle = nav.querySelector(`${nodeNav}__toggle`);
  const list = nav.querySelector(`${nodeNav}__list`);
  function expand() {
    list.classList.toggle('active');
    toggle.classList.toggle('active');
  }
  toggle.addEventListener('click', () => {
    expand();
  });
}
initNav('.nav');
