"use strict";

import OpenXum from '../../openxum/index.mjs';
import Move from './move.mjs';
import Phase from './phase.mjs';
import State from './state.mjs';
import Color from './color.mjs';
import Board from './board.mjs';
import Cell from './cell.mjs';
import Coordinates from './coordinates.mjs';
import Direction from './direction.mjs';
import Piece from './piece.mjs';

class Engine extends OpenXum.Engine {
    constructor(t, c) {
        super();
        this._type = t;
        this._current_color = c;
        this._phase = Phase.BEGINNING;
        this._firstmove = 7;
        this._gameboard = new Board();
        this._compteur = 0;
    }

    build_move() {
        return new Move();
    }

    clone() {
        let clone = new Engine(this._type, this._current_color);
        clone._attribute = this._attribute;

        return clone;
    }

    current_color() {
        return this._current_color;
    }

    get_name() {
        return 'Splits';
    }

    get_possible_move_list(origin, direction) {
    }

    getCurrentColor() {
        return this._current_color;
    }

    get_possible_put_map_list(origin, direction) {
        let possibleMoveMap = [];

        if (origin.get_pos_x() > direction.get_pos_x() && origin.get_pos_y() === direction.get_pos_y())
            possibleMoveMap.push(Direction.WEST, Direction.NORTH_WEST, Direction.MINI_NORTH, Direction.MINI_NORTH_WEST, Direction.MINI_SOUTH_WEST);

        if (origin.get_pos_x() === direction.get_pos_x() && origin.get_pos_y() > direction.get_pos_y())
            possibleMoveMap.push(Direction.MINI_NORTH, Direction.NORTH_WEST, Direction.NORTH_EAST, Direction.MINI_NORTH_EAST, Direction.MINI_NORTH_WEST);

        if (origin.get_pos_x() < direction.get_pos_x() && origin.get_pos_y() > direction.get_pos_y())
            possibleMoveMap.push(Direction.MINI_NORTH, Direction.MINI_NORTH_EAST, Direction.NORTH_EAST, Direction.EAST, Direction.MINI_SOUTH_EAST);

        if (origin.get_pos_x() < direction.get_pos_x() && origin.get_pos_y() === direction.get_pos_y())
            possibleMoveMap.push(Direction.MINI_SOUTH, Direction.SOUTH_EAST, Direction.EAST, Direction.MINI_SOUTH_EAST, Direction.MINI_NORTH_EAST);

        if (origin.get_pos_x() === direction.get_pos_x() && origin.get_pos_y() < direction.get_pos_y())
            possibleMoveMap.push(Direction.MINI_SOUTH, Direction.MINI_SOUTH_WEST, Direction.MINI_SOUTH_EAST, Direction.SOUTH_EAST, Direction.SOUTH_WEST);

        if (origin.get_pos_x() > direction.get_pos_x() && origin.get_pos_y() < direction.get_pos_y())
            possibleMoveMap.push(Direction.MINI_SOUTH, Direction.SOUTH_WEST, Direction.MINI_SOUTH_WEST, Direction.MINI_NORTH_WEST, Direction.WEST);

        return possibleMoveMap;
    }


    is_finished() {
        return this._phase === Phase.FINISH;
    }

    move(move) {
        if (this._phase === Phase.BEGINNING) {
            this._put_map(move);
        } else if (this._phase === Phase.FIRST_PLACEMENT) {
            this.onClickFirst(move.getTo());
        }
        else if (this._phase === Phase.IN_GAME){
            this._put_piece(move);
        }
    }

    onClickFirst(coord){

        let neighbors = this._getNeighbors(coord);
        let newCell = this._gameboard.getBoard(coord);
        if(!neighbors)
            return false;

        let freeSpace = 6 - neighbors.length;

        if(this._gameboard.getInvisibleBoard(coord) === State.VACANT)
            return false;


        if((coord.get_pos_x() === this._minMax()[2] || coord.get_pos_y() === this._minMax()[3] || coord.get_pos_x() === this._minMax()[0] || coord.get_pos_y() === this._minMax()[1]) || (newCell.getOwner() === Color.NONE && freeSpace >= 1)){
            newCell.setOwner(this._current_color);
            if(newCell.getStack().getHeight() === 0) {
                for (let i = 0; i < 16; i++) {
                    newCell.putPiece(new Piece(this._current_color));
                }
                this._nextTurn();
                if(this._compteur < 2){
                    this._compteur++
                }
                else{
                    this._phase = Phase.IN_GAME;  
                }
                return true;
            }
        }
        return false;
    }

    _getBorderFrom(coord) {
        let _borders = [];

        for (let dir = 0; dir < 6; dir++) {
            let borderCoord = this._getBorderCoord(coord, dir);

            if (!borderCoord)
                continue;

            _borders.push(borderCoord);
        }
        return _borders;
    }

    _getBorderCoord(coord, direction) {
        let borders = [];
        let i = 0;

        do {
            i++;
            borders = [
                [coord.get_pos_x() - i, coord.get_pos_y()],
                [coord.get_pos_x() + i, coord.get_pos_y()],
                [coord.get_pos_x() - i, coord.get_pos_y() + i],
                [coord.get_pos_x() + i, coord.get_pos_y() - i],
                [coord.get_pos_x(), coord.get_pos_y() - i],
                [coord.get_pos_x(), coord.get_pos_y() + i],
            ];

            let borderCoord = new Coordinates(borders[direction][0], borders[direction][1]);

            if (borderCoord.is_out(this._gameboard) || this._gameboard.getBoard(borderCoord).getStack().getHeight() > 0) {
                borders = [
                    [borderCoord.get_pos_x() + 1, borderCoord.get_pos_y()],
                    [borderCoord.get_pos_x() - 1, borderCoord.get_pos_y()],
                    [borderCoord.get_pos_x() + 1, borderCoord.get_pos_y() - 1],
                    [borderCoord.get_pos_x() - 1, borderCoord.get_pos_y() + 1],
                    [borderCoord.get_pos_x(), borderCoord.get_pos_y() + 1],
                    [borderCoord.get_pos_x(), borderCoord.get_pos_y() - 1],
                ];

                borderCoord = new Coordinates(borders[direction][0], borders[direction][1]);
                i = 999;
                if(borderCoord.get_pos_y() === coord.get_pos_y() && borderCoord.get_pos_x() === coord.get_pos_x())
                    return null;
                else
                    return borderCoord;
            }
        } while (i < 999);
    }

    _put_map(move) {
        if (this._gameboard.getInvisibleBoard(move.getTo()) === State.VACANT){
            let neighbors = this._getNeighbors(move.getTo());

            if (neighbors.length > 0 && neighbors.length < 6) {
                let newTiles = this._generateTile(move.getTo(), move.getOrientation());

                if (newTiles !== null) {
                    this._gameboard.setBoard(move.getTo(), new Cell(move.getTo()));
                    for (let i = 0; i < newTiles.length; i++) {
                        this._gameboard.setBoard(newTiles[i], new Cell(newTiles[i]));
                        this._gameboard.setInvisibleBoard(newTiles[i], State.NO_VACANT);
                    }
                    this._phase_gestion();
                }
            }
        }
    }

    _generateTile(coord, direction) {
        let tilesCoords = [];
        let possibilities = [
            [coord.get_pos_x() - 1, coord.get_pos_y(), coord.get_pos_x(), coord.get_pos_y() - 1, coord.get_pos_x() - 1, coord.get_pos_y() - 1],   // Northwest
            [coord.get_pos_x() + 1, coord.get_pos_y() - 1, coord.get_pos_x(), coord.get_pos_y() - 1, coord.get_pos_x() + 1, coord.get_pos_y() - 2], // Northeast
            [coord.get_pos_x() + 1, coord.get_pos_y(), coord.get_pos_x(), coord.get_pos_y() + 1, coord.get_pos_x() + 1, coord.get_pos_y() + 1],   // Southeast
            [coord.get_pos_x() - 1, coord.get_pos_y() + 1, coord.get_pos_x(), coord.get_pos_y() + 1, coord.get_pos_x() - 1, coord.get_pos_y() + 2], // Southwest
            [coord.get_pos_x() + 1, coord.get_pos_y() - 1, coord.get_pos_x() + 2, coord.get_pos_y() - 1, coord.get_pos_x() + 1, coord.get_pos_y()], // East
            [coord.get_pos_x() - 1, coord.get_pos_y() + 1, coord.get_pos_x() - 2, coord.get_pos_y() + 1, coord.get_pos_x() - 1, coord.get_pos_y()], // West
            [coord.get_pos_x() - 1, coord.get_pos_y(), coord.get_pos_x(), coord.get_pos_y() - 1, coord.get_pos_x() + 1, coord.get_pos_y() - 1],   // mininorth
            [coord.get_pos_x() - 1, coord.get_pos_y() + 1, coord.get_pos_x(), coord.get_pos_y() + 1, coord.get_pos_x() + 1, coord.get_pos_y()],   // minisouth
            [coord.get_pos_x(), coord.get_pos_y() + 1, coord.get_pos_x() + 1, coord.get_pos_y(), coord.get_pos_x() + 1, coord.get_pos_y() - 1],   // minisoutheast
            [coord.get_pos_x() - 1, coord.get_pos_y(), coord.get_pos_x() - 1, coord.get_pos_y() + 1, coord.get_pos_x(), coord.get_pos_y() + 1],   // minisouthwest
            [coord.get_pos_x() - 1, coord.get_pos_y() + 1, coord.get_pos_x() - 1, coord.get_pos_y(), coord.get_pos_x(), coord.get_pos_y() - 1],   // mininorthwest
            [coord.get_pos_x(), coord.get_pos_y() - 1, coord.get_pos_x() + 1, coord.get_pos_y() - 1, coord.get_pos_x() + 1, coord.get_pos_y()],   // mininortheast
        ];

        tilesCoords.push(new Coordinates(possibilities[direction][0], possibilities[direction][1]));
        tilesCoords.push(new Coordinates(possibilities[direction][2], possibilities[direction][3]));
        tilesCoords.push(new Coordinates(possibilities[direction][4], possibilities[direction][5]));

        if (tilesCoords.length === 0)
            return null;

        for (let i = 0; i < tilesCoords.length; i++) {
            if (tilesCoords[i].is_taken(this._gameboard)) return null;
        }
        return tilesCoords;
    }

    _phase_gestion(){
        this._firstmove = this._firstmove - 1;
        if(this._firstmove > 0) {
            this._nextTurn();
        }else{
            this._phase = Phase.FIRST_PLACEMENT;
        }
    }

    _nextTurn(){
        if (this._current_color === Color.WHITE)
            this._current_color = Color.RED;
        else
            this._current_color = Color.WHITE;
    }

    _minMax() {
        let indice = [];
        let indice_x_max = 0, indice_y_max = 0;
        let indice_x_min = this._gameboard.getBoard(new Coordinates(16, 16)).getColumn();
        let indice_y_min = this._gameboard.getBoard(new Coordinates(16, 16)).getLine();

        for (let i = 0; i < 36; i++) {
            for (let j = 0; j < 36; j++) {
                if(this._gameboard.getBoard(new Coordinates(i, j)).getState() === State.VACANT) {
                    if (this._gameboard.getBoard(new Coordinates(i, j)).getColumn() > indice_x_max)
                        indice_x_max = this._gameboard.getBoard(new Coordinates(i, j)).getColumn();

                    if (this._gameboard.getBoard(new Coordinates(i, j)).getLine() > indice_y_max)
                        indice_y_max = this._gameboard.getBoard(new Coordinates(i, j)).getLine();

                    if (this._gameboard.getBoard(new Coordinates(i, j)).getColumn() < indice_x_min)
                        indice_x_min = this._gameboard.getBoard(new Coordinates(i, j)).getColumn();

                    if (this._gameboard.getBoard(new Coordinates(i, j)).getLine() < indice_y_min)
                        indice_y_min = this._gameboard.getBoard(new Coordinates(i, j)).getLine();
                }
            }
        }
        indice.push(indice_x_max, indice_y_max, indice_x_min, indice_y_min);
        return indice;
    }

    _put_piece(move) {
        let movedPieces = [], neighbors = [];
        let possibleCoord = false, finish = true;
        let possibleMove = this._getBorderFrom(move.getFrom());
        for (let i = 0; i < possibleMove.length; i++) {
            if (possibleMove[i].get_pos_x() === move.getTo().get_pos_x() && possibleMove[i].get_pos_y() === move.getTo().get_pos_y())
                possibleCoord = true;
        }

        if (this._verification(move.getFrom()) && possibleCoord) {
            for (let i = 0; i < move.getNumber(); i++) {
                movedPieces.push(new Piece(this._current_color));
            }
            this.nextCell = this._gameboard.getBoard(move.getTo());
            this.previousCell = this._gameboard.getBoard(move.getFrom());
            if (this.previousCell.getStack().getHeight() - move.getNumber() > 0 && this.previousCell.getOwner() === this._current_color) {
                this.previousCell.getStack().pop(move.getNumber());
                this.nextCell.putPiece(movedPieces);
            }

            if(this._gameboard.getBoard(move.getFrom()).getOwner() === this._current_color) {
                for (let i = 0; i < 36; i++) {
                    for (let j = 0; j < 36; j++) {
                        if (this._gameboard.getBoard(new Coordinates(i, j)).getOwner() === this._current_color) {
                            neighbors = this._getNeighbors(new Coordinates(i, j));
                        }
                    }
                }

                if(this._nextPlayerCanPlay())
                    finish = false;

                if (finish) {
                    this._phase = Phase.FINISH;
                }

                this._nextTurn();
            }
        }
    }

    _nextPlayerCanPlay(){
        let move = [];

        if(this._current_color === Color.WHITE){
            for(let i = 0; i < 36; i++){
                for(let j = 0; j < 36; j++){
                    if(this._gameboard.getBoard(new Coordinates(i, j)).getOwner() === Color.RED){
                        move = this._getBorderFrom(new Coordinates(i, j));
                        if(move.length > 0 && this._gameboard.getBoard(new Coordinates(i, j)).getStack().getHeight() > 1)
                            return true;
                    }
                }
            }
        }else {
            for(let i = 0; i < 36; i++){
                for(let j = 0; j < 36; j++){
                    if(this._gameboard.getBoard(new Coordinates(i, j)).getOwner() === Color.WHITE){
                        move = this._getBorderFrom(new Coordinates(i, j));
                        if(move.length > 0 && this._gameboard.getBoard(new Coordinates(i, j)).getStack().getHeight() > 1)
                            return true;
                    }
                }
            }
        }

        return false;
    }

    _verification(coord) {
        let possibleMove = [];

        if (coord.is_valid(this._gameboard)) {
            if (this._current_color !== Color.NONE) {
                possibleMove = this._getBorderFrom(coord);
                if (possibleMove.length > 0)
                    return true;
            }
        }
        return false;
    }

    _getNeighbors(coord) {
        let _neighbors = [];

        for (let dir = 0; dir < 6; dir++) {
            let neighbourCoord = this._getNeighborsCoord(coord, dir);
            if (!neighbourCoord)
                continue;

                _neighbors.push(neighbourCoord);
        }
        return _neighbors.length > 0 ? _neighbors : false;
    }

    _getNeighborsCoord(coord, direction) {
        let neighbourCoord;
        let neighbors;

        neighbors = [
            [coord.get_pos_x() + 1, coord.get_pos_y()],
            [coord.get_pos_x() - 1, coord.get_pos_y()],
            [coord.get_pos_x() - 1, coord.get_pos_y() + 1],
            [coord.get_pos_x() + 1, coord.get_pos_y() - 1],
            [coord.get_pos_x(), coord.get_pos_y() + 1],
            [coord.get_pos_x(), coord.get_pos_y() - 1],
        ];

        neighbourCoord = new Coordinates(neighbors[direction][0], neighbors[direction][1]);
        if (this._phase !== Phase.BEGINNING) {
            if (!neighbourCoord.is_valid(this._gameboard))
                return null;
        } else {
            if (neighbourCoord.is_taken(this._gameboard))
                return null;
        }
        return neighbourCoord;
    }

    parse(str) {
    }

    to_string() {
    }

    winner_is() {
        let red = 0, white = 0;
        let maxRed = 0, maxWhite = 0;

        console.log("Current player ", this._current_color);
        if(!this._nextPlayerCanPlay()){
            return this._current_color;
        }else {
            if(this._current_color === Color.WHITE) this._current_color = Color.RED;
            else this._current_color = Color.WHITE;

            if(!this._nextPlayerCanPlay())
                return this._current_color;
        }

        if (this.is_finished()) {
            for (let i = 0; i < 36; i++) {
                for (let j = 0; j < 36; j++) {
                    if (this._gameboard.getBoard(new Coordinates(i, j)).getOwner() === Color.RED) {
                        red++;
                    } else if (this._gameboard.getBoard(new Coordinates(i, j)).getOwner() === Color.WHITE) {
                        white++;
                    }
                }
            }

            if (red < white) return Color.WHITE;
            if (white < red) return Color.RED;
            if (white === red) {
                for(let i =0; i < 36; i++){
                    for(let j = 0; j < 36; j++){
                        if(this._gameboard.getBoard(new Coordinates(i, j)).getState() === State.VACANT) {
                            red = this._getEqualityFrom(new Coordinates(i, j), Color.RED);
                            white = this._getEqualityFrom(new Coordinates(i, j), Color.WHITE);

                            if(red > maxRed) maxRed = red;
                            if(white > maxWhite) maxWhite = white;
                        }
                    }
                }
                if(maxRed > maxWhite)
                    return Color.RED;
                else
                    return Color.WHITE;
            }
        }
        return Color.NONE;
    }

    _getEqualityFrom(coord, color){
        let countTotalR = 1, countTotalW = 1;

        for (let dir = 0; dir < 6; dir++) {
            let equalCount = this._getEqualityCount(coord, dir, color);

            if(color === Color.RED)
                countTotalR += equalCount;
            else
                countTotalW += equalCount;

        }
        if(color === Color.WHITE)
            return countTotalW;
        else
            return countTotalR;
    }

    _getEqualityCount(coord, direction, color){
        let equal = [];
        let count = 0;

        if(this._gameboard.getBoard(coord).getOwner() === color) {
            let i = 0;

            do {
                i++;
                equal = [
                    [coord.get_pos_x() - i, coord.get_pos_y()],
                    [coord.get_pos_x() + i, coord.get_pos_y()],
                    [coord.get_pos_x() - i, coord.get_pos_y() + i],
                    [coord.get_pos_x() + i, coord.get_pos_y() - i],
                    [coord.get_pos_x(), coord.get_pos_y() - i],
                    [coord.get_pos_x(), coord.get_pos_y() + i],
                ];

                let equalCoord = new Coordinates(equal[direction][0], equal[direction][1]);

                if (equalCoord.is_out(this._gameboard) || this._gameboard.getBoard(equalCoord).getOwner() !== color) {
                    i = 999;
                    return count;
                }
                count++;
            } while (i < 999);
        }
    }
}

export default Engine

