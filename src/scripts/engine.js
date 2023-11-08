const imagePath = "../assets/icons/";

const cardsData = [
  {
    id: 0,
    img: `${imagePath}exodia.png`,
    name: "Exodia, O Proibido",
    attribute: "str",
  },
  {
    id: 1,
    img: `${imagePath}dragon.png`,
    name: "Dragão Branco de Olhos Azuis",
    attribute: "dex",
  },
  {
    id: 2,
    img: `${imagePath}magician.png`,
    name: "Mago Negro",
    attribute: "int",
  },
];

const state = {
  view: {
    scoreBox: document.getElementById("score-box"),
    card: {
      image: document.getElementById("card-image"),
      name: document.getElementById("card-name"),
      attribute: document.getElementById("card-attribute"),
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
