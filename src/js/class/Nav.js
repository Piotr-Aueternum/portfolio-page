function Nav(nav) {
  this.nav = $(nav);
  this.toggle = $(this.nav).find(nav + '__toggle');
  this.list = $(this.nav).find(nav + '__list');
  $(this.toggle).on('click', () => {
    this.expand();
  });
}

Nav.prototype.expand = function() {
  $(this.list).toggleClass('active');
  $(this.toggle).toggleClass('active');
}