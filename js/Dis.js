document.addEventListener('DOMContentLoaded', function() {
    const mainTitle = document.getElementById('mainTitle');
    const mainMessage = document.getElementById('mainMessage');

    // Cambiar el título y el mensaje automáticamente cada cierto tiempo
    const titleTexts = [
        "✨ Flores para Ti ✨",
        "✨ ¡Estas flores son para ti! ✨"
    ];

    const messageTexts = [
        "🌷 Eres tan especial como estas flores 🌷",
        "🌻 ¡Tan únicas como tú! 🌻"
    ];

    let titleIndex = 0;
    let messageIndex = 0;

    // Función para actualizar el título y el mensaje
    function updateTexts() {
        // Cambiar el título
        mainTitle.innerText = titleTexts[titleIndex];
        mainTitle.style.color = titleIndex === 0 ? "#FFB300" : "#FFD700";

        // Cambiar el mensaje
        mainMessage.innerText = messageTexts[messageIndex];
        mainMessage.style.color = messageIndex === 0 ? "#FFA000" : "#FFEB3B";

        // Actualizar índices
        titleIndex = (titleIndex + 1) % titleTexts.length;
        messageIndex = (messageIndex + 1) % messageTexts.length;
    }

    // Llamar a la función cada 3 segundos (3000 milisegundos)
    setInterval(updateTexts, 3000);

    // Cambiar el título cuando el usuario pierde el foco de la pestaña
    window.addEventListener('blur', () => {
        document.title = "¡REGRESA PRECIOSOTA PTM <3!";
    });

    // Restaurar el título cuando el usuario regrese a la pestaña
    window.addEventListener('focus', () => {
        document.title = "MIS FLORES PRECIOSA";
    });
});
