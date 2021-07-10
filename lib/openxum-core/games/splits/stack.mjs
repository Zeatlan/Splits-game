"use strict";

class Stack {
    constructor(s) {
        this._pieces = [];
        if (s) {
            this._pieces = s;
        }
    }

    clone() {
        let stack = new Stack();
        stack.set(this._pieces);
        return stack;
    }

    set(pieces) {
        this._pieces = pieces;
    }

    pushPiece(p){
        if(Array.isArray(p)){
            for(let i = 0; i < p.length; i++){
                this._pieces.push(p[i]);
            }
        }else {
            this._pieces.push(p);
        }
    }

    getHeight() {
        return this._pieces.length;
    }

    pop(piecesAmount) {
        let piece = this._pieces.length-1;

        if(piece <= 0){
            return null;
        }

        this._pieces.splice(this._pieces.length - piecesAmount, piecesAmount);
        return this._pieces;
    }

    clear() {
        this._pieces = [];
    }
}

export default Stack;
