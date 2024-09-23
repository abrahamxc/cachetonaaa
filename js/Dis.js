document.addEventListener('DOMContentLoaded', function() {
    const mainTitle = document.getElementById('mainTitle');
    const mainMessage = document.getElementById('mainMessage');

    // Cambiar el título cuando el usuario pierde el foco de la pestaña
    window.addEventListener('blur', () => {
        document.title = "¡REGRESA PRECIOSOTA PTM <3";
    });

    // Restaurar el título cuando el usuario regrese a la pestaña
    window.addEventListener('focus', () => {
        document.title = "PA TI PRECIOSA";
    });

    // Interacción con el título
    mainTitle.addEventListener('mouseover', () => {
        mainTitle.innerText = "✨ ¡Estas flores son para ti! ✨";
        mainTitle.style.color = "#FFD700";
    });

    mainTitle.addEventListener('mouseout', () => {
        mainTitle.innerText = "✨ Flores para Ti ✨";
        mainTitle.style.color = "#FFB300";
    });

    // Interacción con el mensaje
    mainMessage.addEventListener('mouseover', () => {
        mainMessage.innerText = "🌻 ¡Tan únicas como tú! 🌻";
        mainMessage.style.color = "#FFEB3B";
    });

    mainMessage.addEventListener('mouseout', () => {
        mainMessage.innerText = "🌷 Eres tan especial como estas flores 🌷";
        mainMessage.style.color = "#FFA000";
    });
});
