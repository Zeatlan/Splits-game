QUnit.test("getWidth", function (assert) {
  let width = window.Neutreeko.Dimension.DEFAULT_WIDTH;
  let height = window.Neutreeko.Dimension.DEFAULT_HEIGHT;

  let board = new window.Neutreeko.Board(width, height);

  assert.deepEqual(board.getWidth(), width);
});

QUnit.test("getHeight", function (assert) {
  let width = window.Neutreeko.Dimension.DEFAULT_WIDTH;
  let height = window.Neutreeko.Dimension.DEFAULT_HEIGHT;

  let board = new window.Neutreeko.Board(width, height);

  assert.deepEqual(board.getHeight(), height);
});

QUnit.test("place_piece", function (assert) {
  let width = window.Neutreeko.Dimension.DEFAULT_WIDTH;
  let height = window.Neutreeko.Dimension.DEFAULT_HEIGHT;

  let board = new window.Neutreeko.Board(width, height);

  let i = 1, j = 2;
  let coor = new window.Neutreeko.Coordinates(i,j);
  let piece = new window.Neutreeko.Piece(window.Neutreeko.Color.WHITE, coor);

  assert.deepEqual(board._board[i][j], undefined, "No piece at "+coor.formatted_string());

  board.place_piece(piece);

  assert.deepEqual(board._board[i][j], piece, "Piece placed at "+coor.formatted_string());
});

QUnit.test("pop_piece", function (assert) {
  let width = window.Neutreeko.Dimension.DEFAULT_WIDTH;
  let height = window.Neutreeko.Dimension.DEFAULT_HEIGHT;

  let board = new window.Neutreeko.Board(width, height);

  let i = 1, j = 2;
  let coor = new window.Neutreeko.Coordinates(i,j);
  let piece = new window.Neutreeko.Piece(window.Neutreeko.Color.WHITE, coor);

  board.place_piece(piece);

  assert.deepEqual(board._board[i][j], piece, "Piece placed at "+coor.formatted_string());

  board.pop_piece(piece);

  assert.deepEqual(board._board[i][j], undefined, "No piece at "+coor.formatted_string());
});


QUnit.test("move_piece", function (assert) {
  let width = window.Neutreeko.Dimension.DEFAULT_WIDTH;
  let height = window.Neutreeko.Dimension.DEFAULT_HEIGHT;

  let board = new window.Neutreeko.Board(width, height);

  let i = 1, j = 2;
  let k = 3, l = 0;
  let from = new window.Neutreeko.Coordinates(i,j);
  let to = new window.Neutreeko.Coordinates(k,l);
  let piece = new window.Neutreeko.Piece(window.Neutreeko.Color.WHITE, from);
  let piece_moved = piece.clone();
  piece_moved.set_coordinates(to);

  board.place_piece(piece);

  assert.deepEqual(board._board[i][j], piece, "Piece placed at "+from.formatted_string());

  board.move_piece(piece, to);

  assert.deepEqual(board._board[i][j], undefined, "No piece at "+from.formatted_string());
  assert.deepEqual(board._board[k][l], piece, "Piece moved to "+to.formatted_string());
  assert.deepEqual(piece, piece_moved, "Coordinates of 'piece' have been updated");
});

QUnit.test("getPieceAt", function (assert) {
  let width = window.Neutreeko.Dimension.DEFAULT_WIDTH;
  let height = window.Neutreeko.Dimension.DEFAULT_HEIGHT;

  let board = new window.Neutreeko.Board(width, height);

  let i = 1, j = 2;
  let from = new window.Neutreeko.Coordinates(i,j);
  let piece = new window.Neutreeko.Piece(window.Neutreeko.Color.WHITE, from);

  board.place_piece(piece);

  assert.deepEqual(board.getPieceAt(i,j), piece, "getPieceAt on piece");

  assert.deepEqual(board.getPieceAt(0,0), undefined, "getPieceAt on undefined");
});