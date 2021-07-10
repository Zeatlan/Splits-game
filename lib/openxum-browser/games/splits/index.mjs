"use strict";

import Splits from '../../../openxum-core/games/splits/index.mjs';
import AI from '../../../openxum-ai/generic/index.mjs';
import Gui from './gui.mjs';
import Manager from './manager.mjs';

export default {
  Gui: Gui,
  Manager: Manager,
  Splits: Splits,
  Settings: {
    ai: {
      mcts: AI.RandomPlayer
    },
    colors: {
      first: Splits.Color.WHITE,
      init: Splits.Color.WHITE,
      list: [
        {key: Splits.Color.WHITE, value: 'white'},
        {key: Splits.Color.RED, value: 'red'}
      ]
    },
    modes: {
      init: Splits.GameType.STANDARD,
      list: [
        {key: Splits.GameType.BLITZ, value: 'blitz'},
        {key: Splits.GameType.STANDARD, value: 'standard'}
      ]
    },
    opponent_color(color) {
      return color === Splits.Color.WHITE ? Splits.Color.RED : Splits.Color.WHITE;
    },
    types: {
      init: 'ai',
      list: [
        {key: 'gui', value: 'GUI'},
        {key: 'ai', value: 'AI'},
        {key: 'online', value: 'Online'},
        {key: 'offline', value: 'Offline'}
      ]
    }
  }
};

