describe("isFn", function() {
  var isFn = require('../../src/js/utilities/isFn');
  it("should return boolean", function() {
    expect(isFn(function() {})).toEqual(true);
    expect(isFn(() => 'fn')).toEqual(true);
    expect(isFn(new Function)).toEqual(true);
    expect(isFn(Function())).toEqual(true);
    expect(isFn(Object())).toEqual(false);
    expect(isFn('t')).toEqual(false);
    expect(isFn('')).toEqual(false);
    expect(isFn()).toEqual(false);
    expect(isFn(null)).toEqual(false);
    expect(isFn(undefined)).toEqual(false);
    expect(isFn(1)).toEqual(false);
    expect(isFn(-2)).toEqual(false);
    expect(isFn(true)).toEqual(false);
    expect(isFn({})).toEqual(false);
    expect(isFn([])).toEqual(false);
    expect(isFn('function')).toEqual(false);
  });
});
