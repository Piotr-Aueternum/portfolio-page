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
    this.container = container;
    this.section = section;
    this.muview = document.getElementById(container);
    this.state = {
      delay,
      transform: 0,
      index: 0,
      id: window.location.hash.replace(/\?|#/, ''),
      initId: this.id,
    };
    this.cb = {
      onStart,
      onSlide,
      onLeave,
      onResize,
    };
    this.init();
    this.slide();
    this.afterLoad();
    this.afterResize();
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
  }
  init() {
    document.body.classList.add(this.container);
    this.muview.classList.add(`${this.container}__wrapper`);
    this.muview.style.transitionDuration = `${this.state.delay}ms`;
    this.setSectionHeight();
    this.setTransform();
  }
  afterLoad() {
    this.sections.forEach((sectionEl, key) => {
      if (this.state.initId === sectionEl.dataset.mvId) {
        this.state.index = key;
      }
    });
  }
  afterResize() {
    const onResize = debounce(() => {
      if (isFn(this.cb.onResize)) {
        this.cb.onResize(this.state.index, this.direction);
      }
      this.setSectionHeight();
      this.setTransform();
    }, this.state.delay);
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
    this.state.transform = -this.state.index * this.sectionHeight;
    this.muview.style.transform = `translate3d(0, ${Math.floor(this.state.transform)}px, 0)`;
  }
  setIndex() {
    this.sections.forEach((sectionEl, key) => {
      if (this.state.id === sectionEl.dataset.mvId) {
        this.state.index = key;
      }
    });
  }
  setHash() {
    if (this.sections[this.state.index].dataset.mvId) {
      this.hash = this.sections[this.state.index].dataset.mvId;
      window.location.hash = this.hash;
      this.updateId();
    }
  }
  changeIndexBy(value) {
    this.state.index += value;
  }
  updateId() {
    this.state.id = window.location.hash.replace(/\?|#/, '');
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
        this.direction = e.deltaY < 0 ? 'up' : 'down';
        if (((time + this.state.delay) - Date.now()) < 0) {
          if (isFn(this.cb.onStart)) {
            this.cb.onStart(this.state.index, this.direction);
          }
          setTimeout(() => {
            if (isFn(this.cb.onLeave)) {
              this.cb.onLeave(this.state.index, this.direction);
            }
          }, this.state.delay);
          if (this.direction === 'up' && this.state.index > 0) {
            this.changeIndexBy(-1);
            this.setHash();
          } else if (this.direction === 'down' && this.state.index < this.sections.length - 1) {
            this.changeIndexBy(1);
            this.setHash();
          }
          time = Date.now();
        }
      }
    });
  }
}
