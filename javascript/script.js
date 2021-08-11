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