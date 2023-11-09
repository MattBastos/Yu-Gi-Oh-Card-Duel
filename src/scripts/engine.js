const cardImagePath = "./src/assets/icons/";
const soundtrackPath = "./src/audios/";

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
    message: document.getElementById("message"),
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

const playSoundtrack = (duelResult) => {
  const audio = new Audio(`${soundtrackPath}${duelResult}.wav`);

  audio.volume = 0.1;
  audio.play();
};

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

const updateMessage = (duelResult) => {
  if (duelResult === "win") {
    view.message.innerText = "Vitória!";
    view.message.style.color = "#00d800";

    playSoundtrack(duelResult);
  } else if (duelResult === "lose") {
    view.message.innerText = "Derrota!";
    view.message.style.color = "#ff0000";

    playSoundtrack(duelResult);
  } else {
    view.message.innerText = "Empate!";
    view.message.style.color = "#999999";

    playSoundtrack("lose");
  }
};

const updatePlayerScore = () => {
  values.playerScore += 1;
  view.victories.innerText = `Vitórias: ${values.playerScore}`;

  updateMessage("win");
};

const updateEnemyScore = () => {
  values.enemyScore += 1;
  view.losses.innerText = `Derrotas: ${values.enemyScore}`;

  updateMessage("lose");
};

const updateScores = (winner) => {
  if (winner === "player") {
    updatePlayerScore();
  } else if (winner === "enemy") {
    updateEnemyScore();
  } else {
    updateMessage("draw");
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

const drawButton = () => (view.nextDuelButton.style.display = "block");

const resetCardInfo = () => {
  view.card.name.innerText = "Inspecione uma Carta!";
  view.card.attribute.innerText = "";
  view.card.image.src = `${cardImagePath}card-back.png`;
};

const resetMessage = () => {
  view.message.innerHTML = "Escolha uma Carta!";
  view.message.style.color = "#ffffff";
};

const resetBattlefieldCards = () => {
  view.battlefieldCards.player.src = `${cardImagePath}card-back.png`;
  view.battlefieldCards.enemy.src = `${cardImagePath}card-back.png`;
};

const resetNextDuelButton = () => (view.nextDuelButton.style.display = "none");

const resetDuel = () => {
  resetCardInfo();
  resetMessage();
  resetBattlefieldCards();
  resetNextDuelButton();

  init();
};

const setCardsField = (cardId) => {
  hideAllCards();

  let enemyCardId = getRandomCardId();

  setBattlefieldCardsImage(cardId, enemyCardId);

  const winner = determineWinner(cardId, enemyCardId);
  updateScores(winner);

  drawButton();
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
