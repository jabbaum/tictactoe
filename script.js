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
            
            return GameLogic.ManagePlay(index);

        } else {
            GameLogic.UpdateInstructions(`Cell ${+index + 1} is taken, sorry.`);
            return null;
        }
    };

    const CheckWinner = (index) => {
        const Adjusted = AdjustLocation(index);
        let winCondHorz = [0, 0, 0];
        let winCondVert = [0, 0, 0];
        let winCondDiag = [0, 0];
        let winOccured = 0;

        const CheckRow = (row) => {
            let rowCells = ['empty', 'empty', 'empty'];
            for (let index = 0; index < gameboard[row].length; index++) {
                rowCells[index] = gameboard[row][index];
            }
            if (rowCells[0] === rowCells[1] && rowCells[0] === rowCells[2]) {
                winCondHorz[row] = 1;
                winOccured+=1;
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
            if (columnCells[0] === columnCells[1] && columnCells[0] === columnCells[2]) {
                winCondVert[column] = 1;
                winOccured+=1;
                return 1;
            } else {
                return 0;
            }
        }
        const CheckDiagnol = (row, column) => {
            
            if ((row === 0 && column === 1) || (row === 1 && (column === 0 || column === 2)) || (row ===2 && column === 1)) {
                return;
            } else {
                if (gameboard[0][0] === gameboard[1][1] && gameboard[0][0] === gameboard[2][2]) {
                    winCondDiag[0] = 1;
                    winOccured+=1;
                }
                if (gameboard[2][0] === gameboard[1][1] && gameboard[2][0] === gameboard[0][2]) {
                    winCondDiag[1] = 1;
                    winOccured+=1;
                }
            }
        }
        CheckRow(Adjusted.AdjustedRow);
        CheckColumn(Adjusted.AdjustedColumn);
        CheckDiagnol(Adjusted.AdjustedRow, Adjusted.AdjustedColumn);
        if (winOccured) {
            return {
                winCondVert,
                winCondHorz,
                winCondDiag
            } 
        } else {
            return 0;
        }
    }
    const LockBoard = () => {
        const Locations = document.querySelectorAll('.location');
        Locations.forEach(loc => {
            loc.removeEventListener('click', GameLogic.PlaceAt);
        });
    };

    const DisplayBoard = () => {
        let locationIterator = 0;
        let locationHolder = [];
        let locationHolderElement = document.querySelector('.locationHolder');
        locationHolderElement.innerHTML = '';
        gameboard.forEach(row => {
            row.forEach(loc => {
                let location = document.createElement('div');
                location.classList.add('location');
                location.setAttribute('id', locationIterator);
                if (loc === 'X') {
                    let xsymbol = document.createElement('div');
                    xsymbol.classList.add('symbolX');
                    location.appendChild(xsymbol);
                } else if (loc === 'O') {
                    let osymbol = document.createElement('div');
                    osymbol.classList.add('symbolO');
                    location.appendChild(osymbol);
                }
                locationIterator++;
                location.addEventListener('click', GameLogic.PlaceAt);
                locationHolder.push(location);
            });
        });
        locationHolder.forEach(loc => {
            locationHolderElement.appendChild(loc);
        });
    };
    const ResetGameboard = () => gameboard=[
        [0,1,2],
        [3,4,5],
        [6,7,8]
    ];

    return {
        Place,
        DisplayBoard,
        CheckWinner,
        ResetGameboard,
        LockBoard,
        gameboard
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

    const UpdatePlayerName = (player, name) => {
        players[player-1].name = name;
        return;
    }
    const HandlePlayerClick = (event) => {
        if (event.target.classList[0] === 'submitPlayer1') {
            let nameHolder = document.querySelector('#player1Name');
            let name = nameHolder.value;
            nameHolder.value = '';
            UpdatePlayerName(1, name);
        } else if (event.target.classList[0] === 'submitPlayer2') {
            let nameHolder = document.querySelector('#player2Name');
            let name = nameHolder.value;
            nameHolder.value = '';
            UpdatePlayerName(2, name);
        } else {
            return;
        }
    }
    const SetPlaysList = (index) => {
        plays.length = index;
        let oldPlays = plays;
        plays = [];
        return oldPlays;
    };
    const ClearMoveList = () => {
        let moveHolder = document.querySelector('.moves');
        let moves = moveHolder.querySelectorAll('.moveBtn');
        moves.forEach(move => {
            move.parentNode.removeChild(move);
        });
       
    };
    const CatchUpPlays = (oldPlays) => {
        Gameboard.ResetGameboard();
        Gameboard.DisplayBoard();
        oldPlays.forEach(element => {
            let thisSymbol = element[1];
            let index = element[0];
            Gameboard.Place(index, thisSymbol);
        });
    };
    const HandleMoveClick = (event) => {
        let indexofMove = event.target.id;
        let oldPlays = SetPlaysList(indexofMove);
        ClearMoveList();
        CatchUpPlays(oldPlays);
    };
    const CreatePlay = (play, playNum) => {
        let playBtn = document.createElement('button');
        let playBtnContainer = document.querySelector('.moves');
        playBtn.id = playNum;
        playBtn.classList.add('moveBtn');
        playBtn.innerText = `cell: ${play[0]}, Symbol: ${play[1]}`;
        playBtn.addEventListener('click', HandleMoveClick);
        playBtnContainer.appendChild(playBtn); 
    }
    const CreateNameButtons = () => {
        let btnText =  `Accept Name`;
        const Player1Input = document.querySelector('#player1Input');
        const Player2Input = document.querySelector('#player2Input');
        let bttn1 = document.createElement('button');
        bttn1.classList.add('submitPlayer1');
        bttn1.innerText = btnText;
        bttn1.addEventListener('click', HandlePlayerClick);
        let bttn2 = document.createElement('button');
        bttn2.classList.add('submitPlayer2');
        bttn2.innerText = btnText;
        bttn2.addEventListener('click',HandlePlayerClick);
        Player1Input.appendChild(bttn1);
        Player2Input.appendChild(bttn2);
    }

    const IncrementRounds = () => rounds = rounds++;
    const AddPlay = (play) => {
        plays.push(play)
        GameLogic.CreatePlay(play, plays.length);
    };
    const changeTurn = () => {
        if (plays[plays.length-1][1] === 'X') {
            currentTurn = 2;
        } else {
            currentTurn = 1;
        }
    }
    const PlaceAt = (event) => {
        const Index = event.target.id;
        let thisSymbol = players[currentTurn-1].symbol;
        Gameboard.Place(Index, thisSymbol);
    }
    const ManagePlay = (index) => {
        if (plays.length === 0) {
            let introMessage = 'Welcome to Tic Tac Toe. To play, ' + Player1.name + ' must place the first tile ' + Player1.symbol + '.';
            UpdateInstructions(introMessage);
        } else if (plays.length > 0) {
            let player = players[currentTurn-1];
            if (Gameboard.CheckWinner(index)) {
                Gameboard.DisplayBoard();
                UpdateInstructions(`${player.name} wins! Game Over.`);
                Gameboard.LockBoard();
                return;
            }
            changeTurn();
            player = players[currentTurn-1];
            console.log(player);
            playMessage = `Woo! now it is ${player.name}'s turn! Here is the current board:`;
            Gameboard.DisplayBoard();
            UpdateInstructions(playMessage);
        }


    }
    const UpdateInstructions = (update) => {
        const Instructions = document.querySelector('.instructions');
        Instructions.innerText = update;
    };
    const ResetGame = () => {
        Gameboard.ResetGameboard();
        plays = [];
        currentTurn = 1;
        Gameboard.DisplayBoard();
        ClearMoveList();
        return ManagePlay();
    };
    const ResetButton = () => {
        const OptionElement = document.querySelector('.options');
        const Pushable = document.createElement('button');
        Pushable.classList.add('pushable');
        Pushable.addEventListener('click', ResetGame);
        const Shadow = document.createElement('span');
        Shadow.classList.add('shadow');
        const Edge = document.createElement('span');
        Edge.classList.add('edge');
        const Front = document.createElement('span');
        Front.classList.add('front');
        Front.innerHTML = 'Reset Game';

        Pushable.appendChild(Shadow);
        Pushable.appendChild(Edge);
        Pushable.appendChild(Front);

        OptionElement.appendChild(Pushable);
    }
    return {
        AddPlay,
        ManagePlay,
        PlaceAt,
        ResetButton,
        UpdateInstructions,
        HandlePlayerClick,
        CreateNameButtons,
        CreatePlay,
        players,
        plays
    }
    

})();



Gameboard.DisplayBoard();
GameLogic.ResetButton();
GameLogic.CreateNameButtons();
GameLogic.ManagePlay();
