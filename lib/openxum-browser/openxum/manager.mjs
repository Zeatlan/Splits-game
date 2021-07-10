"use strict";

import GameType from './game_page.mjs';

class Manager {
  constructor(t, e, g, o, s, w, f) {
    this._type = t;
    this._engine = e;
    this._gui = g;
    this._opponent = o;
    this._status = s;
    this._ready = this._opponent !== null && this._opponent === this._gui;
    if (this._ready) {
      this._gui.ready(true);
    }
    this._move = null;
    this._moves = '';
    this._that = null;
    this._index = 0;
    this._move_list = [];
    this._loop = null;
    this._level = 0;
    this._winner_function = w;
    this._offline_function = f;
  }

// public methods
  apply_moves(moves) {
    this._moves = moves;
    moves.split(";").forEach((move) => {
      if (move !== '') {
        this._move = this.build_move();
        this._move.decode(move);
        this._move_list.push(this._move);
        this._engine.move(this._move);
      }
    });
    this._gui.draw();
    this._update_status();
  }

  engine() {
    return this._engine;
  }

  get_moves() {
    return this._moves;
  }

  gui() {
    return this._gui;
  }

  load_level() {
    let key = 'openxum:' + this._engine.get_name() + ':level';

    this._level = 10;
    if (localStorage[key]) {
      this._level = JSON.parse(localStorage[key]);
    }
    return this._level;
  }

  next() {
    if (this._type === GameType.GameType.OFFLINE) {
      this._offline_function();
    } else {
      this._finish();
      if (!this._engine.is_finished() && this._engine.current_color() !== this._gui.color()) {
        if (this._opponent !== null && !this._opponent.is_remote() && this._opponent !== this._gui) {
          this.play_other(true);
        }
      }
    }
  }

  play() {
    if (this._engine.current_color() === this._gui.color() || this._opponent === this._gui) {
      this._move = this._gui.get_move();
      if (this._move) {
        this._apply_move(this._move);
        if (this._opponent !== null && this._opponent.is_remote()) {
          this._opponent.move(this._move);
        }
        this._gui.unselect();
        this.next();
      } else {
        this._that.process_move();
      }
    } else {
      this._apply_move(this._move);
      if (this._opponent !== null && this._opponent.is_remote() && this._opponent.confirm()) {
        this._opponent.move(this._move);
      }
      this._gui.unselect();
      this.next();
    }
  }

  play_other(opponent) {
    if (opponent) {
      this._move = null;
      if (!this._opponent.is_remote() || (this._opponent.is_remote() && this._opponent.is_ready())) {
        this._move = this._opponent.move();
      }
      if (this._move) {
        this._gui.move(this._move, this._opponent.color());
      }
    }
  }

  play_remote(move) {
    this._move = move;
    this._gui.move(move, this._opponent.color());
  }

  ready(r) {
    this._ready = r;
    this._gui.ready(r);
    this._update_status();
  }

  redraw() {
    this._gui.draw();
  }

  replay(moves, pause) {
    this._moves = moves;
    this._index = 0;
    this._move_list = [];
    moves.split(";").forEach((move) => {
      if (move !== '') {
        this._move = this.build_move();
        this._move.decode(move);
        this._move_list.push(this._move);
        if (!pause) {
          this._engine.move(this._move);
        }
      }
    });
    if (pause) {
      this._loop = setInterval(() => this._replay, 1000);
    } else {
      this.ready(true);
    }
  }

  that(t) {
    this._that = t;
    this._update_status();
  }

// private methods
  _update_status() {
    if (this._opponent !== null && this._opponent.is_remote()) {
      if (this._ready) {
        if (this._engine.current_color() === this._opponent.color()) {
          this._status.set_text('wait');
        } else {
          this._status.set_text('ready');
        }
      } else {
        this._status.set_text('disconnect');
      }
    } else {
      this._status.set_text(this.get_current_color());
    }
  }

  _apply_move(move) {
    this._engine.move(move);
    if (move instanceof Array) {
      for (let i = 0; i < move.length; ++i) {
        this._moves += move[i].encode() + ';';
      }
    } else {
      this._moves += move.encode() + ';';
    }
    if (!this._gui.is_animate()) {
      this._gui.draw();
    }
    this._update_status();
  }

  _compute_elo(elo, win) {
    let k = 20;
    let difference = elo.ai - elo.player;
    let expectedScoreWinner = 1 / (1 + Math.pow(10, difference / 400));
    let e = k * (1 - expectedScoreWinner);

    if (win) {
      return ({'ai': elo.ai - e, 'player': elo.player + e, 'last': elo.last - 1});
    } else {
      return ({'ai': elo.ai + e, 'player': elo.player - e, 'last': elo.last - 1});
    }
  }

  _load_win() {
    let key = 'openxum' + this._engine.get_name() + ':win';
    let win = 0;

    if (localStorage[key]) {
      win = JSON.parse(localStorage[key]);
    }
    return win;
  }

  _load_elo() {
    let key = 'openxum:' + this._engine.get_name() + ':elo';
    let elo = {'ai': 1000, 'player': 1000, 'last': 3};

    if (localStorage[key]) {
      elo = JSON.parse(localStorage[key]);
    }
    return elo;
  }

  _finish() {
    if (this._engine.is_finished()) {
      let winner = false;

      this._winner_function(this.get_winner_color());
      if (this._engine.winner_is() === this._gui.color()) {
        winner = true;
      }
      let elo = this._load_elo();
      let new_elo = this._compute_elo(elo, winner);

      localStorage['openxum:' + this._engine.get_name() + ':elo'] = JSON.stringify(new_elo);

      let eloDiff = elo.ai - elo.player;

      if (eloDiff < -40 && new_elo.last < 1) {
        localStorage['openxum:' + this._engine.get_name() + ':level'] =
          JSON.stringify(this._level + 10);
        localStorage['openxum:' + this._engine.get_name() + ':elo'] = JSON.stringify(
          {
            'ai': new_elo.ai,
            'player': new_elo.player,
            'last': 3
          });
      } else if (eloDiff > 40 && new_elo.last < 1) {
        if (this._level > 10) {
          localStorage['openxum:' + this.get_name() + ':level'] = JSON.stringify(this._level - 10);
        }
      }
    }
  }

  _replay() {
    let length;
    if (!this._move_list || !(length = this._move_list.length) || this._index > length) {
      return;
    }

    this._move = this._move_list[this._index];
    this._engine.move(this._move);
    this._gui.draw();
    this._index++;
    if (this._index === this._move_list.length) {
      clearInterval(this._loop);
      this._gui.ready(true);
    }
  }
}

class Status {
  constructor(e) {
    this._element = e;
  }

  set_text(t) {
    this._element.innerHTML = t;
  }
}

export default
{
  Manager: Manager,
  Status: Status
};