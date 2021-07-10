QUnit.test("not connected row", function (assert) {
    let c1, c2, c3;
    /////////////////////////////////////////
    // FALSE
    /////////////////////////////////////////

    // 0    -  -  -  -  -
    // 1    -  c  -  -  -
    // 2    -  -  -  -  c
    // 3    -  -  c  -  -
    // 4    -  -  -  -  -
    //      0  1  2  3  4

    c1 = new window.Neutreeko.Coordinates(1, 1);
    c2 = new window.Neutreeko.Coordinates(2,3);
    c3 = new window.Neutreeko.Coordinates(4, 2);
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c1, c2, c3).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c1, c3, c2).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c2, c1, c3).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c2, c3, c1).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c3, c1, c2).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c3, c2, c1).is_connected_row());
    //////////////////////////////////////////

    // 0    -  -  -  -  -
    // 1    c  -  c  -  c
    // 2    -  -  -  -  -
    // 3    -  -  -  -  -
    // 4    -  -  -  -  -
    //      0  1  2  3  4

    c1 = new window.Neutreeko.Coordinates(0, 1);
    c2 = new window.Neutreeko.Coordinates(2,1);
    c3 = new window.Neutreeko.Coordinates(4, 1);
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c1, c2, c3).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c1, c3, c2).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c2, c1, c3).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c2, c3, c1).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c3, c1, c2).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c3, c2, c1).is_connected_row());
    //////////////////////////////////////////

    // 0    -  -  c  -  -
    // 1    -  -  -  -  -
    // 2    -  -  c  -  -
    // 3    -  -  -  -  -
    // 4    -  -  c  -  -
    //      0  1  2  3  4

    c1 = new window.Neutreeko.Coordinates(2, 0);
    c2 = new window.Neutreeko.Coordinates(2,2);
    c3 = new window.Neutreeko.Coordinates(2, 4);
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c1, c2, c3).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c1, c3, c2).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c2, c1, c3).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c2, c3, c1).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c3, c1, c2).is_connected_row());
    assert.deepEqual(false, new window.Neutreeko.ThreeInConnectedRow(c3, c2, c1).is_connected_row());
});

QUnit.test("connected row", function (assert) {
  let c1, c2, c3;

  //////////////////////////////////////////
  // TRUE
  //////////////////////////////////////////

  // 0    -  -  -  -  -
  // 1    -  c  -  -  -
  // 2    -  -  c  -  -
  // 3    -  -  -  c  -
  // 4    -  -  -  -  -
  //      0  1  2  3  4

  c1 = new window.Neutreeko.Coordinates(1, 1);
  c2 = new window.Neutreeko.Coordinates(2,2);
  c3 = new window.Neutreeko.Coordinates(3, 3);
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c1, c2, c3).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c1, c3, c2).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c2, c1, c3).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c2, c3, c1).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c3, c1, c2).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c3, c2, c1).is_connected_row());
  //////////////////////////////////////////

  // 0    -  -  -  -  -
  // 1    -  -  -  -  -
  // 2    -  c  c  c  -
  // 3    -  -  -  -  -
  // 4    -  -  -  -  -
  //      0  1  2  3  4

  c1 = new window.Neutreeko.Coordinates(1, 2);
  c2 = new window.Neutreeko.Coordinates(2,2);
  c3 = new window.Neutreeko.Coordinates(3, 2);
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c1, c2, c3).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c1, c3, c2).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c2, c1, c3).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c2, c3, c1).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c3, c1, c2).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c3, c2, c1).is_connected_row());
  //////////////////////////////////////////

  // 0    -  -  -  -  -
  // 1    -  -  -  c  -
  // 2    -  -  c  -  -
  // 3    -  c  -  -  -
  // 4    -  -  -  -  -
  //      0  1  2  3  4

  c1 = new window.Neutreeko.Coordinates(1, 3);
  c2 = new window.Neutreeko.Coordinates(2,2);
  c3 = new window.Neutreeko.Coordinates(3, 1);
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c1, c2, c3).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c1, c3, c2).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c2, c1, c3).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c2, c3, c1).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c3, c1, c2).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c3, c2, c1).is_connected_row());
  //////////////////////////////////////////

  // 0    -  -  -  -  -
  // 1    -  -  c  -  -
  // 2    -  -  c  -  -
  // 3    -  -  c  -  -
  // 4    -  -  -  -  -
  //      0  1  2  3  4

  c1 = new window.Neutreeko.Coordinates(2, 3);
  c2 = new window.Neutreeko.Coordinates(2,2);
  c3 = new window.Neutreeko.Coordinates(2, 1);
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c1, c2, c3).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c1, c3, c2).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c2, c1, c3).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c2, c3, c1).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c3, c1, c2).is_connected_row());
  assert.deepEqual(true, new window.Neutreeko.ThreeInConnectedRow(c3, c2, c1).is_connected_row());
});