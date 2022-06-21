//        LOOK        //
/* create a board (with alternating colors)
64 squares total (8x8)- grid
12 pieces per player - alternating each square space for 4 pieces across 3 rows

*/







let grid = document.querySelector('.grid');
for (let i = 0; i < 64; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)

}
const squares = Array.from(document.querySelectorAll('.grid div'))









//pieces 
//      input: click/grab piece to move
//      processing: jumping, taking away pieces (from one array),
//      output:  jump over piece take away piece off board and switch players turns
//      MAIN: jump over the pieces until the last 3 pieces?! to WIN!








//      ACTION       //
/* Deploy event listener that allows player to select a piece and will illuminate options of where to move ONLY diagonally (either left or right)...ONE ROW AT A TIME!!!


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