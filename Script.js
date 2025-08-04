document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('business-card');
  const particlesContainer = document.getElementById('particles');

  function createParticles() {
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      // Random properties with better distribution
      const size = Math.random() * 6 + 2;
      const posX = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 15 + 10;
      const opacity = Math.random() * 0.4 + 0.1;

      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.opacity = opacity;
      particle.style.background = `rgba(233, 69, 96, ${opacity})`;

      // Set individual animation name
      particle.style.animationName = 'float';

      particlesContainer.appendChild(particle);
    }
  }

  // Initialize particles
  createParticles();

  // Card flip state
  let isFlipped = false;
  let isAnimating = false;

  // Click/tap to flip
  card.addEventListener('click', toggleFlip);

  // Swipe detection for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  card.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  card.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    if (touchEndX < touchStartX - 50 && !isFlipped && !isAnimating) {
      // Swipe left - flip card
      toggleFlip();
    } else if (touchEndX > touchStartX + 50 && isFlipped && !isAnimating) {
      // Swipe right - unflip card
      toggleFlip();
    }
  }

  function toggleFlip() {
    if (isAnimating) return;

    isAnimating = true;
    isFlipped = !isFlipped;

    if (isFlipped) {
      card.classList.add('flipped');
    } else {
      card.classList.remove('flipped');
    }

    // Animate with GSAP
    gsap.to(card, {
      duration: 0.8,
      rotateY: isFlipped ? 180 : 0,
      ease: 'power3.out',
      onComplete: () => {
        isAnimating = false;
      },
    });
  }

  // Floating animation for logo
  gsap.to('.logo-placeholder', {
    y: -5,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
});