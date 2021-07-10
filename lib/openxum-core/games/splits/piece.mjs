"use strict";

class Piece {
    constructor(color){
        this._color = color;
    }

    getColor() {
        return this._color;
    }

    identical(piece) {
        return this.getColor() === piece.getColor();
    }
}

export default Piece;