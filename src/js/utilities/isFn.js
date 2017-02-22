export default function isFn(fn) {
  if (fn && typeof fn === 'function') {
    fn();
  }
}
