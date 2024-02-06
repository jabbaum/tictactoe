// iife module pattern
const Gameboard = (function(){
    let gameboard=[
        0,1,2,
        3,4,5,
        6,7,8
    ];
    const PlaceX = (index) => gameboard[index] = 'X';
    const PlaceY = (index) => gameboard[index] = 'Y';
    const displayBoard = () => gameboard;

    return {
        PlaceX,
        PlaceY,
        displayBoard
    }
})();

Gameboard.PlaceX(0);
Gameboard.PlaceY(1);
Gameboard.PlaceX(4);

console.log(Gameboard.displayBoard());
