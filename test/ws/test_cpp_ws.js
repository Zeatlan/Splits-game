require = require('@std/esm')(module, {esm: 'mjs', cjs: true});

const core = require('../../lib/openxum-core').default;
const ai = require('../../lib/openxum-ai').default;
const RestWebServicePlayer = require('./rest_web_service_player');

// const namespace = core.Kamisado;
// let e = new namespace.Engine(namespace.GameType.SIMPLE, namespace.Color.BLACK);
// let p1 = new RestWebServicePlayer(namespace.Color.BLACK, namespace.Color.WHITE, e, 'toto', 'http://127.0.0.1:1984');
// let p2 = new ai.Generic.RandomPlayer(namespace.Color.WHITE, namespace.Color.BLACK, e);

const namespace = core.Kikotsoka;
let e = new namespace.Engine(namespace.GameType.SMALL, namespace.Color.BLACK);
let p1 = new RestWebServicePlayer(namespace.Color.BLACK, namespace.Color.WHITE, e, 'toto', 'http://127.0.0.1:1984');
let p2 = new ai.Generic.RandomPlayer(namespace.Color.WHITE, namespace.Color.BLACK, e);

let start = new Promise((resolve, reject) => {
  p1.start(resolve, reject);
});

const p2_play = (finish) => {
  const move = p2.move();

  e.move(move);

  console.log("P2", move.to_string());
  console.log(e.to_string());

  (new Promise((resolve, reject) => {
    p1.move(resolve, reject, move);
  })).then(() => {
    if (!e.is_finished()) {
      if (e.current_color() === p1.color()) {
        p1_play(finish);
      } else {
        p2_play(finish);
      }
    } else {
      finish();
    }
  }).catch((error) => {
    console.log(error);
  });
};

const p1_play = (finish) => {

  (new Promise((resolve, reject) => {
    p1.move(resolve, reject);
  })).then((data) => {
    let move = e.build_move();

    move.from_object(data);
    e.move(move);

    console.log("P1", move.to_string());
    console.log(e.to_string());

    if (!e.is_finished()) {
      if (e.current_color() === p1.color()) {
        p1_play(finish);
      } else {
        p2_play(finish);
      }
    } else {
      finish();
    }
  }).catch((error) => {
    console.log(error);
  });
};

start.then(() => {
  p1_play(() => {
//    console.log("Winner is " + (e.winner_is() === core.Kamisado.Color.BLACK ? "black" : "white"));
    console.log("Winner is " + namespace.Color.to_string(e.winner_is()));
  });
}).catch((error) => {
  console.log(error);
});
