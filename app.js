let playerScore = 0;
let computerScore = 0;
let roundWinner = ''

const anyaWakaWaka = new Audio('anya-waka-waka.mp3')

const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const computerScorePara = document.getElementById('computerScore')
const rockPic = document.getElementById('rock')
const paperPic = document.getElementById('paper')
const scissorsPic = document.getElementById('scissors')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const playAgainBtn = document.getElementById('playAgainBtn')

rockPic.addEventListener('click', () => handleClick('rock'))
paperPic.addEventListener('click', () => handleClick('paper'))
scissorsPic.addEventListener('click', () => handleClick('scissors'))
playAgainBtn.addEventListener('click', restartGame)


function computerPlay() {
    let choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection, computerSelection){
    if (
    (playerSelection == 'rock' && computerSelection == 'scissors') ||
    (playerSelection == 'paper' && computerSelection == 'rock') ||
    (playerSelection == 'scissors' && computerSelection == 'paper')) {
        playerScore++;
        roundWinner = 'player';
    }
    else if (
    (computerSelection == 'rock' && playerSelection == 'scissors') ||
    (computerSelection == 'paper' && playerSelection == 'rock') ||
    (computerSelection == 'scissors' && playerSelection == 'paper')) {
        computerScore++;
        roundWinner = 'computer';
    } 
    else if (computerSelection == playerSelection) {
        roundWinner = 'tie';
    }
}

function isGameOver() {
    return playerScore == 5 || computerScore == 5;
  }

function handleClick(playerSelection) {
    const computerSelection = computerPlay();
    playRound(playerSelection, computerSelection);
    updateScore();
    updateScoreMessage(roundWinner, playerSelection, computerSelection);
  
    if (isGameOver()) {
      openEndgameModal();
      setFinalMessage();
    }
  }

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateScoreMessage(roundWinner, playerSelection, computerSelection) {
    if (roundWinner == 'player' && playerScore == 4) {
      scoreMessage.textContent = 'Woohoo! Anya only needs one more point!';
    }
    else if (roundWinner == 'computer' && computerScore == 4) {
      scoreMessage.textContent = 'Oh no! Damian only needs one more point!';
    }
    else if (roundWinner == 'player') {
      scoreMessage.textContent = `Anya's ${capitalize(playerSelection)} beats Damian's ${capitalize(computerSelection)}!`;
    }
    else if (roundWinner == 'computer') {
      scoreMessage.textContent = `Anya's ${capitalize(playerSelection)} is beaten by Damian's ${capitalize(computerSelection)}!`;
    }
    else{
    scoreMessage.textContent = `Anya's ${capitalize(playerSelection)} ties with Damian's ${capitalize(computerSelection)}!`;
  }
}

function updateScore() {
    if (roundWinner === 'tie') {
      scoreInfo.textContent = 'It\'s a tie!';
    } else if (roundWinner === 'player') {
      scoreInfo.textContent = 'You won!';
    } else if (roundWinner === 'computer') {
      scoreInfo.textContent = 'You lost!';
    }
  
    playerScorePara.textContent = `Anya: ${playerScore}`;
    computerScorePara.textContent = `Damian: ${computerScore}`;
  }
  
  
function openEndgameModal() {
    endgameModal.classList.add('active');
  }
  
function closeEndgameModal() {
    endgameModal.classList.remove('active');
  }
  
function setFinalMessage() {
    return playerScore > computerScore
      ? (endgameMsg.textContent = 'You won!')
      : (endgameMsg.textContent = 'You lost...');
  }

function restartGame() {
    anyaWakaWaka.play();
    playerScore = 0;
    computerScore = 0;
    scoreInfo.textContent = 'Choose Anya\'s weapon!';
    scoreMessage.textContent = 'First to score 5 points wins the game!';
    playerScorePara.textContent = 'Anya: 0';
    computerScorePara.textContent = 'Damian: 0';
    endgameModal.classList.remove('active');
  }


