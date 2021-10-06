'use strict';


// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject;
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject || '';
}

function getElCell(pos) {
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`);
}


// CREATE MAT
function createMat(rows, cols) {
    var mat = [];
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < cols; j++) {
            row.push('');
        }
        mat.push(row);
    }
    return mat;
}

// RANDOM INT
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// PLAY SOUND
function playSound(src) {
    var sound = new Audio('src');
    sound.play();
}

// RANDOM COLOR
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// ARRAY OF NUMS
function getBoardNums(count) {
    var nums = [];
    for (var i = 1; i <= count; i++) {
        nums.push(i);
    }
    return nums;
}

// BLOW UP NEGS
function blowNegs(pos) {
    var cellI = pos.i;
    var cellJ = pos.j;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (gBoard[i][j].gameObject === FIRST_ALIEN ||
                gBoard[i][j].gameObject === SECOND_ALIEN ||
                gBoard[i][j].gameObject === THIRD_ALIEN) {
                handleAlienHit({ i: i, j: j })
            }
        }
    }
}


// COUNT NEGS
function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            var currCell = mat[i][j];
            if (currCell === 'SOMETHING') neighborsCount++;
        }
    }
    return neighborsCount;
}

// TIMER
function setTimer() {
    var gStartTime = Date.now();
    var elH3 = document.querySelector('h3');
    gTimerInterval = setInterval(function() {
        var secsPassed = (Date.now() - gStartTime) / 1000;
        elH3.innerText = secsPassed.toFixed(3);
    }, 100);
}


// RENDER BOARD
function renderBoardUtil(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var className = 'SOMETHING' ? 'class1' : 'class2';
            var tdId = `cell-${i}-${j}`;
            strHtml += `<td id="${tdId}" class="${className}" 
            onclick="cellClicked(this)">${cell}</td>`;
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.board-container');
    elMat.innerHTML = strHtml;
}

// RENDER CELL


function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location);
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

// GET CLASS NAME {i: i, j: j}, cell-i-j
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

// COPY BOARD
function copyBoard(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}

// ADD SOMETHING AT RANSOM CELL
function addGameElement(gameElement) {
    var emptyCell = getEmptyCell();
    if (!emptyCell) return;
    gBoard[emptyCell.i][emptyCell.j] = gameElement;
    renderCell(emptyCell, gameElement);
}

// GET ARRAY OF EMPTY CELLS
function getEmptyCells() {
    var emptyCells = [];
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j];
            if (currCell.gameObject === '') {
                emptyCells.push({ i, j });
            }
        }
    }
    return emptyCells;
}
// GET RANDOM EMPTY CELL
function getEmptyCell() {
    var emptyCells = getEmptyCells();
    if (emptyCells.length === 0 || !emptyCells) return;
    var randIdx = getRandomInt(0, emptyCells.length);
    var emptyCell = emptyCells[randIdx];
    return emptyCell;
}