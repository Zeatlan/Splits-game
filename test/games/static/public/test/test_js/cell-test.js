QUnit.test("clone", function (assert) {
  let coordinates = new window.OpenXum.Tintas.Coordinates(1);
  let cell = new window.OpenXum.Tintas.Cell(coordinates, OpenXum.Tintas.Color.YELLOW, 1);
  console.log(cell);
  let cell2 = cell.clone();
  console.log(cell2);
  assert.deepEqual(cell2, cell, "Cloned");
});