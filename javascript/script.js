/* Fonction du bouton des règles */
$(document).ready(function(){

 $('#titre-regles').click(function() {
     $('.showData').toggle();
 });
});


/* Constantes du DOM */
const buttonDiceThrow = document.getElementById('throw');
const hold = document.getElementById('hold');
const newGame = document.getElementById('new-game');
const text1 = document.getElementById('p-text1');
const stateText = document.getElementById('p-state');
const winText = document.getElementById('p-win');
const diceImage = document.getElementById('dice-image');

/* IMAGES */
var diceImageToNumber = {
  1: "Images/Pierre1.png",
  2: "Images/Pierre2.png" ,
  3: "Images/Pierre3.png" ,
  4: "Images/Pierre4.png" ,
  5: "Images/Pierre5.png" ,
  6: "Images/Pierre6.png"
};

let result;
let currentPlayer = 1;

/* Object Player pour evenement du DOM */

let Player = function(id, name) {
  this.name = name;
  this.id = id;
  this.resultCurrentScore = 0;
  this.resultGlobalScore = 0;
  this.domIdPlayer = document.getElementById('player-name' + this.id);
  this.domIdPlayer.innerText = this.name;
  this.currentScore = document.getElementById('score-current-' + this.id);
  this.globalScore = document.getElementById('score-global-' + this.id);
  if (this.id === 1) {
     this.main = document.getElementById('main-left');
    } else {
     this.main = document.getElementById('main-right');
    }
};

/* Fonction du lancé de dès */

Player.prototype.play = function() {
    let random = randomNumber();
    diceImage.setAttribute("src", diceImageToNumber[random]);
    setButtonStyle(active === true);
    if(random !== 1) {
      result = this.resultCurrentScore += random;
      this.currentScore.innerText = result;
      text1.innerText = "C\'est au tour de " + this.name;
      stateText.style.display= 'inline-block';
      if(result === undefined){
          stateText.innerText = this.name + " gagne 0 pierres";
        } else {
          stateText.innerText = this.name + " gagne " + this.currentScore.innerText + " pierres";
        }
  
      if(result >= 100){
          win();
        }
  
    } else if(random === 1) {
      if(result === undefined) {
          stateText.innerText = this.name + " perd 0 pierres";
        } else {
          stateText.innerText = this.name + " perd " + this.currentScore.innerText + " pierres";
        }
        stateText.style.display= 'inline-block';
        this.currentScore.innerText = 0;
        result = 0;
        this.resultCurrentScore = 0;
  
      /* Changement du joueur */
      if (this.id === 1) {
          currentPlayer = 2
        } else {
         currentPlayer = 1
        }
        setMainStyle(players[currentPlayer].id);
        text1.innerText = "C\'est au tour de " + players[currentPlayer].name;
    }
}

/* Fonction de garder le montant */

Player.prototype.saveScore = function(){
    this.resultGlobalScore += this.resultCurrentScore;
    this.globalScore.innerText = this.resultGlobalScore;
    this.currentScore.innerText = 0;
    setButtonStyle(active === true);
  
      if(this.resultGlobalScore < 100){
          stateText.style.display= 'inline-block';
          stateText.innerText = this.name + " sécurise " + this.resultCurrentScore + " pierres";
          this.resultCurrentScore = 0;
  
          /* Changement de joueur */
          if (this.id === 1) {
             currentPlayer = 2;
            } else {
             currentPlayer = 1;
            }
            setMainStyle(players[currentPlayer].id);
            text1.innerText = "C\'est au tour de " + players[currentPlayer].name;
        }
  
        if(this.resultGlobalScore >= 100){
          win();
        }
}


/* Fonction de remise à 0  */

Player.prototype.reset = function() {
    this.currentScore.innerText = 0;
    this.resultCurrentScore = 0;
    this.globalScore.innerText = 0;
    this.resultGlobalScore = 0;
}
  
/* Attribution du nom à l'object player */
let players = {
  1: new Player(1, 'Ironman'),
  2: new Player(2, 'Thanos')
};

/* Fonctions */

/* Fonction de randomiser du dès */

function randomNumber () {
     return Math.floor(Math.random() * 6) +1;
}
  
/* Fonction d'affichage bordure du joueur en cours */

function setMainStyle(id) {
      players[id].main.style.boxShadow = '0px 0px 15px #D4299B';
      if (id === 1) {
          players[2].main.style.boxShadow = '0px 0px 0px transparent';
        } else {
          players[1].main.style.boxShadow = '0px 0px 0px transparent';
        }
}
  
/* Fonction boutons on/off */
let active = true;
function setButtonStyle(active){
    if(active === true){
      buttonDiceThrow.setAttribute('class', 'on');
      hold.setAttribute('class', 'on');
    } else if (active ===false){
      buttonDiceThrow.setAttribute('class', 'disabled');
      hold.setAttribute('class', 'disabled');
    }
}
  
/* Fonction de victoire */

function win() {
    stateText.style.display= 'none';
    winText.innerText = 'Victoire de ' + players[currentPlayer].name + ' !';
    winText.style.display= 'inline-block';
    buttonDiceThrow.disabled = true;
    hold.disabled = true;
    setButtonStyle(active === false);
    setMainStyle(players[currentPlayer].id);
}
  
/* Fonction nouvelle partie */

function startGame() {
    setButtonStyle(active === true);
    currentPlayer = 1
    text1.innerText = 'C\'est au tour de ' + players[currentPlayer].name;
    setMainStyle(players[currentPlayer].id);
    stateText.style.display= 'none';
    winText.style.display = 'none';
    buttonDiceThrow.disabled = false;
    hold.disabled = false;
    players[1].reset();
    players[2].reset();
}
  

/* Evenement lancé de dès */
buttonDiceThrow.addEventListener ('click', () => {
    players[currentPlayer].play();
});
  
/* Evenement bouton garder le montant */

hold.addEventListener('click', () => {
    players[currentPlayer].saveScore()
});
  
/* Evenement nouvelle partie */

newGame.addEventListener('click', () =>{
    startGame();
});
  
  