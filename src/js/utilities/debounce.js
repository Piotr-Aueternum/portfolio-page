export default (callback, wait, context = this) => {
  let timeout = null;
  let callbackArgs = null;
  const later = () => callback.apply(context, callbackArgs);
  return (...args) => {
    callbackArgs = args;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
