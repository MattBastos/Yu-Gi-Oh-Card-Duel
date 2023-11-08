const state = {
  view: {
    scoreBox: document.getElementById("score-box"),
    card: {
      image: document.getElementById("card-image"),
      name: document.getElementById("card-name"),
      status: document.getElementById("card-status"),
    },
    fieldCards: {
      player: document.getElementById("player-card-field"),
      enemy: document.getElementById("enemy-card-field"),
    },
    nextDuelButton: document.getElementById("next-duel-button"),
  },
  values: {
    playerScore: 0,
    enemyScire: 0,
  },
};

const { view, values } = state;

const init = () => {};

init();
