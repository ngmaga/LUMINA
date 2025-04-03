const images = [
    "coração.png", "chave.png", "espada.png", "moeda.png",
    "coração.png", "chave.png", "espada.png", "moeda.png"
];

let shuffledImages = images.sort(() => Math.random() - 0.5);
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

const memoriaGrid = document.querySelector(".memoria-grid");

// Criando as cartas dinamicamente
shuffledImages.forEach(img => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="front"></div>
        <div class="back"><img src="assets/${img}" alt="Imagem"></div>
    `;

    card.addEventListener("click", flipCard);
    memoriaGrid.appendChild(card);
});

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}


function checkMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        matchedPairs++;
        firstCard = null;
        secondCard = null;

        if (matchedPairs === images.length / 2) {
            setTimeout(() => {
                showWinMessage(); // Exibe a mensagem estilizada na tela
            }, 500);
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 1000);
    }
}


function showWinMessage() {
    // Fecha automaticamente o jogo da memória
    document.getElementById("memoriaModal").style.display = "none";

    const winScreen = document.createElement("div");
    winScreen.innerHTML = `
        <div class="win-animation">
            🎉✨ PARABÉNS! VOCÊ COMPLETOU O DESAFIO! ✨🎉
        </div>
        <button id="close-win-screen">Continuar</button>
    `;
    winScreen.classList.add("win-screen");
    
    document.body.appendChild(winScreen);

    // Adiciona evento para fechar a tela ao clicar no botão
    document.getElementById("close-win-screen").addEventListener("click", () => {
        winScreen.remove();
        fecharMemoria(); // Continua o jogo abrindo a porta
    });
}
