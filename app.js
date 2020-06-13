// Declare variables
var score, roundScore, activePlayer, gamePlaying;

// init functions set game to initial state on page load and at game end
init()

// Starty game by rolling the dice
document.querySelector('.btn-roll').addEventListener('click', function() {

     if(gamePlaying){                                             //state variable

        document.querySelector('.one').textContent = ""

        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
    
        // 2.Display result
        var diceDOM = document.querySelector('.dice')
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png'
            
        // 3.Update roundscore if the rolled number is not a 1
        if(dice !== 1){
            // Add score
             roundScore += dice                                   
             document.querySelector('#current-'+ activePlayer).textContent = roundScore
        }else{
            diceDOM.style.display = 'none'
            document.querySelector('.one').textContent = "'Ooops you rolled a 1!'"
            nextPlayer()
            }
     }
       
})

// Hold button adds round score to global score
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
            document.querySelector('.dice').style.display = 'none'
            // Add current score to global score
            scores[activePlayer] = scores[activePlayer] + roundScore
            
            // Update UI
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer] 
        
            // Check if player won the game, and set limit.
            if(scores[activePlayer] >= 50){
            
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

// nextPayer function toggles between players active/not active
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
        roundScore = 0

        document.getElementById('current-0').textContent = "0"
        document.getElementById('current-1').textContent = "0"

        document.querySelector('.player-0-panel').classList.toggle('active')
        document.querySelector('.player-1-panel').classList.toggle('active')

        //document.querySelector('.player-0-panel').classList.remove('active')
        //document.querySelector('.player-1-panel').classList.add('active')
}

document.querySelector('.btn-new').addEventListener('click', init)

// initial state on page load and at the end of every game
function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true                       // state variable
    
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

// modal shows game rules
document.querySelector('.btn-rules').addEventListener('click', showRules)
function showRules(e) {
    document.querySelector('.overlay').style.display = 'flex';
}

//remove modal
document.querySelector('.close').addEventListener('click', closeRules)
function closeRules(e) {
    document.querySelector('.overlay').style.display = 'none';
}

//Close modal wherever you click on the modal
document.querySelector('.overlay').addEventListener('click', closeOverlay)
function closeOverlay(e) {
        document.querySelector('.overlay').style.display = 'none';
    }













