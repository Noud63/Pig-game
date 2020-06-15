
var scores, roundScore, activePlayer, gamePlaying;
let dices = []

init()

document.querySelector('.btn-roll').addEventListener('click', function() {

     if(gamePlaying){                                             //state variable: gamePlaying = true

        document.querySelector('.one').textContent = ""
       
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
            dices.push(dice)
            console.log(dices)
        // 2.Display result
        var diceDOM = document.querySelector('.dice')
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png'
            
        // 3.Update roundscore if the rolled number is not a 1
        let prev = dices[dices.length - 2]

        if(dice !== 1 && dice + prev !== 12){
            // Add score
            roundScore += dice                                   // first update score
            document.querySelector('#current-'+ activePlayer).textContent = roundScore
        }else if(dice === 1){
            dices = []
            diceDOM.style.display = 'none'
            document.querySelector('.one').textContent = "'Ooops you rolled a 1!'"
            nextPlayer()
        }else if(dice + prev === 12){
            dices = []
            diceDOM.style.display = 'none'
            document.getElementById('score-' + activePlayer).textContent = '0';
            document.querySelector('.one').textContent = "'Ooops you rolled 2 x 6!'"
            nextPlayer()
            }
     }
       
})


document.querySelector('.btn-hold').addEventListener('click', function() {
        if(gamePlaying) {
            document.querySelector('.dice').style.display = 'none'
            // Add current score to global score
            scores[activePlayer] = scores[activePlayer] + roundScore
            
            // Update UI
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer] 
        
            // Check if player won the game, and set limit.
            let input = document.querySelector('.limit').value
            
        if(scores[activePlayer] >= input){
            
const name = document.getElementById('name-' + activePlayer).textContent
             document.getElementById('name-' + activePlayer).textContent = name + " wins!"

             document.querySelector('.dice').style.display = 'none'

             document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
             document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')

             gamePlaying = false
        }else{
             //nextPlayer
             nextPlayer()
        }
    
    }
    
})


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
        roundScore = 0

        document.getElementById('current-0').textContent = "0"
        document.getElementById('current-1').textContent = "0"

        document.querySelector('.player-0-panel').classList.toggle('active')  //if active --> not active
        document.querySelector('.player-1-panel').classList.toggle('active')  //if not active --> active

        // Or: document.querySelector('.player-0-panel').classList.remove('active')
        //     document.querySelector('.player-1-panel').classList.add('active')
}

document.querySelector('.btn-new').addEventListener('click', init)


function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true                       // state variable

    dices = []

    //Default limit set to 50
    document.querySelector('.limit').value = "50"
    
    document.querySelector('.dice').style.display = 'none'
    document.querySelector('.one').textContent = ""
    
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    document.getElementById('name-0').textContent = "Player 1"
    document.getElementById('name-1').textContent = "Player 2"
   
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
   
}


document.querySelector('.btn-rules').addEventListener('click', showRules)
function showRules(e) {
    document.querySelector('.overlay').style.display = 'flex';
}

document.querySelector('.close').addEventListener('click', closeRules)
function closeRules(e) {
    document.querySelector('.overlay').style.display = 'none';
}

document.querySelector('.overlay').addEventListener('click', closeOverlay)
function closeOverlay(e) {
        document.querySelector('.overlay').style.display = 'none';
    }
    












