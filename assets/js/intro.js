/**
 * CONTROLADOR DE INTRO CINEMÁTICA (PANTALLA 0) - BICICLETAS DON NABOR
 * Video de presentación en loop / reproducción automática + Transición automática al finalizar
 * Soporte para poster personalizado assets/images/video-bg.jpg
 */

document.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.getElementById('intro-screen');
  const startBtn = document.getElementById('btn-start-experience');
  const introVideo = document.getElementById('intro-video-element');
  const canvas = document.getElementById('intro-canvas');

  let hasEnteredStore = false;

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('nointro') === '1' || window.location.hash === '#top' || sessionStorage.getItem('bdn_store_entered') === '1') {
    if (introScreen) introScreen.style.display = 'none';
    document.body.style.overflow = '';
    return;
  }

  // Iniciar visualizador interactivo
  initCanvasVisualizer(canvas);

  // Configurar video
  if (introVideo) {
    introVideo.muted = true;
    introVideo.playsInline = true;
    
    // Iniciar reproducción
    const playPromise = introVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log('Autoplay bloqueado por navegador en PC, transición rápida programada');
        // Si el navegador bloqueó la reproducción automática, entrar tras 3.5s si no ha interactuado
        setTimeout(() => {
          autoEnterStore();
        }, 3500);
      });
    }

    // 2. Acabando el video, iniciar la página automáticamente
    introVideo.addEventListener('ended', () => {
      autoEnterStore();
    });

    // Fallback de seguridad: si dura 15 segundos o al completar su duración, pasar automáticamente
    introVideo.addEventListener('timeupdate', () => {
      if (introVideo.duration && introVideo.currentTime >= (introVideo.duration - 0.3)) {
        autoEnterStore();
      }
    });

    // Fallback general máximo: 8 segundos
    setTimeout(() => {
      autoEnterStore();
    }, 8000);
  } else {
    // Si no hay elemento video, transición a los 3 segundos
    setTimeout(() => {
      autoEnterStore();
    }, 3000);
  }

  // Clic en botón "Iniciar Tienda BDN" o botón de saltar
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      autoEnterStore();
    });
  }

  const skipBtn = document.getElementById('btn-skip-intro');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      autoEnterStore();
    });
  }

  function autoEnterStore() {
    if (hasEnteredStore || !introScreen) return;
    hasEnteredStore = true;
    try { sessionStorage.setItem('bdn_store_entered', '1'); } catch (e) {}

    // Transición cinematográfica suave
    introScreen.classList.add('intro-hidden');

    // Pausar video tras la transición para optimizar memoria
    setTimeout(() => {
      if (introVideo && !introVideo.paused) {
        introVideo.pause();
      }
      // Restaurar overflow limpio del body sin forzar auto (evita romper sticky header)
      document.body.style.overflow = '';
      if (introScreen) introScreen.style.display = 'none';
    }, 850);
  }

  /**
   * Renderizador gráfico Canvas de respaldo (Partículas Neón BDN)
   */
  function initCanvasVisualizer(canvasElement) {
    if (!canvasElement) return;
    const ctx = canvasElement.getContext('2d');
    let width = canvasElement.width = window.innerWidth;
    let height = canvasElement.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvasElement.width = window.innerWidth;
      height = canvasElement.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(255, 85, 0, 0.4)' : 'rgba(245, 158, 11, 0.3)'
      });
    }

    function renderLoop() {
      if (hasEnteredStore) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 85, 0, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderLoop);
    }

    renderLoop();
  }
});
