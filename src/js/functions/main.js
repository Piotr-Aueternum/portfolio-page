export default function main(fn, fps = 30) {
  setTimeout(() => {
    fn();
    main(fn, fps);
  }, 1000 / fps);
}
