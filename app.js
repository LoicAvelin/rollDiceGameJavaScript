/* 
** REGLES
Le jeu comprend 2 joueurs sur un seul et même écran.
Chaque joueur possède un score temporaire (ROUND) et un score global (GLOBAL).
À chaque tour, le joueur a son ROUND initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite. 
Le résultat d’un lancer est ajouté au ROUND.
Lors de son tour, le joueur peut décider à tout moment de:
- Cliquer sur l’option “Hold”, qui permet d’envoyer les points du ROUND vers le GLOBAL. Ce sera alors le tour de l’autre joueur.
- Lancer le dé. S’il obtient un 1, son score ROUND est perdu et c’est la fin de son tour.
Le premier joueur qui atteint les 100 points sur global gagne le jeu.
**
*/

// Notification d'explication des règles
document.addEventListener('DOMContentLoaded', () => {

(document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
  const $notification = $delete.parentNode;

  $delete.addEventListener('click', () => {
    $notification.parentNode.removeChild($notification);
  });
});

// Récupération du body de la page
const body = document.getElementById('body');

// Récupération du contenu HTML des compteur des joueurs 1 et 2 avec le DOM
let counterRoundPlayer1 = document.getElementById('roundPlayer1');
let counterRoundPlayer2 = document.getElementById('roundPlayer2');
let counterGlobalPlayer1 = document.getElementById('globalPlayer1');
let counterGlobalPlayer2 = document.getElementById('globalPlayer2');

// Récupération des petits points de couleur pour montrer le joueur qui doit lancer le dé
const dotPlayer1 = document.getElementById('dotPlayer1');
const dotPlayer2 = document.getElementById('dotPlayer2');

// Récupération des colomnes des deux joueurs
const columnPlayer1 = document.getElementById('columnPlayer1');
const columnPlayer2 = document.getElementById('columnPlayer2');

// Récupération du titre des deux joueurs
const titlePlayer1 = document.getElementById('titlePlayer1');
const titlePlayer2 = document.getElementById('titlePlayer2');

// Récupération des boutons avec le DOM
const btnRollDice = document.getElementById('rollDice');
const btnNewGame = document.getElementById('newGame');
const btnHold = document.getElementById('hold');

// Récupération de toutes les faces du dé
const dieFace1 = document.getElementById('dieFace1');
const dieFace2 = document.getElementById('dieFace2');
const dieFace3 = document.getElementById('dieFace3');
const dieFace4 = document.getElementById('dieFace4');
const dieFace5 = document.getElementById('dieFace5');
const dieFace6 = document.getElementById('dieFace6');

// Déclaration des joueurs
let activePlayer = 'player1';

// Déclaration d'une variable correspondant à un résultat d'un lancé de dé
let roundScore = 0;

// Déclaration d'un lancé de dé
let resultRollDice;

// Fonction qui active le joueur en changeant le fond de couleur et en changeant la graisse de la police
function seeActivePlayer() {
  const mediaQuery = window.matchMedia('(min-width: 700px)')
  if (activePlayer == 'player1') {
    activePlayer = 'player2';
    dotPlayer1.style.display = "none";
    columnPlayer1.style.backgroundColor = "white";
    titlePlayer1.style.fontWeight = "100";
    dotPlayer2.style.display = "block";
    columnPlayer2.style.backgroundColor = "rgb(247, 247, 247)";
    titlePlayer2.style.fontWeight = "300";
    if (mediaQuery.matches) {
      body.style.background = "linear-gradient(to right, white 50%, rgb(247, 247, 247) 50%)";
    }
  } else {
    activePlayer = 'player1';
    dotPlayer2.style.display = "none";
    columnPlayer2.style.backgroundColor = "white";
    titlePlayer2.style.fontWeight = "100";
    dotPlayer1.style.display = "block";
    columnPlayer1.style.backgroundColor = "rgb(247, 247, 247)";
    titlePlayer1.style.fontWeight = "300";
    if (mediaQuery.matches) {
      body.style.background = "linear-gradient(to left, white 50%, rgb(247, 247, 247) 50%)";
    }
  }
}

// Fonction nouveau jeu qui remet à 0 tous les compteurs. 
function newGame() {
  let question = confirm("Would you like to start a new game?");
  if (question === true) {
    seeActivePlayer();
    counterRoundPlayer1.textContent = 0;
    counterRoundPlayer2.textContent = 0;
    counterGlobalPlayer1.textContent = 0;
    counterGlobalPlayer2.textContent = 0;
  }
}

// Fonction prochain joueur qui change de joueur en remettant les compteurs tour à O
function nextPlayer() {
  seeActivePlayer();
  roundScore = 0;
  counterRoundPlayer1.textContent = 0;
  counterRoundPlayer2.textContent = 0;
}

// Fonction qui montre la bonne face du dé
function showFaceDice() {
  // Cache toutes les faces du dé
  dieFace1.style.display = "none";
  dieFace2.style.display = "none";
  dieFace3.style.display = "none";
  dieFace4.style.display = "none";
  dieFace5.style.display = "none";
  dieFace6.style.display = "none";

  // Montre la face du dé suivant le résultat obtenu
  switch (resultRollDice) {
    case 1:
      dieFace1.style.display = "block";
      break;
    case 2:
      dieFace2.style.display = "block";
      break;
    case 3:
      dieFace3.style.display = "block";
      break;
    case 4:
      dieFace4.style.display = "block";
      break;
    case 5:
      dieFace5.style.display = "block";
      break;
    case 6:
      dieFace6.style.display = "block";
      break;
  }
}

// Fonction lancé le dé, qui ajoute le score au compteur du tour et montre la face du dé
function rollDice() {
  resultRollDice = 1 + Math.floor(Math.random() * 6);
  showFaceDice();
  if (resultRollDice != 1) {
    roundScore += resultRollDice;
    if (activePlayer == 'player1') {
      counterRoundPlayer1.textContent = roundScore;
    } else {
      counterRoundPlayer2.textContent = roundScore;
    }
  } else {
    nextPlayer();
  }
}

// Fonction qui permet d'enregistrer le compte du tour sur le compte global et vérifie si le compte global est arrivé à 100 
// ou l'a dépassé
function holdDiceRoll() {
  if (activePlayer == 'player1' && counterGlobalPlayer1.textContent < 100) {
    counterGlobalPlayer1.textContent = parseInt(counterGlobalPlayer1.textContent) + roundScore;
    if (counterGlobalPlayer1.textContent >= 100) {
      alert(`Player 1 won !`);
    } else {
      nextPlayer();
    }
  } else if (activePlayer == 'player2' && counterGlobalPlayer2.textContent < 100) {
    counterGlobalPlayer2.textContent = parseInt(counterGlobalPlayer2.textContent) + roundScore;
    if (counterGlobalPlayer2.textContent >= 100) {
      alert(`Player 2 won !`);
    } else {
      nextPlayer();
    }
  }
}

// Ajout d'un écouteur d'évènement sur les boutons
btnNewGame.addEventListener('click', newGame);
btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdDiceRoll);
});