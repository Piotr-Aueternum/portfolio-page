export default function fullPage({
  container = 'fullpage',
  section = '.section',
  delay = 700,
  onSlide,
  onLeave,
}) {
  const fullpage = document.getElementById(container);
  const wrapperHeight = fullpage.clientHeight;

  let transform = 0;
  function prepareContainer() {
    document.body.style.overflow = 'hidden';
    fullpage.classList.add('fullpage');
    fullpage.style.transitionDuration = `${delay}ms`;
    fullpage.style.transform = `translate3d(0, ${transform}px, 0)`;
  }

  let sectionHeight;
  function prepareSections() {
    if (section) {
      const sections = fullpage.querySelectorAll(section);
      const sectionAmount = sections.length;
      sectionHeight = wrapperHeight / sectionAmount;
      for (let i = 0; i < sections.length; i += 1) {
        sections[i].style.height = `${sectionHeight}px`;
      }
    } else {
      throw new TypeError('Section elements not found.');
    }
  }
  prepareContainer();
  prepareSections();
  let time = Date.now();
  window.addEventListener('wheel', (e) => {
    const direction = e.deltaY < 0 ? 'up' : 'down';
    if (((time + delay) - Date.now()) < 0) {
      onSlide(fullPage.index);
      if (direction === 'up' && transform < 0) {
        fullPage.index -= 1;
        transform += sectionHeight;
      } else if (direction === 'down' && -transform < wrapperHeight - sectionHeight) {
        fullPage.index += 1;
        transform -= sectionHeight;
      }
      fullpage.style.transform = `translate3d(0, ${transform}px, 0)`;
      time = Date.now();
      if (onLeave && typeof onLeave === 'function') {
        onLeave(fullPage.index);
      }
    }
  });
}
fullPage.index = 0;
