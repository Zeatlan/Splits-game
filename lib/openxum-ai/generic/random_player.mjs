"use strict";

import OpenXum from '../../openxum-core/openxum/index.mjs';

class RandomPlayer extends OpenXum.Player {
  constructor(c, o, e) {
    super(c, o, e);
  }

// public methods
  confirm() {
    return true;
  }

  is_ready() {
    return true;
  }

  is_remote() {
    return false;
  }

  move() {
    const list = this._engine.get_possible_move_list();
    const index = Math.floor(Math.random() * list.length);

    return list[index];
  }

  reinit(e) {
    this._engine = e;
  }
}

export default RandomPlayer;