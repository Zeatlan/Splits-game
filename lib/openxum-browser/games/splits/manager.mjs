"use strict";

import Splits from '../../../openxum-core/games/splits/index.mjs';
import OpenXum from '../../openxum/manager.mjs';
import Gui from "./gui.mjs";
import Color from "../../../openxum-core/games/splits/color.mjs";

class Manager extends OpenXum.Manager {
    constructor(t, e, g, o, s, w, f) {
        super(t, e, g, o, s, w, f);
        this.that(this);
        // ...
    }

    build_move() {
        return new Splits.Move();
    }

    get_current_color() {
        return this._engine.current_color() === Color.WHITE ? 'White' : 'Red';
    }

    get_name() {
        return 'splits';
    }

    get_winner_color() {
        return this.engine().winner_is() === Color.WHITE ? 'White' : 'Red';
    }

    process_move() { }
}

export default Manager;
