let fields = [
    null, null, null, null,
    null, null, null, null,
    null, null, null, null,
    null, null, null, null
];

let currentPlayer = 'X'; // Initialisiere currentPlayer

const resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', resetGame);

function render() {
    const cells = document.querySelectorAll('td');

    for (let i = 0; i < cells.length; i++) {
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
        [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], // Reihen
        [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], // Spalten
        [0, 5, 10, 15], [3, 6, 9, 12]  // Diagonalen
    ];

    for (let pattern of winPatterns) {
        const [a, b, c, d] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c] && fields[a] === fields[d]) {
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
    console.log("handleCellClick wurde aufgerufen"); // Hinzugefügt
    const clickedCellIndex = event.target.dataset.index;
    const resultMessage = document.querySelector('.result-message'); // Nachrichtenelement auswählen

    if (fields[clickedCellIndex] === null) {
        fields[clickedCellIndex] = currentPlayer;
        console.log(fields); // Hinzugefügt
        render();
        console.log("render() wurde aufgerufen"); // Hinzugefügt

        const winner = checkWin();
        if (winner) {
            resultMessage.textContent = `Spieler ${winner} hat gewonnen!`; // Nachricht anzeigen
            // Hier können wir das Spielfeld deaktivieren, um weitere Klicks zu verhindern
            disableBoard();
            return;
        } else if (isBoardFull()) {
            resultMessage.textContent = "Unentschieden!"; // Nachricht anzeigen
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    fields.fill(null); // Setzt alle Felder auf null zurück
    currentPlayer = 'X'; // Setzt den aktuellen Spieler zurück
    const resultMessage = document.querySelector('.result-message');
    resultMessage.textContent = ""; // Leert die Ergebnisnachricht
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

// Event Listener für die Zellen hinzufügen, nachdem das DOM geladen wurde
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded wurde ausgelöst"); // Hinzugefügt
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    render();
});

