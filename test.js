

let score = {
    wins: 0,
    losses : 0,
    ties : 0,
};

const storedScore = JSON.parse(localStorage.getItem('score'));

if (storedScore !== null) {
    score = storedScore;
}

document.querySelector('.lossescounter').innerHTML = String(score.losses)
document.querySelector('.winscounter').innerHTML = String(score.wins)
document.querySelector('.tiescounter').innerHTML = String(score.ties)




function getCompMove(){

    let num = Math.floor(Math.random() * 10)%3;

    switch(num){
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}

function getWinner(playermove,comp_move){
    if(playermove === 'rock'){
        if(comp_move === 'rock'){
            return 0
        }else if(comp_move === 'paper'){
            return 1
        }
        else{
            return -1
        }
    }else if( playermove === 'paper'){
        if(comp_move === 'rock'){
            return -1
        }else if(comp_move === 'paper'){
            return 0
        }
        else{
            return 1
        }
    }else{
        if(comp_move === 'rock'){
            return 1
        }else if(comp_move === 'paper'){
            return -1
        }
        else{
            return 0
        }
    }

}

function resetScore(){
    score.ties = 0
    score.wins = 0
    score.losses = 0

    localStorage.setItem('score',JSON.stringify(score))
    document.querySelector('.lossescounter').innerHTML = String(score.losses)
    document.querySelector('.winscounter').innerHTML = String(score.wins)
    document.querySelector('.tiescounter').innerHTML = String(score.ties)
}
    


function playGame(playermove){

    let comp_move = getCompMove()
    
    let won = getWinner(playermove,comp_move)

    if(won > 0){
        score.losses++;
        document.querySelector(".whoplayedwhat").innerHTML = `<img class="move-icon" src="https://supersimple.dev/projects/rock-paper-scissors/images/${playermove}-emoji.png"> V/S <img class="move-icon" src="https://supersimple.dev/projects/rock-paper-scissors/images/${comp_move}-emoji.png"> YOU LOST!!!`
        document.querySelector('.lossescounter').innerHTML = String(score.losses)
        
    }else if(won<0){
        score.wins++
        document.querySelector(".whoplayedwhat").innerHTML = `<img class="move-icon" src="https://supersimple.dev/projects/rock-paper-scissors/images/${playermove}-emoji.png"> V/S <img class="move-icon" src="https://supersimple.dev/projects/rock-paper-scissors/images/${comp_move}-emoji.png"> YOU WON!!!`
        document.querySelector('.winscounter').innerHTML = String(score.wins)
        
    }else{
        score.ties++
        document.querySelector(".whoplayedwhat").innerHTML = `<img class="move-icon" src="https://supersimple.dev/projects/rock-paper-scissors/images/${playermove}-emoji.png"> V/S <img class="move-icon" src="https://supersimple.dev/projects/rock-paper-scissors/images/${comp_move}-emoji.png"> YOU TIED!!!`
        document.querySelector('.tiescounter').innerHTML = String(score.ties)
        
    }

    localStorage.setItem('score',JSON.stringify(score))

    console.log(score)
    return;
}

let isautoplay = true;
let interval_id;


function autoplay(){

    if(isautoplay){
        interval_id = setInterval(function(){
            const move = getCompMove();
            playGame(move);
        },1000)
        isautoplay = false;
    }
    else{
        clearInterval(interval_id)
        isautoplay = true
    }

}


