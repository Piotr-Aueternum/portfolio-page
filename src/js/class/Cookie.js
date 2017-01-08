//=require ../lib/js.cookie.js
const Cookie = function() {
  this.cookies = this.createHTML();
  this.close = this.cookies.querySelector('.cookies__close');
  this.close.addEventListener('click', () => {
    this.createCookie();
    this.cookies.removeClass('cookies--active');
  });
  const cookiesAlertShown = this.readCookie();
  if(!cookiesAlertShown) {
    // Check language - default is english
    const text = this.cookies.querySelector('.cookies__text');
    text.append(document.createTextNode('Strona korzysta z plików cookies.'));
    this.appendAfter(document.body, 2000);
  }
}
Cookie.prototype.readCookie = function() {
  return Cookies.get('cookiesAlertShown');
}
Cookie.prototype.createCookie = function() {
  Cookies.set('cookiesAlertShown', true, { expires: 7, path: '/' });
}
Cookie.prototype.appendAfter = function(el, time) {
  el.append(this.cookies);
  setTimeout(() => {
    this.cookies.classList.add('cookies--active');
  }, time);
}
Cookie.prototype.createHTML = function() {
  const bar = document.createElement('div');
  bar.classList.add('cookies');
  const wrap = document.createElement('div');
  wrap.classList.add('cookies__wrap');
  const container = document.createElement('div');
  container.classList.add('container');
  const text = document.createElement('div');
  text.classList.add('cookies__text');
  const button = document.createElement('button');
  button.classList.add('cookies__close');
  for(const inner of ['Akceptuję', 'x']) {
    const span = document.createElement('span');
    const innerText = document.createTextNode(inner);
    span.append(innerText);
    button.append(span);
  }
  wrap.append(text);
  wrap.append(button);
  container.append(wrap);
  bar.append(container);
  return bar;
}
