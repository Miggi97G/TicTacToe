let fields = [
    null, null, null,
    null, null, null,
    null, null, null
];

let currentPlayer = 'X'; // Initialisiere currentPlayer

const resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', resetGame);

const resultMessageDiv = document.querySelector(".result-message");

function render() {
    const cells = document.querySelectorAll('td');

    for (let i = 0; i < fields.length; i++) {
        cells[i].innerHTML = ''; // Leere die Zelle
        if (fields[i] === 'X') {
            cells[i].innerHTML = `<svg class="x" width="100" height="100" viewBox="0 0 100 100">
            <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" stroke-width="20"/>
            <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" stroke-width="20"/>
          </svg>`;
        } else if (fields[i] === 'O') {
            cells[i].innerHTML = `<svg class="o" width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="10" fill="none"/>
          </svg>`;
        }
    }
}

/*Funktion, die aufgerufen wird, wenn ein Feld angeklickt wird*/
function checkWin() {
    const winPatterns = [
        [0, 1, 2], // Reihe 1
        [3, 4, 5], // Reihe 2
        [6, 7, 8], // Reihe 3
        [0, 3, 6], // Spalte 1
        [1, 4, 7], // Spalte 2
        [2, 5, 8], // Spalte 3
        [0, 4, 8], // Diagonale 1
        [2, 4, 6]  // Diagonale 2
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return fields[a]; // Gibt den Gewinner zurück ('X' oder 'O')
        }
    }
    return null; // Kein Gewinner
}

/*Überprüfen, ob das Spielfeld voll ist*/
function isBoardFull() {
    return fields.every(field => field !== null);
}

function handleCellClick(event) {
    const clickedCellIndex = event.target.dataset.index;

    if (fields[clickedCellIndex] === null) {
        fields[clickedCellIndex] = currentPlayer;
        render();

        const winner = checkWin();
        if (winner) {
            showResultMessage(`Spieler ${winner} hat gewonnen!`);
            // Hier können wir das Spielfeld deaktivieren, um weitere Klicks zu verhindern
            disableBoard();
            return;
        } else if (isBoardFull()) {
            showResultMessage("Unentschieden!");
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    fields.fill(null); // Setzt alle Felder auf null zurück
    currentPlayer = 'X'; // Setzt den aktuellen Spieler zurück
    resultMessageDiv.textContent = ""; // Leert die Ergebnisnachricht
    enableBoard();
    render(); // Rendert das Spielfeld neu
}

// Funktion zum Deaktivieren des Spielfelds
function disableBoard() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
        cell.classList.add('disabled');
    });
}

// Funktion zum Aktivieren des Spielfelds
function enableBoard() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
        cell.classList.remove('disabled');
    });
}

function showResultMessage(message) {
    console.log("showResultMessage aufgerufen mit:", message);
    resultMessageDiv.textContent = message;
    resultMessageDiv.classList.add("show");
    console.log("Klasse 'show' hinzugefügt");

    setTimeout(() => {
        resultMessageDiv.classList.remove("show");
        console.log("Klasse 'show' entfernt");
    }, 3000);
}

// Event Listener für die Zellen hinzufügen, nachdem das DOM geladen wurde
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded wurde ausgelöst"); // Hinzugefügt
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    render();
});

