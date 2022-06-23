//        LOOK        //
/* create a board (with alternating colors)
64 squares total (8x8)- grid
12 pieces per player - alternating each square space for 4 pieces across 3 rows

*/




const board = document.querySelector('#board');
const size = 8;
const winner = ''; //input player name option...add high point variable

function createBoard() {
    for (let x = 0; x < size; x++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let y = 0; y < size; y++) {
            let tile = document.createElement('div');
            tile.setAttribute('data-tile-num', `${x}, ${y}`);
            row.appendChild(tile);
        }
        board.appendChild(row);
    }
}

function mySetPieces() {
    let ranks = document.querySelectorAll('.row');

    for (let i = 0; i < 3; i++) {
        // if (!(i == 3 || i == 4)) {
        for (let j = 0; j < ranks[i].children.length; j++) {
            if (i % 2 == 0) {

                if (j % 2 == 0) {
                    ranks[i].children[j].classList.add('mypiece');
                }
            } else {
                if (j % 2 != 0) {
                    ranks[i].children[j].classList.add('mypiece');
                }
            }
        }
    }
}

const myArr = Array.from(document.querySelectorAll('.mypiece')) // <---for keeping track of which pieces are jumped? use array and pop method to keep track

// FUNCTIONALITY: drag/drop eventlistener
//can it work as is or do I need to convert into individual elements of [i]?





function oppSetPieces() {
    let ranks = document.querySelectorAll('.row');

    for (let i = ranks.length - 1; i > 4; i--) {
        for (let j = 0; j < ranks[i].children.length; j++) {
            if (i % 2 == 0) {

                if (j % 2 == 0) {
                    ranks[i].children[j].classList.add('opppiece');
                }
            } else {
                if (j % 2 != 0) {
                    ranks[i].children[j].classList.add('opppiece');
                }
            }
        }

    }
}
const oppArr = Array.from(document.querySelectorAll('.opppiece'))

createBoard();
mySetPieces(); //add event listener (add possible moves)
oppSetPieces(); //computer generated (add Math.random moves)









//pieces 
//      input: click/grab piece to move
//      processing: jumping, taking away pieces (from one array),
//      output:  jump over piece take away piece off board and switch players turns
//      MAIN: jump over the pieces until the last 3 pieces?! to WIN!








//      ACTION       //
/* Deploy event listener that allows player to select a piece and will illuminate options of where to move ONLY diagonally (either left or right)...ONE ROW AT A TIME!!!
//SHOW PLAYER TURN

//jumping....left and right forward
//king me...left and right, forward and backward

once move completed then opponent's turn with the same actions 




KING ME FEATURE: should be a if condition { when opponent reaches the baseline deploy front AND back movement }

*/



//    EXTRA  //

/* 

DISPLAY RULES!!!

choose between another person or computer in home menu
input player name(s)
pick color pieces? 


 
*/