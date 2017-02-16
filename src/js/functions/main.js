export default function main(fn, fps = 30) {
  setTimeout(() => {
    if (main.pause === false) {
      window.requestAnimationFrame(() => fn());
      fn();
    }
    main(fn, fps);
  }, 1000 / fps);
}

main.pause = false;
main.toggle = () => {
  if (main.pause === true) {
    main.pause = false;
  } else {
    main.pause = true;
  }
};
