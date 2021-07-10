"use strict";

import State from "./state.mjs";

class Coordinates {

    constructor(column, line){
        this._pos_x = column;
        this._pos_y = line;
    }

    is_valid(board) {
        return (board.getBoard(this).getState() === State.VACANT);
    }

    is_out(board) {
        if(this._pos_x < 0 || this._pos_y < 0){
            return true;
        }
        return (board.getInvisibleBoard(this) === State.VACANT);
    }

    is_taken(board) {
        return (board.getInvisibleBoard(this) === State.NO_VACANT);
    }

    clone() {
        return new Coordinates(this._pos_x, this._pos_y);
    }

    get_pos_x(){
        return this._pos_x;
    }

    get_pos_y(){
        return this._pos_y;
    }

    hash() {
        return this._pos_y + this._pos_x * (4 * this._pos_x) - 7;
    }

}

export default Coordinates;