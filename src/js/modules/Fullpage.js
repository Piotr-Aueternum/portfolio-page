export default class Fullpage {
  constructor({
    container = 'fullpage',
    section = '.section',
    delay = 700,
    onSlide,
    onLeave,
  }) {
    this.container = container;
    this.section = section;
    this.delay = delay;
    this.onSlide = onSlide;
    this.onLeave = onLeave;
    this.fullpage = document.getElementById(container);
    this.wrapperHeight = this.fullpage.clientHeight;
    this.sections = this.fullpage.querySelectorAll(this.section);
    this.transform = 0;
    this.sectionHeight = 0;
    this.index = 0;
    this.id = window.location.hash.replace(/\?|#/, '');
    this.initId = this.id;
    this.init();
  }
  slideTo() {
    this.sections.forEach((sectionEl, key) => {
      if (this.initId === sectionEl.dataset.fpId) {
        this.transform = -key * this.sectionHeight;
        this.index = key;
        this.fullpage.style.transform = `translate3d(0, ${Math.floor(this.transform)}px, 0)`;
      } else {
        this.setHash();
      }
    });
  }
  setHash() {
    this.hash = this.sections[this.index].dataset.fpId;
    window.location.hash = this.hash;
    this.id = window.location.hash.replace(/\?|#/, '');
  }
  init() {
    this.setupContainer();
    this.setSectionsHeight();
    this.slide();
    this.slideTo();
  }
  slide() {
    this.time = Date.now();
    window.addEventListener('wheel', (e) => {
      const direction = e.deltaY < 0 ? 'up' : 'down';
      if (((this.time + this.delay) - Date.now()) < 0) {
        if (this.onSlide && typeof this.onSlide === 'function') {
          this.onSlide(this.index);
        }
        if (direction === 'up' && this.transform < 0) {
          this.index -= 1;
          this.transform += this.sectionHeight;
        } else if (direction === 'down' && -this.transform < this.wrapperHeight - this.sectionHeight) {
          this.index += 1;
          this.transform -= this.sectionHeight;
        }
        this.fullpage.style.transform = `translate3d(0, ${Math.floor(this.transform)}px, 0)`;
        this.time = Date.now();
        if (this.onLeave && typeof this.onLeave === 'function') {
          this.onLeave(this.index);
        }
        this.setHash();
      }
    });
  }
  setupContainer() {
    document.body.classList.add(this.container);
    this.fullpage.classList.add(`${this.container}__wrapper`);
    this.fullpage.style.transitionDuration = `${this.delay}ms`;
    this.fullpage.style.transform = `translate3d(0, ${this.transform}px, 0)`;
  }
  getSectionHeight() {
    return this.wrapperHeight / this.sections.length;
  }
  setSectionsHeight() {
    if (this.section) {
      this.sectionHeight = this.getSectionHeight();
      const sectionHeight = this.getSectionHeight();
      const sectionAmount = this.sections.length;
      for (let i = 0; i < sectionAmount; i += 1) {
        this.sections[i].style.height = `${Math.floor(sectionHeight)}px`;
      }
    } else {
      throw new TypeError('Section elements not found.');
    }
  }
}

