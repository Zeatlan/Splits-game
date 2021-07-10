QUnit.test("color", function (assert) {
  let coordinates = new window.Neutreeko.Coordinates(1, 3);
  let color = window.Neutreeko.Color.WHITE;
  let color_bis = window.Neutreeko.Color.BLACK;
  let piece = new window.Neutreeko.Piece(color,coordinates);

  assert.deepEqual(color, piece.color(), piece.color()+" equals to "+color);
  assert.notEqual(color_bis, piece.color(), piece.color()+" not equals to "+color_bis);
});

QUnit.test("coordinates", function (assert) {
  let coordinates = new window.Neutreeko.Coordinates(1, 3);
  let coordinates_bis = new window.Neutreeko.Coordinates(2, 0);
  let color = window.Neutreeko.Color.BLACK;
  let piece = new window.Neutreeko.Piece(color,coordinates);
  let piece_coor_str = piece.coordinates().to_string();

  assert.deepEqual(coordinates, piece.coordinates(), piece_coor_str+" equals to "+coordinates.to_string());
  assert.notEqual(coordinates_bis, piece.coordinates(), piece_coor_str+" not equals to "+coordinates_bis.to_string());
});

QUnit.test("set_coordinates", function (assert) {
  let coordinates = new window.Neutreeko.Coordinates(1, 3);
  let coordinates_bis = new window.Neutreeko.Coordinates(2, 0);
  let color = window.Neutreeko.Color.BLACK;
  let piece = new window.Neutreeko.Piece(color,coordinates);

  piece.set_coordinates(coordinates_bis);
  assert.notEqual(coordinates, piece.coordinates(), "Coordinates have been changed");
  assert.deepEqual(coordinates_bis, piece.coordinates());
});

QUnit.test("clone", function (assert) {
  let coordinates = new window.Neutreeko.Coordinates(1, 3);
  let color = window.Neutreeko.Color.BLACK;
  let piece = new window.Neutreeko.Piece(color,coordinates);
  let clone = piece.clone();

  assert.deepEqual(piece, clone, "Cloned");
  assert.ok(piece !== clone, "Different objects");
  assert.ok(piece.coordinates() !== clone.coordinates(), "Coordinates are different objects");
});