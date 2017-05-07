/**
 * @param {Function} callback
 * @param {Number} wait
 * @param {Object} [context=this]
 */
export default (callback, wait, context = this) => {
  let timeout = null;
  let callbackArgs = null;
  const later = () => {
    callback.apply(context, callbackArgs);
    timeout = null;
  };
  return (...args) => {
    if (!timeout) {
      callbackArgs = args;
      timeout = setTimeout(later, wait);
    }
  };
}
