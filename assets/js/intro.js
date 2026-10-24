/**
 * CONTROLADOR DE INTRO CINEMÁTICA (PANTALLA 0) - BICICLETAS DON NABOR
 * Optimizado para arranque instantáneo en recargas (F5), cero bloqueos de GPU
 * y transición fluida hacia la tienda.
 */

document.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.getElementById('intro-screen');
  const startBtn = document.getElementById('btn-start-experience');
  const skipBtn = document.getElementById('btn-skip-intro');
  const introVideo = document.getElementById('intro-video-element');
  const canvas = document.getElementById('intro-canvas');

  let hasEnteredStore = false;
  let isVideoPlaying = false;
  let safetyTimer = null;

  // Permitir saltar intro solo si se pide explícitamente por parámetro ?nointro=1 o ?sync=1
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('nointro') === '1' || urlParams.get('sync') === '1' || urlParams.get('admin') === '1') {
    if (introScreen) introScreen.style.display = 'none';
    document.body.style.overflow = '';
    window.dispatchEvent(new CustomEvent('bdn:intro-finished'));
    return;
  }

  // Bloquear scroll de fondo mientras la intro está activa para evitar repintados pesados
  document.body.style.overflow = 'hidden';

  // Iniciar visualizador ligero de respaldo (se apaga automáticamente apenas arranca el video MP4)
  initCanvasVisualizer(canvas);

  if (introVideo) {
    introVideo.muted = true;
    introVideo.defaultMuted = true;
    introVideo.playsInline = true;
    introVideo.loop = false;

    const startPlayback = () => {
      if (hasEnteredStore) return;
      try {
        if (introVideo.currentTime > 0.5) {
          introVideo.currentTime = 0;
        }
      } catch (e) {}

      const playPromise = introVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isVideoPlaying = true;
            // Ocultar canvas de respaldo para liberar 100% de GPU al decodificador de video
            if (canvas) canvas.style.opacity = '0';
          })
          .catch(() => {
            // Si el navegador bloquea autoplay, avanzar suavemente tras 4s
            setTimeout(autoEnterStore, 4000);
          });
      }
    };

    if (introVideo.readyState >= 2) {
      startPlayback();
    } else {
      introVideo.addEventListener('canplay', startPlayback, { once: true });
      // Forzar carga limpia en recargas de navegador (evita congelamiento de buffer en Chrome/Edge)
      introVideo.load();
    }

    // Al terminar el video, entrar automáticamente a la tienda
    introVideo.addEventListener('ended', () => {
      autoEnterStore();
    });

    introVideo.addEventListener('timeupdate', () => {
      if (introVideo.duration && introVideo.currentTime >= (introVideo.duration - 0.25)) {
        autoEnterStore();
      }
    });

    // Fallback de seguridad (16s para respetar los 15s completos del video)
    safetyTimer = setTimeout(() => {
      autoEnterStore();
    }, 16000);
  } else {
    safetyTimer = setTimeout(() => {
      autoEnterStore();
    }, 3500);
  }

  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      autoEnterStore();
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      autoEnterStore();
    });
  }

  function autoEnterStore() {
    if (hasEnteredStore || !introScreen) return;
    hasEnteredStore = true;

    if (safetyTimer) {
      clearTimeout(safetyTimer);
      safetyTimer = null;
    }

    // Pausar el video INMEDIATAMENTE al iniciar el fade-out para que el zoom/transición sea a 60 FPS
    if (introVideo && !introVideo.paused) {
      try { introVideo.pause(); } catch (e) {}
    }

    // Restaurar scroll de la página antes de terminar el fade
    document.body.style.overflow = '';
    introScreen.classList.add('intro-hidden');

    // Notificar a la tienda que la intro terminó (para cargar mapas diferidos sin trabar el inicio)
    window.dispatchEvent(new CustomEvent('bdn:intro-finished'));

    setTimeout(() => {
      if (introScreen) {
        introScreen.style.display = 'none';
      }
      if (introVideo) {
        try {
          introVideo.removeAttribute('src');
          introVideo.load();
        } catch (e) {}
      }
    }, 750);
  }

  /**
   * Renderizador gráfico Canvas de respaldo (Se detiene automáticamente cuando el video MP4 está corriendo)
   */
  function initCanvasVisualizer(canvasElement) {
    if (!canvasElement) return;
    const ctx = canvasElement.getContext('2d');
    let width = canvasElement.width = window.innerWidth;
    let height = canvasElement.height = window.innerHeight;

    const particles = [];
    const particleCount = 24;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(255, 85, 0, 0.35)' : 'rgba(245, 158, 11, 0.25)'
      });
    }

    function renderLoop() {
      // Si ya entró a la tienda o el video MP4 ya está reproduciéndose, detener el loop del canvas
      if (hasEnteredStore || isVideoPlaying) return;
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

      requestAnimationFrame(renderLoop);
    }

    renderLoop();
  }
});
