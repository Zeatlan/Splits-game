QUnit.test("x", function (assert) {
  let x = 1, y = 3;
  let coordinates = new window.Neutreeko.Coordinates(x, y);

  assert.deepEqual(x, coordinates.x(), coordinates.x()+" equals to "+x);
});

QUnit.test("y", function (assert) {
  let x = 1, y = 3;
  let coordinates = new window.Neutreeko.Coordinates(x, y);

  assert.deepEqual(y, coordinates.y(), coordinates.y()+" equals to "+y);
});

QUnit.test("isValid", function (assert) {
  let x = 1, y = 3;
  let coordinates = new window.Neutreeko.Coordinates(x, y);
  let bad_coordinates_1 = new window.Neutreeko.Coordinates(-1, y);
  let bad_coordinates_2 = new window.Neutreeko.Coordinates(5, y);
  let bad_coordinates_3 = new window.Neutreeko.Coordinates(x, -1);
  let bad_coordinates_4 = new window.Neutreeko.Coordinates(x, 5);

  assert.ok(coordinates.isValid());
  assert.notOk(bad_coordinates_1.isValid());
  assert.notOk(bad_coordinates_2.isValid());
  assert.notOk(bad_coordinates_3.isValid());
  assert.notOk(bad_coordinates_4.isValid());
});

QUnit.test("clone", function (assert) {
  let x = 1, y = 3;
  let coordinates = new window.Neutreeko.Coordinates(x, y);
  let clone = coordinates.clone();

  assert.deepEqual(coordinates, clone, clone.to_string()+" equals to "+coordinates.to_string());
  assert.ok(coordinates !== clone, "Different objects");
});

QUnit.test("equals", function (assert) {
  let x = 1, y = 3;
  let coordinates_0 = new window.Neutreeko.Coordinates(x, y);
  let coordinates_1 = new window.Neutreeko.Coordinates(x, y);
  let coordinates_2 = new window.Neutreeko.Coordinates(5, y);
  let coordinates_3 = new window.Neutreeko.Coordinates(x, -1);

  assert.ok(coordinates_1.equals(coordinates_0), coordinates_1.to_string()+" equals to "+coordinates_0.to_string());
  assert.notOk(coordinates_2.equals(coordinates_0), coordinates_2.to_string()+" equals to "+coordinates_0.to_string());
  assert.notOk(coordinates_3.equals(coordinates_0), coordinates_3.to_string()+" equals to "+coordinates_0.to_string());

});