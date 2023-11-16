function Player(name) {
    this.name = name;
    this.turn = true;
    this.getName = function () {
        return name;
    };
}

function createBoard() {
    Board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
}

function updateBoard(x, y) {
    var row = Board[y - 1];
    row[x - 1] = getMarker();
}

function printBoard() {
    for (i = 0; i < 3; i++) {
        var row = Board[i];
        console.log(row[0], '|', row[1], '|', row[2]);
        if (i != 2) console.log("\u2015 ", " \u2015 ", " \u2015")
    }
}

function getNames() {
    playerList = [];
    for (i = 0; i < 2; i++) {
        var userName = prompt("What is your name?");
        playerList.push(new Player(userName))
    }
}

function getMarker() {
    if (playerList[0].turn) {
        return 'X';
    }
    return 'O';
}

function switchTurns() {
    playerList[0].turn = !playerList[0].turn;
    playerList[1].turn = !playerList[1].turn;
    console.log(getTurn() + "'s Turn:")
}

function getTurn() {
    if (playerList[0].turn) {
        return playerList[0].getName();
    }
    return playerList[1].getName();
}

function checkIfUnoccupied(x, y) {
    var row = Board[y - 1];
    if (row[x - 1] == ' ') {
        return true;
    }
    return false;
}

function checkForWin() {
    var marker = getMarker();
    return (checkRows(marker) || checkCol(marker) || checkDiagonals(marker)) ? true : false;
}

function checkSection(section, marker) {
    for (var i = 0; i < 3; i++) {
        if (section[i] != marker) {
            return false;
        }
    }
    return true;
}

function checkRows(marker) {
    for (var i = 0; i < 3; i++) {
        var row = Board[i];
        if (checkSection(row, marker)) return true;
    }
}

function checkCol(marker) {
    var row1 = Board[0];
    var row2 = Board[1];
    var row3 = Board[2];
    for (var i = 0; i < 3; i++) {
        var section = [row1[i], row2[i], row3[i]];
        if (checkSection(section, marker)) return true;
    }
}

function checkDiagonals(marker) {
    var row1 = Board[0];
    var row2 = Board[1];
    var row3 = Board[2];
    var section = [row1[0], row2[1], row3[2]];
    if (checkSection(section, marker)) return true;
    var section = [row1[2], row2[1], row3[0]]
    if (checkSection(section, marker)) return true;
}

function start() {
    //console.log("Welcome to TicTacToe " + playerList[0].getName() + " and " + playerList[1].getName() + "!");
    getNames();
    createBoard();
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    console.log('Hello');
    sleep(20000).then(() => { console.log('World!'); });

    printBoard();
    console.log(getTurn() + "'s Turn:")
    var turnCount = 0

    while (true) {
        turnCount++;
        var y = Number.parseInt(prompt(getTurn() + " what Row would you like to choose (row 1-3)"));
        var x = Number.parseInt(prompt(getTurn() + " what Col would you like to choose (col 1-3)"));
        if (x < 1 | x > 3 | y < 1 | y > 3 | !checkIfUnoccupied(x, y)) continue;
        updateBoard(x, y);
        printBoard();
        if (checkForWin() | turnCount == 9) break;
        switchTurns();
    }
    if (turnCount == 9) {
        console.log("The game has eneded in a tie!");
        const response = confirm("Play again?")
        if (response) {
            start();
        }
    } else {
        console.log(getTurn() + " has won the game! Congrats!");
        const response = confirm("Play again?")
        if (response) {
            start();
        }
    }
}

//start();
function createImg() {
    if (getMarker() == 'X') {
        X = document.createElement("img");
        X.src = "imgs/x.png";
        X.id = turn;
        return X;
    }
    O = document.createElement("img");
    O.src = "imgs/o.png";
    O.id = turn;
    return O;
}

function showImgOnHTML(x, y) {
    let id = ''.concat(y, x);
    document.getElementById(id).appendChild(createImg());
    document.getElementById(id).style.padding = "25px";
}

function clearHTMLBoard() {
    for (var i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            let id = ''.concat(i, j);
            var button = document.getElementById(id);
            if (button.childElementCount == 1) {
                button.removeChild(button.lastChild);
                document.getElementById(id).style.padding = "50px";
            }
        }
    }
}

function checkForEndOfGame() {
    if (checkForWin()) {
        const response = confirm(getTurn() + " has won the game! Congrats!" + "\n" + "Play again?")
        if (response) {
            clearHTMLBoard();
            createBoard();
            turn = 0;
        } else {
            disableButtons(true);
            return;
        }
    }
    if (turn == 9) {
        const response = confirm("The game has eneded in a tie!" + "\n" + "Play again?")
        if (response) {
            clearHTMLBoard();
            createBoard();
            turn = 0;
        } else {
            disableButtons(true);
            return;
        }
    }
}

function disableButtons(selection) {
    for (var i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            let id = ''.concat(i, j);
            var button = document.getElementById(id);
            if (selection) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        }
    }

}


getNames();
createBoard();
turn = 0;
//js
function HTMLSelection(y, x) {
    turn++;
    if (!checkIfUnoccupied(x, y)) return;
    showImgOnHTML(x, y);
    updateBoard(x, y);
    printBoard();
    checkForEndOfGame();
    switchTurns();
}

function markerSelection(selection) {
    clearHTMLBoard();
    createBoard();
    disableButtons(false);
    turn = 0;
    if (selection == 1) {
        console.log("X Selected")
        playerList[0].turn = true;
        playerList[1].turn = false;
        return
    }
    playerList[0].turn = false;
    playerList[1].turn = true;
}