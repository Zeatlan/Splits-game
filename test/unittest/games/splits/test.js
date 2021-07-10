
require = require('@std/esm')(module, { esm: 'mjs', cjs: true });

const OpenXum = require('../../../../lib/openxum-core/').default;

describe('Board', () => {
    test('Check invisible board to be vacant', () =>{
        const board = new OpenXum.Splits.Board();

        for(let column = 0; column < 16; column++){
            for(let line = 0; line < 16; line++){
                if (board._invisible_board[column][line] === undefined)
                    expect(board._invisible_board[column][line]).toBe(OpenXum.Splits.State.VACANT);
            }
        }
    });

    test('Check board with _init_board()', () =>{
        const board = new OpenXum.Splits.Board();

        expect(board._board[5][5].getState()).toBe(OpenXum.Splits.State.NO_VACANT);
        expect(board._board[16][16].getState()).toBe(OpenXum.Splits.State.VACANT);
    });
});

describe('Coordinates', () => {
    test('Check coordinates with get_pos_x() and get_pos_y()', () =>{
        const coordinates = new OpenXum.Splits.Coordinates(1, 1);

        expect(coordinates.get_pos_x()).toEqual(1);
        expect(coordinates.get_pos_y()).toEqual(1);
    });

    test('Check is_valid()',() =>{
        const board = new OpenXum.Splits.Board();
        const coordinates = new OpenXum.Splits.Coordinates(16, 16);
        const coordinatesOut = new OpenXum.Splits.Coordinates(5, 5);

        expect(coordinates.is_valid(board)).toBeTruthy();
        expect(coordinatesOut.is_valid(board)).toBeFalsy();
    });
});

describe('Stack', () => {
    test('Add pieces in array (1)', () =>{
        const test_array = [];
        const stack = new OpenXum.Splits.Stack();
        test_array.push(new OpenXum.Splits.Piece(OpenXum.Splits.Color.WHITE));
        test_array.push(new OpenXum.Splits.Piece(OpenXum.Splits.Color.RED));

        stack.pushPiece(test_array);
        expect(stack.getHeight()).toEqual(2);
    });


    test('Add pieces in array (2)', () =>{
        const WhitePiece = new OpenXum.Splits.Piece(OpenXum.Splits.Color.WHITE);
        const RedPiece = new OpenXum.Splits.Piece(OpenXum.Splits.Color.RED);
        const stack = new OpenXum.Splits.Stack();

        stack.pushPiece(WhitePiece);
        stack.pushPiece(RedPiece);
        expect(stack.getHeight()).toEqual(2);
    });

    test('Remove a piece', () =>{
        const test_array = [];
        const stack = new OpenXum.Splits.Stack();
        test_array.push(new OpenXum.Splits.Piece(OpenXum.Splits.Color.WHITE));
        test_array.push(new OpenXum.Splits.Piece(OpenXum.Splits.Color.RED));
        test_array.push(new OpenXum.Splits.Piece(OpenXum.Splits.Color.WHITE));
        test_array.push(new OpenXum.Splits.Piece(OpenXum.Splits.Color.RED));

        stack.pushPiece(test_array);
        expect(stack.getHeight()).toEqual(4);

        stack.pop(2);
        expect(stack.getHeight()).toEqual(2);
    });

    test('Clear the stack', () =>{
        const test_array = [];
        const stack = new OpenXum.Splits.Stack();
        test_array.push(new OpenXum.Splits.Piece(OpenXum.Splits.Color.WHITE));
        test_array.push(new OpenXum.Splits.Piece(OpenXum.Splits.Color.RED));

        stack.pushPiece(test_array);
        expect(stack.getHeight()).toEqual(2)

        stack.clear();
        expect(stack.getHeight()).toEqual(0);
    });
});

describe('Engine', () => {
    test('Check no neighbors', () =>{
        const engine = new OpenXum.Splits.Engine(OpenXum.Splits.GameType.STANDARD, OpenXum.Splits.Color.WHITE);
        engine._phase = OpenXum.Splits.Phase.IN_GAME;
        const coord = new OpenXum.Splits.Coordinates(1,1);

        expect(engine._getNeighbors(coord)).toBeFalsy();
    });

    test('Check neighbors', () =>{
        const engine = new OpenXum.Splits.Engine(OpenXum.Splits.GameType.STANDARD, OpenXum.Splits.Color.WHITE);
        const coord = new OpenXum.Splits.Coordinates(1, 1);
        engine._gameboard.getBoard(new OpenXum.Splits.Coordinates(2, 0)).putPiece(new OpenXum.Splits.Piece(OpenXum.Splits.Color.RED));
        let tab = engine._getNeighbors(coord);

        expect(tab.length).toEqual(5);
    });

    test('Check borders', () =>{
        const engine = new OpenXum.Splits.Engine(OpenXum.Splits.GameType.STANDARD, OpenXum.Splits.Color.WHITE);
        for (let column = 0; column < 6; column++){
            for (let line = 0; line < 6; line++){
                engine._gameboard.setBoard(new OpenXum.Splits.Coordinates(column, line), new OpenXum.Splits.Cell(new OpenXum.Splits.Coordinates(column, line)));
                engine._gameboard.setInvisibleBoard(new OpenXum.Splits.Coordinates(column, line), OpenXum.Splits.State.NO_VACANT);
            }
        }
        let tabb = engine._getBorderFrom(new OpenXum.Splits.Coordinates(2, 2));
        expect(tabb[0]).toEqual(new OpenXum.Splits.Coordinates(0, 2));

        engine._gameboard.getBoard(new OpenXum.Splits.Coordinates(0, 2)).putPiece(new OpenXum.Splits.Piece(OpenXum.Splits.Color.RED));
        tabb = engine._getBorderFrom(new OpenXum.Splits.Coordinates(2, 2));
        expect(tabb[0]).toEqual(new OpenXum.Splits.Coordinates(1, 2));

    });

    test('Check put map with a direction', () =>{
        const engine = new OpenXum.Splits.Engine(OpenXum.Splits.GameType.STANDARD, OpenXum.Splits.Color.WHITE);
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(16, 15), null, 0, null));

        expect(engine._gameboard.getInvisibleBoard(new OpenXum.Splits.Coordinates(15, 14))).toEqual(OpenXum.Splits.State.NO_VACANT);
        expect(engine._gameboard.getInvisibleBoard(new OpenXum.Splits.Coordinates(16, 14))).toEqual(OpenXum.Splits.State.NO_VACANT);
        expect(engine._gameboard.getInvisibleBoard(new OpenXum.Splits.Coordinates(15, 15))).toEqual(OpenXum.Splits.State.NO_VACANT);
    });

    test('Check init pieces', () =>{
        const engine = new OpenXum.Splits.Engine(OpenXum.Splits.GameType.STANDARD, OpenXum.Splits.Color.WHITE);
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(16, 15), null, 5, null));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(16, 17), null, 5, null));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(14, 17), null, 5, null));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(17, 14), null, 6, null));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(17, 17), null, 7, null));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(18, 16), null, 4, null));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(18, 14), null, 4, null));

        engine.onClickFirst(new OpenXum.Splits.Coordinates(12, 18));
        engine.onClickFirst(new OpenXum.Splits.Coordinates(20, 13));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_PIECE, engine._current_color, new OpenXum.Splits.Coordinates(12, 18), new OpenXum.Splits.Coordinates(17, 18), 5, null, null));

        expect(engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_PIECE, engine._current_color, new OpenXum.Splits.Coordinates(12, 18), new OpenXum.Splits.Coordinates(20, 13), 5, null, null))).toBeFalsy();
        expect(engine._gameboard.getBoard(new OpenXum.Splits.Coordinates(20, 13)).getStack().getHeight()).toEqual(16);
        expect(engine._gameboard.getBoard(new OpenXum.Splits.Coordinates(12, 18)).getStack().getHeight()).toEqual(11);
        expect(engine._gameboard.getBoard(new OpenXum.Splits.Coordinates(17, 18)).getStack().getHeight()).toEqual(5);

    });

    test('Check winner', () =>{
        const engine = new OpenXum.Splits.Engine(OpenXum.Splits.GameType.STANDARD, OpenXum.Splits.Color.WHITE);

        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(8, 7), null, 5, null));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(8, 9), null, 5, null));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(6, 9), null, 5, null));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(9, 6), null, 6, null));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(9, 9), null, 7, null));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(10, 8), null, 4, null));
        engine.move(new OpenXum.Splits.Move(OpenXum.Splits.MoveType.PUT_MAP, engine._current_color, null, new OpenXum.Splits.Coordinates(10, 6), null, 4, null));

        engine._gameboard.getBoard(new OpenXum.Splits.Coordinates(4, 10)).putPiece(new OpenXum.Splits.Piece(OpenXum.Splits.Color.WHITE));
        engine._gameboard.getBoard(new OpenXum.Splits.Coordinates(5, 10)).putPiece(new OpenXum.Splits.Piece(OpenXum.Splits.Color.WHITE));
        engine._gameboard.getBoard(new OpenXum.Splits.Coordinates(5, 9)).putPiece(new OpenXum.Splits.Piece(OpenXum.Splits.Color.WHITE));
        engine._gameboard.getBoard(new OpenXum.Splits.Coordinates(8, 11)).putPiece(new OpenXum.Splits.Piece(OpenXum.Splits.Color.RED));
        engine._gameboard.getBoard(new OpenXum.Splits.Coordinates(10, 6)).putPiece(new OpenXum.Splits.Piece(OpenXum.Splits.Color.RED));
        engine._phase = OpenXum.Splits.Phase.FINISH;

        expect(engine.winner_is()).toBe(OpenXum.Splits.Color.WHITE);
    });
});