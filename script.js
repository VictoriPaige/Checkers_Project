const board = document.querySelector("#board");
const size = 8;

function createBoard() {
    for (let x = 0; x < size; x++) {
        let row = document.createElement("div");
        row.classList.add("row");
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
    // console.log(this);
    let occupied = this.classList.contains("piece");
    let isOpp = this.classList.contains("opps");

    if (occupied && !isOpp) {
        document
            .querySelectorAll(".piece")
            .forEach((piece) => piece.classList.remove("selected"));
        this.classList.add("selected");
    } else {
        let movingPiece = document.querySelector(".selected");
        if (movingPiece != null) {
            //check if king
            if (inRange(movingPiece, this) && !occupied) {
                console.log("Space is available to move!");
                console.log(movingPiece.id);
                movePiece(movingPiece, this);
            }
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

    const forward = destX == moverX + 1;
    const diagonalLeft = destY == moverY - 1;
    const diagonalRight = destY == moverY + 1;
    const diagonal = diagonalLeft || diagonalRight;

    let hasOpp;
    let adjacentTile;

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

    console.log({ hasOpp });
    console.log({ adjacentTile });

    // console.log({ moverX }, { moverY }, { destX }, { destY });
    return forward && diagonal;

    // console.log({ moverX }, { moverY }, { destX }, { destY });
}

function canAttack() {}

function forceMove(targetID, destCoord) {
    const target = document.getElementById(targetID);
    let destination;

    document.querySelectorAll(".tile").forEach((tile) => {
        if (tile.getAttribute("data-tile-num") === destCoord) {
            destination = tile;
        }
    });

    movePiece(target, destination);
}

createBoard();
setPieces();
setPieces(false);
forceMove("T11", "3, 5");