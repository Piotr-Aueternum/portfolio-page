import isFn from '../utilities/isFn';
import debounce from '../utilities/debounce';

export default class Fullpage {
  constructor({
    container = 'fullpage',
    section = '.section',
    delay = 700,
    onStart,
    onSlide,
    onLeave,
  }) {
    this.container = container;
    this.section = section;
    this.delay = delay;
    this.onStart = onStart;
    this.onSlide = onSlide;
    this.onLeave = onLeave;
    this.fullpage = document.getElementById(container);
    this.transform = 0;
    this.index = 0;
    this.id = window.location.hash.replace(/\?|#/, '');
    this.initId = this.id;
    this.init();
    this.slide();
    this.afterLoad();
    this.afterResize();
  }
  init() {
    document.body.classList.add(this.container);
    this.fullpage.classList.add(`${this.container}__wrapper`);
    this.fullpage.style.transitionDuration = `${this.delay}ms`;
    this.setSectionHeight();
    this.updatePosition();
  }
  setSectionHeight() {
    this.sections = this.fullpage.querySelectorAll(this.section);
    this.wrapperHeight = this.fullpage.clientHeight;
    this.sectionHeight = window.innerHeight;
    for (let i = 0; i < this.sections.length; i += 1) {
      this.sections[i].style.height = `${Math.floor(this.sectionHeight)}px`;
    }
  }
  afterResize() {
    const onResize = debounce(() => {
      this.setSectionHeight();
      this.updatePosition();
    }, this.delay);
    window.addEventListener('resize', onResize);
  }
  updatePosition() {
    this.transform = -this.index * this.sectionHeight;
    this.fullpage.style.transform = `translate3d(0, ${Math.floor(this.transform)}px, 0)`;
  }
  afterLoad() {
    this.sections.forEach((sectionEl, key) => {
      if (this.initId === sectionEl.dataset.fpId) {
        this.index = key;
      }
    });
  }
  setIndex() {
    this.sections.forEach((sectionEl, key) => {
      if (this.id === sectionEl.dataset.fpId) {
        this.index = key;
      }
    });
  }
  setHash() {
    if (this.sections[this.index].dataset.fpId) {
      this.hash = this.sections[this.index].dataset.fpId;
      window.location.hash = this.hash;
      this.updateId();
    }
  }
  changeIndex(value) {
    this.index += value;
  }
  updateId() {
    this.id = window.location.hash.replace(/\?|#/, '');
  }
  slide() {
    window.addEventListener('hashchange', () => {
      this.updateId();
      this.setIndex();
      this.updatePosition();
    });
    this.time = Date.now();
    window.addEventListener('wheel', (e) => {
      this.direction = e.deltaY < 0 ? 'up' : 'down';
      if (((this.time + this.delay) - Date.now()) < 0) {
        isFn(this.onStart(this.index, this.direction));
        setTimeout(() => {
          isFn(this.onLeave(this.index, this.direction));
        }, this.delay);
        if (this.direction === 'up' && this.index > 0) {
          this.changeIndex(-1);
        } else if (this.direction === 'down' && this.index < this.sections.length - 1) {
          this.changeIndex(1);
        }
        this.setHash();
        this.time = Date.now();
      }
    });
  }
}
