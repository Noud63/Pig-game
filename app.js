let scores, roundScore, activePlayer, gamePlaying, input;
let dices, dice, prev;
let wins = [0, 0];
let storeDice = []
let timer;
const newGame = document.querySelector(".clickNewGame")

init();

document.querySelector(".btn-roll").addEventListener("click", roll);
function roll() {

  //state variable
  if (gamePlaying === true) {

    //When there is no limit set, you can't play the game   
    setLimit();

    document.querySelector(".oneAndSix").textContent = "";

    // 1. Random number
    let numbers = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]
    storeDice.push(numbers)

    // Last dice roll
    if (storeDice.length > 0) {
      dice = storeDice[storeDice.length - 1]
    }

    //Second-last dice roll
    if (storeDice.length > 1) {
      prev = storeDice[storeDice.length - 2]
    } else {
      prev = [0, 0]
    }

    //Dice sound sample
    diceRoll()

    //Render dice to UI
    dices = [...document.querySelectorAll('.dices')]
    dices.forEach(dc => {
      dc.style.display = "flex";
      if (dc.classList.contains('dice')) {
        dc.src = "dice-" + dice[0] + ".png";
      } else {
        dc.src = "dice-" + dice[1] + ".png";
      }
    })

    // first update roundscore
    roundScore += dice[0] + dice[1];
    document.querySelector("#current-" + activePlayer).textContent = roundScore;

    //Check for 2 x 1 or 2 x 6 in a row
    if ((prev.includes(1) && dice.includes(1))) {
      updateUI()
      document.querySelector(".oneAndSix").textContent = "Ooops, you rolled 2 x 1 in a row !";
      nextPlayer();
    }

    if (prev.includes(6) && dice.includes(6)) {
      updateUI()
      scores[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent = "0";
      document.querySelector(".oneAndSix").textContent = "Ooops, you rolled 2 x 6 in a row !";
      nextPlayer();
    }
  } else {
    return
  }
}


function updateUI() {
  storeDice = []
  prev = []
  dices.forEach(dc => {
    dc.style.display = 'none'
  })
}


// Hold button to add round score to global score and/or win the game
document.querySelector(".btn-hold").addEventListener("click", hold);
function hold() {


  if (gamePlaying) {

    setLimit();

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    // Add current score to global score
    scores[activePlayer] = scores[activePlayer] + roundScore;

    // Update UI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won the game.
    let input = document.querySelector(".limit").value;

    if (scores[activePlayer] >= input) {
      addEffects()

      newGame.removeEventListener('click', init)

      const name = document.getElementById("name-" + activePlayer).textContent;

      document.getElementById("name-" + activePlayer).textContent =
        name + " wins!";

      document.querySelector(".dice").style.display = "none";
      document.querySelector("#current-" + activePlayer).textContent = "0";

      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");

      document.querySelector(".btn-hold").removeEventListener("click", hold);
      document.querySelector(".btn-roll").removeEventListener("click", roll);

      removeEffect();

      if (
        document.querySelector(".player-" + activePlayer + "-panel").classList.contains("winner")
      ) {
        wins[activePlayer] = wins[activePlayer] + 1;
        document.querySelector(".totalWins-" + activePlayer).textContent = wins[activePlayer];
      }
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
}


//If no limit set or invalid limit, show alert (modal) to set limit
function setLimit() {
  if (
    document.querySelector(".limit").value === "" || document.querySelector(".limit").value == 0
  ) {
    document.querySelector(".dice").style.display = "none";
    gamePlaying = false;
    document.querySelector(".noLimit").style.display = "flex";
  } else if (
    isNaN(document.querySelector(".limit").value) || document.querySelector(".limit").value < 0
  ) {
    document.querySelector(".invalid").style.display = "flex";
    gamePlaying = false;
  } else {
    gamePlaying = true;
  }
}


//Blinking sign 'Play new Game"
function blink() {
  document.querySelector(".playNewGame").textContent = "Play new Game"
  timer = setInterval(() => {
    let el = document.querySelector(".playNewGame")
    el.style.visibility = el.style.visibility == "visible" ? "hidden" : "visible";
  }, 1000)
}


//Add audio and visual effects to player name when winning the game
function addEffects() {
  document.getElementById("sound").muted = false;
  document.getElementById("sound").play();
  document.getElementById("name-" + activePlayer).classList.add("blink");
  document.querySelector(".happy").style.visibility = "visible";
}


//Dice roll sound sample
function diceRoll() {
  const diceSound = new Audio('./sound/dice.mp3')
  diceSound.play()
}


// Remove blinking from player name after 8 seconds
function removeEffect() {
  setTimeout(() => {
    document.getElementById("name-" + activePlayer).classList.remove("blink");
    document.getElementById("sound").muted = true;
    document.querySelector(".happy").style.visibility = "hidden";
    blink()
    newGame.addEventListener('click', init)
  }, 4800);

}


// The next player's turn after clicking hold or rolling a 1 or two 6 in a row
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active"); //if active --> not active
  document.querySelector(".player-1-panel").classList.toggle("active"); //if not active --> active
}


//Reset total wins
const btns = [...document.querySelectorAll('.reset')]
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('btn-0')) {
      document.querySelector(".totalWins-0").textContent = "0";
      wins[0] = 0;
    }
    if (btn.classList.contains('btn-1')) {
      document.querySelector(".totalWins-1").textContent = "0";
      wins[1] = 0;
    }
  })
})


//Open modal that shows game rules
document.querySelector(".btn-rules").addEventListener("click", showRules);
function showRules(e) {
  document.querySelector(".overlay").style.display = "flex";
}


//Close button for 'game rules' modal and 'no limit set' modal
document.querySelectorAll(".close").forEach((el) => {
  el.addEventListener("click", function (e) {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".noLimit").style.display = "none";
  });
});


//Close modal (game rules)
document.querySelector(".overlay").addEventListener("click", closeOverlay);
function closeOverlay(e) {
  document.querySelector(".overlay").style.display = "none";
}


//Close modal (no limit)
document.querySelector(".noLimit").addEventListener("click", closeLimit);
function closeLimit(e) {
  document.querySelector(".noLimit").style.display = "none";
}


//Close modal (invalid)
document.querySelector(".invalid").addEventListener("click", closeInvalid);
function closeInvalid(e) {
  document.querySelector(".invalid").style.display = "none";
}


// Initial state of the game on page load or when clicking play new game button
newGame.addEventListener("click", init);
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true; // state variable
  storeDice = []

  clearInterval(timer)

  document.getElementById("sound").load();
  document.querySelector(".clickNewGame").style.visibility = "visible";
  document.querySelector(".playNewGame").style.visibility = "visible"
  document.querySelector(".playNewGame").textContent = "Play the Game"


  document.getElementById("name-0").classList.remove("blink");
  document.getElementById("name-1").classList.remove("blink");

  document.getElementById("sound").muted = true;

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  document.querySelector(".oneAndSix").textContent = "";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  document.querySelector(".happy").style.visibility = "hidden";

  document.querySelector(".btn-hold").addEventListener("click", hold);
  document.querySelector(".btn-roll").addEventListener("click", roll);
}

