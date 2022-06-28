const board = document.querySelector("#board");
const size = 8;
// let destCoords = '';
// let moveCoords = '';
let spotDest = '';
let tID = '';
//const player = prompt("Input Player Name!");;

function createBoard() {
    for (let x = 0; x < size; x++) {
        let row = document.createElement("div");
        row.classList.add("row", `row-${x}`);
        for (let y = 0; y < size; y++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.setAttribute("data-tile-num", `${x}, ${y}`);
            tile.setAttribute("data-tile-x", x);
            tile.setAttribute("data-tile-y", y);
            tile.addEventListener("click", selectSpace);
            row.appendChild(tile);
        }
        board.appendChild(row);
    }
}

function setPieces(player = true) {
    let ranks = document.querySelectorAll(".row");
    let i = player ? 0 : ranks.length - 1;
    let num = 1;

    while (player ? i < 3 : i > 4) {
        // \//\//\//\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

        for (let j = 0; j < ranks[i].children.length; j++) {
            if (i % 2 == 0) {
                if (j % 2 == 0) {
                    ranks[i].children[j].classList.add("piece");
                    if (player) {
                        ranks[i].children[j].id = `P${num++}`;
                    } else {
                        ranks[i].children[j].id = `T${num++}`;
                        ranks[i].children[j].classList.add("opps");
                    }
                }
            } else {
                if (j % 2 != 0) {
                    ranks[i].children[j].classList.add("piece");
                    if (player) {
                        ranks[i].children[j].id = `P${num++}`;
                    } else {
                        ranks[i].children[j].id = `T${num++}`;
                        ranks[i].children[j].classList.add("opps");
                    }
                }
            }
        }
        player ? i++ : i--;
    }
    // \//\//\//\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
}

function selectSpace() {
    //console.log(this);
    let occupied = this.classList.contains("piece");
    let isOpp = this.classList.contains("opps"); //create another variable for computer selected opp piece? 


    if (occupied && !isOpp) {
        document
            .querySelectorAll(".piece")
            .forEach((piece) => piece.classList.remove("selected"));
        this.classList.add("selected");
    } else if (!occupied && isOpp) { //added
        document.querySelectorAll(".opps")
            .forEach((opps) => opps.classList.remove("selected"));
        this.classList.add("selected");
    }
    let movingPiece = document.querySelector(".selected");
    if (movingPiece != null) {
        //check if king
        if (inRange(movingPiece, this) && !occupied) { //wait what?
            console.log("Space is available to move!");
            console.log(movingPiece.id);
            // console.log(movingPiece
            movePiece(movingPiece, this);
        }
        if (inRange(movingPiece, spotDest) && !isOpp) { //added...will this work since function so far down?
            console.log("Space is available to move!");
            console.log(movingPiece.id);
            // console.log(movingPiece
            movePiece(movingPiece, this);

        } else {
            console.log("Nothing was selected!");
        }
    }

}

function movePiece(mover, shaker) {
    let id = mover.id;
    let isOpp = mover.classList.contains("opps");

    mover.classList.remove("selected");
    mover.id = "";
    mover.classList.remove("piece");
    if (isOpp) mover.classList.remove("opps");
    shaker.id = id;
    shaker.classList.add("piece");
    if (isOpp) shaker.classList.add("opps");
}

function inRange(mover, destination) {
    // Y,X <== BACKWARDS AF

    const moverCoord = mover.getAttribute("data-tile-num").split(", ");
    const destCoord = destination.getAttribute("data-tile-num").split(", ");

    const moverX = parseInt(moverCoord[0]);
    const moverY = parseInt(moverCoord[1]);
    const destX = parseInt(destCoord[0]);
    const destY = parseInt(destCoord[1]);
    // destCoords = `${destX}, ${destY}`; //maybe save in an array that opponent can read to know not to jump?
    // moveCoords = `${moverX}, ${moverY}`


    const playerForward = destX == moverX + 1;
    const oppForward = destX == moverX - 1;
    const playerDiagonalLeft = destY == moverY - 1; //add style for possible moves
    const oppDiagonalLeft = destY == moverY + 1;
    const playerDiagonalRight = destY == moverY + 1; //add second event listener for adding style on possible moves
    const oppDiagonalRight = destY == moverY + 1;
    const playerDiagonal = playerDiagonalLeft || playerDiagonalRight; //add style for possible moves
    const oppDiagonal = oppDiagonalLeft || oppDiagonalRight;

    let hasOpp;
    let adjacentTile;
    ///TERNARY OPERATOR TO GET BOTH?!?
    if (destY > moverY) {
        // check if the space between has an opponent on it

        document.querySelectorAll(".tile").forEach((tile) => {
            if (
                tile.getAttribute("data-tile-num") === `${moverX + 1}, ${moverY + 1}`
            ) {
                adjacentTile = tile;
            }
        });
        hasOpp = adjacentTile.classList.contains("opps");
    } else if (destY < moverY) {
        // check if the space between has an opponent on it
        document.querySelectorAll(".tile").forEach((tile) => {
            if (
                tile.getAttribute("data-tile-num") === `${moverX + 1}, ${moverY - 1}`
            ) {
                adjacentTile = tile;
            }
        });
        hasOpp = adjacentTile.classList.contains("opps");
    }

    console.log({ hasOpp }); //prints if opponent is in playerDiagonal space (WHEN SELECTED)...add to "on click"
    console.log({ adjacentTile });
    // console.log(destCoords);
    console.log({ moverX }, { moverY }, { destX }, { destY });
    return playerForward && playerDiagonal; //add the pretty style!!!!


    // console.log({ moverX }, { moverY }, { destX }, { destY });
}

function canAttack() {}

//  for demostration purposes 
// |||||||||||||||||||||||||||
// vvvvvvvvvvvvvvvvvvvvvvvvvvv
//
// function forceMove(targetID, destCoord) {
//     const target = document.getElementById(targetID);
//     let destination;

//     document.querySelectorAll(".tile").forEach((tile) => {
//         if (tile.getAttribute("data-tile-num") === destCoord) {
//             destination = tile;
//         }
//     });

//     movePiece(target, destination); //
// } 
//forceMove("T11", "3, 3"); <== PUT BELOW EVERY OTHER CALL...HAS TO BE STRING!!!


// function whyGod(targetID, destCoord) {
//     const target = document.getElementById(targetID);
//     let destination;

//     document.querySelectorAll(".tile").forEach((tile) => {
//         if (tile.getAttribute("data-tile-num") === destCoord) {
//             destination = tile;
//         }
//     });///TAKE THIS OUT TO USE IN RANDOMSELECT()

//     movePiece(target, destination);
// };




function randomSelect() {
    let arr = document.querySelectorAll('.opps'); //opponent pieces
    let random = Math.floor(Math.random() * arr.length); //picking random opp piece
    console.log(arr[random]);
    const target = arr[random];
    console.log(target); // tried JSON.stringify to convert target object to string, but would print empty object console.log(JSON.stringify(strTarget));
    let tID = target.id
    let tDest = target.getAttribute("data-tile-num");
    console.log(tDest);
    console.log(tID);
    let tiles = document.querySelectorAll('.tile');
    let randomTile = Math.floor(Math.random() * tiles.length);
    let spot = tiles[randomTile];
    let spotDest = spot.getAttribute("data-tile-num");
    console.log(spotDest); //if I return "spotDest" can it be used globally?

    inRange(target, spot);





    // document //trying to see if I add a class which contains the ID if that will work for moving piece function to "select"/move piece
    //     .querySelectorAll(".opps")
    //     .forEach((opps) => opps.classList.remove("selected"));
    // this.classList.add("selected");

    //let strTarget = document.querySelector(".selected")
    // let data;

    // document.querySelectorAll(".tile").forEach((tile) => {
    //     if (tile.getAttribute("data-tile-num")) {
    //         data = tile;
    //     }
};
//whyGod(strTarget, tDest);

// function randomSpace() {
//     let tiles = document.querySelectorAll('.tile');
//     let randomTile = Math.floor(Math.random() * tiles.length);
//     let spot = tiles[randomTile];
//     let spotDest = spot.getAttribute("data-tile-num");
//     console.log(spotDest); //if I return "spotDest" can it be used globally?

// };


createBoard();
setPieces();
setPieces(false);
randomSelect();
// randomSpace();
//whyGod();