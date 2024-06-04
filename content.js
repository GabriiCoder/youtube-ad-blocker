// Observa cambios en el DOM para detectar y saltar anuncios en YouTube
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      if (video.duration > 0 && !video.paused && !video.ended && video.readyState > 2) {
        // Si hay un video en reproducción, verificamos si es un anuncio
        const isAd = isVideoAd(video);
        if (isAd) {
          // Si es un anuncio, pausamos la reproducción del video principal y esperamos a que termine el anuncio
          const mainVideo = document.querySelector('.html5-main-video');
          if (mainVideo) {
            mainVideo.pause();
            mainVideo.onended = function() {
              // Cuando termine el anuncio, avanzamos en la reproducción del video principal
              mainVideo.currentTime += 5; // Avanzar 5 segundos después del anuncio
              mainVideo.play();
            };
          }
        }
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Función para verificar si un video es un anuncio
function isVideoAd(video) {
  // Aquí puedes agregar condiciones específicas para identificar anuncios basadas en el contenido del video
  // Por ejemplo, puedes verificar la duración del video, la presencia de controles de anuncio, etc.
  // Por ahora, simplemente devolvemos true si la duración del video es menor que un cierto umbral
  return video.duration < 60; // Consideramos que los videos con duración menor a 60 segundos son anuncios
}