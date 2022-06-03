const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; // Controlar o bloqueio do tabuleiro

//função para virar carta
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; // Se clicar 2 vezes não irá acontecer nada ...

  this.classList.add("flip"); //Adicionando o primeiro click
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false; // Para não permitir que seja habilitada sempre o mesmo card
  checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards(); //Desabilita o card
    return;
  }

  unflipCards();
}

//função que desabilita as cartas
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

//função que reseta o tabuleiro.
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas. Executa ao iniciar a aplicação.
(function shuffle() {
  cards.forEach((card) => {
    let ramdomPosition = Math.floor(Math.random() * 12);
    card.style.order = ramdomPosition;
  });
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
