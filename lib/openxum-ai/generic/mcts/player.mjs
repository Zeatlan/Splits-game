"use strict";

import MCTS from './node.mjs';

class Player {
  constructor(c, e, sn, s, w) {
    this._color = c;
    this._engine = e;
    this._simulation_number = sn;
    this._stop = s;
    this._winner_is = w;
    this._root = null;
  }

// public methods
  move() {
    this._init_search();
    for (let i = 0; i < this._simulation_number; i++) {
      this._simulate_one_game_from_root();
    }
    return this._get_final_choice();
  }

// private methods
  _evaluate(b) {
    let b2 = b.clone();

    while (!this._stop(b2)) {
      this._play_a_random_turn(b2);
    }
    return this._winner_is(b2);
  }

  _get_final_choice() {
    let finalChoice = this._root.get_child_nodes()[0].get_move();
    let best = this._root.get_child_nodes()[0].get_number_of_wins() / this._root.get_child_nodes()[0].get_visit_number();

    for (let i = 1; i < this._root.get_child_nodes().length; i++) {
      const score = this._root.get_child_nodes()[i].get_number_of_wins() / this._root.get_child_nodes()[i].get_visit_number();

      if (score > best) {
        best = score;
        finalChoice = this._root.get_child_nodes()[i].get_move();
      }
    }
    return finalChoice;
  }

  _init_search() {
    this._root = new MCTS.Node(this._engine, null, null);
  }

  _play_a_random_turn(e) {
    let list = e.get_possible_move_list();
    let move = list[Math.floor(Math.random() * list.length)];

    e.move(move);
  }

  _simulate_one_game_from_root() {
    let current = this._root;
    let node = current;
    let monteCarloEngine = null;

    // descent
    while (current !== null && !current.get_engine().is_finished()) {
      let possibleMoves = current.get_possible_moves();

      if (possibleMoves.length > 0) {
        node = current;
        break;
      } else {
        node = current;
        current = current.choice(current.get_engine().current_color() === this._color);
      }
    }

    // expansion
    if (current === null || !current.get_engine().is_finished()) {
      current = node;

      let newEngine = current.get_engine().clone();
      let move = current.get_first_possible_move();
      let newNode = new MCTS.Node(newEngine, current, move);

      current.remove_first_possible_move();
      current.add_children(newNode);
      monteCarloEngine = newNode.get_engine();
      current = newNode;
    } else {
      monteCarloEngine = current.get_engine();
    }

    // evaluation
    let winner = this._evaluate(monteCarloEngine);

    // update
    this._updateScore(current, winner);
  }

  _updateScore(current, winner) {
    while (current !== null) {
      current.visit();
      if (winner === current.get_current_player()) {
        current.inc_wins();
      } else {
        current.inc_losses();
      }
      current = current.get_father();
    }
  }
}

export default {
  Player: Player
};