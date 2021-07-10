let x = 2, y = 3;

QUnit.test("test_constructor", function (assert) {
  let actualVector, expectedVector;

  actualVector = new window.Neutreeko.Vector(-0 , 1);
  expectedVector = new window.Neutreeko.Vector(0, 1);
  assert.deepEqual(actualVector, expectedVector);

  actualVector = new window.Neutreeko.Vector(1 , -0);
  expectedVector = new window.Neutreeko.Vector(1, 0);
  assert.deepEqual(actualVector, expectedVector);
});

QUnit.test("x", function (assert) {
  let vector = new window.Neutreeko.Vector(x , y);

  assert.deepEqual(vector.x(), x, "x() ok");
});

QUnit.test("y", function (assert) {
  let vector = new window.Neutreeko.Vector(y , y);

  assert.deepEqual(vector.y(), y, "y() ok");
});

QUnit.test("equals", function (assert) {
  let vector1 = new window.Neutreeko.Vector(x , y);
  let vector2 = new window.Neutreeko.Vector(x , y);

  assert.ok(vector1.equals(vector2), vector2.to_string() + " = "+vector1.to_string());

  let vector3 = new window.Neutreeko.Vector(y , x);
  assert.notOk(vector1.equals(vector3), vector3.to_string() + " != "+vector1.to_string());
});

QUnit.test("getSquareLength", function (assert) {
  let vector = new window.Neutreeko.Vector(x , y);

  assert.deepEqual(vector.getSquareLength(), 13, "getSquareLength() ok");
});

QUnit.test("getLength", function (assert) {
  let vector = new window.Neutreeko.Vector(x , y);

  assert.deepEqual(vector.getLength(), Math.sqrt(13), "getSquareLength() ok");
});

QUnit.test("test_multiple", function (assert) {
  let vector = new window.Neutreeko.Vector(x , y);

  let vector1 = new window.Neutreeko.Vector(2*x, 2*y);
  assert.deepEqual(vector.multiple(2), vector1, vector.to_string() + " * 2 = "+vector1.to_string());

  let vector2 = new window.Neutreeko.Vector(0.5*x, 0.5*y);
  assert.deepEqual(vector.multiple(0.5), vector2, vector.to_string() + " * 0.5 = "+vector2.to_string());

  let vector3 = new window.Neutreeko.Vector(0, 1);
  let vector4 = new window.Neutreeko.Vector(0,-1);
  assert.deepEqual(vector4.multiple(-1), vector3, vector4.to_string() + " * (-1) = "+vector3.to_string());
});

QUnit.test("equals", function (assert) {
  let vector1 = new window.Neutreeko.Vector(x , y);
  let vector2 = new window.Neutreeko.Vector(x , y);

  assert.ok(vector1.equals(vector2), vector2.to_string() + " = "+vector1.to_string());
});