$(document).ready(function() {
    var apiRoot = 'https://sudoku.nicol79.repl.co/api/sudoku/board'; // Zmień na rzeczywisty adres API Sudoku
    var sudokuBoard = $('#sudoku-board');

    // Inicjalizacja planszy Sudoku
    fetchSudokuBoard();

    function fetchSudokuBoard() {
        $.ajax({
            url: apiRoot + '/board',
            method: 'GET',
            success: displaySudokuBoard
        });
    }

    function displaySudokuBoard(data) {
        sudokuBoard.empty();
        for (var i = 0; i < 9; i++) {
            var row = $('<tr>');
            for (var j = 0; j < 9; j++) {
                var cell = $('<td>');
                var value = data.board[i][j].value;
                var isInitial = data.board[i][j].initial;
                cell.text(value !== 0 ? value : '');
                if (isInitial) {
                    cell.addClass('given');
                } else {
                    cell.on('click', function() {
                        handleCellClick(i, j);
                    });
                }
                row.append(cell);
            }
            sudokuBoard.append(row);
        }
    }

    function handleCellClick(row, col) {
        var value = parseInt(prompt('Podaj liczbę od 1 do 9'));
        if (value >= 1 && value <= 9) {
            var move = { row: row, col: col, value: value };
            makeMove(move);
        } else {
            alert('Podaj prawidłową liczbę od 1 do 9.');
        }
    }

    function makeMove(move) {
        $.ajax({
            url: apiRoot + '/move',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(move),
            success: function(isMoveValid) {
                if (isMoveValid) {
                    fetchSudokuBoard();
                } else {
                    alert('Niewłaściwy ruch. Spróbuj ponownie.');
                }
            }
        });
    }

    $('#reset-button').on('click', function() {
        resetBoard();
    });

    function resetBoard() {
        $.ajax({
            url: apiRoot + '/reset',
            method: 'POST',
            success: fetchSudokuBoard
        });
    }

    $('#check-button').on('click', function() {
        checkGameCompleted();
    });

    function checkGameCompleted() {
        $.ajax({
            url: apiRoot + '/check',
            method: 'GET',
            success: function(isGameCompleted) {
                if (isGameCompleted) {
                    alert('Gratulacje! Ukończyłeś grę Sudoku.');
                } else {
                    alert('Gra nie jest jeszcze ukończona.');
                }
            }
        });
    }
});
