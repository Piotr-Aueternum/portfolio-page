export default class Vector {
  /**
   * Creates an instance of Vector.
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @memberOf Vector
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  length() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
  normalize() {
    const length = this.length();
    if (length === 0) {
      return new Vector();
    }
    return new Vector(this.x / length, this.y / length);
  }
  normalizeSelf() {
    const length = this.length();
    if (length !== 0) {
      this.x /= length;
      this.y /= length;
    }
  }
  addSelf(val) {
    this.x += val.x;
    this.y += val.y;
  }
  subSelf(val) {
    this.x -= val.x;
    this.y -= val.y;
  }
  multiplySelf(val) {
    this.x *= val.x;
    this.y *= val.y;
  }
  divideSelf(val) {
    this.x /= val.x;
    this.y /= val.y;
  }
  add(right) {
    return new Vector(this.x + right.x, this.y + right.y);
  }
  sub(right) {
    return new Vector(this.x - right.x, this.y - right.y);
  }
  multiply(right) {
    return new Vector(this.x * right.x, this.y * right.y);
  }
  divide(right) {
    return new Vector(this.x / right.x, this.y / right.y);
  }
}
