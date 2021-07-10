QUnit.test("init", function (assert) {
  let engine = new window.Neutreeko.Engine(window.Neutreeko.GameType.STANDARD, window.Neutreeko.Color.BLACK);
  let board = new window.Neutreeko.Board(window.Neutreeko.Dimension.DEFAULT_WIDTH, window.Neutreeko.Dimension.DEFAULT_HEIGHT);
  let black = window.Neutreeko.Color.BLACK;
  let white = window.Neutreeko.Color.WHITE;
  
  board.place_piece(new window.Neutreeko.Piece(black, new window.Neutreeko.Coordinates(1, 0)));
  board.place_piece(new window.Neutreeko.Piece(black, new window.Neutreeko.Coordinates(3, 0)));
  board.place_piece(new window.Neutreeko.Piece(black, new window.Neutreeko.Coordinates(2, 3)));

  board.place_piece(new window.Neutreeko.Piece(white, new window.Neutreeko.Coordinates(1, 4)));
  board.place_piece(new window.Neutreeko.Piece(white, new window.Neutreeko.Coordinates(3, 4)));
  board.place_piece(new window.Neutreeko.Piece(white, new window.Neutreeko.Coordinates(2, 1)));

  assert.deepEqual(board, engine._board, "Board is well initialized");

  assert.deepEqual(window.Neutreeko.Color.BLACK, engine.current_color(), "First player is Black");
  assert.notOk(engine.is_finished(), "Game is not finished");
  assert.deepEqual(window.Neutreeko.Color.NONE, engine.winner_is(), "No winner");
});

QUnit.test("_change_color", function (assert) {
  let engine = new window.Neutreeko.Engine(window.Neutreeko.GameType.STANDARD, window.Neutreeko.Color.BLACK);
  assert.deepEqual(window.Neutreeko.Color.BLACK, engine.current_color(), "Current color is Black");
  engine._change_color();
  assert.deepEqual(window.Neutreeko.Color.WHITE, engine.current_color(), "Current color is White");
});

QUnit.test("move", function (assert) {
  let engine = new window.Neutreeko.Engine(
    window.Neutreeko.GameType.STANDARD,
    window.Neutreeko.Color.BLACK
  );

  let black = window.Neutreeko.Color.BLACK;
  let white = window.Neutreeko.Color.WHITE;

  let newCoordinates = new window.Neutreeko.Coordinates(0, 0);

  let board = new window.Neutreeko.Board(
    window.Neutreeko.Dimension.DEFAULT_WIDTH,
    window.Neutreeko.Dimension.DEFAULT_HEIGHT
  );
  board.place_piece(new window.Neutreeko.Piece(black, newCoordinates));
  board.place_piece(new window.Neutreeko.Piece(black, new window.Neutreeko.Coordinates(3, 0)));
  board.place_piece(new window.Neutreeko.Piece(black, new window.Neutreeko.Coordinates(2, 3)));

  board.place_piece(new window.Neutreeko.Piece(white, new window.Neutreeko.Coordinates(1, 4)));
  board.place_piece(new window.Neutreeko.Piece(white, new window.Neutreeko.Coordinates(3, 4)));
  board.place_piece(new window.Neutreeko.Piece(white, new window.Neutreeko.Coordinates(2, 1)));

  engine.move(new window.Neutreeko.Move(new window.Neutreeko.Coordinates(1, 0), newCoordinates));

  assert.deepEqual(board, engine._board, "Move applied");
  assert.deepEqual(white, engine.current_color(), "Current color has been updated");
});

QUnit.test("undo_move", function (assert) {
  let engine = new window.Neutreeko.Engine(
    window.Neutreeko.GameType.STANDARD,
    window.Neutreeko.Color.BLACK
  );

  let black = window.Neutreeko.Color.BLACK;
  let white = window.Neutreeko.Color.WHITE;

  let newCoordinates = new window.Neutreeko.Coordinates(0, 0);

  let board = new window.Neutreeko.Board(
    window.Neutreeko.Dimension.DEFAULT_WIDTH,
    window.Neutreeko.Dimension.DEFAULT_HEIGHT
  );
  board.place_piece(new window.Neutreeko.Piece(black, new window.Neutreeko.Coordinates(1, 0)));
  board.place_piece(new window.Neutreeko.Piece(black, new window.Neutreeko.Coordinates(3, 0)));
  board.place_piece(new window.Neutreeko.Piece(black, new window.Neutreeko.Coordinates(2, 3)));

  board.place_piece(new window.Neutreeko.Piece(white, new window.Neutreeko.Coordinates(1, 4)));
  board.place_piece(new window.Neutreeko.Piece(white, new window.Neutreeko.Coordinates(3, 4)));
  board.place_piece(new window.Neutreeko.Piece(white, new window.Neutreeko.Coordinates(2, 1)));

  let move = new window.Neutreeko.Move(new window.Neutreeko.Coordinates(1, 0), newCoordinates);
  engine.move(move);
  engine.undo_move(move);

  assert.deepEqual(board, engine._board, "Undo move applied");
  assert.deepEqual(black, engine.current_color(), "Current color has been updated");

  let newEngine = new window.Neutreeko.Engine(
    window.Neutreeko.GameType.STANDARD,
    window.Neutreeko.Color.BLACK
  );

  assert.deepEqual(engine, newEngine, "Engine reinitialized");
});

QUnit.test("get_possible_move_list", function (assert) {
  let engine = new window.Neutreeko.Engine(window.Neutreeko.GameType.STANDARD, window.Neutreeko.Color.BLACK);
  let c1, c2, c3;
  c1 = new window.Neutreeko.Coordinates(1, 0);
  c2 = new window.Neutreeko.Coordinates(3, 0);
  c3 = new window.Neutreeko.Coordinates(2, 3);

  let moves1 = [];
  moves1.push(new window.Neutreeko.Move(c1, new window.Neutreeko.Coordinates(2,0)));
  moves1.push(new window.Neutreeko.Move(c1, new window.Neutreeko.Coordinates(0,0)));
  moves1.push(new window.Neutreeko.Move(c1, new window.Neutreeko.Coordinates(1,3)));
  moves1.push(new window.Neutreeko.Move(c1, new window.Neutreeko.Coordinates(0,1)));

  assert.deepEqual(moves1, engine._get_possible_move_list(engine._board.getPieceAt(c1.x(), c1.y())), "Test moves for first piece");

  let moves2 = [];
  moves2.push(new window.Neutreeko.Move(c2, new window.Neutreeko.Coordinates(4,0)));
  moves2.push(new window.Neutreeko.Move(c2, new window.Neutreeko.Coordinates(2,0)));
  moves2.push(new window.Neutreeko.Move(c2, new window.Neutreeko.Coordinates(3,3)));
  moves2.push(new window.Neutreeko.Move(c2, new window.Neutreeko.Coordinates(4,1)));


  assert.deepEqual(moves2, engine._get_possible_move_list(engine._board.getPieceAt(c2.x(), c2.y())), "Test moves for second piece");

  let moves3 = [];
  moves3.push(new window.Neutreeko.Move(c3, new window.Neutreeko.Coordinates(4,3)));
  moves3.push(new window.Neutreeko.Move(c3, new window.Neutreeko.Coordinates(0,3)));
  moves3.push(new window.Neutreeko.Move(c3, new window.Neutreeko.Coordinates(2,4)));
  moves3.push(new window.Neutreeko.Move(c3, new window.Neutreeko.Coordinates(2,2)));
  moves3.push(new window.Neutreeko.Move(c3, new window.Neutreeko.Coordinates(4,1)));
  moves3.push(new window.Neutreeko.Move(c3, new window.Neutreeko.Coordinates(0,1)));

  assert.deepEqual(moves3, engine._get_possible_move_list(engine._board.getPieceAt(c3.x(), c3.y())), "Test moves for third piece");

  let moves = [];
  moves = moves.concat(moves1);
  moves = moves.concat(moves2);
  moves = moves.concat(moves3);

  assert.deepEqual(moves, engine.get_possible_move_list(), "Test get_possible_move_list()");
});

QUnit.test("clone", function (assert) {
  let engine = new window.Neutreeko.Engine(window.Neutreeko.GameType.STANDARD, window.Neutreeko.Color.BLACK);
  assert.deepEqual(engine, engine.clone(), "Cloned");

  let move = new window.Neutreeko.Move(
    new window.Neutreeko.Coordinates(1, 0),
    new window.Neutreeko.Coordinates(0, 0)
  );

  engine.move(move);
  let clone = engine.clone();
  assert.deepEqual(engine, clone, "Modified engine cloned");
  assert.ok(clone !== engine, "Different objects");


  for(let i=0; i<engine._pieces.length; i++) {
    for(let j=0; j<engine._pieces[i].length; j++) {
      assert.ok( engine._pieces[i][j] !== clone._pieces[i][j], "_pieces["+i+"]["+j+"] are different objects");
    }
  }

  assert.ok(engine._board !== clone._board, "_board are different objects");
});

QUnit.test("_verify_moving", function(assert) {
  let i = 1, j = 0, xCorrect = 0, xFalse = 3, y = 0;
  let engine = new window.Neutreeko.Engine(window.Neutreeko.GameType.STANDARD, window.Neutreeko.Color.BLACK);

  assert.ok(engine._verify_moving(engine._board.getPieceAt(i,j),xCorrect,y), "Valid move");
  assert.notOk(engine._verify_moving(engine._board.getPieceAt(i,j),xFalse,y), "Invalid move");
});