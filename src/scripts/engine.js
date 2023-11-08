const cardImagePath = "./src/assets/icons/";

const cardsData = [
  {
    id: 0,
    name: "Exodia, O Proibido",
    attribute: "rock",
    img: `${cardImagePath}exodia.png`,
  },
  {
    id: 1,
    name: "Dragão Branco de Olhos Azuis",
    attribute: "scissors",
    img: `${cardImagePath}dragon.png`,
  },
  {
    id: 2,
    name: "Mago Negro",
    attribute: "paper",
    img: `${cardImagePath}magician.png`,
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
    fieldSide: {
      player: document.getElementById("player-cards"),
      enemy: document.getElementById("enemy-cards"),
    },
    battlefieldCards: {
      player: document.getElementById("player-card-field"),
      enemy: document.getElementById("enemy-card-field"),
    },
    nextDuelButton: document.getElementById("next-duel-button"),
  },
  values: {
    playerScore: 0,
    enemyScore: 0,
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

const createCardImage = async (cardId, fieldSide) => {
  const cardImage = document.createElement("img");

  cardImage.classList.add("card");
  cardImage.setAttribute("src", `${cardImagePath}card-back.png`);
  cardImage.setAttribute("data-id", cardId);

  if (fieldSide === "player") {
    cardImage.addEventListener("mouseover", () => drawSelectedCard(cardId));

    cardImage.addEventListener("click", () =>
      setCardsField(cardImage.getAttribute("data-id"))
    );
  }

  return cardImage;
};

const drawCards = async (cardsQuantity, fieldSide) => {
  for (let i = 0; i < cardsQuantity; i += 1) {
    const randomCardId = await getRandomCardId();
    const cardImage = await createCardImage(randomCardId, fieldSide);

    view.fieldSide[fieldSide].appendChild(cardImage);
  }
};

const init = () => {
  drawCards(5, "player");
  drawCards(5, "enemy");
};

init();
