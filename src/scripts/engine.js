const imagePath = "../assets/icons/";

const cardsData = [
  {
    id: 0,
    name: "Exodia, O Proibido",
    attribute: "rock",
    img: `${imagePath}exodia.png`,
  },
  {
    id: 1,
    name: "Dragão Branco de Olhos Azuis",
    attribute: "scissors",
    img: `${imagePath}dragon.png`,
  },
  {
    id: 2,
    name: "Mago Negro",
    attribute: "paper",
    img: `${imagePath}magician.png`,
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
    attributes: {
      str: { beats: "dex", losesTo: "int" },
      dex: { beats: "int", losesTo: "str" },
      int: { beats: "str", losesTo: "dex" },
    },
  },
};

const { view, values } = state;

const getRandomCardId = async () => {
  const randomIndex = Math.floor(Math.random() * cardsData.length);

  return cardsData[randomIndex].id;
};

const drawCards = (cardsQuantity, fieldSide) => {
  cardsQuantity.forEach(async (_) => {
    const randomCardId = await getRandomCardId();
    const cardImage = await createCardImage(randomCardId, fieldSide);

    document.getElementById(fieldSide).append(cardImage);
  });
};

const init = () => {
  drawCards(5, view.fieldCards.player);
  drawCards(5, view.fieldCards.enemy);
};

init();
