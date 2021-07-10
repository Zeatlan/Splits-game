"use strict";

import OpenXum from "../../openxum/index.mjs";
import MoveType from "./move_type.mjs";
import Color from "./color.mjs";

class Move extends OpenXum.Move {
    constructor(t, c, f, to, n, o, direction) {
        super();
        this._type = t;
        this._color = c;
        this._from = f;
        this._to = to;
        this._number = n;
        this._orientation = o;
        this._direction = direction;
    }
    decode(str) {
    }
    encode() {
        if (this._type === MoveType.PUT_PIECE) {
            return "P" + this._color === Color.RED ? 'R' : 'W' + this._from.get_pos_x() + this._from.get_pos_y() + this._to.get_pos_x() + this._to.get_pos_y() + this._number + this._direction;
        }
        if(this._type === MoveType.PUT_MAP) {
            return "M" + this._color === Color.RED ? 'R' : 'W' + this._to.get_pos_x() + this._to.get_pos_y() + this._orientation;
        }
    }
    from_object(data) {
        this._from = data.from;
        this._to = data.to;
    }
    to_object() {
        return {type: this._type, color: this._color, from: this._from, to: this._to, number: this._number, orientation: this._orientation, direction: this._direction};
    }
    getFrom() {
        return this._from;
    }
    getTo() {
        return this._to;
    }
    to_string() {
        if (this._type === MoveType.PUT_MAP) {
            return "Put " + this._color === Color.RED ? 'red' : 'white' + " map at " + this._to.x + this._to.y + " with orientation " + this._orientation;
        }
        if(this._type === MoveType.PUT_PIECE){
            return "Move " + this._number + " piece(s) of stack from " + this._from.x + this._from.y + " to " + this._to.x + this._to.y + " in direction " + this._direction;
        }
    }
    getOrientation(){
        return this._orientation;
    }
    getDirection(){
        return this._direction;
    }
    incrementOrientation() {
        this._orientation = this._orientation + 1;
    }
    get_type(){
        return this._type;
    }
    getNumber(){
        return this._number;
    }
}

export default Move;
