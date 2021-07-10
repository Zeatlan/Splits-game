"use strict";

const GameType = {GUI: 0, ONLINE: 1, OFFLINE: 2, LOCAL_AI: 3, REMOTE_AI: 4};

class GamePage {
  constructor(root, namespace, name, first_color, color, opponent_color, game_type, game_id,
              mode, player_id, opponent_id, replay, ai, winner_function, offline_function, moves) {
    this._root = root;
    this._namespace = namespace;
    this._name = name;
    this._first_color = first_color;
    this._color = color;
    this._opponent_color = opponent_color;
    this._game_type = game_type;
    this._game_id = game_id;
    this._mode = mode;
    this._player_id = player_id;
    this._opponent_id = opponent_id;
    this.build_engine();
    this.build_gui();
    this.build_opponent(ai);
    this.build_manager(winner_function, offline_function);
    this.set_gui();
    this.set_opponent();
    if (this._opponent !== null && this._opponent !== this._gui && this._engine.current_color() === this._opponent.color() && !this._opponent.is_remote()) {
      this._manager.play_other(true);
    }
    if (replay) {
      this._opponent.replay_game();
    }
    if (moves && moves !== '') {
      this._manager.apply_moves(moves);
    }
  }

  engine() {
    return this._engine;
  }

  game_id() {
    return this._game_id;
  }

  manager() {
    return this._manager;
  }

  name() {
    return this._name;
  }

// private methods
  build_engine() {
    this._engine = new this._namespace.Engine(this._game_type, this._first_color);
  }

  build_gui() {
    this._gui = new this._namespace.Gui(this._color, this._engine, this._game_id === '-1', this._mode === GameType.GUI);
  }

  build_opponent(ai) {
    if (this._mode === GameType.REMOTE_AI) {
      this._opponent = new this._namespace.RestWebServicePlayer(this._opponent_color, this._engine, this._player_id, 'http://127.0.0.1/openxum-ws-php/index.php/');
      this._opponent.start();
    } else if (this._mode === GameType.GUI) {
      this._opponent = this._gui;
    } else if (this._mode === GameType.LOCAL_AI) {
      this._opponent = new ai(this._opponent_color, this._color, this._engine);
    } else if (this._mode === GameType.ONLINE) {
/*      if (this._username === this._owner_id) {
        this._opponent = new this._namespace.RemotePlayer(this._opponent_color, this._engine, this._owner_id, this._opponent_id, this._game_id);
      } else {
        this._opponent = new this._namespace.RemotePlayer(this._color, this._engine, this._owner_id, this._opponent_id, this._game_id);
      } */
    } else if (this._mode === GameType.OFFLINE) {
      this._opponent = null;
    }
  }

  build_manager(winner_function, offline_function) {
    this._manager = new this._namespace.Manager(this._game_type, this._engine, this._gui, this._opponent,
      new this._root.Status(document.getElementById("status")), winner_function, offline_function);
  }

  reset() {
    this.build_engine();
    this.build_gui();
    this.build_opponent();
    this.build_manager();
    this.set_gui();
    this.set_opponent();
  }

  set_gui() {
    this._canvas = document.getElementById("board");
    this._canvas_div = document.getElementById("boardDiv");
    if (this._canvas_div.clientHeight < this._canvas_div.clientWidth) {
      this._canvas.height = this._canvas_div.clientHeight * 0.95;
      this._canvas.width = this._canvas_div.clientHeight * 0.95;
    } else {
      this._canvas.height = this._canvas_div.clientWidth * 0.95;
      this._canvas.width = this._canvas_div.clientWidth * 0.95;
    }
    this._gui.set_canvas(this._canvas);
    this._gui.set_manager(this._manager);
  }

  set_opponent() {
    if (this._game_id !== '-1') {
      if (this._opponent !== null) {
        this._opponent.set_manager(this._manager);
        this._opponent.set_gui(this._gui);
      }
    } else {
      if (this._opponent !== this._gui) {
        //this._opponent.set_level(this._manager.load_level());
      }
      if (this._opponent && this._opponent.is_remote()) {
        this._opponent.set_manager(this._manager);
      }
    }
  }
}

export default {
  GameType: GameType,
  GamePage: GamePage
};