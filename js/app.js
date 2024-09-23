document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('flowerCanvas');
    const ctx = canvas.getContext('2d');

    // Función para ajustar el tamaño del canvas según el tamaño de la ventana
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.8;
    }

    resizeCanvas(); // Ajuste inicial del tamaño del canvas

    // Ajustar el tamaño del canvas si cambia el tamaño de la ventana
    window.addEventListener('resize', resizeCanvas);

    let animationTime = 0;
    const particles = [];
    const butterflies = [];
    const numParticles = 20;
    const numButterflies = 5;

    // Crear partículas para el fondo decorativo
    function createParticles() {
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.7,
                radius: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                color: `rgba(255, 206, 86, ${Math.random()})`
            });
        }
    }

    // Crear mariposas decorativas que revoloteen
    function createButterflies() {
        for (let i = 0; i < numButterflies; i++) {
            butterflies.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.5,
                speedX: (Math.random() - 0.5) * 1.5,
                speedY: (Math.random() - 0.5) * 1.5,
                color: `rgba(255, 99, 71, ${Math.random() + 0.5})`
            });
        }
    }

    createParticles();
    createButterflies();

    // Función para dibujar un pétalo bien definido
    function drawPetal(x, y, width, height, rotation, fillColor, strokeColor) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(width / 2, -height, width, 0);
        ctx.quadraticCurveTo(width / 2, height, 0, 0);
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }

    // Función para dibujar una flor con pétalos definidos
    function drawFlower(x, y, scale = 1) {
        const petalColors = ['#FFD700', '#FFA500', '#FF8C00']; // Diferentes tonos de amarillo
        const strokeColor = '#FF4500'; // Borde para los pétalos

        // Pétalos exteriores
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 / 6) * i;
            drawPetal(x, y, 40 * scale, 80 * scale, angle, petalColors[0], strokeColor);
        }

        // Pétalos intermedios
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 / 6) * i + Math.PI / 6;
            drawPetal(x, y, 30 * scale, 60 * scale, angle, petalColors[1], strokeColor);
        }

        // Pétalos internos
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 / 6) * i;
            drawPetal(x, y, 20 * scale, 40 * scale, angle, petalColors[2], strokeColor);
        }

        // Centro de la flor
        ctx.fillStyle = '#8B4513'; // Marrón oscuro
        ctx.beginPath();
        ctx.arc(x, y, 12 * scale, 0, Math.PI * 2);
        ctx.fill();
    }

    // Función para dibujar el tallo principal con degradado y curva suave
    function drawMainStem(x, y, length, thickness) {
        const gradient = ctx.createLinearGradient(x, y, x, y + length);
        gradient.addColorStop(0, '#006400');
        gradient.addColorStop(1, '#00B000');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = thickness;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x - 20, y + length / 2, x, y + length); // Curva suave al tallo
        ctx.stroke();
    }

    // Función para dibujar un tallo conectado con suavidad
    function drawConnectedStem(baseX, baseY, targetX, targetY, thickness) {
        const gradient = ctx.createLinearGradient(baseX, baseY, targetX, targetY);
        gradient.addColorStop(0, '#006400');
        gradient.addColorStop(1, '#00B000');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.moveTo(baseX, baseY);
        ctx.quadraticCurveTo((baseX + targetX) / 2, baseY - 50, targetX, targetY);
        ctx.stroke();
    }

    // Función para dibujar una hoja estilizada con degradado y sombras
    function drawLeaf(x, y, width, height, scale = 1) {
        const leafGradient = ctx.createLinearGradient(x, y - height, x, y + height);
        leafGradient.addColorStop(0, '#32CD32');
        leafGradient.addColorStop(1, '#228B22');

        ctx.fillStyle = leafGradient;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + width / 2, y - height, x + width, y);
        ctx.quadraticCurveTo(x + width / 2, y + height, x, y);
        ctx.fill();

        // Sombras para dar profundidad
        ctx.fillStyle = 'rgba(0, 100, 0, 0.4)';
        ctx.beginPath();
        ctx.moveTo(x + 5, y + 5);
        ctx.quadraticCurveTo(x + width / 2 + 5, y - height + 5, x + width + 5, y + 5);
        ctx.quadraticCurveTo(x + width / 2 + 5, y + height + 5, x + 5, y + 5);
        ctx.fill();
    }

    // Dibujar y actualizar partículas decorativas
    function drawParticles() {
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x > canvas.width || particle.x < 0) particle.speedX *= -1;
            if (particle.y > canvas.height || particle.y < 0) particle.speedY *= -1;
        });
    }

    // Dibujar mariposas
    function drawButterflies() {
        butterflies.forEach(butterfly => {
            ctx.save();
            ctx.translate(butterfly.x, butterfly.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(10, -10, 20, 0); // Ala derecha
            ctx.quadraticCurveTo(10, 10, 0, 0);   // Ala izquierda
            ctx.fillStyle = butterfly.color;
            ctx.fill();
            ctx.restore();
        });
    }

    function updateButterflies() {
        butterflies.forEach(butterfly => {
            butterfly.x += butterfly.speedX;
            butterfly.y += butterfly.speedY;

            if (butterfly.x > canvas.width || butterfly.x < 0) butterfly.speedX *= -1;
            if (butterfly.y > canvas.height || butterfly.y < 0) butterfly.speedY *= -1;
        });
    }

    // Función para animar el ramo de flores con movimiento suave
    function animateBouquet() {
        animationTime += 0.01;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 3;
        const mainStemHeight = 300;
        const stemThickness = 10;

        // Dibujar el tallo central
        drawMainStem(centerX, centerY + 30, mainStemHeight, stemThickness);

        // Posiciones de las flores con movimiento suave
        const flowerPositions = [
            { x: centerX, y: centerY + Math.sin(animationTime) * 5, scale: 1.5 },
            { x: centerX - 80, y: centerY + 30 + Math.sin(animationTime + 0.5) * 5, scale: 1.2 },
            { x: centerX + 80, y: centerY + 30 + Math.sin(animationTime + 1) * 5, scale: 1.2 },
            { x: centerX - 120, y: centerY + 70 + Math.sin(animationTime + 1.5) * 5, scale: 1 },
            { x: centerX + 120, y: centerY + 70 + Math.sin(animationTime + 2) * 5, scale: 1 }
        ];

        // Dibujar tallos conectados al tallo principal y flores
        flowerPositions.forEach((pos, index) => {
            if (index !== 0) {
                drawConnectedStem(centerX, centerY + mainStemHeight * 0.3, pos.x, pos.y + 30 * pos.scale, 5 * pos.scale);
            }
            drawFlower(pos.x, pos.y, pos.scale);
        });

        // Dibujar hojas más a la izquierda del tallo principal con movimiento suave
        const leafYPosition = centerY + 180 + Math.sin(animationTime + 1.5) * 2; // Movimiento suave
        drawLeaf(centerX - 90, leafYPosition, 80, 40, 1);
        drawLeaf(centerX - 10, leafYPosition, 80, 40, 1);

        // Dibujar partículas decorativas flotando alrededor
        drawParticles();
        updateParticles();

        // Dibujar mariposas revoloteando alrededor
        drawButterflies();
        updateButterflies();

        // Continuar la animación
        requestAnimationFrame(animateBouquet);
    }

    // Llamar a la animación del ramo completo
    animateBouquet();
});
