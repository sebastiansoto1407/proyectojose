// Verificar si el usuario está logueado
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

// Obtener el nombre del usuario actual
const userName = localStorage.getItem("currentUser");

// Obtener datos del usuario desde localStorage
let userPoints = parseInt(localStorage.getItem(`${userName}-points`)) || 0;
let userCoins = parseInt(localStorage.getItem(`${userName}-coins`)) || 0;

// Mostrar los datos en la página
document.getElementById("user-name").textContent = `Usuario: ${userName}`;
document.getElementById("user-points").textContent = `Puntos: ${userPoints}`;
document.getElementById("user-coins").textContent = `Monedas: ${userCoins}`;

// Definir las canciones
const songs = [
    {
        title: 'Hombre o muppet',
        artist: 'Los muppets',
        correctAnswer: 'Hombre o muppet',
        options: ['Hombre o muppet', 'Blinding Lights', 'Levitating', 'Perfect'],
        audio: 'Los Muppets - Hombre o Muppet (Letra).mp3',
    },
    {
        title: 'El rap de fernanfloo',
        artist: 'Fernanfloo',
        correctAnswer: 'El rap de fernanfloo',
        options: ['El rap del Rubius', 'El rap de German', 'Neverita', 'El rap de fernanfloo'],
        audio: 'Rap de Fernanfloo _ Bambiel.mp3',
    },
    {
        title: 'Arcane',
        artist: 'Arcane',
        correctAnswer: 'Arcane',
        options: ['Unfortable', 'Sunroof', 'Agape', 'Arcane'],
        audio: 'ma-meilleure-ennemie-sub-español--lyrics--from-arcane-season-2.mp3',
    },
    {
        "title": "Industry Baby",
        "artist": "Lil Nas X & Jack Harlow",
        "correctAnswer": "Industry Baby",
        "options": ["Montero", "Industry Baby", "Old Town Road", "Call Me By Your Name"],
        "audio": "industry-baby-lyrics-ft-jack-harlow.mp3"
    },
    {
        "title": "Take On Me",
        "artist": "a-ha",
        "correctAnswer": "Take On Me",
        "options": ["Take On Me", "The Sun Always Shines On TV", "Hunting High and Low", "Stay On These Roads"],
        "audio": "a-ha - Take On Me (Official Video) [Remastered in 4K].mp3"
    },
    {
        "title": "El gran arcoiris",
        "artist": "El gran arcoiris",
        "correctAnswer": "El gran arcoiris",
        "options": ["Homre o muppet", "El gran arcoiris", "Que bueno es vivir", "La fiesta de mi misma"],
        "audio": "Los Muppets - El gran arcoíris  Letra.mp3"
    },
    {
        "title": "Magic",
        "artist": "Pilot",
        "correctAnswer": "Magic",
        "options": ["Magic", "January", "The Way We Live", "Just A Smile"],
        "audio": "Pilot - Magic (Subtitulado al español).mp3"
    },
    {
        "title": "Tarot",
        "artist": "Tarot",
        "correctAnswer": "Tarot",
        "options": ["Tarot", "Ojitos lindos", "Un verano sin ti", "Agosto"],
        "audio": "Bad Bunny - Tarot [Feat. Jhay Cortez] (Official Audio).mp3"
    },
    {
        "title": "My eyes off You",
        "artist": "xd",
        "correctAnswer": "My eyes off You",
        "options": ["sherry", "big Girls Don't Cry", "My eyes off You", "Adored You"],
        "audio": "Gloria Gaynor - can't take My eyes off You  subtitulada en español.mp3"
    },
    {
        "title": "Enemy",
        "artist": "Enemy",
        "correctAnswer": "Enemy",
        "options": ["I'ts Time", "Symphony", "I'm so sorry", "Enemy"],
        "audio": "Enemy (From the series Arcane League of Legends).mp3"
    },
    {
        "title": "Midnight City",
        "artist": "Midnight City",
        "correctAnswer": "Midnight City",
        "options": ["Outro", "Midnight City", "Wait", "Reunion"],
        "audio": "Midnight City GTA Music Video.mp3"
    },
    {
        "title": "Circles",
        "artist": "Circles",
        "correctAnswer": "Circles",
        "options": ["Sunflower", "Wow.", "Circles", "Congratulations"],
        "audio": "Post Malone - Circles  Sub Español HD.mp3"
    },
    // Agrega más canciones aquí
];

let currentSongIndex = 0;

// Función para cargar la siguiente canción
function loadSong() {
    if (currentSongIndex >= songs.length) {
        // Si las rondas se acabaron, mostrar mensaje de finalización y reiniciar el juego
        endGameAndRestart(); // Mostrar el mensaje de finalización
        return;
    }

    const song = songs[currentSongIndex];
    document.getElementById("music-audio").src = song.audio;
    document.getElementById("options").innerHTML = song.options.map(option => 
        `<button class="btn btn-primary m-2 game-btn" onclick="checkAnswer('${option}')">${option}</button>`
    ).join('');
}

// Función para finalizar el juego y reiniciar automáticamente
function endGameAndRestart() {
    // Mostrar mensaje de que el juego ha terminado
    const resultMessage = document.getElementById("result-message");
    resultMessage.style.display = "block";
    document.getElementById("result-text").textContent = "¡Has completado todas las rondas! El juego se reiniciará.";

    // Esperar 3 segundos y luego reiniciar el juego
    setTimeout(() => {
        // Reiniciar el índice de las canciones y recargar el juego
        currentSongIndex = 0;
        loadSong();

        // Ocultar el mensaje de finalización
        resultMessage.style.display = "none";
    }, 3000); // Espera 3 segundos para mostrar el mensaje
}

// Función para actualizar los puntos y monedas del usuario
function updateUserStats() {
    // Actualizar los puntos y las monedas en la página
    document.getElementById("user-points").textContent = `Puntos: ${userPoints}`;
    document.getElementById("user-coins").textContent = `Monedas: ${userCoins}`;

    // Guardar los puntos y las monedas en localStorage
    localStorage.setItem(`${userName}-points`, userPoints);
    localStorage.setItem(`${userName}-coins`, userCoins);
}

// Función para verificar la respuesta
function checkAnswer(selectedAnswer) {
    const song = songs[currentSongIndex];
    let resultMessage = document.getElementById("result-message");
    let resultText = document.getElementById("result-text");

    if (selectedAnswer === song.correctAnswer) {
        // Si la respuesta es correcta
        resultText.textContent = "¡Correcto! Has ganado 10 puntos y 5 monedas.";
        userPoints += 10;
        userCoins += 5;
        updateUserStats(); // Actualiza los puntos y las monedas
    } else {
        // Si la respuesta es incorrecta
        resultText.textContent = "¡Incorrecto! ";
    }

    // Mostrar mensaje de resultado
    resultMessage.style.display = "block";

    // Esperar 2 segundos antes de avanzar a la siguiente ronda
    setTimeout(() => {
        resultMessage.style.display = "none";
        currentSongIndex++; // Preparar la siguiente ronda
        loadSong(); // Cargar la siguiente ronda
    }, 2000);
}

// Cargar la primera canción
document.addEventListener('DOMContentLoaded', loadSong);
