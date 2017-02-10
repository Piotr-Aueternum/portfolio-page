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
    this.transform = 0;
    this.sectionHeight = 0;
    this.init();
  }
  init() {
    this.setupContainer();
    this.setSectionsHeight();
    this.slide();
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
        this.fullpage.style.transform = `translate3d(0, ${this.transform}px, 0)`;
        this.time = Date.now();
        if (this.onLeave && typeof this.onLeave === 'function') {
          this.onLeave(this.index);
        }
      }
    });
  }
  setupContainer() {
    document.body.classList.add(this.container);
    this.fullpage.classList.add(`${this.container}__wrapper`);
    this.fullpage.style.transitionDuration = `${this.delay}ms`;
    this.fullpage.style.transform = `translate3d(0, ${this.transform}px, 0)`;
  }
  setSectionsHeight() {
    if (this.section) {
      const sections = this.fullpage.querySelectorAll(this.section);
      const sectionAmount = sections.length;
      this.sectionHeight = this.wrapperHeight / sectionAmount;
      for (let i = 0; i < sections.length; i += 1) {
        sections[i].style.height = `${this.sectionHeight}px`;
      }
    } else {
      throw new TypeError('Section elements not found.');
    }
  }
}

