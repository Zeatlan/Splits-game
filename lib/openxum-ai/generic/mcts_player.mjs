"use strict";

import OpenXum from '../../openxum-core/openxum/index.mjs';
import MCTS from './mcts/player.mjs';

class MCTSPlayer extends OpenXum.Player {
  constructor(c, o, e, l, s , w) {
    super(c, o, e);
    this._level = l;
    if (s) {
      this._stop = s;
    } else {
      this._stop = (b) => {
        return b.is_finished();
      };
    }
    if (w) {
      this._winner_is = w;
    } else {
      this._winner_is = (b) => {
        return b.winner_is();
      };
    }
  }

// public methods
  confirm() {
    return false;
  }

  is_ready() {
    return true;
  }

  is_remote() {
    return false;
  }

  move() {
    return (new MCTS.Player(this._color, this._engine, this._level, this._stop, this._winner_is)).move();
  }

  reinit(e) {
    this._engine = e;
  }
}

export default MCTSPlayer;