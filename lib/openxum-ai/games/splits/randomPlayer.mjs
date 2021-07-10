"use strict";

import OpenXum from '../../../openxum-core/openxum/index.mjs';
import Engine from '../../../openxum-core/games/splits/engine.mjs';
import GameType from '../../../openxum-core/games/splits/game_type.mjs';
import Color from '../../../openxum-core/games/splits/color.mjs';

class RandomPlayer extends OpenXum.Player {
    constructor(c, o, e) {
        super(c, o, e);
        this._game = new Engine(GameType.STANDARD, Color.WHITE);
    }

// public methods
    confirm() {
        return true;
    }

    is_ready() {
        return true;
    }

    is_remote() {
        return false;
    }

    move() {
        const list = this._game.get_possible_put_map_list();
        const index = Math.floor(Math.random() * list.length);

        return list[index];
    }

    reinit(e) {
        this._engine = e;
    }
}

export default RandomPlayer;
