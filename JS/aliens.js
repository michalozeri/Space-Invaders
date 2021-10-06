'use strict'

const ALIEN_SPEED = 500;
var gIntervalAliens;
var gAliensTopRowIdx = 0;
var gAliensBottomRowIdx = 2;
var gIsAlienFreeze = false;

function createAliens(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (i === gAliensTopRowIdx && j < ALIENS_ROW_LENGTH) currCell.gameObject = FIRST_ALIEN;
            if (i === gAliensTopRowIdx + 1 && j < ALIENS_ROW_LENGTH) currCell.gameObject = SECOND_ALIEN;
            if (i === gAliensTopRowIdx + 2 && j < ALIENS_ROW_LENGTH) currCell.gameObject = THIRD_ALIEN;
        }
    }
}

function handleAlienHit(pos) {
    updateCell(pos, '')
    updateScore(10);

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].gameObject === FIRST_ALIEN) return;
        }
    }
    gameOver('YOU MADE IT 😎');
}

function shiftBoardRight(board, fromI, toI) {
    if (!gGame.isOn) return
    if (gIsAlienFreeze) return
    for (var i = fromI; i <= toI; i++) {
        for (var j = board.length - 1; j >= 0; j--) {
            var targetCell = getElCell({ i: i, j: j });
            if (targetCell.innerText === FIRST_ALIEN) {
                if (j === board.length - 1) {
                    moveLeft()
                    return
                }
                updateCell({ i: i, j: j }, '');
                updateCell({ i: i, j: j + 1 }, FIRST_ALIEN);
            } else if (targetCell.innerText === SECOND_ALIEN) {
                updateCell({ i: i, j: j }, '');
                updateCell({ i: i, j: j + 1 }, SECOND_ALIEN);
            } else if (targetCell.innerText === THIRD_ALIEN) {
                updateCell({ i: i, j: j }, '');
                updateCell({ i: i, j: j + 1 }, THIRD_ALIEN);


            }
        }
    }
}

function shiftBoardLeft(board, fromI, toI) {
    if (!gGame.isOn) return
    if (gIsAlienFreeze) return
    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j <= board.length - 1; j++) {
            var targetCell = getElCell({ i: i, j: j });
            if (targetCell.innerText === FIRST_ALIEN) {
                if (j === 0) {
                    moveRight();
                    return
                }
                updateCell({ i: i, j: j }, '');
                updateCell({ i: i, j: j - 1 }, FIRST_ALIEN);
            } else if (targetCell.innerText === SECOND_ALIEN) {
                updateCell({ i: i, j: j }, '');
                updateCell({ i: i, j: j - 1 }, SECOND_ALIEN);
            } else if (targetCell.innerText === THIRD_ALIEN) {
                updateCell({ i: i, j: j }, '');
                updateCell({ i: i, j: j - 1 }, THIRD_ALIEN);
            }
        }
    }
}

function shiftBoardDown(board, fromI, toI) {
    if (!gGame.isOn) return
    if (gIsAlienFreeze) return
    for (var i = toI; i >= fromI; i--) {
        for (var j = board.length - 1; j >= 0; j--) {
            var targetCell = getElCell({ i: i, j: j });
            if (targetCell.innerText === FIRST_ALIEN) {
                updateCell({ i: i, j: j }, '');
                updateCell({ i: i + 1, j: j }, FIRST_ALIEN)
            } else if (targetCell.innerText === SECOND_ALIEN) {
                updateCell({ i: i, j: j }, '');
                updateCell({ i: i + 1, j: j }, SECOND_ALIEN)
            } else if (targetCell.innerText === THIRD_ALIEN) {
                updateCell({ i: i, j: j }, '');
                updateCell({ i: i + 1, j: j }, THIRD_ALIEN)
            }
            if (board[12][j].gameObject === FIRST_ALIEN ||
                board[12][j].gameObject === SECOND_ALIEN ||
                board[12][j].gameObject === THIRD_ALIEN) {
                gameOver('OH SHIT 🤯');
                return
            }
        }
    }
}

function moveAliens() {

    if (!gGame.isOn) return;
    if (gIsAlienFreeze) return

    gIntervalAliens = setInterval(function() {
        shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
    }, ALIEN_SPEED)
}

function moveLeft() {
    clearInterval(gIntervalAliens);
    gIntervalAliens = null
    shiftBoardDown(gBoard, gAliensTopRowIdx++, gAliensBottomRowIdx++)
    gIntervalAliens = setInterval(function() {
        shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
    }, ALIEN_SPEED)
}

function moveRight() {
    clearInterval(gIntervalAliens);
    gIntervalAliens = null
    shiftBoardDown(gBoard, gAliensTopRowIdx++, gAliensBottomRowIdx++);
    gIntervalAliens = setInterval(function() {
        shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
    }, ALIEN_SPEED)
}