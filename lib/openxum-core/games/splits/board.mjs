"use strict";

import Cell from './cell.mjs';
import State from './state.mjs';
import Coordinates from "./coordinates.mjs";

class Board {
    constructor() {
        this._invisible_board = [];
        this._board = [];

        this._init_board();
    }

    _init_board() {
        for(let i = 0; i < 36; i++){
            this._invisible_board[i] = [];
            this._board[i] = [];
            for(let j = 0; j < 36; j++){
                this._invisible_board[i][j] = State.VACANT;
                this._board[i][j] = new Cell(null);
            }
        }
        this.setBoard(new Coordinates(16,16), new Cell(new Coordinates(16, 16)));
        this.setBoard(new Coordinates(17,15), new Cell(new Coordinates(17, 15)));
        this.setBoard(new Coordinates(17,16), new Cell(new Coordinates(17, 16)));
        this.setBoard(new Coordinates(18,15), new Cell(new Coordinates(18, 15)));
    }

    clone() {
        let temp = new Board();
        for(let i = 0; i < 36; i++){
            temp._board[i] = this._board[i].clone();
        }

        temp._id_pawn = this._id_pawn;
        return temp;
    }

    getInvisibleBoard(coord){
        return this._invisible_board[coord.get_pos_x()][coord.get_pos_y()];
    }

    setInvisibleBoard(coord, value){
        this._invisible_board[coord.get_pos_x()][coord.get_pos_y()] = value;
    }

    getBoard(coord){
        return this._board[coord.get_pos_x()][coord.get_pos_y()];
    }

    setBoard(coord, value) {
        this._board[coord.get_pos_x()][coord.get_pos_y()] = value;
        this._invisible_board[coord.get_pos_x()][coord.get_pos_y()] = State.NO_VACANT
    }

    getBoardGraph(){
        let boardX = [];
        for (let i = 0; i < 36; i++){
            for(let j = 0; j < 36; j++) {
                if(this._board[i][j].getCoordinate() !== null) {
                    boardX.push(this._board[i][j]);
                }
            }
        }
        return boardX;
    }
}

export default Board;

