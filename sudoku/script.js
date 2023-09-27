

document.addEventListener("DOMContentLoaded", () => {
    const sudokuBoard = document.getElementById("sudoku-board");
    const resetButton = document.getElementById("reset-button");
    const checkButton = document.getElementById("check-button");

    // Pobieranie planszy Sudoku z serwera przy starcie gry
    fetchSudokuBoard();

    // Wywołuje żądanie GET na serwer, aby pobrać planszę Sudoku
    function fetchSudokuBoard() {
        fetch("https://pure-stream-18400-20e1ee0431c7.herokuapp.com/api/sudoku/board")
            .then((response) => response.json())
            .then((data) => {
                displaySudokuBoard(data.board);
            });
    }

    // Wyświetla planszę Sudoku na stronie
    function displaySudokuBoard(board) {
        sudokuBoard.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement("td");
                const value = board[i][j].value;
                const isInitial = board[i][j].initial;
                cell.textContent = value !== 0 ? value : "";
                if (isInitial) {
                    cell.classList.add("given");
                } else {
                    cell.addEventListener("click", () => handleCellClick(i, j));
                }
                row.appendChild(cell);
            }
            sudokuBoard.appendChild(row);
        }
    }

    // Obsługuje kliknięcie na komórkę planszy
    function handleCellClick(row, col) {
        const value = parseInt(prompt("Podaj liczbę od 1 do 9"));
        if (value >= 1 && value <= 9) {
            const move = { row, col, value };
            makeMove(move);
        } else {
            alert("Podaj prawidłową liczbę od 1 do 9.");
        }
    }

    // Wywołuje żądanie POST na serwer, aby wykonać ruch gracza
    function makeMove(move) {
        fetch("https://pure-stream-18400-20e1ee0431c7.herokuapp.com/api/sudoku/move", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(move),
        })
            .then((response) => response.json())
            .then((isMoveValid) => {
                if (isMoveValid) {
                    fetchSudokuBoard();
                } else {
                    alert("Niewłaściwy ruch. Spróbuj ponownie.");
                }
            });
    }

    // Obsługuje przycisk resetowania planszy
    resetButton.addEventListener("click", () => {
        resetBoard();
    });

    // Wywołuje żądanie POST na serwer, aby zresetować planszę Sudoku
    function resetBoard() {

        fetch("https://pure-stream-18400-20e1ee0431c7.herokuapp.com/api/sudoku/reset", {

        fetch("https://pure-stream-18400-20e1ee0431c7.herokuapp.com/api/sudoku/", {
 3980ec8460b676a4bc7069b68fbcb261a1829f62
            method: "POST",
        }).then(() => fetchSudokuBoard());
    }

    // Obsługuje przycisk sprawdzania ukończenia gry
    checkButton.addEventListener("click", () => {
        checkGameCompleted();
    });

    // Wywołuje żądanie GET na serwer, aby sprawdzić, czy gra jest ukończona
    function checkGameCompleted() {

        fetch("https://pure-stream-18400-20e1ee0431c7.herokuapp.com/api/sudoku/check")

        fetch("https://pure-stream-18400-20e1ee0431c7.herokuapp.com/api/sudoku/")
3980ec8460b676a4bc7069b68fbcb261a1829f62
            .then((response) => response.json())
            .then((isGameCompleted) => {
                if (isGameCompleted) {
                    alert("Gratulacje! Ukończyłeś grę Sudoku.");
                } else {
                    alert("Gra nie jest jeszcze ukończona.");
                }
            });
    }
});
