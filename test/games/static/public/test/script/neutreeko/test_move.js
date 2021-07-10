QUnit.test("decode-encode", function (assert) {
  let from = new window.Neutreeko.Coordinates(1, 3);
  let to = new window.Neutreeko.Coordinates(0, 2);
  let to_bis = new window.Neutreeko.Coordinates(4, 1);

  let move = new window.Neutreeko.Move(from, to);
  let move_bis = new window.Neutreeko.Move(from, to_bis);

  move_bis.decode(move.encode());

  assert.deepEqual(move, move_bis, "Encode and decode work");
});

QUnit.test("from", function (assert) {
  let from = new window.Neutreeko.Coordinates(1, 3);
  let to = new window.Neutreeko.Coordinates(0, 2);
  let coor = new window.Neutreeko.Coordinates(4, 1);

  let move = new window.Neutreeko.Move(from, to);

  assert.deepEqual(from, move.from(), move.from().to_string()+" equals to "+from.to_string());
  assert.notEqual(coor, move.from(), move.from().to_string()+" not equals to "+coor.to_string());
});

QUnit.test("to", function (assert) {
  let from = new window.Neutreeko.Coordinates(1, 3);
  let to = new window.Neutreeko.Coordinates(0, 2);
  let coor = new window.Neutreeko.Coordinates(4, 1);

  let move = new window.Neutreeko.Move(from, to);

  assert.deepEqual(to, move.to(), move.to().to_string()+" equals to "+to.to_string());
  assert.notEqual(coor, move.to(), move.to().to_string()+" not equals to "+coor.to_string());
});