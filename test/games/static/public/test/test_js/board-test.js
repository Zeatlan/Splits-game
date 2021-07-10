QUnit.test("clone", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();
  let board2 = board.clone();
  assert.deepEqual(board, board2, "Passed!");
});

QUnit.test("get_cell_by_id", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();
  assert.ok(board.get_cell_by_id(5), "Passed!");
  assert.notOk(board.get_cell_by_id(60), "Fail!");
});

QUnit.test("get_id_at_coord", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  let coordinates = new window.OpenXum.Tintas.Coordinates(0);
  let coordinates2 = new window.OpenXum.Tintas.Coordinates(60);
  board._random_board();
  assert.equal(board.get_id_at_coord(coordinates), 0, "good coordinates");
  assert.equal(board.get_id_at_coord(coordinates2), -1, "bad coordinates");
});

QUnit.test("get_cell_by_coord", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  let coordinates = new window.OpenXum.Tintas.Coordinates(1);
  let coordinates2 = new window.OpenXum.Tintas.Coordinates(50);
  board._random_board();
  assert.deepEqual(board.get_cell_by_coord(coordinates).get_coordinates(), coordinates, "Passed!");
  assert.equal(board.get_cell_by_coord(coordinates2), -1, "Wrong coordinates");
});

QUnit.test("get_one_move", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();
  board._board[0].set_color(7);
  board._board[1].set_color(7);
  board._board[2].set_color(7);
  board._board[4].set_color(7);

  assert.ok(1 === 1, "Passed!");
});

QUnit.test("get_move : 1", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();
  board._id_pawn = 29;
  board._board[12].set_color(7);
  board._board[15].set_color(7);
  board._board[19].set_color(7);
  board._board[20].set_color(7);
  board._board[24].set_color(7);
  board._board[25].set_color(7);
  board._board[32].set_color(7);
  board._board[33].set_color(7);
  board._board[38].set_color(7);
  board._board[5].set_color(0);
  board._board[10].set_color(2);
  board._board[21].set_color(3);
  board._board[37].set_color(3);
  board._board[36].set_color(6);
  board._board[29].set_color(8);

  let tab1 = board.get_move(7);
  let tab2 = board.get_move(3);
  let tab3 = board.get_move(5);
  let tab1_to = [];
  let tab2_to = [];

  for (let i = 0; i < tab1.length; i += 1) {
    tab1_to.push(tab1[i].get_to());
  }
  for (let i = 0; i < tab2.length; i += 1) {
    tab2_to.push(tab2[i].get_to());
  }

  assert.deepEqual(tab1_to, [10, 36, 37, 21, 5], "Passed!");
  assert.deepEqual(tab2_to, [37, 21, 50], "Passed!");
  assert.deepEqual(tab3[0].get_to(), -1, "Passed!");
});

QUnit.test("get_move : 2", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();
  board._id_pawn = 45;
  board._board[39].set_color(7);
  board._board[40].set_color(7);
  board._board[43].set_color(7);
  board._board[37].set_color(1);
  board._board[42].set_color(2);
  board._board[31].set_color(3);
  board._board[45].set_color(8);

  let tab1 = board.get_move(7);
  let tab2 = board.get_move(2);
  let tab3 = board.get_move(4);
  let tab1_to = [];
  let tab2_to = [];

  for (let i = 0; i < tab1.length; i += 1) {
    tab1_to.push(tab1[i].get_to());
  }
  for (let i = 0; i < tab2.length; i += 1) {
    tab2_to.push(tab2[i].get_to());
  }

  assert.deepEqual(tab1_to, [42, 37, 31], "Passed!");
  assert.deepEqual(tab2_to, [42, 50], "Passed!");
  assert.deepEqual(tab3[0].get_to(), -1, "Passed!");
});

QUnit.test("get_move : 3", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();
  board._id_pawn = 23;
  board._board[7].set_color(7);
  board._board[15].set_color(7);
  board._board[31].set_color(7);
  board._board[39].set_color(7);
  board._board[18].set_color(7);
  board._board[28].set_color(7);
  board._board[32].set_color(7);
  board._board[37].set_color(7);
  board._board[19].set_color(7);
  board._board[16].set_color(7);
  board._board[12].set_color(7);
  board._board[9].set_color(7);
  board._board[1].set_color(1);
  board._board[6].set_color(2);
  board._board[27].set_color(3);
  board._board[45].set_color(1);
  board._board[41].set_color(2);
  board._board[14].set_color(3);
  board._board[23].set_color(8);

  let tab1 = board.get_move(7);
  let tab2 = board.get_move(3);
  let tab3 = board.get_move(6);
  let tab1_to = [];
  let tab2_to = [];

  for (let i = 0; i < tab1.length; i += 1) {
    tab1_to.push(tab1[i].get_to());
  }
  for (let i = 0; i < tab2.length; i += 1) {
    tab2_to.push(tab2[i].get_to());
  }

  assert.deepEqual(tab1_to, [14, 27, 45, 41, 6, 1], "Passed!");
  assert.deepEqual(tab2_to, [14, 27, 50], "Passed!");
  assert.deepEqual(tab3[0].get_to(), -1, "Passed!");
});

QUnit.test("get_move : 4", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();
  board._id_pawn = 23;

  board._board[1].set_color(7);
  board._board[3].set_color(7);
  board._board[6].set_color(7);
  board._board[7].set_color(7);
  board._board[8].set_color(7);
  board._board[9].set_color(7);
  board._board[12].set_color(7);
  board._board[14].set_color(7);
  board._board[15].set_color(7);
  board._board[16].set_color(7);
  board._board[18].set_color(7);
  board._board[19].set_color(7);
  board._board[20].set_color(7);
  board._board[21].set_color(7);
  board._board[27].set_color(7);
  board._board[28].set_color(7);
  board._board[29].set_color(7);
  board._board[30].set_color(7);
  board._board[31].set_color(7);
  board._board[32].set_color(7);
  board._board[37].set_color(7);
  board._board[39].set_color(7);
  board._board[40].set_color(7);
  board._board[41].set_color(7);
  board._board[45].set_color(7);
  board._board[46].set_color(7);
  board._board[47].set_color(7);

  board._board[23].set_color(8);

  let tab1 = board.get_move(7);
  let tab2 = board.get_move(5);
  let tab1_to = [];

  for (let i = 0; i < tab1.length; i += 1) {
    tab1_to.push(tab1[i].get_to());
  }

  assert.deepEqual(tab1_to, [0, 2, 4, 5, 10, 11, 13, 17, 22, 24, 25, 26, 33, 34, 35, 36, 38, 42, 43, 44, 48], "Passed!");
  assert.deepEqual(tab2[0].get_to(), -1, "Passed!");
});

QUnit.test("board_ok : 1", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();
  assert.ok(board._board_ok(), "Passed!");
});

QUnit.test("board_ok : 2", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();
  board._board[0].set_color(6);
  board._board[4].set_color(6);
  board._board[11].set_color(6);
  board._board[19].set_color(6);
  board._board[28].set_color(6);
  board._board[36].set_color(6);
  board._board[43].set_color(6);

  assert.notOk(board._board_ok(), "not ok");
});

QUnit.test("board_ok : 3", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();

  board._board[0].set_color(6);
  board._board[2].set_color(6);
  board._board[5].set_color(6);
  board._board[9].set_color(6);
  board._board[13].set_color(6);
  board._board[21].set_color(6);
  board._board[30].set_color(6);

  assert.notOk(board._board_ok(), "not ok");
});

QUnit.test("board_ok : 4", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();

  board._board[0].set_color(6);
  board._board[1].set_color(6);
  board._board[2].set_color(6);
  board._board[4].set_color(6);
  board._board[7].set_color(6);
  board._board[11].set_color(6);
  board._board[8].set_color(6);

  assert.notOk(board._board_ok(), "not ok");
});

QUnit.test("board_ok : 5", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();

  board._board[0].set_color(6);
  board._board[2].set_color(6);
  board._board[8].set_color(6);
  board._board[16].set_color(6);
  board._board[11].set_color(6);
  board._board[15].set_color(6);
  board._board[18].set_color(6);

  assert.notOk(board._board_ok(), "not ok");
});

QUnit.test("board_ok : 6", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();
  board._board[0].set_color(1);
  board._board[1].set_color(2);
  board._board[2].set_color(3);
  board._board[3].set_color(4);
  board._board[4].set_color(5);
  board._board[5].set_color(7);
  board._board[6].set_color(2);
  board._board[7].set_color(3);
  board._board[8].set_color(4);
  board._board[9].set_color(5);
  board._board[32].set_color(6);
  board._board[28].set_color(6);
  board._board[23].set_color(6);
  board._board[27].set_color(6);
  board._board[22].set_color(6);
  board._board[14].set_color(6);
  board._board[10].set_color(6);

  assert.notOk(board._board_ok(), "not ok");
});

QUnit.test("get_move_spe", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  let tab = [];
  let tab2 = [];
  board._random_board();
  board._id_pawn = 0;
  board._board[1].set_color(7);
  board._board[8].set_color(7);
  board._board[30].set_color(7);
  board._board[25].set_color(7);
  let m = board._get_move_spe();
  for (let i = 0; i < board._board.length; i++) {
    if (board._board[i].get_color() !== 7) {
      tab.push(i);
    }
  }
  for (let i = 0; i < m.length; i++) {
    tab2.push(m[i].get_to());
  }

  assert.deepEqual(tab, tab2, "Works");
});

QUnit.test("get_one_move", function (assert) {
  let board = new window.OpenXum.Tintas.Board();
  board._random_board();
  board._id_pawn = 4;
  board._board[4].set_color(1);
  board._board[8].set_color(1);

  assert.equal(board._get_one_move(window.OpenXum.Tintas.Color.GREEN, [0, 0, 0]), 4, "Works in matrix [0,0,0]");
  assert.equal(board._get_one_move(window.OpenXum.Tintas.Color.GREEN, [1, 1, 0]), 8, "Works");
});
