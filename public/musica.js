// Criando um objeto de áudio global para manter a música tocando
let musica = new Audio("assets/musica-inicial.mp3");
musica.loop = true;
musica.volume = 0.5;

// Verifica se a música já está tocando ao carregar a página
if (localStorage.getItem("musicaTocando") === "true") {
    musica.play();
}

// Função para iniciar/parar a música
function toggleMusica() {
    if (musica.paused) {
        musica.play();
        localStorage.setItem("musicaTocando", "true");
    } else {
        musica.pause();
        localStorage.setItem("musicaTocando", "false");
    }
}
