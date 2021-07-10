"use strict";

class Move {
  constructor() {
    if (this.constructor === Move) {
      throw new TypeError('Abstract class "Move" cannot be instantiated directly.');
    }
    if (this.decode === Move.prototype.decode) {
      throw new TypeError("Please implement abstract method decode.");
    }
    if (this.encode === Move.prototype.encode) {
      throw new TypeError("Please implement abstract method encode.");
    }
    if (this.from_object === Move.prototype.from_object) {
      throw new TypeError("Please implement abstract method from_object.");
    }
    if (this.to_object === Move.prototype.to_object) {
      throw new TypeError("Please implement abstract method to_object.");
    }
    if (this.to_string === Move.prototype.to_string) {
      throw new TypeError("Please implement abstract method to_string.");
    }
  }

  decode() {
    throw new TypeError("Do not call abstract method decode from child.");
  }

  encode() {
    throw new TypeError("Do not call abstract method encode from child.");
  }

  from_object() {
    throw new TypeError("Do not call abstract method from_object from child.");
  }

  to_object() {
    throw new TypeError("Do not call abstract method to_object from child.");
  }

  to_string() {
    throw new TypeError("Do not call abstract method to_string from child.");
  }
}

export default Move;