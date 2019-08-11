import {Gameplay} from './createObject';
import {postNewAPIType} from './api';

function oneWin(arrayGames,winner,setState) {
    let newArrayGame = arrayGames.map(inGame => {
        if (inGame.name === winner) {
            inGame.isWin = true;
            return inGame;
        } else {
            inGame.isWin = false;
            return inGame;
        }
    });
    setState(newArrayGame);
};

function setPointPlayer(arrayGames,player,point,setState,event) {
    event.persist();
    let newPointPlayer = arrayGames.map(game => {
        if (game.name === player ) {
            game.point = parseInt(point);
            return game;
        } else {
            return game;
        }
    });
    setState(newPointPlayer);
}

function gameplayArray(arrayGames) {
    let pointWin = arrayGames.reduce((acc,cur) => {
        if (cur.isWin === true) {
            return acc;
        } else {
            return acc + parseInt(cur.point);
        }
    },0);

    return arrayGames.map(value => {
        if (value.isWin === true) {
            value.point = pointWin;
            return value;
        } else {
            value.point = value.point * -1;
            return value;
        }
    });
}

function pointWinner(stages,namePlayer) {
    let pointWinArray = [];
    stages.forEach(stage => {
        stage.gameplay.forEach(game => {
            if ( game.name === namePlayer ) {
                pointWinArray.push(parseInt(game.point));
            }
        })            
    });
    // let pointWin = pointWinArray.reduce((acc,cur) => {
    //     return acc + cur;
    // }, 0);
    let pointWin = pointWinArray.reduce((acc,cur) => acc + cur, 0 );
    //console.log(pointWin);
    return pointWin;
}
// data in Gameplay client input
// group => name player and id
// stages data game play
//

// return array[{ name : '', point : ', _idPlayer : id }]
function summaryOfStages(stages,players) {
    // create array summary
    let newSummary = players.map(player => ({
        idPlayer : player.idPlayer,
        name : player.name,
        point : pointWinner(stages,player.name),
        isWin : false
    }));
    // find point winner
    let winPoint = newSummary.reduce((acc,cur) => {
        return Math.max(acc, cur.point);
    },0);
    // check who max point this game and check win true
    newSummary.map(summary => {
        if ( summary.point === winPoint ) {
            summary.isWin = true;
            return summary;
        } else {
            summary.isWin = false;
            return summary;
        }
    });
    return newSummary;
}

function saveData(gameName,group,stages,callback,history) {
    let summary = summaryOfStages(stages,group.players);
    let newGameplay = new Gameplay(gameName,group,stages,summary);
    postNewAPIType('gameplay', newGameplay)
        .then(value => history.push('/game/finish') )
        .catch(err => callback(false) )
}

export {oneWin,setPointPlayer, gameplayArray, pointWinner, summaryOfStages,saveData};