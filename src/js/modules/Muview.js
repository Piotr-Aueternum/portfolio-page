import isFn from '../utilities/isFn';
import debounce from '../utilities/debounce';

export default class Muview {
  constructor({
    container = 'muview',
    section = '.section',
    delay = 700,
    onStart,
    onSlide,
    onLeave,
    onResize,
  }) {
    Object.assign(this, {
      container,
      section,
      delay,
      onStart,
      onSlide,
      onLeave,
      onResize,
      muview: document.getElementById(container),
      transform: 0,
      index: 0,
      id: window.location.hash.replace(/\?|#/, ''),
    });
    this.initId = this.id;
    this.init();
    this.slide();
    this.afterResize();
    setTimeout(() => window.scrollTo(0, 0), this.delay);
  }
  init() {
    document.body.classList.add(this.container);
    this.muview.classList.add(`${this.container}__wrapper`);
    this.muview.style.transitionDuration = `${this.delay}ms`;
    this.setSectionHeight();
    this.setTransform();
    this.sections.forEach((sectionEl, key) => {
      if (this.initId === sectionEl.dataset.mvId) {
        this.index = key;
      }
    });
  }
  afterResize() {
    const onResize = debounce(() => {
      if (isFn(this.onResize)) {
        this.onResize(this.index, this.direction);
      }
      this.setSectionHeight();
      this.setTransform();
    }, this.delay);
    window.addEventListener('resize', onResize);
  }
  setSectionHeight() {
    this.sections = this.muview.querySelectorAll(this.section);
    this.wrapperHeight = this.muview.clientHeight;
    this.sectionHeight = window.innerHeight;
    for (let i = 0; i < this.sections.length; i += 1) {
      this.sections[i].style.height = `${Math.floor(this.sectionHeight)}px`;
    }
  }
  setTransform() {
    this.transform = -this.index * this.sectionHeight;
    this.muview.style.transform = `translate3d(0, ${Math.floor(this.transform)}px, 0)`;
  }
  setIndex() {
    this.sections.forEach((sectionEl, key) => {
      if (this.id === sectionEl.dataset.mvId) {
        this.index = key;
      }
    });
  }
  setHash() {
    if (this.sections[this.index].dataset.mvId) {
      this.hash = this.sections[this.index].dataset.mvId;
      window.location.hash = this.hash;
      this.updateId();
    }
  }
  changeIndexBy(value) {
    this.index += value;
  }
  updateId() {
    this.id = window.location.hash.replace(/\?|#/, '');
  }
  slide() {
    window.addEventListener('hashchange', () => {
      this.updateId();
      this.setIndex();
      this.setTransform();
    });
    let time = Date.now();
    window.addEventListener('wheel', (e) => {
      if (Math.abs(e.wheelDelta) >= 80) {
        this.direction = e.deltaY < 0 ? 1 : -1;
        if (((time + this.delay) - Date.now()) < 0) {
          if (isFn(this.onStart)) {
            this.onStart(this.index, this.direction);
          }
          setTimeout(() => {
            if (isFn(this.onLeave)) {
              this.onLeave(this.index, this.direction);
            }
          }, this.delay);
          if ((this.direction === 1 && this.index > 0)
          || (this.direction === -1 && this.index < this.sections.length - 1)) {
            this.changeIndexBy(-this.direction);
            this.setHash();
          }
          time = Date.now();
        }
      }
    });
  }
}
