function Nav(nav) {
  this.nav = document.querySelector(nav);
  this.toggle = this.nav.querySelector(nav + '__toggle');
  this.list = this.nav.querySelector(nav + '__list');

  this.toggle.addEventListener('click', () => {
    this.expand();
  });

  this.expand = function() {
    this.list.classList.toggle('active');
    this.toggle.classList.toggle('active');
  }
}