export default function iOS() {
  const iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
  ];
  if (navigator.platform) {
    while (iDevices.length) {
      return navigator.platform === iDevices.pop();
    }
  }
  return false;
}
