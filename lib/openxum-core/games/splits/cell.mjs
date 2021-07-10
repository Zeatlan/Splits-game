"use strict";

import Color from "./color.mjs";
import Coordinates from "./coordinates.mjs";
import State from "./state.mjs";
import Stack from "./stack.mjs";
import Board from "./board.mjs";

class Cell {
    constructor(coordinates){
        this._coordinates = coordinates;
        if(coordinates === null) this._state = State.NO_VACANT;
        else this._state = State.VACANT;
        this._stack =  new Stack();
        this._owner = Color.NONE;
    }

    clone() {
        return new Cell(this._coordinates.clone());
    }

    setState(state){
        this._state = state;
    }

    setStack(stack) {
        this._stack = stack;
    }

    setOwner(owner) {
        this._owner = owner;
    }

    getState() {
        return this._state;
    }

    getStack() {
        return this._stack;
    }

    getOwner() {
        return this._owner;
    }

    getCoordinate() {
        return this._coordinates;
    }

    getColumn() {
        return this._coordinates.get_pos_x();
    }

    getLine() {
        return this._coordinates.get_pos_y();
    }

    putPiece(p) {
        if(Array.isArray(p))
            this._owner = p[0].getColor();
        else
            this._owner = p.getColor();
        this._stack.pushPiece(p);
    }

    takeOffPieces() {
        return this._stack.pop();
    }

}

export default Cell;