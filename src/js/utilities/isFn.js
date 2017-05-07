/**
 * If it's a function it should return true, otherwise it will return false.
 * @param {Function} [fn]
 * @returns {Boolean}
 */
module.exports = fn => Boolean(fn && typeof fn === 'function');
