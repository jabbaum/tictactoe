// iife module pattern
const Gameboard = (function(){
    let gameboard=[
        0,1,2,
        3,4,5,
        6,7,8
    ];
    const Place = (index, symbol) => {
        if(gameboard[index] !== 'X' && gameboard[index] !== 'Y') {
            gameboard[index] = symbol
            return checkWinner(index);
        } else {
            console.log(`Cell ${index} is taken, sorry.`);
            return null;
        }
    };

    const checkWinner = (index) => {
        let winCondHorz = [0, 0, 0];
        let winCondVert = [0, 0, 0];
        let winCondDiag = [0, 0];
        let currentSymbol = gameboard[index];
        if(gameboard[0] === currentSymbol && gameboard[1] === currentSymbol && gameboard[2] === currentSymbol) {
            winCondHorz[0] = 1;
        } else if (gameboard[3] === currentSymbol && gameboard[4] === currentSymbol && gameboard[5] === currentSymbol) {
            winCondHorz[1] = 1;
        } else if (gameboard[6] === currentSymbol && gameboard[7] === currentSymbol && gameboard[8] === currentSymbol) {
            winCondHorz[2] = 1;
        } else if(gameboard[0] === currentSymbol && gameboard[3] === currentSymbol && gameboard[6] === currentSymbol) {
            winCondVert[0] = 1;
        } else if(gameboard[1] === currentSymbol && gameboard[4] === currentSymbol && gameboard[7] === currentSymbol) {
            winCondVert[1] = 1;
        } else if(gameboard[2] === currentSymbol && gameboard[5] === currentSymbol && gameboard[8] === currentSymbol) {
            winCondVert[2] = 1;
        } else if (gameboard[0] === currentSymbol && gameboard[4] === currentSymbol && gameboard[8] === currentSymbol) {
            winCondDiag[0] = 1;
        } else if (gameboard[2] === currentSymbol && gameboard[4] === currentSymbol && gameboard[6] === currentSymbol) {
            winCondDiag[1] = 1;
        };
        return {
            winCondVert,
            winCondHorz,
            winCondDiag
        }
    }

    const DisplayBoard = () => gameboard;

    return {
        Place,
        DisplayBoard,
        checkWinner
    }
})();

function createPlayer(name, symbol) {
    return {name, symbol};
}
const Player1 = createPlayer('Player 1', 'X');
const Player2 = createPlayer('Player 2', 'O');

const GameLogic = (function(){
    let winner = null;
    let plays = [];
    let rounds = 0;
    let currentTurn = 1;

    const IncrementRounds = () => rounds = rounds++;
    const AddPlay = (play) => plays.push(play);
    const changeTurn = (lastTurn) => {
        if(lastTurn == 1) {
        currentTurn = 2;
        } else {
            currentTurn = 1;
        }
    }
    

})();

console.log(Gameboard.Place(0, 'X'));
Gameboard.Place(1, 'Y');
Gameboard.Place(4, 'X');
console.log(Gameboard.Place(4, 'Y'));
Gameboard.Place(2, 'Y');
Gameboard.Place(8, 'X');

console.log(Gameboard.DisplayBoard());
