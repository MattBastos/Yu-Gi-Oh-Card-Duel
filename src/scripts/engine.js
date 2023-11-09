const cardImagePath = "./src/assets/icons/";

const cardsData = [
  {
    id: 0,
    name: "Exodia, O Proibido",
    attribute: "pedra",
    img: `${cardImagePath}exodia.png`,
  },
  {
    id: 1,
    name: "Dragão Branco de Olhos Azuis",
    attribute: "tesoura",
    img: `${cardImagePath}dragon.png`,
  },
  {
    id: 2,
    name: "Mago Negro",
    attribute: "papel",
    img: `${cardImagePath}magician.png`,
  },
];

const state = {
  view: {
    victories: document.getElementById("victories"),
    losses: document.getElementById("losses"),
    card: {
      name: document.getElementById("card-name"),
      attribute: document.getElementById("card-attribute"),
      image: document.getElementById("card-image"),
    },
    fieldSide: {
      player: document.getElementById("player-cards"),
      enemy: document.getElementById("enemy-cards"),
    },
    cards: document.getElementsByClassName("card"),
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
      pedra: { beats: "tesoura", losesTo: "papel" },
      papel: { beats: "pedra", losesTo: "tesoura" },
      tesoura: { beats: "papel", losesTo: "pedra" },
    },
  },
};

const { view, values } = state;

const determineWinner = (playerCardId, enemyCardId) => {
  const { attributes } = values;

  const playerAttribute = cardsData[playerCardId].attribute;
  const enemyAttribute = cardsData[enemyCardId].attribute;

  if (attributes[playerAttribute].beats === enemyAttribute) {
    return "player";
  } else if (attributes[playerAttribute].losesTo === enemyAttribute) {
    return "enemy";
  } else {
    return "draw";
  }
};

const updateScores = (winner) => {
  if (winner === "player") {
    values.playerScore += 1;
    view.victories.innerText = `Vitórias: ${values.playerScore}`;
  } else if (winner === "enemy") {
    values.enemyScore += 1;
    view.losses.innerText = `Derrotas: ${values.enemyScore}`;
  } else {
    return;
  }
};

const getRandomCardId = () => {
  const randomIndex = Math.floor(Math.random() * cardsData.length);
  return cardsData[randomIndex].id;
};

const drawSelectedCard = (cardIndex) => {
  const { name, attribute, image } = view.card;

  name.innerText = cardsData[cardIndex].name;
  attribute.innerText = `Atributo:${cardsData[cardIndex].attribute}`;
  image.src = cardsData[cardIndex].img;
};

const setBattlefieldCardsImage = (playerCardId, enemyCardId) => {
  const { player, enemy } = view.battlefieldCards;

  player.src = cardsData[playerCardId].img;
  enemy.src = cardsData[enemyCardId].img;
};

const hideAllCards = () => {
  const allCards = [...view.cards];
  allCards.forEach((card) => card.remove());
};

const setCardsField = (cardId) => {
  hideAllCards();

  let enemyCardId = getRandomCardId();

  view.fieldSide.player.style.display = "block";
  view.fieldSide.enemy.style.display = "block";

  setBattlefieldCardsImage(cardId, enemyCardId);

  const winner = determineWinner(cardId, enemyCardId);
  updateScores(winner);
};

const createCardImage = (cardId, fieldSide) => {
  const cardImage = document.createElement("img");

  cardImage.classList.add("card");
  cardImage.setAttribute("src", `${cardImagePath}card-back.png`);
  cardImage.setAttribute("data-id", cardId);

  if (fieldSide === "player") {
    cardImage.classList.add("player-card");

    cardImage.addEventListener("mouseover", () => drawSelectedCard(cardId));

    cardImage.addEventListener("click", () =>
      setCardsField(cardImage.getAttribute("data-id"))
    );
  }

  return cardImage;
};

const drawCards = (cardsQuantity, fieldSide) => {
  for (let i = 0; i < cardsQuantity; i += 1) {
    const randomCardId = getRandomCardId();
    const cardImage = createCardImage(randomCardId, fieldSide);

    view.fieldSide[fieldSide].appendChild(cardImage);
  }
};

const init = () => {
  drawCards(5, "player");
  drawCards(5, "enemy");
};

init();
