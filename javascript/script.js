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
          stateText.innerText = this.name + " gagne 0 points";
        } else {
          stateText.innerText = this.name + " gagne " + this.currentScore.innerText + " points";
        }
  
      if(result >= 100){
          win();
        }
  
    } else if(random === 1) {
      if(result === undefined) {
          stateText.innerText = this.name + " perd 0 points";
        } else {
          stateText.innerText = this.name + " perd " + this.currentScore.innerText + " points";
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
          stateText.innerText = this.name + " sécurise " + this.resultCurrentScore + " points";
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


  