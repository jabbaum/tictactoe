// iife module pattern
const Gameboard = (function(){
    let gameboard=[
        [0,1,2],
        [3,4,5],
        [6,7,8]
    ];
    const BoardLocator = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2]
    ];

    const AdjustLocation = (index) => {
        const AdjustedRow = BoardLocator[index][0];
        const AdjustedColumn = BoardLocator[index][1];
        return {
            AdjustedRow,
            AdjustedColumn
        }
    }    
    const Place = (index, symbol) => {
        const Adjusted = AdjustLocation(index);
        const AdjustedRow = Adjusted.AdjustedRow;
        const AdjustedColumn = Adjusted.AdjustedColumn;
        
        if(gameboard[AdjustedRow][AdjustedColumn] !== 'X' && gameboard[AdjustedRow][AdjustedColumn] !== 'O') {
            gameboard[AdjustedRow][AdjustedColumn] = symbol
            // CheckWinner(index);
            currentPlay = [index, symbol];
            GameLogic.AddPlay(currentPlay)
            
            return GameLogic.ManagePlay();

        } else {
            console.log(`Cell ${index} is taken, sorry.`);
            return null;
        }
    };

    const CheckWinner = (index) => {
        AdjustLocation(index);
        let winCondHorz = [0, 0, 0];
        let winCondVert = [0, 0, 0];
        let winCondDiag = [0, 0];
        let currentSymbol = gameboard[AdjustedRow][AdjustedColumn];

        const CheckRow = (row) => {
            let rowCells = ['empty', 'empty', 'empty'];
            for (let index = 0; index < gameboard[row].length; index++) {
                rowCells[index] = gameboard[row][index];
            }
            if (rowCells[0] === rowCells[1] && rowCells[0] === rowCells2) {
                return 1;
            } else {
                return 0;
            }
        }
        const CheckColumn =  (column) => {
            let columnCells = ['empty', 'empty', 'empty'];
            for (let index = 0; index < gameboard.length; index++) {
                columnCells[index] = gameboard[index][column]
            }
        }
        const CheckDiagnol = (row, column) => {
            const DiagTLBR = [[0,0], [1, 1], [2, 2]];
            const DiagBLTR = [[2, 0], [1, 1], [0, 2]];
            if ((row === 0 && column === 1) || (row === 2 && (column === 0 || column === 2)) || (row ===2 && column === 1)) {
                return;
            } else {
                for (let index = 0; index < winCondDiag.length; index++) {
                    
                }
            }
        }


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
        DisplayBoard
        // CheckWinner
    }
})();

function createPlayer(name, symbol) {
    return {name, symbol};
}


const GameLogic = (function(){
    let winner = null;
    let plays = [];
    let rounds = 0;
    let currentTurn = 1;
    let players = [];

    const Player1 = createPlayer('Player 1', 'X');
    const Player2 = createPlayer('Player 2', 'O');
    players.push(Player1);
    players.push(Player2);

    const IncrementRounds = () => rounds = rounds++;
    const AddPlay = (play) => plays.push(play);
    const changeTurn = () => {
        if(currentTurn == 1) {
        currentTurn = 2;
        } else {
            currentTurn = 1;
        }
    }
    const PlaceAt = (index) => {
        let thisSymbol = players[currentTurn-1].symbol;
        Gameboard.Place(index, thisSymbol);
    }
    const ManagePlay = () => {
        if (plays.length === 0) {
            let introMessage = 'Welcome to Tic Tac Toe. To play, ' + Player1.name + ' must place the first tile ' + Player1.symbol + '.';
            console.log(introMessage);
        } else if (plays.length > 0) {
            changeTurn();
            let player = players[currentTurn-1];
            playMessage = `Woo! now it is ${player.name}'s turn! Here is the current board ${Gameboard.DisplayBoard()}`
            console.log(playMessage);
        }


    }
    return {
        AddPlay,
        ManagePlay,
        PlaceAt,
        players,
        plays
    }
    

})();



console.log(Gameboard.DisplayBoard());
GameLogic.ManagePlay();
