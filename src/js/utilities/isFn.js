/**
 * If it's a function it should return true, otherwise it will return false.
 * @param {Function} [fn]
 * @returns {Boolean}
 */
function isFn(fn) {
  return (fn && typeof fn === 'function');
}
export default isFn;
