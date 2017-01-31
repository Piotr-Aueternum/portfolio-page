export default class Nav {
  constructor(nav) {
    this.nav = document.querySelector(nav);
    this.toggle = this.nav.querySelector(`${nav}__toggle`);
    this.list = this.nav.querySelector(`${nav}__list`);
  }
  expand() {
    this.list.classList.toggle('active');
    this.toggle.classList.toggle('active');
  }
  init() {
    this.toggle.addEventListener('click', () => {
      this.expand();
    });
  }
}
