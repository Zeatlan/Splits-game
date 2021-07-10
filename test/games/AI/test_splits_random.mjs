require = require('@std/esm')(module, {esm: 'mjs', cjs: true});

const OpenXum = require('../../../lib/openxum-core/').default;
const AI = require('../../../lib/openxum-ai/').default;

let e = new OpenXum.Splits.Engine(OpenXum.Splits.GameType.STANDARD, OpenXum.Splits.Color.WHITE);
let p1 = new AI.Generic.RandomPlayer(OpenXum.Splits.Color.WHITE, OpenXum.Splits.Color.RED, e);
let p2 = new AI.Generic.RandomPlayer(OpenXum.Splits.Color.RED, OpenXum.Splits.Color.WHITE, e);
let p = p1;
let moves = [];

while (!e.is_finished()) {
  const move = p.move();

  moves.push(move);
  e.move(move);
  p = p === p1 ? p2 : p1;
}

console.log("Winner is " + (e.winner_is() === OpenXum.Splits.Color.WHITE ? "white" : "red"));
for (let index = 0; index < moves.length; ++index) {
  console.log(moves[index].to_string());
}
