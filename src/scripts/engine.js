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
    attributes: {
      str: { beats: "dex", losesTo: "int" },
      dex: { beats: "int", losesTo: "str" },
      int: { beats: "str", losesTo: "dex" },
    },
  },
};

const { view, values } = state;

const determineWinner = (playerCard, enemyCard) => {
  const playerCardAtt = cardsData.find((card) => card === playerCard).attribute;
  const enemyCardAtt = cardsData.find((card) => card === enemyCard).attribute;
  const { attributes } = values;

  if (attributes[playerCardAtt].beats === enemyCardAtt) {
    return "O Jogador Venceu!";
  } else if (attributes[playerCardAtt].losesTo === enemyCardAtt) {
    return "O Inimigo Venceu!";
  } else {
    return "Empate!";
  }
};

const init = () => {
  const playerCard = cardsData[1];
  const enemyCard = cardsData[2];

  const duelResult = determineWinner(playerCard, enemyCard);
  console.log(duelResult);
};

init();
