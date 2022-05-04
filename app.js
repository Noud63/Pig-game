// Refactored roll function

let scores, roundScore, activePlayer, gamePlaying, input, count, deg;
let dices, dice, prev;
count = 0
let wins = [0, 0];
let storeDice = []

init();

document.querySelector(".btn-roll").addEventListener("click", roll);
function roll() {
  //When there is no limit set, you can't play the game
  setLimit();
  //state variable
  if (gamePlaying === true) {

    document.querySelector(".one").textContent = "";

    // 1. Random number
    let nummers = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]
    storeDice.push(nummers)

    // Last dice roll
    dice = storeDice[storeDice.length - 1]

    dices = [...document.querySelectorAll('.dices')]
    dices.forEach(dc => {
      dc.style.display = "flex";
      if (dc.classList.contains('dice')) {
        dc.src = "dice-" + dice[0] + ".png";
      } else {
        dc.src = "dice-" + dice[1] + ".png";
      }
    })

    //Previuous dice roll
    if (storeDice.length > 1) {
      prev = storeDice[storeDice.length - 2]
    }

    if (dice[0] + prev[0] !== 2 || dice[1] + prev[1] !== 2 || dice[1] + prev[0] !== 2 || dice[0] + prev[1] !== 2 &&
      dice[0] + prev[0] !== 12 || dice[1] + prev[1] !== 12 || dice[1] + prev[0] !== 12 || dice[0] + prev[1] !== 12) {
      // Add score
      roundScore += dice[0] + dice[1]; // first update score
      document.querySelector("#current-" + activePlayer).textContent = roundScore;

    }
    if (dice[0] + prev[0] === 2 || dice[1] + prev[1] === 2 || dice[1] + prev[0] === 2 || dice[0] + prev[1] === 2) {
      document.querySelector(".one").textContent = "Ooops you rolled 2 x 1 in a row !";
      updateUI()
      nextPlayer();
    }

    if (dice[0] + prev[0] === 12 || dice[1] + prev[1] === 12 || dice[1] + prev[0] === 12 || dice[0] + prev[1] === 12) {
      updateUI()
      scores[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent = "0";
      document.querySelector(".one").textContent = "Ooops you rolled 2 x 6 in a row !";
      nextPlayer();
    }
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
  setLimit();

  if (gamePlaying) {
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    // Add current score to global score
    scores[activePlayer] = scores[activePlayer] + roundScore;

    // Update UI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won the game, and set limit.
    let input = document.querySelector(".limit").value;

    if (scores[activePlayer] >= input) {
      addEffects();

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


//Add audio and visual effects to player name when win
function addEffects() {
  document.getElementById("sound").muted = false;
  document.getElementById("sound").play();
  document.getElementById("name-" + activePlayer).classList.add("blink");
}

// Remove blinking from player name after 8 seconds
function removeEffect() {
  setTimeout(() => {
    document.getElementById("name-" + activePlayer).classList.remove("blink");
    document.getElementById("sound").muted = true;
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

// Initial state of the game on page load or when clicking new game button
document.querySelector(".btn-new").addEventListener("click", init);
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true; // state variable

  dices = {
    d1: [],
    d2: [],
  }

  input = document.querySelector(".limit").value;

  document.getElementById("sound").load();

  document.getElementById("name-0").classList.remove("blink");
  document.getElementById("name-1").classList.remove("blink");

  document.getElementById("sound").muted = true;

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  document.querySelector(".one").textContent = "";

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

  document.querySelector(".btn-hold").addEventListener("click", hold);
  document.querySelector(".btn-roll").addEventListener("click", roll);
}


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
