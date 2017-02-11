/**
 * @param {function} fn -  if function then run param as function
 */
export default function isFn(fn) {
  if (fn && typeof fn === 'function') {
    fn();
  }
}
