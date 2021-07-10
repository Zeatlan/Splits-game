"use strict";

import OpenXum from '../../openxum-core/openxum/index.mjs';

class AlphaBetaPlayer extends OpenXum.Player {
  constructor(color, opponent_color, engine, depth, victory_score) {
    super(color, opponent_color, engine);

    if (this.evaluate === AlphaBetaPlayer.prototype.evaluate) {
      throw new TypeError("Please implement abstract method evaluate.");
    }

    this.MAX_DEPTH = depth;
    this.VICTORY_SCORE = victory_score;
    this._n_tests = 0;
  }

  confirm() {
    return true;
  }

  is_ready() {
    return true;
  }

  is_remote() {
    return false;
  }

  evaluate() {
    throw new TypeError("Do not call abstract method evaluate from child.");
  }

  move(move) {
    this._n_tests = 0;
    let m = this._alphabetaMove();
    console.log(this._n_tests + " tests for AlphaBetaPlayer");
    return m;
  }

  reinit(e) {
    this._engine = e;
  }

  _alphabetaMove() {
    // Init
    let maxScore = -this.VICTORY_SCORE * this.MAX_DEPTH * 2, score, tmpScore;

    let possible_moves = this._engine.get_possible_move_list();
    let best_moves = [];
    let child;

    for (let i = 0; i < possible_moves.length; i++) { // For each possible move
      // Simulate the move
      child = this._engine.clone();
      child.move(possible_moves[i]);

      // Evaluate move
      tmpScore = this._min(child, 0, -this.VICTORY_SCORE * this.MAX_DEPTH * 2, this.VICTORY_SCORE * this.MAX_DEPTH * 2);
      score = Math.max(maxScore, tmpScore);

      // Update best_move
      if (child.winner_is() === this.color()) {
        return possible_moves[i];
      }
      if (score > maxScore) {
        maxScore = score;
        while (best_moves.length > 0) {
          best_moves.pop();
        }
        best_moves.push(possible_moves[i]);
      } else if (tmpScore === maxScore) {
        best_moves.push(possible_moves[i]);
      }
    }

    // Return one of best moves
    let index = Math.floor(Math.random() * best_moves.length);
    return best_moves[index];
  }


  _min(father, depth, maxScore, minScore) {
    if (depth === this.MAX_DEPTH || father.is_finished()) { // MAX_DEPTH reached
      this._n_tests++;
      return this.evaluate(father, depth);
    }

    let possible_moves = father.get_possible_move_list();
    let child;

    for (let i = 0; i < possible_moves.length; i++) { // For each possible move
      child = father.clone();
      // Simulate the move
      //console.log('min: '+child.current_color()+' '+this.color()+' testing '+possible_moves[i].to_string()+' depth:'+depth);
      child.move(possible_moves[i]);

      // Evaluate move
      minScore = Math.min(minScore, this.evaluate(child, depth) + this._max(child, depth + 1, maxScore, minScore));
      //console.log(possible_moves[i].to_string() + ' minscore: '+minScore);

      // Alpha - Beta pruning
      if (minScore <= maxScore || child.winner_is() === this.opponent_color()) {
        return minScore;
      }
    }
    return minScore;
  }

  _max(father, depth, maxScore, minScore) {
    if (depth === this.MAX_DEPTH || father.is_finished()) { // MAX_DEPTH reached
      this._n_tests++;
      return this.evaluate(father, depth);
    }

    let possible_moves = father.get_possible_move_list();
    let child;

    for (let i = 0; i < possible_moves.length; i++) { // For each possible move
      child = father.clone();
      // Simulate the move
      //console.log('max: '+child.current_color()+' '+this.opponent_color()+' testing '+possible_moves[i].to_string()+' depth:'+depth);
      child.move(possible_moves[i]);

      // Evaluate move
      maxScore = Math.max(maxScore, this.evaluate(child, depth) + this._min(child, depth + 1, maxScore, minScore));
      //console.log(possible_moves[i].to_string() + ' maxscore: '+maxScore);

      // Alpha - Beta pruning
      if (maxScore >= minScore || child.winner_is() === this.color()) {
        return maxScore;
      }
    }
    return maxScore;
  }

}

export default AlphaBetaPlayer;