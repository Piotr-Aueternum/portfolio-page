function isFn(fn) {
  console.log(`fn is: ${fn}`);
  if (fn && typeof fn === 'function') {
    fn();
    console.log('true');
  }
}
isFn();
isFn(() => 'fn');
isFn(null);
isFn(undefined);
isFn(1);
isFn(-2);
isFn(true);
isFn({});
isFn([]);
isFn('function');
